import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { isProjectLocked } from '../data/projects'
import { isCorrectCode } from '../lib/projectLock'

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function LockedProject() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [wrong, setWrong] = useState(false)

  if (!isProjectLocked(slug)) return <Navigate to="/projects" replace />

  function submit(e: FormEvent) {
    e.preventDefault()
    if (isCorrectCode(code)) navigate(`/projects/${slug}`, { replace: true, state: { unlocked: true } })
    else setWrong(true)
  }

  return (
    <section className="relative flex min-h-svh flex-col items-center overflow-hidden bg-black px-6 pt-[36svh] pb-16 text-center font-nunito-sans">
      <video
        src="/images/locked-bg.mp4"
        poster="/images/locked-bg-poster.webp"
        autoPlay={!prefersReducedMotion}
        loop
        muted
        playsInline
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover [image-rendering:pixelated]"
      />
      <div aria-hidden className="absolute inset-0 bg-black/45" />

      <div className="relative flex w-full flex-col items-center">
        <h1 className="font-moonwalk text-3xl leading-tight text-white md:text-[2.75rem]">
          YOU HAVE ARRIVED AT <br className="hidden md:block" />
          THE UNKNOWN
        </h1>
        <p className="mt-5 text-sm text-white/60">Kindly enter the secret code given to you to access this page</p>

        <form
          onSubmit={submit}
          className="mt-5 flex w-full max-w-[28.5rem] items-center rounded-full border border-white/25 bg-white/25 p-1 backdrop-blur-md focus-within:border-white/70"
        >
          <input
            type="password"
            value={code}
            onChange={(e) => {
              setCode(e.target.value)
              setWrong(false)
            }}
            placeholder="Enter my password"
            aria-label="Secret code"
            aria-invalid={wrong}
            aria-describedby={wrong ? 'locked-error' : undefined}
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/90"
          />
          <button
            type="submit"
            className="rounded-full bg-lime px-7 py-3 text-sm font-semibold text-black outline-offset-2 transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-white"
          >
            Open
          </button>
        </form>

        {wrong && (
          <p id="locked-error" role="alert" className="mt-4 text-sm font-semibold text-lime">
            That code isn't right. Check it and try again.
          </p>
        )}
      </div>
    </section>
  )
}
