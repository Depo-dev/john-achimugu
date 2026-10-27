export type ProjectCategory = 'Web Apps' | 'Mobile Apps' | 'Websites' | 'POS' | 'VR'

export type Project = {
  title: string
  tags: string[]
  year: number
  description: string
  categories: ProjectCategory[]
  image?: string
  liveUrl?: string
  comingSoon?: boolean
}

export const CATEGORIES: ProjectCategory[] = ['Web Apps', 'Mobile Apps', 'Websites', 'POS', 'VR']

const PRUDIVA_DESC =
  'Prudiva is an AI-powered business intelligence platform designed specifically for small and medium businesses.'

export const PROJECTS: Project[] = [
  { title: 'Prudiva', tags: ['Design', 'Branding', 'Fintech & Credit'], year: 2026, description: PRUDIVA_DESC, categories: ['Web Apps', 'Websites'], comingSoon: true, liveUrl: '#' },
  { title: 'FloatMerchant', tags: ['Design', 'Branding', 'Fintech & Credit'], year: 2026, description: PRUDIVA_DESC, categories: ['Web Apps', 'Mobile Apps', 'POS'], comingSoon: true, liveUrl: '#' },
  { title: 'Prudiva', tags: ['Design', 'Branding', 'Fintech & Credit'], year: 2026, description: PRUDIVA_DESC, categories: ['Websites'], comingSoon: true, liveUrl: '#' },
  { title: 'Prudiva', tags: ['Design', 'Branding', 'Fintech & Credit'], year: 2026, description: PRUDIVA_DESC, categories: ['Web Apps', 'Websites'], comingSoon: true, liveUrl: '#' },
  { title: 'Prudiva', tags: ['Design', 'Branding', 'Fintech & Credit'], year: 2026, description: PRUDIVA_DESC, categories: ['Mobile Apps', 'Websites'], comingSoon: true, liveUrl: '#' },
  { title: 'Prudiva', tags: ['Design', 'Branding', 'Fintech & Credit'], year: 2026, description: PRUDIVA_DESC, categories: ['Web Apps', 'Websites', 'POS'], comingSoon: true, liveUrl: '#' },
  { title: 'Prudiva', tags: ['Design', 'Branding', 'Fintech & Credit'], year: 2026, description: PRUDIVA_DESC, categories: ['Websites', 'VR'], comingSoon: true, liveUrl: '#' },
  { title: 'Prudiva', tags: ['Design', 'Branding', 'Fintech & Credit'], year: 2026, description: PRUDIVA_DESC, categories: ['Mobile Apps', 'Websites'], comingSoon: true, liveUrl: '#' },
  { title: 'Prudiva', tags: ['Design', 'Branding', 'Fintech & Credit'], year: 2026, description: PRUDIVA_DESC, categories: ['Web Apps', 'Websites'], comingSoon: true, liveUrl: '#' },
  { title: 'Prudiva', tags: ['Design', 'Branding', 'Fintech & Credit'], year: 2026, description: PRUDIVA_DESC, categories: ['Websites', 'POS'], comingSoon: true, liveUrl: '#' },
  { title: 'Prudiva', tags: ['Design', 'Branding', 'Fintech & Credit'], year: 2026, description: PRUDIVA_DESC, categories: ['Mobile Apps', 'Websites'], comingSoon: true, liveUrl: '#' },
  { title: 'Prudiva', tags: ['Design', 'Branding', 'Fintech & Credit'], year: 2026, description: PRUDIVA_DESC, categories: ['Web Apps', 'Websites'], comingSoon: true, liveUrl: '#' },
]
