import { useRef, type ReactNode } from 'react'
import gsap from 'gsap'

const STICKERS = Array.from({ length: 33 }, (_, i) => `/images/trail/s${i + 1}.webp`)
const SPACING = 70
const LIFETIME = 2
const MAX_ALIVE = 24

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const rand = (min: number, max: number) => min + Math.random() * (max - min)

export default function StickerTrail({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const last = useRef<{ x: number; y: number } | null>(null)
  const next = useRef(Math.floor(Math.random() * STICKERS.length))

  function spawn(x: number, y: number) {
    const wrap = wrapRef.current
    if (!wrap) return
    const live = wrap.querySelectorAll('[data-sticker]')
    if (live.length >= MAX_ALIVE) live[0].remove()

    const img = document.createElement('img')
    img.src = STICKERS[next.current]
    next.current = (next.current + 1 + Math.floor(Math.random() * 3)) % STICKERS.length
    img.alt = ''
    img.dataset.sticker = ''
    const width = rand(0.6, 1) * Math.min(150, window.innerWidth * 0.22)
    Object.assign(img.style, {
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
      width: `${width}px`,
      pointerEvents: 'none',
    })
    wrap.appendChild(img)

    const rotation = rand(-22, 22)
    gsap
      .timeline({ onComplete: () => img.remove() })
      .fromTo(
        img,
        { xPercent: -50, yPercent: -50, scale: 0, rotation: rotation - 25 },
        { scale: 1, rotation, duration: 0.35, ease: 'back.out(2.2)' },
      )
      .to(img, { scale: 0.6, autoAlpha: 0, duration: 0.3, ease: 'power2.in' }, LIFETIME - 0.3)
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion || e.pointerType !== 'mouse' || !wrapRef.current) return
    const rect = wrapRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    if (last.current && Math.hypot(x - last.current.x, y - last.current.y) < SPACING) return
    last.current = { x, y }
    spawn(x, y)
  }

  return (
    <div ref={wrapRef} className="relative" onPointerMove={onPointerMove} onPointerLeave={() => (last.current = null)}>
      {children}
    </div>
  )
}
