import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Asterisk from './Asterisk'
import { CATEGORIES, PROJECTS, type Project, type ProjectCategory } from '../data/projects'

type Filter = 'All' | ProjectCategory

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function ComingSoon() {
  return (
    <span className="flex items-center gap-1.5 text-neutral-400">
      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <rect x="3" y="7" width="10" height="7" rx="1.5" />
        <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
      </svg>
      Coming Soon
    </span>
  )
}

function ProjectMedia({ project }: { project: Project }) {
  if (project.video) {
    return (
      <video
        src={project.video.src}
        poster={project.video.poster}
        autoPlay={!prefersReducedMotion}
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={project.title}
        className="h-full w-full bg-black object-cover"
      />
    )
  }
  if (project.image) {
    return <img src={project.image} alt={project.title} loading="lazy" className="h-full w-full object-contain" />
  }
  return <div className="h-full w-full bg-gradient-to-br from-neutral-200 to-neutral-300" />
}

function ProjectCard({ project }: { project: Project }) {
  const caseStudyPath = project.caseStudyUrl?.startsWith('/') ? project.caseStudyUrl : undefined
  const media = (
    <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 p-5">
      <ProjectMedia project={project} />
    </div>
  )

  return (
    <article className="flex flex-col">
      {caseStudyPath ? (
        <Link
          to={caseStudyPath}
          aria-label={`${project.title} case study`}
          className="block transition-transform duration-300 hover:-translate-y-1"
        >
          {media}
        </Link>
      ) : (
        media
      )}

      <div className="mt-4 flex items-center gap-1.5">
        <Asterisk className="h-3.5 w-3.5 bg-black" />
        <h3 className="text-base font-semibold text-black">
          {caseStudyPath ? (
            <Link to={caseStudyPath} className="hover:underline">
              {project.title}
            </Link>
          ) : (
            project.title
          )}
        </h3>
      </div>

      <div className="mt-1 flex items-center justify-between text-xs text-neutral-500">
        <span>{project.tags.join(' • ')}</span>
        {project.year && <span>{project.year}</span>}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-neutral-500">{project.description}</p>

      <div className="mt-4 flex items-center justify-between text-xs">
        {project.caseStudyUrl === 'soon' ? (
          <ComingSoon />
        ) : project.caseStudyUrl ? (
          <Link
            to={project.caseStudyUrl}
            className="flex items-center gap-1.5 font-medium text-black transition-opacity hover:opacity-60"
          >
            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M1.5 8s2.4-4.5 6.5-4.5S14.5 8 14.5 8 12.1 12.5 8 12.5 1.5 8 1.5 8z" />
              <circle cx="8" cy="8" r="2" />
            </svg>
            View Case Study
          </Link>
        ) : (
          <span />
        )}
        {project.liveUrl === 'soon' ? (
          <ComingSoon />
        ) : project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-black transition-opacity hover:opacity-60"
          >
            View Live Project ↗
          </a>
        )}
      </div>
    </article>
  )
}

export default function ProjectGallery({ limit }: { limit?: number }) {
  const [filter, setFilter] = useState<Filter>('All')

  const counts = useMemo(() => {
    const map = { All: PROJECTS.length } as Record<Filter, number>
    for (const c of CATEGORIES) map[c] = PROJECTS.filter((p) => p.categories.includes(c)).length
    return map
  }, [])

  const visible = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.categories.includes(filter))
  const filters: Filter[] = ['All', ...CATEGORIES.filter((c) => counts[c] > 0)]

  return (
    <div className="site-container px-6 pt-8 pb-20 md:px-10">
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const active = f === filter
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                active ? 'bg-black text-white' : 'text-neutral-500 hover:bg-neutral-100'
              }`}
            >
              {f}
              <sup className="ml-0.5 text-[0.5625rem]">{counts[f]}</sup>
            </button>
          )
        })}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {(limit ? visible.slice(0, limit) : visible).map((project, i) => (
          <ProjectCard key={`${project.title}-${i}`} project={project} />
        ))}
      </div>

      {limit && visible.length > limit && (
        <div className="mt-14 flex justify-center">
          <Link
            to="/projects"
            className="flex items-center gap-3 rounded-full bg-neutral-100 px-6 py-3 text-base text-black transition-colors hover:bg-neutral-200"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              <path d="M5 13 13 5M6 5h7v7M4 17h12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            See More Projects
          </Link>
        </div>
      )}
    </div>
  )
}
