export type ProjectCategory = 'Web Apps' | 'Mobile Apps' | 'Websites' | 'POS' | 'VR'

export type Project = {
  title: string
  tags: string[]
  year: number
  description: string
  categories: ProjectCategory[]
  image?: string
  liveUrl?: string
  caseStudyUrl?: string
  comingSoon?: boolean
}

export const CATEGORIES: ProjectCategory[] = ['Web Apps', 'Mobile Apps', 'Websites', 'POS', 'VR']

const TAGS = ['Design', 'Branding', 'Fintech & Credit']
const PRUDIVA_DESC =
  'Prudiva is an AI-powered business intelligence platform designed specifically for small and medium businesses.'

// Placeholder content: replace descriptions, links and add `image` paths (public/images/projects/).
export const PROJECTS: Project[] = [
  { title: 'Prudiva', tags: TAGS, year: 2026, description: PRUDIVA_DESC, categories: ['Web Apps', 'Websites'], comingSoon: true, liveUrl: '#' },
  { title: 'FloatMerchant', tags: TAGS, year: 2026, description: PRUDIVA_DESC, categories: ['Web Apps', 'Mobile Apps', 'POS'], caseStudyUrl: '#', liveUrl: '#' },
  { title: 'Reset VR', tags: TAGS, year: 2026, description: PRUDIVA_DESC, categories: ['VR', 'Websites'], caseStudyUrl: '#', liveUrl: '#' },
  { title: 'Team1', tags: TAGS, year: 2026, description: PRUDIVA_DESC, categories: ['Websites'], caseStudyUrl: '#', liveUrl: '#' },
  { title: 'IBX', tags: TAGS, year: 2026, description: 'Your daily companion, making life simpler, more convenient, and stress-free.', categories: ['Mobile Apps', 'Websites'], caseStudyUrl: '#', liveUrl: '#' },
  { title: 'Luvira', tags: TAGS, year: 2026, description: PRUDIVA_DESC, categories: ['Mobile Apps', 'Websites'], caseStudyUrl: '#', liveUrl: '#' },
  { title: 'Attend', tags: TAGS, year: 2026, description: PRUDIVA_DESC, categories: ['Web Apps', 'Websites'], caseStudyUrl: '#', liveUrl: '#' },
  { title: 'Prudiva', tags: TAGS, year: 2026, description: PRUDIVA_DESC, categories: ['Mobile Apps', 'Websites'], caseStudyUrl: '#', liveUrl: '#' },
  { title: 'Prudiva', tags: TAGS, year: 2026, description: PRUDIVA_DESC, categories: ['Web Apps', 'Websites', 'POS'], caseStudyUrl: '#', liveUrl: '#' },
  { title: 'Prudiva', tags: TAGS, year: 2026, description: PRUDIVA_DESC, categories: ['Web Apps', 'Websites'], caseStudyUrl: '#', liveUrl: '#' },
  { title: 'Prudiva', tags: TAGS, year: 2026, description: PRUDIVA_DESC, categories: ['Mobile Apps', 'Websites', 'POS'], caseStudyUrl: '#', liveUrl: '#' },
  { title: 'Prudiva', tags: TAGS, year: 2026, description: PRUDIVA_DESC, categories: ['Web Apps', 'Websites'], caseStudyUrl: '#', liveUrl: '#' },
]
