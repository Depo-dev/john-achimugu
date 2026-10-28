export type ExperienceEntry = {
  name: string
  logo: string
  role: string
  location?: string
  period: string
}

export const EDUCATION: ExperienceEntry[] = [
  {
    name: 'University Of Nigeria Nsukka',
    logo: 'unn.svg',
    role: 'MSc. Biochemistry',
    period: '2018 - 2024',
  },
]

export const WORK: ExperienceEntry[] = [
  { name: 'Prudiva', logo: 'prudiva.svg', role: 'Lead Product & Brand Designer', location: 'Lagos, Nigeria', period: '2026 - Present' },
  { name: 'FloatMerchant', logo: 'floatmerchant.svg', role: 'Lead Product & Brand Designer', location: 'Lagos, Nigeria', period: '2025 - Present' },
  { name: 'Luvira', logo: 'luvira.svg', role: 'Lead Product & Brand Designer', location: 'Virginia, United States', period: '2025 - 2026' },
  { name: 'Reset VR', logo: 'resetvr.svg', role: 'VR Designer', location: 'Virginia, United States', period: '2025 - 2026' },
  { name: 'DartX', logo: 'dartx.svg', role: 'Senior Product & Brand Designer', location: 'Lagos, Nigeria', period: '2025 - 2026' },
  { name: 'NetworkX.AI', logo: 'networkxai-logo.png', role: 'Product Designer', location: 'Tennessee, United States', period: '2025 - 2025' },
  { name: 'Oneway', logo: 'oneway.svg', role: 'Lead UI/UX Designer', location: 'Lagos, Nigeria', period: '2024 - 2025' },
  { name: 'Ibx Exchange', logo: 'ibx.svg', role: 'Senior Product', location: 'Lagos, Nigeria', period: '2022 - 2025' },
  { name: 'Browsio', logo: 'browsio.svg', role: 'Volunteer UI/UX Designer', location: 'United Kingdom', period: '2022 - 2025' },
  { name: 'Ustacy', logo: 'ustacy.svg', role: 'Motion Designer', location: 'Lagos, Nigeria', period: '2022 - 2023' },
  { name: 'Genesys Learnable', logo: 'genesys.svg', role: 'Intern Product Designer', location: 'Enugu, Nigeria', period: '2022 - 2023' },
  { name: 'Nexbuy District', logo: 'nexbuy.svg', role: 'Intern UI/UX Designer', location: 'Enugu, Nigeria', period: '2020 - 2021' },
]
