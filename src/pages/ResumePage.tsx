import Asterisk from '../components/Asterisk'
import Contact from '../components/Contact'
import { useLandOnSection } from '../lib/navContext'

const DIR = '/images/resume'

const RESUMES = [
  { title: 'Product Design Resume', icon: `${DIR}/figma.webp`, iconClass: 'h-32', file: '#' },
  { title: 'UI/UX Design Resume', icon: `${DIR}/heart.webp`, iconClass: 'h-36', file: '#' },
  { title: 'Brand Identity Resume', icon: `${DIR}/shape.webp`, iconClass: 'h-32', file: '#' },
]

const UPDATED = '20th Nov, 2026'

export default function ResumePage() {
  useLandOnSection()

  return (
    <div className="bg-black font-epilogue">
      <section className="site-container border-b border-neutral-800 px-6 pt-36 pb-16 md:px-10">
        <h1 className="max-w-3xl font-moonwalk text-3xl leading-tight text-white md:text-5xl md:leading-tight">
          A LITTLE MORE ABOUT THE MIND BEHIND THE PIXELS.
        </h1>
      </section>

      <section className="site-container border-b border-neutral-800 p-4 md:p-5">
        <div className="relative overflow-hidden">
          <img src={`${DIR}/mat.webp`} alt="" aria-hidden width={2400} height={751} className="h-auto w-full" />
          <img
            src={`${DIR}/collage.webp`}
            alt="Sticker collage around a photo of John"
            width={2400}
            height={857}
            className="absolute inset-x-[2%] top-1/2 h-auto w-[96%] -translate-y-1/2"
          />
        </div>
      </section>

      <section className="site-container border-b border-neutral-800 px-6 py-8 md:px-10">
        <p className="flex items-center gap-2 text-sm tracking-wide text-neutral-400">
          <Asterisk className="h-3.5 w-3.5 bg-neutral-500" />
          resume documents
        </p>
        <h2 className="mt-2 font-moonwalk text-3xl text-white md:text-4xl">CHOOSE YOUR MISSION FILE.</h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed tracking-wide text-neutral-400">
          A closer look at my experience, design process, and the value I can bring to your team.
        </p>
      </section>

      <section className="site-container grid border-b border-neutral-800 md:grid-cols-3">
        {RESUMES.map((r) => (
          <article
            key={r.title}
            className="flex flex-col items-center border-neutral-800 px-6 py-20 text-center not-last:border-b md:not-last:border-r md:not-last:border-b-0"
          >
            <div className="flex h-40 items-center justify-center">
              <img src={r.icon} alt="" aria-hidden className={`${r.iconClass} w-auto`} />
            </div>
            <h3 className="mt-10 text-lg tracking-wide text-white">{r.title}</h3>
            <p className="mt-3 text-sm tracking-wide text-neutral-400">
              Last Updated: <span className="ml-1">{UPDATED}</span>
            </p>
            <a
              href={r.file}
              download
              className="mt-8 flex items-center gap-2 rounded-full bg-lime px-4 py-1.5 text-sm text-black transition-opacity hover:opacity-80"
            >
              <img src={`${DIR}/download.svg`} alt="" aria-hidden className="h-4 w-4" />
              Download
            </a>
          </article>
        ))}
      </section>

      <Contact />
    </div>
  )
}
