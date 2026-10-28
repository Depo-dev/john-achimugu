export type ProjectCategory = 'Web Apps' | 'Mobile Apps' | 'Websites' | 'POS' | 'VR'

// A URL renders a link (internal '/projects/…' paths open a case study page); 'soon' renders a "Coming Soon" label; omit to show nothing.
type LinkState = string | 'soon'

export type Project = {
  title: string
  tags: string[]
  year: number
  description: string
  categories: ProjectCategory[]
  image?: string
  video?: { src: string; poster: string }
  caseStudyUrl?: LinkState
  liveUrl?: LinkState
}

export const CATEGORIES: ProjectCategory[] = ['Web Apps', 'Mobile Apps', 'Websites', 'POS', 'VR']

const TAGS = ['Design', 'Branding', 'Fintech & Credit']
const PRUDIVA_DESC =
  'Prudiva is an AI-powered business intelligence platform designed specifically for small and medium businesses.'

export const PROJECTS: Project[] = [
  {
    title: 'Prudiva',
    tags: ['Web App', 'Branding', 'Fintech & Credit'],
    year: 2026,
    description: PRUDIVA_DESC,
    categories: ['Web Apps'],
    image: '/images/projects/prudiva.webp',
    caseStudyUrl: '/projects/prudiva',
    liveUrl: 'soon',
  },
  {
    title: 'FloatMerchant',
    tags: TAGS,
    year: 2026,
    description:
      'FloatMerchant helps SMEs access working capital while enabling financial institutions to grow credit assets and manage lending risks.',
    categories: ['Websites', 'Web Apps'],
    image: '/images/projects/floatmerchant.webp',
    caseStudyUrl: '/projects/floatmerchant',
    liveUrl: '#',
  },
  {
    title: 'Reset VR',
    tags: TAGS,
    year: 2026,
    description:
      'Reset VR is a virtual reality wellness experience that helps users reset their mental state through movement, rhythm, breathing, and presence.',
    categories: ['VR'],
    video: { src: '/images/projects/resetvr.mp4', poster: '/images/projects/resetvr-poster.webp' },
    caseStudyUrl: '/projects/reset-vr',
    liveUrl: 'soon',
  },
  {
    title: 'Luvira',
    tags: TAGS,
    year: 2026,
    description:
      'Luvira is a voice-first AI productivity platform designed to help users capture their thoughts, find clarity, and turn ideas into meaningful action.',
    categories: ['Mobile Apps'],
    image: '/images/projects/luvira.webp',
    caseStudyUrl: '#',
    liveUrl: 'soon',
  },
  {
    title: 'DartX',
    tags: TAGS,
    year: 2026,
    description:
      'DartX is a digital banking platform designed to simplify financial management, payments, and everyday banking operations.',
    categories: ['Mobile Apps', 'Web Apps'],
    image: '/images/projects/dartx.webp',
    caseStudyUrl: '/projects/dartx',
    liveUrl: 'soon',
  },
  {
    title: 'NetworkX.AI',
    tags: TAGS,
    year: 2026,
    description: PRUDIVA_DESC,
    categories: ['Mobile Apps'],
    image: '/images/projects/networkx.webp',
    caseStudyUrl: '/projects/networkx-ai',
    liveUrl: '#',
  },
  {
    title: 'Team1',
    tags: TAGS,
    year: 2026,
    description: PRUDIVA_DESC,
    categories: ['Websites'],
    image: '/images/projects/team1.webp',
    caseStudyUrl: '#',
    liveUrl: '#',
  },
  {
    title: 'NSK.AI',
    tags: TAGS,
    year: 2026,
    description: PRUDIVA_DESC,
    categories: ['Websites'],
    image: '/images/projects/nskai.webp',
    caseStudyUrl: '#',
    liveUrl: '#',
  },
  {
    title: 'Spherre',
    tags: TAGS,
    year: 2026,
    description: PRUDIVA_DESC,
    categories: ['Websites'],
    image: '/images/projects/spherre.webp',
    caseStudyUrl: '#',
    liveUrl: '#',
  },
  {
    title: 'Oneway',
    tags: TAGS,
    year: 2024,
    description:
      'Oneway is a mobile app that streamlines supermarket checkout and brings deliveries, bill payments, and transportation into one place.',
    categories: ['Mobile Apps', 'Web Apps', 'POS'],
    caseStudyUrl: '/projects/oneway',
    liveUrl: '#',
  },
  {
    title: 'Ibx Exchange',
    tags: TAGS,
    year: 2023,
    description: 'Your daily companion, making life simpler, more convenient, and stress-free.',
    categories: ['Web Apps', 'Mobile Apps'],
    caseStudyUrl: '/projects/ibx-exchange',
    liveUrl: '#',
  },
]
