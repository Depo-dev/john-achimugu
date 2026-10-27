import { useState } from 'react'
import Asterisk from './Asterisk'

type Testimonial = {
  quote: string
  name: string
  handle: string
  role: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I've seen some decent designs in my time, but John work on Helpmee was borderline genius. I mean, who needs endless revisions when someone actually understands what they're doing? His designs were so good, I almost forgot I was working with a human. In all seriousness, John exceptional communication skills, attention to detail, and mastery of mobile design principles made this project a dream. No unnecessary headaches or technical gymnastics required. Looking forward to the next project where John can once again make me look like a development superstar.",
    name: 'Godsfavour Lewechi',
    handle: '@GodsfavourLewechi',
    role: 'Mobile Software Engineer at Dayout',
  },
]

const SLIDE_MS = 7000

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [cycle, setCycle] = useState(0)
  const [paused, setPaused] = useState(false)
  const current = TESTIMONIALS[index]
  const count = TESTIMONIALS.length

  function go(next: number) {
    setIndex(((next % count) + count) % count)
    setCycle((c) => c + 1)
  }

  return (
    <section id="testimonials" className="site-container bg-white font-epilogue">
      <div className="border-b border-neutral-200 px-6 pt-10 pb-8 md:px-10">
        <p className="flex items-center gap-1.5 text-sm text-neutral-500">
          <Asterisk className="h-3 w-3 bg-neutral-400" />
          testimonials from clients
        </p>
        <h2 className="mt-2 max-w-md font-moonwalk text-3xl leading-tight text-black md:text-4xl">
          MY MISSIONS SPEAKS FOR ITSELF
        </h2>
      </div>

      <div className="flex gap-4 border-b border-neutral-200 px-6 py-16 md:gap-5 md:px-10">
        <span
          aria-hidden
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M10 6c-3.9 1.2-6.5 4.4-6.5 8.4 0 2.6 1.5 4.1 3.4 4.1 1.8 0 3.1-1.3 3.1-3 0-1.8-1.3-2.9-2.9-2.9-.3 0-.6 0-.8.1.4-2 1.9-3.7 4.3-4.7L10 6zm9.5 0c-3.9 1.2-6.5 4.4-6.5 8.4 0 2.6 1.5 4.1 3.4 4.1 1.8 0 3.1-1.3 3.1-3 0-1.8-1.3-2.9-2.9-2.9-.3 0-.6 0-.8.1.4-2 1.9-3.7 4.3-4.7L19.5 6z" />
          </svg>
        </span>

        <div className="min-w-0 flex-1 pt-8">
          <figure key={cycle} className="animate-fade-in">
            <blockquote className="text-sm leading-7 text-neutral-800 md:text-[0.9375rem]">
              {current.quote}
            </blockquote>
            <figcaption className="mt-6">
              <p className="font-medium text-black">{current.name}</p>
              <p className="mt-0.5 text-xs text-neutral-400">{current.handle}</p>
              <p className="mt-1 text-xs font-medium text-black">{current.role}</p>
            </figcaption>
          </figure>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((t, i) =>
                i === index ? (
                  <span key={`${t.handle}-${cycle}`} className="h-0.5 w-11 overflow-hidden rounded-full bg-neutral-200">
                    <span
                      className="animate-progress block h-full bg-black"
                      style={{
                        animationDuration: `${SLIDE_MS}ms`,
                        animationPlayState: paused ? 'paused' : 'running',
                      }}
                      onAnimationEnd={() => go(index + 1)}
                    />
                  </span>
                ) : (
                  <button
                    key={t.handle + i}
                    type="button"
                    aria-label={`Show testimonial ${i + 1}`}
                    onClick={() => go(i)}
                    className="h-1 w-1 rounded-full bg-neutral-300 transition-colors hover:bg-neutral-500"
                  />
                ),
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => go(index - 1)}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100 text-black transition-colors hover:bg-neutral-200"
              >
                <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" fill="currentColor" aria-hidden>
                  <rect x="1" y="1.5" width="1.4" height="7" rx="0.5" />
                  <path d="M9 1.5v7L3.2 5z" />
                </svg>
              </button>
              <button
                type="button"
                aria-label={paused ? 'Play testimonials' : 'Pause testimonials'}
                onClick={() => setPaused((p) => !p)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white"
              >
                {paused ? (
                  <svg viewBox="0 0 10 10" className="ml-0.5 h-2.5 w-2.5" fill="currentColor" aria-hidden>
                    <path d="M2 1l7 4-7 4z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" fill="currentColor" aria-hidden>
                    <rect x="2" y="1" width="2" height="8" rx="0.5" />
                    <rect x="6" y="1" width="2" height="8" rx="0.5" />
                  </svg>
                )}
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => go(index + 1)}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100 text-black transition-colors hover:bg-neutral-200"
              >
                <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" fill="currentColor" aria-hidden>
                  <path d="M1 1.5v7L6.8 5z" />
                  <rect x="7.6" y="1.5" width="1.4" height="7" rx="0.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
