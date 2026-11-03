import { CASE_STUDIES, findCaseStudy } from '../data/caseStudies'
import { isProjectLocked } from '../data/projects'

export const SITE_URL = 'https://johnachimugu.work'

const NAME = 'John Achimugu'
const OG_IMAGE = `${SITE_URL}/images/og.jpg`
const PERSON_ID = `${SITE_URL}/#person`

// Still shows another project's case study text, so it stays out of search until it has its own.
const DRAFT_CASE_STUDIES = ['networkx-ai']

const HOME_DESCRIPTION =
  'John Achimugu is a Product Designer turning complex ideas and emerging technologies into simple, intuitive digital experiences across SaaS, fintech, AI, and VR.'

const PERSON = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: NAME,
  url: SITE_URL,
  image: `${SITE_URL}/images/life/john14.webp`,
  jobTitle: 'Product Designer',
  description: HOME_DESCRIPTION,
  email: 'mailto:achimugunusa11@gmail.com',
  address: { '@type': 'PostalAddress', addressLocality: 'Lagos', addressCountry: 'NG' },
  worksFor: [
    { '@type': 'Organization', name: 'Prudiva' },
    { '@type': 'Organization', name: 'FloatMerchant' },
  ],
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Nigeria, Nsukka' },
  knowsAbout: ['Product Design', 'UI/UX Design', 'Brand Identity', 'Motion Design', 'VR Design', 'SaaS', 'Fintech'],
}

export type PageSeo = {
  title: string
  description: string
  path: string
  indexable: boolean
  ogType: 'website' | 'profile' | 'article'
  jsonLd: object[]
}

