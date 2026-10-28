import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Contact from '../components/Contact'
import MediaCarousel from '../components/MediaCarousel'
import { findCaseStudy } from '../data/caseStudies'
import { useLandOnSection } from '../lib/navContext'

function MetaColumn({ label, items }: { label: string; items: (string | number)[] }) {
  return (
    <div>
      <h3 className="font-semibold text-black">{label}</h3>
      <ul className="mt-3 space-y-1.5 text-sm tracking-wide text-neutral-500">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

function Story({ label, paragraphs }: { label: string; paragraphs: string[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_2fr] md:gap-10">
      <h2 className="font-semibold text-black">{label}</h2>
      <div className="space-y-5 text-sm leading-7 text-neutral-500 md:text-[0.9375rem]">
        {paragraphs.map((p) => (
          <p key={p.slice(0, 32)}>{p}</p>
        ))}
      </div>
    </div>
  )
}

export default function ProjectDetail() {
  useLandOnSection()
  const { slug } = useParams()
  const navigate = useNavigate()
  const study = findCaseStudy(slug)
  if (!study) return <Navigate to="/projects" replace />

  function goBack() {
    if (window.history.state?.idx > 0) navigate(-1)
    else navigate('/projects')
  }

  return (
    <div className="font-epilogue">
      <section className="site-container border-b border-neutral-200 px-6 pt-32 pb-10 md:px-10">
        <div className="flex justify-center">
          <button
            type="button"
            onClick={goBack}
            className="flex items-center gap-2 rounded-full bg-neutral-100 px-3.5 py-1.5 text-sm text-black transition-colors hover:bg-neutral-200"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M6 4 3 7l3 3M3 7h6.5a3.5 3.5 0 0 1 0 7H8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Go Back
          </button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-4xl font-semibold text-black md:text-5xl">{study.title}</h1>
          {study.liveUrl === 'soon' ? (
            <span className="flex items-center gap-2 rounded-full bg-neutral-100 px-3.5 py-1.5 text-sm text-neutral-400">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <rect x="3" y="7" width="10" height="7" rx="1.5" />
                <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
              </svg>
              Coming Soon
            </span>
          ) : (
            study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                  <circle cx="8" cy="8" r="6.5" />
                  <path d="M1.5 8h13M8 1.5c1.8 2 2.6 4.1 2.6 6.5S9.8 12.5 8 14.5M8 1.5C6.2 3.5 5.4 5.6 5.4 8s.8 4.5 2.6 6.5" />
                </svg>
                View Live Site
              </a>
            )
          )}
        </div>
      </section>

      <section className="site-container border-b border-neutral-200 px-6 pt-6 pb-12 md:px-10">
        <MediaCarousel media={study.media} />

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-[1fr_1.2fr_0.8fr_1.6fr_1fr]">
          <MetaColumn label="Client" items={[study.meta.client]} />
          <MetaColumn label="Tools" items={study.meta.tools} />
          <MetaColumn label="Year" items={[study.meta.year]} />
          <MetaColumn label="Sector" items={study.meta.sector} />
          <MetaColumn label="Role" items={study.meta.role} />
        </div>
      </section>

      <section className="site-container space-y-16 border-b border-neutral-200 px-6 py-16 md:px-10">
        <Story label="The Big Question" paragraphs={study.bigQuestion} />
        <Story label="Description" paragraphs={study.description} />
        <Story label="The Objective" paragraphs={study.objective} />
      </section>

      <Contact />
    </div>
  )
}
