import Asterisk from './Asterisk'

type Entry = {
  name: string
  logo: string
  role: string
  location?: string
  period: string
}

const EDUCATION: Entry[] = [
  {
    name: 'University Of Nigeria Nsukka',
    logo: 'unn.svg',
    role: 'MSc. Biochemistry',
    period: '2018 - 2024',
  },
]

const WORK: Entry[] = [
  { name: 'Prudiva', logo: 'prudiva.svg', role: 'Lead Product & Brand Designer', location: 'Lagos, Nigeria', period: '2026 - Present' },
  { name: 'FloatMerchant', logo: 'floatmerchant.svg', role: 'Lead Product & Brand Designer', location: 'Lagos, Nigeria', period: '2025 - Present' },
  { name: 'Luvira', logo: 'luvira.svg', role: 'Lead Product & Brand Designer', location: 'Virginia, United States', period: '2025 - 2026' },
  { name: 'Reset VR', logo: 'resetvr.svg', role: 'VR Designer', location: 'Virginia, United States', period: '2025 - 2026' },
  { name: 'DartX', logo: 'dartx.svg', role: 'Senior Product & Brand Designer', location: 'Lagos, Nigeria', period: '2025 - 2026' },
  { name: 'NetworkX.AI', logo: 'networkxai.png', role: 'Product Designer', location: 'Tennessee, United States', period: '2025 - 2025' },
  { name: 'Oneway', logo: 'oneway.svg', role: 'Lead UI/UX Designer', location: 'Lagos, Nigeria', period: '2024 - 2025' },
  { name: 'Ibx Exchange', logo: 'ibx.svg', role: 'Senior Product', location: 'Lagos, Nigeria', period: '2022 - 2025' },
  { name: 'Browsio', logo: 'browsio.svg', role: 'Volunteer UI/UX Designer', location: 'United Kingdom', period: '2022 - 2025' },
  { name: 'Ustacy', logo: 'ustacy.svg', role: 'Motion Designer', location: 'Lagos, Nigeria', period: '2022 - 2023' },
  { name: 'Genesys Learnable', logo: 'genesys.svg', role: 'Intern Product Designer', location: 'Enugu, Nigeria', period: '2022 - 2023' },
  { name: 'Nexbuy District', logo: 'nexbuy.svg', role: 'Intern UI/UX Designer', location: 'Enugu, Nigeria', period: '2020 - 2021' },
]

function EntryRow({ entry }: { entry: Entry }) {
  return (
    <li className="flex gap-3.5">
      <img
        src={`/images/${entry.logo}`}
        alt=""
        loading="lazy"
        className="h-11 w-11 shrink-0 rounded-lg object-contain"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-4">
          <h4 className="font-semibold text-white">{entry.name}</h4>
          <span className="shrink-0 text-sm text-neutral-400">{entry.period}</span>
        </div>
        <p className="mt-1.5 text-xs text-neutral-400">
          {entry.role}
          {entry.location && (
            <>
              <span className="mx-1.5 text-neutral-600">|</span>
              <span className="text-lime">{entry.location}</span>
            </>
          )}
        </p>
      </div>
    </li>
  )
}

function Column({ label, entries }: { label: string; entries: Entry[] }) {
  return (
    <div>
      <p className="flex items-center gap-1.5 text-sm text-neutral-400">
        <Asterisk className="h-3 w-3 bg-neutral-500" />
        {label}
      </p>
      <ul className="mt-6 flex flex-col gap-7">
        {entries.map((entry) => (
          <EntryRow key={entry.name} entry={entry} />
        ))}
      </ul>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="resume" className="font-epilogue">
      <div className="border-b border-neutral-800 px-6 pt-10 pb-8 md:px-10">
        <p className="flex items-center gap-1.5 text-sm text-neutral-400">
          <Asterisk className="h-3 w-3 bg-neutral-500" />
          Experience
        </p>
        <h2 className="mt-2 font-moonwalk text-3xl text-white md:text-4xl">MY EXPEDITIONS</h2>
        <p className="mt-3 text-sm text-neutral-400">
          My design journey hasn't been a walk in the park but with hard work & consistency I've
          come this far.
        </p>
      </div>

      <div className="grid gap-14 px-6 pt-10 pb-16 md:grid-cols-2 md:gap-10 md:px-10">
        <Column label="Education" entries={EDUCATION} />
        <Column label="Work Experience" entries={WORK} />
      </div>
    </section>
  )
}
