import Asterisk from './Asterisk'
import ExperienceEntry from './ExperienceEntry'
import { EDUCATION, WORK, type ExperienceEntry as Entry } from '../data/experience'

function Column({ label, entries }: { label: string; entries: Entry[] }) {
  return (
    <div>
      <p className="flex items-center gap-1.5 text-sm text-neutral-400">
        <Asterisk className="h-3 w-3 bg-neutral-500" />
        {label}
      </p>
      <ul className="mt-6 flex flex-col gap-7">
        {entries.map((entry) => (
          <ExperienceEntry key={entry.name} entry={entry} theme="dark" />
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
