import type { ExperienceEntry as Entry } from '../data/experience'

const THEMES = {
  dark: { name: 'text-white', period: 'text-neutral-400', role: 'text-neutral-400', divider: 'text-neutral-600', location: 'text-lime' },
  light: { name: 'text-black', period: 'text-neutral-500', role: 'text-neutral-500', divider: 'text-neutral-300', location: 'text-neutral-400' },
}

export default function ExperienceEntry({ entry, theme }: { entry: Entry; theme: 'dark' | 'light' }) {
  const t = THEMES[theme]
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
          <h4 className={`font-semibold ${t.name}`}>{entry.name}</h4>
          <span className={`shrink-0 text-sm ${t.period}`}>{entry.period}</span>
        </div>
        <p className={`mt-1.5 text-xs ${t.role}`}>
          {entry.role}
          {entry.location && (
            <>
              <span className={`mx-1.5 ${t.divider}`}>|</span>
              <span className={t.location}>{entry.location}</span>
            </>
          )}
        </p>
      </div>
    </li>
  )
}
