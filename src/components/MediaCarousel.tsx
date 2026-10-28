import { useState } from 'react'
import type { CaseMedia } from '../data/caseStudies'

const SLIDE_MS = 5000

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Arrow({ dir, onClick }: { dir: 'prev' | 'next'; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={dir === 'prev' ? 'Previous slide' : 'Next slide'}
      onClick={onClick}
      className={`absolute top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-300/80 text-neutral-600 backdrop-blur transition-colors hover:bg-neutral-400/80 ${
        dir === 'prev' ? 'left-3 md:left-4' : 'right-3 md:right-4'
      }`}
    >
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d={dir === 'prev' ? 'M10 3 5 8l5 5' : 'M6 3l5 5-5 5'} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

export default function MediaCarousel({ media }: { media: CaseMedia[] }) {
  const [index, setIndex] = useState(0)
  const [cycle, setCycle] = useState(0)
  const [paused, setPaused] = useState(prefersReducedMotion)
  const count = media.length
  const multiple = count > 1

  function go(next: number) {
    setIndex(((next % count) + count) % count)
    setCycle((c) => c + 1)
  }

  if (count === 0) {
    return (
      <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 text-sm text-neutral-400">
        Images coming soon
      </div>
    )
  }

  return (
    <div>
      <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
        {media.map((m, i) => (
          <div
            key={m.src}
            aria-hidden={i !== index}
            className={`absolute inset-0 flex items-center justify-center p-6 transition-opacity duration-700 md:p-10 ${
              i === index ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            {m.type === 'video' ? (
              <video
                src={m.src}
                poster={m.poster}
                autoPlay={!prefersReducedMotion}
                loop
                muted
                playsInline
                aria-label={m.alt}
                className="h-full w-full bg-black object-cover"
              />
            ) : (
              <img src={m.src} alt={m.alt} className="h-full w-full object-contain" />
            )}
          </div>
        ))}
        {multiple && (
          <>
            <Arrow dir="prev" onClick={() => go(index - 1)} />
            <Arrow dir="next" onClick={() => go(index + 1)} />
          </>
        )}
      </div>

      {multiple && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            {media.map((m, i) =>
              i === index ? (
                <span key={`${m.src}-${cycle}`} className="h-0.5 w-11 overflow-hidden rounded-full bg-neutral-200">
                  <span
                    className="animate-progress block h-full bg-black"
                    style={{ animationDuration: `${SLIDE_MS}ms`, animationPlayState: paused ? 'paused' : 'running' }}
                    onAnimationEnd={() => go(index + 1)}
                  />
                </span>
              ) : (
                <button
                  key={m.src}
                  type="button"
                  aria-label={`Show slide ${i + 1}`}
                  onClick={() => go(i)}
                  className="h-1 w-1 rounded-full bg-neutral-300 transition-colors hover:bg-neutral-500"
                />
              ),
            )}
          </div>
          <button
            type="button"
            aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
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
        </div>
      )}
    </div>
  )
}