function clip(text: string, max = 158) {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const sentence = cut.lastIndexOf('. ')
  if (sentence > 80) return cut.slice(0, sentence + 1)
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`
}

function breadcrumbs(items: [string, string][]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  }
}

const PAGES: Record<string, Omit<PageSeo, 'path' | 'indexable'>> = {
  '/': {
    title: `${NAME} | Product Designer`,
    description: HOME_DESCRIPTION,
    ogType: 'website',
    jsonLd: [
      { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: NAME, publisher: { '@id': PERSON_ID } },
      PERSON,
    ],
  },
  '/life': {
    title: `About ${NAME} | Product Designer`,
    description:
      'Meet John Achimugu, a Product Designer who simplifies complex problems: his work experience, education, and life outside design, from games to travel.',
    ogType: 'profile',
    jsonLd: [{ '@type': 'ProfilePage', mainEntity: PERSON }, breadcrumbs([['Home', '/'], ['About', '/life']])],
  },
  '/projects': {
    title: `Projects & Case Studies | ${NAME}`,
    description:
      'Product design case studies by John Achimugu across fintech, AI, Web3, VR, and mobile apps, including FloatMerchant, Ibx Exchange, Oneway, and NSK.AI.',
    ogType: 'website',
    jsonLd: [
      { '@type': 'CollectionPage', name: 'Projects', creator: { '@id': PERSON_ID } },
      breadcrumbs([['Home', '/'], ['Projects', '/projects']]),
    ],
  },
  '/resume': {
    title: `Resume | ${NAME}, Product Designer`,
    description:
      'Resume documents for John Achimugu, Product Designer: product design, UI/UX, and brand identity experience, design process, and the value he brings to a team.',
    ogType: 'profile',
    jsonLd: [breadcrumbs([['Home', '/'], ['Resume', '/resume']])],
  },
  '/contact': {
    title: `Contact ${NAME} | Hire a Product Designer`,
    description:
      'Have a product that needs a co-pilot? Contact John Achimugu about product design, brand identity, and UI/UX work on your SaaS, fintech, AI, or VR product.',
    ogType: 'website',
    jsonLd: [breadcrumbs([['Home', '/'], ['Contact', '/contact']])],
  },
}

export function seoFor(pathname: string): PageSeo {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  const page = PAGES[path]
  if (page) return { ...page, path, indexable: true }

  const slug = path.match(/^\/projects\/([^/]+)(\/locked)?$/)?.[1]
  const study = findCaseStudy(slug)
  if (study && isProjectLocked(slug)) {
    return {
      title: `${study.title} | Private Project | ${NAME}`,
      description: `This ${NAME} project is private. Enter the code you were given to view it.`,
      path: `/projects/${slug}`,
      indexable: false,
      ogType: 'website',
      jsonLd: [],
    }
  }
  if (study && slug && DRAFT_CASE_STUDIES.includes(slug) && path === `/projects/${slug}`) {
    return {
      title: `${study.title} Case Study | ${NAME}`,
      description: HOME_DESCRIPTION,
      path,
      indexable: false,
      ogType: 'website',
      jsonLd: [],
    }
  }
  if (study && path === `/projects/${slug}`) {
    const description = clip(study.description[0])
    const image = study.media.find((m) => m.type === 'image')
    return {
      title: `${study.title} Case Study | ${NAME}`,
      description,
      path,
      indexable: true,
      ogType: 'article',
      jsonLd: [
        {
          '@type': 'CreativeWork',
          name: `${study.title} case study`,
          description,
          url: `${SITE_URL}${path}`,
          creator: { '@type': 'Person', '@id': PERSON_ID, name: NAME },
          dateCreated: String(study.meta.year),
          about: study.meta.sector,
          ...(image ? { image: `${SITE_URL}${image.src}` } : {}),
        },
        breadcrumbs([['Home', '/'], ['Projects', '/projects'], [study.title, path]]),
      ],
    }
  }
  return { title: `Page not found | ${NAME}`, description: HOME_DESCRIPTION, path, indexable: false, ogType: 'website', jsonLd: [] }
}

// Public case studies only: locked and draft ones must never be rendered into static HTML.
export const INDEXABLE_PATHS = [
  ...Object.keys(PAGES),
  ...CASE_STUDIES.filter((c) => !isProjectLocked(c.slug) && !DRAFT_CASE_STUDIES.includes(c.slug)).map(
    (c) => `/projects/${c.slug}`,
  ),
]

export const SHELL_PATHS = [
  ...DRAFT_CASE_STUDIES.map((slug) => `/projects/${slug}`),
  ...CASE_STUDIES.filter((c) => isProjectLocked(c.slug)).flatMap((c) => [
    `/projects/${c.slug}`,
    `/projects/${c.slug}/locked`,
  ]),
]

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function headTags(seo: PageSeo) {
  const url = `${SITE_URL}${seo.path === '/' ? '/' : seo.path}`
  const title = escapeHtml(seo.title)
  const description = escapeHtml(seo.description)
  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="${seo.indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow'}" />`,
  ]
  if (seo.indexable) tags.push(`<link rel="canonical" href="${url}" />`)
  tags.push(
    `<meta property="og:site_name" content="${NAME}" />`,
    `<meta property="og:type" content="${seo.ogType}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${NAME}, Product Designer" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
  )
  if (seo.jsonLd.length > 0) {
    const data = JSON.stringify({ '@context': 'https://schema.org', '@graph': seo.jsonLd }).replace(/</g, '\\u003c')
    tags.push(`<script type="application/ld+json">${data}</script>`)
  }
  return tags.join('\n    ')
}

// Keeps the tab title and core tags right as visitors move between pages without a reload.
export function applySeo(seo: PageSeo) {
  document.title = seo.title
  const setMeta = (name: string, content: string) => {
    let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
    if (!el) {
      el = document.createElement('meta')
      el.name = name
      document.head.appendChild(el)
    }
    el.content = content
  }
  setMeta('description', seo.description)
  setMeta('robots', seo.indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow')

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!seo.indexable) {
    canonical?.remove()
    return
  }
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  canonical.href = `${SITE_URL}${seo.path}`
}
