import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const FRAMES = Array.from(
  { length: 13 },
  (_, i) => `/images/preloader/frame-${String(i + 1).padStart(2, '0')}.png`,
)
const FLICKER_SECONDS = 2.4

function IntroSequence() {
  const [frame, setFrame] = useState(0)
  const flagRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      setFrame((f) => (f + 1) % FRAMES.length)
      timer = setTimeout(tick, 60 + 50 * Math.random())
    }
    timer = setTimeout(tick, 60)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const el = flagRef.current
    if (!el) return
    const jitter = () => {
      const t = gsap.ticker.time
      const r = (Math.random() - 0.5) * 0.22
      gsap.set(el, {
        x: 0.45 * Math.sin(22 * t) + r,
        y: 0.32 * Math.cos(18 * t) - r,
        rotation: 0.12 * Math.sin(7.5 * t),
      })
    }
    gsap.ticker.add(jitter)
    return () => gsap.ticker.remove(jitter)
  }, [])

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black">
      <div ref={flagRef} className="relative aspect-[1076/764] w-[min(60vw,760px)] min-w-[300px] overflow-hidden">
        {FRAMES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className="absolute inset-0 h-full w-full object-contain transition-opacity duration-75"
            style={{
              opacity: i === frame ? 1 : 0,
              filter: i === frame ? 'brightness(1.35) contrast(1.9) saturate(1.2)' : undefined,
            }}
          />
        ))}
      </div>
    </div>
  )
}

type Props = {
  onReveal?: () => void
  onComplete?: () => void
}

export default function Preloader({ onReveal, onComplete }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const callbacks = useRef({ onReveal, onComplete })
  useLayoutEffect(() => {
    callbacks.current = { onReveal, onComplete }
  })

  const [ready, setReady] = useState(false)

  useEffect(() => {
    let alive = true
    Promise.all(
      FRAMES.map((src) => {
        const img = new Image()
        img.src = src
        return img.decode().catch(() => {})
      }),
    ).then(() => alive && setReady(true))
    return () => {
      alive = false
    }
  }, [])

  useLayoutEffect(() => {
    if (!ready) return
    const tl = gsap.timeline({ onComplete: () => callbacks.current.onComplete?.() })
    tl.call(() => callbacks.current.onReveal?.(), [], FLICKER_SECONDS)
    // Same exit as the page transition: the panel lifts off the top in one
    // continuous move. A lime band hangs from its bottom edge like a weight on a
    // spring: it drags out long while the panel accelerates, then whips back up
    // after it and is off screen before the page settles.
    const panel = panelRef.current!
    const trail = trailRef.current!
    let bottom = window.innerHeight
    let velocity = 0
    const spring = (_time: number, deltaMs: number) => {
      const rest = window.innerHeight * 0.12
      const edge = window.innerHeight + Number(gsap.getProperty(panel, 'y'))
      const steps = 4
      const dt = Math.min(deltaMs, 50) / 1000 / steps
      for (let k = 0; k < steps; k++) {
        const accel = 70 * (edge + rest - bottom) - 9 * velocity
        velocity += accel * dt
        bottom += velocity * dt
      }
      trail.style.height = `${Math.max(0, bottom - edge)}px`
    }

    tl.call(() => gsap.ticker.add(spring), [], FLICKER_SECONDS)
    tl.to(panel, { y: () => -window.innerHeight * 1.5, duration: 1.1, ease: 'power3.inOut' }, FLICKER_SECONDS)
    tl.call(() => gsap.ticker.remove(spring))
    return () => {
      tl.kill()
      gsap.ticker.remove(spring)
    }
  }, [ready])

  return (
    <div role="status" aria-label="Loading" className="pointer-events-none fixed inset-0 z-200 overflow-hidden">
      <div ref={panelRef} className="absolute inset-0 bg-black">
        {ready && <IntroSequence />}
        <div ref={trailRef} className="absolute inset-x-0 top-full h-0 bg-lime" />
      </div>
    </div>
  )
}
