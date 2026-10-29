export type CaseMedia =
  | { type: 'image'; src: string; alt: string }
  | { type: 'video'; src: string; poster: string; alt: string }

export type CaseStudy = {
  slug: string
  title: string
  liveUrl?: string | 'soon'
  stores?: { apple: string; play: string }
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
      { type: 'image', src: `${DIR}/case/prudiva-3.webp`, alt: 'Prudiva website hero' },
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
    media: [{ type: 'image', src: `${DIR}/case/floatmerchant-1.webp`, alt: 'FloatMerchant landing page' }, { type: 'image', src: `${DIR}/case/floatmerchant-2.webp`, alt: 'FloatMerchant financing products' }, { type: 'image', src: `${DIR}/case/floatmerchant-3.webp`, alt: 'FloatMerchant illustration set' }],
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
    media: [{ type: 'image', src: `${DIR}/oneway.webp`, alt: 'Oneway campaign posters' }],
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
    media: [{ type: 'image', src: `${DIR}/ibx.webp`, alt: 'Ibx wallet app on a phone' }],
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

CASE_STUDIES.push(
  {
    slug: 'luvira',
    title: 'Luvira',
    liveUrl: 'soon',
    media: [{ type: 'image', src: `${DIR}/luvira.webp`, alt: 'Luvira app screens' }, { type: 'image', src: `${DIR}/case/luvira-2.webp`, alt: 'Luvira memory and avatar screens' }],
    meta: {
      client: 'Luvira',
      tools: ['Figma', 'FigJam', 'Adobe Illustrator', 'Slack'],
      year: 2026,
      sector: ['AI', 'Productivity & Personal Development'],
      role: ['Product Design', 'Illustration'],
    },
    bigQuestion: [
      'How might we help overwhelmed, high-achieving individuals turn scattered thoughts, mental clutter, and voice notes into clear insights and actionable next steps?',
    ],
    description: [
      'Luvira is a voice-first AI productivity platform designed to help users capture their thoughts, find clarity, and turn ideas into meaningful action. It transforms unstructured thoughts into actionable Insight Cards, creating a seamless connection between cognition, productivity, and personal regulation.',
    ],
    objective: [
      'Designed the core product experience around a structured loop: Capture → Insight → Review → Memory → Recall → Export. My contribution focused on simplifying thought capture, translating AI-generated insights into practical next steps, and designing user-controlled workflows for reviewing, saving, and exporting approved actions to Google Calendar. The goal was to reduce cognitive overload, support intentional productivity, and help users move from mental clutter to clarity without losing control of their information.',
    ],
  },
  {
    slug: 'team1-africa',
    title: 'Team 1 Africa',
    liveUrl: '#',
    media: [{ type: 'image', src: `${DIR}/team1.webp`, alt: 'Avalanche x Team1 logo' }],
    meta: {
      client: 'Team 1 Africa',
      tools: ['Figma', 'Adobe Illustrator', 'FigJam'],
      year: 2026,
      sector: ['Web 3', 'Blockchain', 'Education & Community Building'],
      role: ['Product Design', 'Illustration'],
    },
    bigQuestion: [
      'How might we create accessible and engaging digital experiences that empower African builders, creators, and educators to explore, learn, and contribute to the Avalanche blockchain ecosystem?',
    ],
    description: [
      "Team1 Africa is a grassroots movement dedicated to growing Africa's Web3 ecosystem through education, hands-on events, global partnerships, and community collaboration.",
    ],
    objective: [
      "I contributed to designing user-centered digital experiences that communicate Team1 Africa's mission, improve access to ecosystem opportunities, and support community engagement. My focus was on translating complex Web3 concepts into clear, intuitive interfaces that help African talent connect, learn, and build within the Avalanche ecosystem.",
    ],
  },
  {
    slug: 'nsk-ai',
    title: 'NSK.AI',
    liveUrl: '#',
    media: [{ type: 'image', src: `${DIR}/nskai.webp`, alt: 'NSK.AI website' }],
    meta: {
      client: 'NSK.AI',
      tools: ['Figma', 'Adobe Illustrator', 'Claude'],
      year: 2026,
      sector: ['NGO', 'Artificial Intelligence', 'Education & Community Building'],
      role: ['Product Design', 'Brand Identity', 'Motion Design', 'Illustration'],
    },
    bigQuestion: [
      'How might we make artificial intelligence more accessible, practical, and impactful for African communities through learning, collaboration, and real-world projects?',
    ],
    description: [
      'NSK.ai is a registered nonprofit building an open, practical AI community across Africa through workshops, research talks, and hands-on projects designed to create meaningful impact.',
    ],
    objective: [
      "I contributed to translating NSK.ai's mission into a clear, engaging digital experience that communicates its vision, showcases its community-driven initiatives, and encourages people to explore AI, participate in learning opportunities, and contribute to impactful projects.",
    ],
  },
  {
    slug: 'spherre',
    title: 'Spherre',
    liveUrl: '#',
    media: [{ type: 'image', src: `${DIR}/spherre.webp`, alt: 'Spherre website' }],
    meta: {
      client: 'Spherre',
      tools: ['Figma', 'Adobe Illustrator'],
      year: 2025,
      sector: ['Web 3', 'Blockchain', 'Decentralized Finance (DeFi)'],
      role: ['Product Design', 'Brand Identity', 'Illustration'],
    },
    bigQuestion: [
      'How might we make multisignature wallet management secure and accessible, enabling individuals, teams, and organizations to manage digital assets and approve transactions confidently?',
    ],
    description: [
      'Spherre is a secure, scalable, and user-friendly multisig solution built on Starknet, designed to simplify collaborative wallet management and provide greater control over digital assets.',
    ],
    objective: [
      'I contributed to designing an intuitive product experience that simplifies multisig wallet interactions, clarifies transaction approval workflows, and supports collaborative asset management. My focus was on creating clear user flows and accessible interfaces that balance blockchain security, usability, and transparency.',
    ],
  },
)

const oneway = CASE_STUDIES.find((c) => c.slug === 'oneway')
if (oneway) oneway.meta.client = 'Vivvaa Inc'

const img = (file: string, alt: string): CaseMedia => ({ type: 'image', src: `${DIR}/${file}`, alt })

CASE_STUDIES.push(
  {
    slug: 'attend',
    title: 'Attend',
    liveUrl: '#',
    media: [img('attend.webp', 'Attend event page')],
    meta: {
      client: 'Attend',
      tools: ['Figma', 'FigJam'],
      year: 2026,
      sector: ['Web App', 'e - ticketing', 'Events'],
      role: ['Product Design', 'Brand Identity', 'UX Research'],
    },
    bigQuestion: [SME_QUESTION],
    description: [
      'Attend is a web application designed to simplify the process of event ticketing for both event organizers and attendees. With a user-friendly interface and intuitive features, Attend aims to provide a seamless experience from ticket purchase to event check-in. By focusing on the needs of both event attendees and organizers, we created a platform that not only meets their requirements but also provides a seamless and enjoyable experience. The iterative design process, combined with continuous user feedback, ensured that Attend remained relevant and valuable in the competitive event ticketing market.',
    ],
    objective: [
      'Started by creating a sitemap to outline the structure of the application. The key sections included Homepage (highlighting featured events and easy navigation to different event categories), Event listings (a searchable and filterable list of events), Event details (detailed pages for each event with information, ticket options, and purchase buttons), User dashboard (for attendees to manage their tickets and profile), Organizer dashboard (for event creators to manage their events, track sales, and access analytics).',
    ],
  },
  {
    slug: 'hey-chat',
    title: 'Hey Chat!',
    media: [img('heychat.webp', 'Hey Chat! app on two phones')],
    meta: {
      client: 'Me (Personal)',
      tools: ['Figma'],
      year: 2026,
      sector: ['Mobile App', 'Social Media'],
      role: ['Product Design', 'Brand Identity'],
    },
    bigQuestion: [],
    description: [
      '“Hey Chat!” is a new online site that brings people together in a chat room. The site has expectations to bring many users together and pair random chat users together in a one-on-one chat. You never know who you may find, and so, the chat system can truly broaden your horizons about Internet users all about bringing people with different ideas together to socialize. Hey Chat! can bring you a new experience with someone new.',
    ],
    objective: [
      'Like the landing page, the mobile design is quite simplistic. It allows the user to easily view not only their chats, but also their recommended groups. It also allows them to chat, call, video call, post and update their life style as stories, also to view any saved media they have added. At the top we have added in 3 easily accessible links to enable them to change their settings and profile, whilst giving them easy access to their chats.',
    ],
  },
  {
    slug: 'chillr',
    title: 'Chillr',
    liveUrl: '#',
    media: [img('chillr.webp', 'Chillr onboarding screen')],
    meta: {
      client: 'Vivvaa Inc',
      tools: ['Figma', 'Adobe Illustrator', 'FigJam'],
      year: 2025,
      sector: ['Social Networking', 'Dating & Community'],
      role: ['Product Design', 'Brand Identity', 'Illustration'],
    },
    bigQuestion: [
      'How might we help Africans in the diaspora build meaningful romantic, social, and cultural connections in a space that feels familiar, inclusive, and authentically African?',
    ],
    description: [
      'Chillr is a diaspora social hub designed for Africans abroad to find love, build friendships, and connect with people who share their culture, interests, and experiences. From Afrobeats to jollof debates and Sunday owambe celebrations, Chillr makes belonging feel closer to home.',
    ],
    objective: [
      'I contributed to shaping the product experience by designing intuitive user flows and engaging interfaces that support discovery, connection, and community building. My focus was on creating a seamless, culturally relevant experience that makes it easier for users to meet like-minded people, develop meaningful relationships, and feel connected to their roots, wherever they are.',
    ],
  },
  {
    slug: 'tokengiver',
    title: 'TokenGiver',
    liveUrl: '#',
    media: [img('tokengiver.webp', 'TokenGiver campaign setup screen')],
    meta: {
      client: 'TokenGiver',
      tools: ['Figma', 'Adobe Illustrator', 'FigJam'],
      year: 2025,
      sector: ['Web 3', 'Blockchain', 'NFT Fundraising', 'Decentralized Finance'],
      role: ['Product Design', 'Illustration'],
    },
    bigQuestion: [
      'How might we make blockchain-powered fundraising more transparent, secure, and accessible while building donor confidence and ensuring every contribution is traceable?',
    ],
    description: [
      'TokenGiver is a Web3 fundraising platform that combines Non-Fungible Tokens (NFTs) and Token Bound Accounts (TBAs) to create a transparent, secure, and traceable donation experience.',
    ],
    objective: [
      "I contributed to translating TokenGiver's vision into a user-centered digital experience, designing intuitive interfaces and user flows that simplify blockchain-based fundraising interactions. My focus was on improving usability, communicating complex Web3 concepts clearly, and creating a cohesive experience that supports transparency, donor trust, and accountability throughout the fundraising journey.",
    ],
  },
  {
    slug: 'phind',
    title: 'PHIND',
    liveUrl: '#',
    media: [img('phind.webp', 'PHIND opportunities dashboard')],
    meta: {
      client: 'PHIND',
      tools: ['Figma', 'Adobe Illustrator', 'FigJam'],
      year: 2025,
      sector: ['Construction Technology', 'Workforce Marketplace'],
      role: ['Product Design', 'Illustration'],
    },
    bigQuestion: [
      'How might we simplify the process of discovering, hiring, and connecting with qualified construction professionals through an accessible, location-aware digital marketplace?',
    ],
    description: [
      'PHIND is a human- and AI-powered workforce platform connecting construction businesses with skilled professionals across the United States, helping bridge the gap between talent and employment opportunities.',
    ],
    objective: [
      'I contributed to translating the product vision into intuitive user flows and user-centered interface designs, focusing on simplifying talent discovery, improving navigation, and creating a seamless experience for connecting construction professionals with businesses. The goal was to make hiring and workforce discovery more accessible, efficient, and straightforward.',
    ],
  },
  {
    slug: 'rider-app',
    title: 'Rider App',
    liveUrl: '#',
    media: [img('rider.webp', 'Oneway Rider App screens')],
    meta: {
      client: 'Vivvaa Inc',
      tools: ['Figma', 'Adobe Illustrator', 'FigJam'],
      year: 2025,
      sector: ['Retail Technology', 'Inventory Management', 'On-Demand Delivery'],
      role: ['Product Design', 'Brand Identity', 'Motion Design', 'Illustration'],
    },
    bigQuestion: [
      "How might we extend Oneway's self-checkout and inventory platform with a seamless delivery experience that gives riders flexibility, control, and efficiency?",
    ],
    description: [
      "The Oneway Rider App expands Oneway's ecosystem by connecting customers and stores with delivery riders. It enables riders to manage their availability, select preferred stores or operating regions, discover available delivery orders, track deliveries, and review their delivery history.",
    ],
    objective: [
      'I contributed to designing the rider experience from the core user flows to the mobile interface, prioritizing simplicity, flexibility, and operational efficiency. I structured key features including availability management, store and region selection, order discovery, delivery status updates, navigation, earnings, and delivery history to help riders manage and complete deliveries with ease.',
    ],
  },
  {
    slug: 'helpmee',
    title: 'Helpmee',
    stores: { apple: '#', play: '#' },
    media: [img('helpmee.webp', 'Helpmee app')],
    meta: {
      client: 'Helpmee',
      tools: ['Figma', 'Adobe Illustrator'],
      year: 2026,
      sector: ['Mobile App', 'Fintech', 'Assistant'],
      role: ['Product Design', 'Brand Identity', 'Motion Design', 'Illustration'],
    },
    bigQuestion: [
      'Before diving into the design process, we conducted thorough market research and user interviews to understand the needs and pain points of our target audience. We found that many users struggle with managing their daily services efficiently due to the lack of a unified platform. They also expressed concerns about security and ease of use when it comes to online transactions.',
    ],
    description: [
      'Helpmee is a mobile application designed to simplify daily services such as bills payment, airtime subscriptions, online store creation, and online transactions. The app aims to provide a seamless user experience with a focus on convenience, security, and user-friendly interface.',
    ],
    objective: [
      "We started the design process by creating wireframes to visualize the app's structure and layout. We focused on keeping the interface clean and uncluttered, with easy access to key features such as bills payment, airtime subscriptions, and online store management. Helpmee is designed to simplify daily services and provide users with a convenient and secure platform for managing their tasks. With its user-friendly interface and robust features, Helpmee aims to become the go-to app for anyone looking to streamline their daily services.",
    ],
  },
)

export function findCaseStudy(slug: string | undefined) {
  return CASE_STUDIES.find((c) => c.slug === slug)
}
