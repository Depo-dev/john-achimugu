export type CaseMedia =
  | { type: 'image'; src: string; alt: string }
  | { type: 'video'; src: string; poster: string; alt: string }

export type CaseStudy = {
  slug: string
  title: string
  liveUrl?: string | 'soon'
  media: CaseMedia[]
  meta: { client: string; tools: string[]; year: number; sector: string[]; role: string[] }
  bigQuestion: string[]
  description: string[]
  objective: string[]
}

const DIR = '/images/projects'

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'reset-vr',
    title: 'Reset VR',
    liveUrl: '#',
    media: [
      { type: 'video', src: `${DIR}/resetvr.mp4`, poster: `${DIR}/resetvr-poster.webp`, alt: 'Reset VR logo animation' },
      { type: 'video', src: `${DIR}/case/resetvr-2.mp4`, poster: `${DIR}/case/resetvr-2-poster.webp`, alt: 'Reset VR glass logo animation' },
    ],
    meta: {
      client: 'Luvira',
      tools: ['Figma', 'FigJam', 'Unity'],
      year: 2026,
      sector: ['Health & Wellness', 'Virtual Reality (VR)', 'Immersive Technology'],
      role: ['Product Design', 'Motion Design', 'Illustration'],
    },
    bigQuestion: [
      'How might we help people manage stress, mental overload, and emotional tension through short, immersive experiences that help them reset their state of mind?',
    ],
    description: [
      'Reset VR is an immersive wellness experience designed to help people step away from mental noise and everyday stress through movement, rhythm, breathing, and presence. Rather than focusing on teaching or entertainment, it creates space for users to pause, reconnect with themselves, and reset.',
    ],
    objective: [
      'My contribution focused on translating the product vision into a clear, user-centered experience built around changing how people feel, not just what they know. I helped shape the experience around simple, embodied interactions that encourage users to slow down, release tension, and regain a sense of calm. The goal was to make emotional resets feel accessible, intuitive, and engaging through immersive VR experiences.',
    ],
  },
  {
    slug: 'prudiva',
    title: 'Prudiva',
    liveUrl: 'soon',
    media: [
      { type: 'image', src: `${DIR}/case/prudiva-1.webp`, alt: 'Prudiva Cards coming-soon screen' },
      { type: 'image', src: `${DIR}/case/prudiva-2.webp`, alt: 'Prudiva invoice preview screen' },
    ],
    meta: {
      client: 'Prudiva',
      tools: ['Figma', 'Adobe Illustrator', 'Claude'],
      year: 2026,
      sector: ['Web App', 'POS', 'Fintech', 'Artificial Intelligence', 'SME Financial Management', 'Business Intelligence'],
      role: ['Product Design', 'Brand Identity', 'Motion Design', 'Illustration'],
    },
    bigQuestion: [
      'How might we help small and medium-sized businesses understand their financial health, make better business decisions, and access relevant financing opportunities using the data they already generate?',
    ],
    description: [
      'Prudiva is an AI-powered financial technology platform designed to help SMEs understand and manage their businesses more intelligently.',
      "The platform connects to a business's everyday financial activity, organizes relevant information, analyzes performance, and transforms that information into clear insights and practical recommendations. Beyond financial visibility, Prudiva's intelligence also supports its lending layer. By using real business activity to understand financial performance, the platform aims to connect qualifying businesses with lending partners and appropriate credit opportunities.",
      'The product brings operational finance and business intelligence together through a connected ecosystem of features, including invoicing, customer management, accounts, vendors, bills, orders, cards, payroll, inflow and outflow recognition, invoice discounting, and credit lines.',
    ],
    objective: [
      'One of my primary objectives was to create a clear product structure for a platform with multiple interconnected financial workflows. With features spanning daily operations, financial tracking, business intelligence, payroll, and credit, the experience needed to help users understand where to go, what each feature does, and how different activities connect.',
      'I approached the product as a connected financial operating system rather than a collection of isolated modules. This meant considering how information should be organized, how users might navigate between related tasks, and how the overall interface could remain understandable as the product grows.',
    ],
  },
  {
    slug: 'floatmerchant',
    title: 'FloatMerchant',
    liveUrl: '#',
    media: [{ type: 'image', src: `${DIR}/case/floatmerchant-1.webp`, alt: 'FloatMerchant landing page' }],
    meta: {
      client: 'FloatMerchant',
      tools: ['Figma', 'Adobe Illustrator', 'FigJam', 'Claude', 'Google Chat'],
      year: 2026,
      sector: ['Fintech', 'Financial Technology', 'SME Lending'],
      role: ['Product Design', 'Brand Identity', 'Motion Design', 'Illustration', 'Development'],
    },
    bigQuestion: [
      'How might we simplify access to business financing while helping SMEs understand their financial health, manage transactions, and make better business decisions through a seamless digital experience?',
    ],
    description: [
      'FloatMerchant is a credit assets technology company that simplifies access to working capital for small and medium-sized enterprises (SMEs), while enabling financial institutions to grow their credit assets and manage lending risks. The platform bridges the gap between business operations, financial visibility, and accessible credit.',
    ],
    objective: [
      "Designed FloatMerchant's end-to-end product experience, translating complex financial workflows into intuitive, user-centered interfaces. My work covered business onboarding, credit application and approval journeys, credit-limit management, and business transaction management, including invoices, payments, inflows, and outflows. I also developed product flows, dashboard experiences, empty states, and supporting communication touchpoints to guide users through key actions. The goal was to reduce friction, improve financial visibility, and help SMEs access and manage business financing with greater clarity and confidence.",
    ],
  },
]

