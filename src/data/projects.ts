export type ProjectCategory = 'Web Apps' | 'Mobile Apps' | 'Websites' | 'POS' | 'VR'

// A URL renders a link (internal '/projects/…' paths open a case study page); 'soon' renders a "Coming Soon" label; omit to show nothing.
type LinkState = string | 'soon'

export type Project = {
  title: string
  tags: string[]
  year?: number
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
    caseStudyUrl: '/projects/luvira',
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
    caseStudyUrl: '/projects/team1-africa',
    liveUrl: '#',
  },
  {
    title: 'NSK.AI',
    tags: TAGS,
    year: 2026,
    description: PRUDIVA_DESC,
    categories: ['Websites'],
    image: '/images/projects/nskai.webp',
    caseStudyUrl: '/projects/nsk-ai',
    liveUrl: '#',
  },
  {
    title: 'Spherre',
    tags: TAGS,
    year: 2026,
    description: PRUDIVA_DESC,
    categories: ['Websites'],
    image: '/images/projects/spherre.webp',
    caseStudyUrl: '/projects/spherre',
    liveUrl: '#',
  },
  {
    title: 'Oneway',
    tags: TAGS,
    year: 2024,
    description:
      'Oneway is a mobile app that streamlines supermarket checkout and brings deliveries, bill payments, and transportation into one place.',
    categories: ['Mobile Apps', 'Web Apps', 'POS'],
    image: '/images/projects/oneway.webp',
    caseStudyUrl: '/projects/oneway',
    liveUrl: '#',
  },
  {
    title: 'Ibx Exchange',
    tags: TAGS,
    year: 2023,
    description: 'Your daily companion, making life simpler, more convenient, and stress-free.',
    categories: ['Web Apps', 'Mobile Apps'],
    image: '/images/projects/ibx.webp',
    caseStudyUrl: '/projects/ibx-exchange',
    liveUrl: '#',
  },
  // Gallery-only projects (no case study page). Descriptions are drafts based on the screenshots.
  {
    title: 'Attend',
    tags: ['Design', 'Branding', 'Events & Ticketing'],
    description: 'Attend is an event discovery and ticketing platform for finding events, following organizers, and buying tickets.',
    categories: ['Websites', 'Web Apps'],
    image: '/images/projects/attend.webp',
    caseStudyUrl: '/projects/attend',
  },
  {
    title: 'Chillr',
    tags: ['Design', 'Branding', 'Social & Dating'],
    description: 'Chillr is a social app that helps people build a rich profile and connect around shared lifestyles and relationship goals.',
    categories: ['Mobile Apps'],
    image: '/images/projects/chillr.webp',
    caseStudyUrl: '/projects/chillr',
  },
  {
    title: 'TokenGiver',
    tags: ['Design', 'Branding', 'Web3 & Fundraising'],
    description: 'TokenGiver is a crypto fundraising platform that lets creators connect a wallet and launch campaigns in a few simple steps.',
    categories: ['Web Apps'],
    image: '/images/projects/tokengiver.webp',
    caseStudyUrl: '/projects/tokengiver',
  },
  {
    title: 'StarkBid',
    tags: ['Design', 'Branding', 'Web3 & NFTs'],
    description: 'StarkBid is an NFT marketplace for exploring collections, bidding in auctions, staking, and minting.',
    categories: ['Web Apps'],
    image: '/images/projects/starkbid.webp',
  },
  {
    title: 'Rider',
    tags: ['Design', 'Branding', 'Logistics & Delivery'],
    description: 'A delivery rider app for going on duty, finding orders, and tracking earnings on your own schedule.',
    categories: ['Mobile Apps'],
    image: '/images/projects/rider.webp',
    caseStudyUrl: '/projects/rider-app',
  },
  {
    title: 'PHIND',
    tags: ['Design', 'Branding', 'Workforce & HR'],
    description: 'PHIND helps construction companies manage members, jobs, applicants, resources, and apprenticeship programs.',
    categories: ['Web Apps'],
    image: '/images/projects/phind.webp',
    caseStudyUrl: '/projects/phind',
  },
  {
    title: 'HeyChat',
    tags: ['Design', 'Branding', 'Messaging'],
    description: 'HeyChat is a messaging app for one-to-one and group conversations with media sharing.',
    categories: ['Mobile Apps'],
    image: '/images/projects/heychat.webp',
    caseStudyUrl: '/projects/hey-chat',
  },
  {
    title: 'Helpmee',
    tags: ['Design', 'Branding', 'Food & Services'],
    description: 'Helpmee is a mobile app for discovering and ordering meals and everyday services.',
    categories: ['Mobile Apps'],
    image: '/images/projects/helpmee.webp',
    caseStudyUrl: '/projects/helpmee',
  },
]
