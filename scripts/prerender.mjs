// Writes a real HTML file for every route so crawlers and link previews get content without running JS.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssrDir = join(root, 'dist-ssr')

const { render, seoFor, headTags, INDEXABLE_PATHS, SHELL_PATHS, SITE_URL } = await import(
  pathToFileURL(join(ssrDir, 'entry-server.js')).href
)

const template = readFileSync(join(dist, 'index.html'), 'utf8')
if (!template.includes('<!--seo-->') || !template.includes('<!--app-->')) {
  throw new Error('dist/index.html is missing the <!--seo--> or <!--app--> placeholder')
}

function page(seo, body = '', dark = false) {
  const html = template
    .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, () => headTags(seo))
    .replace('<!--app-->', () => body)
  return dark ? html.replace('<html lang="en">', '<html lang="en" class="theme-dark">') : html
}

function write(path, html) {
  const file = path === '/' ? join(dist, 'index.html') : join(dist, path, 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, html)
}

for (const path of INDEXABLE_PATHS) {
  write(path, page(seoFor(path), render(path), path === '/resume'))
}

// Locked and draft pages ship an empty shell: their case study text stays out of the static HTML.
for (const path of SHELL_PATHS) {
  write(path, page(seoFor(path)))
}

writeFileSync(join(dist, '404.html'), page(seoFor('/404')))

const urls = INDEXABLE_PATHS.map((path) => `  <url><loc>${SITE_URL}${path === '/' ? '/' : path}</loc></url>`)
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
)
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)

rmSync(ssrDir, { recursive: true, force: true })
console.log(`prerendered ${INDEXABLE_PATHS.length} indexable pages and ${SHELL_PATHS.length} shells`)