const SME_QUESTION =
  'How might we help small and medium-sized businesses understand their financial health, make better business decisions, and access relevant financing opportunities using the data they already generate?'

CASE_STUDIES.push(
  {
    slug: 'oneway',
    title: 'Oneway',
    liveUrl: '#',
    media: [],
    meta: {
      client: 'Oneway',
      tools: ['Figma', 'Adobe Illustrator', 'Clickup'],
      year: 2024,
      sector: ['Web App', 'Mobile App', 'POS', 'Fintech', 'Inventory Management'],
      role: ['Product Design', 'Brand Identity', 'Illustration', 'Motion Design'],
    },
    bigQuestion: [SME_QUESTION],
    description: [
      'Oneway is a revolutionary mobile application designed to streamline and simplify the checkout process in supermarkets, facilitate delivery services, enable bill payments, and provide transportation options. This case study delves into the UI/UX design process, highlighting the research, ideation, design, testing, and final implementation phases to create an intuitive and user-friendly application.',
    ],
    objective: [
      'Modern consumers demand efficiency, convenience, and speed in their daily transactions. Traditional checkout processes in supermarkets can be time-consuming and frustrating. Additionally, managing multiple apps for deliveries, bill payments, and transportation can be cumbersome. Oneway aims to integrate these functionalities into a single app, providing a seamless experience for users. Features are: Scan-to-Pay (users can scan items in the supermarket and pay directly through the app, bypassing checkout lines), Delivery Services (seamless integration with various delivery providers, allowing users to schedule and track deliveries), Bill Payments (secure and efficient bill payment options for utilities, subscriptions, and more) and Transportation (integrated booking and payment for rides and public transportation).',
    ],
  },
  {
    slug: 'dartx',
    title: 'DartX',
    liveUrl: 'soon',
    media: [{ type: 'image', src: `${DIR}/dartx.webp`, alt: 'DartX send funds screen' }],
    meta: {
      client: 'Minerva',
      tools: ['Figma', 'Adobe Illustrator'],
      year: 2026,
      sector: ['Fintech', 'Digital Banking'],
      role: ['Product Design', 'Brand Identity', 'Illustration'],
    },
    bigQuestion: [
      'How might we simplify everyday banking and business financial operations while making digital financial services more accessible, secure, and convenient for Nigerians & Africans at large?',
    ],
    description: [
      'DartX is a digital banking platform designed to help individuals and businesses manage their finances, make payments, access banking services, and streamline daily financial operations through an intuitive digital experience.',
    ],
    objective: [
      'Initiated & designed the end-to-end digital banking experience across web and mobile platforms, translating business requirements into intuitive user flows, wireframes, and high-fidelity interfaces. My work covered digital onboarding, account management, payments, business banking tools, account upgrades, and self-service features. The goal was to reduce friction in everyday banking, improve usability, and create a scalable, user-centered experience that supports both personal and business financial needs.',
    ],
  },
  {
    slug: 'networkx-ai',
    title: 'NetworkX.AI',
    liveUrl: '#',
    media: [{ type: 'image', src: `${DIR}/networkx.webp`, alt: 'NetworkX.AI affiliate program screen' }],
    meta: {
      client: 'Prudiva',
      tools: ['Figma', 'Adobe Illustrator', 'Claude'],
      year: 2026,
      sector: ['Fintech', 'Artificial Intelligence', 'SME Financial Management', 'Business Intelligence'],
      role: ['Product Design', 'Brand Identity', 'Motion Design', 'Illustration'],
    },
    bigQuestion: [SME_QUESTION],
    description: CASE_STUDIES[1].description,
    objective: CASE_STUDIES[1].objective,
  },
  {
    slug: 'ibx-exchange',
    title: 'Ibx Exchange',
    liveUrl: '#',
    media: [],
    meta: {
      client: 'Ibx Exchange',
      tools: ['Figma', 'Adobe Illustrator', 'Clickup'],
      year: 2023,
      sector: ['Web App', 'Mobile App', 'Fintech', 'Crypto Trading', 'Loan Management'],
      role: ['Product Design', 'Brand Identity', 'Motion Design', 'Illustration', 'Social Media'],
    },
    bigQuestion: [SME_QUESTION],
    description: [
      'IBX is a fiat exchange trading platform aimed at providing users with a seamless and secure experience for trading various fiat currencies. This case study explores the design process, challenges, and solutions implemented to create an intuitive and efficient user interface (UI) and user experience (UX) for IBX.',
    ],
    objective: [
      'Started by creating a sitemap to outline the structure of the application. The key sections included Dashboard (a personalized dashboard displaying account summary, recent transactions, and market trends), Trading Interface (an intuitive trading interface with real-time charts, order book, and trade history), Wallet Management (secure wallet for managing multiple fiat currencies, with options to deposit, withdraw, and transfer funds), Transaction History (detailed transaction history with filtering and search capabilities), Security Features (two-factor authentication, encryption, and secure login processes), Customer Support (accessible support through live chat, email, and a comprehensive FAQ section).',
      'The UI/UX design of IBX successfully addressed the needs and preferences of its target users, providing a secure, user-friendly, and efficient platform for fiat exchange trading. Through thorough research, iterative design, and user testing, IBX achieved a balance between functionality and simplicity, ensuring a positive user experience.',
    ],
  },
)

export function findCaseStudy(slug: string | undefined) {
  return CASE_STUDIES.find((c) => c.slug === slug)
}
