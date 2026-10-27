import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

const TARGET = 'JOHN : ACHIMUGU'
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const ROW_EM = 1.2
const STEP_DURATION = 0.12
const STAGGER = 0.3
const HOLD = 1.2

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

function buildReel(target: string, goesDown: boolean) {
  if (target === ' ' || target === ':') return [target]
  const steps = 8 + Math.floor(Math.random() * 4)
  const randoms = Array.from({ length: steps }, () => randomChar())
  return goesDown ? [target, ...randoms] : [...randoms, target]
}

type Props = {
  onComplete?: () => void
}

export default function Preloader({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const letterRefs = useRef<(HTMLDivElement | null)[]>([])
  const reels = useRef(TARGET.split('').map((char, i) => buildReel(char, i % 2 === 1)))

  useLayoutEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 0.9,
          delay: HOLD,
          ease: 'power4.inOut',
          onComplete,
        })
      },
    })

    reels.current.forEach((reel, i) => {
      const el = letterRefs.current[i]
      if (!el || reel.length === 1) return

      const steps = reel.length - 1
      const goesDown = i % 2 === 1

      gsap.set(el, { y: goesDown ? `-${steps * ROW_EM}em` : '0em' })

      const flipTl = gsap.timeline()
      for (let s = 1; s <= steps; s++) {
        const rowIndex = goesDown ? steps - s : s
        flipTl.to(el, {
          y: `-${rowIndex * ROW_EM}em`,
          duration: STEP_DURATION,
          ease: 'power1.in',
        })
      }

      tl.add(flipTl, i * STAGGER)
    })

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
    >
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-30 mix-blend-screen">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="gamma" amplitude="1" exponent="2.5" offset="0" />
          </feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
      <h1 className="relative font-moonwalk text-white text-[12vw] md:text-[6vw] tracking-[0.04em] leading-none select-none flex">
        {TARGET.split('').map((char, i) => (
          <span
            key={i}
            className="relative inline-block overflow-hidden text-center"
            style={{
              height: `${ROW_EM}em`,
              width: char === ' ' ? '0.5em' : char === ':' ? '0.6em' : '0.85em',
            }}
          >
            <div
              ref={(el) => {
                letterRefs.current[i] = el
              }}
              className="absolute inset-x-0 top-0 flex flex-col items-center"
            >
              {reels.current[i].map((c, j) => (
                <span
                  key={j}
                  className="flex items-center justify-center"
                  style={{ height: `${ROW_EM}em`, lineHeight: `${ROW_EM}em` }}
                >
                  {c === ' ' ? ' ' : c}
                </span>
              ))}
            </div>
          </span>
        ))}
      </h1>
    </div>
  )
}
