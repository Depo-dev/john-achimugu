/* oxlint-disable react/only-export-components -- build-time entry, never hot-reloaded */
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import AppRoutes from './AppRoutes'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

export { headTags, INDEXABLE_PATHS, seoFor, SHELL_PATHS, SITE_URL } from './lib/seo'

export function render(path: string) {
  return renderToString(
    <StaticRouter location={path}>
      <Navbar />
      <main className="bg-white dark:bg-black">
        <AppRoutes />
      </main>
      <Footer />
    </StaticRouter>,
  )
}
