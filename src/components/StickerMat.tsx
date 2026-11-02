import { useEffect, useRef } from 'react'

const DIR = '/images/resume'

// Positions are in mat units: the mat is always MAT_W wide, whatever its size on screen.
const MAT_W = 1000
const MAT_H = (MAT_W * 751) / 2400

const GRAVITY = 0.3
const DROP_DELAY_MS = 1000
const BOUNCE = 0.85
const FLOOR_BOUNCE = 0.5
const FRICTION = 0.99
const SPIN_FRICTION = 0.98
const FLOOR_FRICTION = 0.92
const FLOOR_SPIN_FRICTION = 0.85
const RIGHTING = 0.015
const MAX_SPEED = 14
const MAX_SPIN = 5
const CURSOR_RADIUS = 14
const TRANSFER = 0.5
const NUDGE = 0.25
const LIFT = 0.3

// Listed tallest to shortest, so every sticker still shows when they rest on the floor together.
// x and y are the sticker's centre before it drops; x also decides where it lands.
const STICKERS = [
  { file: 'polaroid', x: 563, y: 114, w: 192, aspect: 0.841 },
  { file: 'rocket', x: 945, y: 186, w: 99, aspect: 0.626 },
  { file: 'listen', x: 720, y: 237, w: 174, aspect: 1.285 },
  { file: 'super-cool', x: 205, y: 135, w: 186, aspect: 1.409 },
  { file: 'controller', x: 800, y: 93, w: 159, aspect: 1.281 },
  { file: 'tape-white', x: 120, y: 222, w: 192, aspect: 1.582 },
  { file: 'character', x: 390, y: 60, w: 174, aspect: 1.443 },
  { file: 'framed', x: 855, y: 147, w: 198, aspect: 1.973 },
  { file: 'globe', x: 680, y: 247, w: 99, aspect: 1 },
  { file: 'keyboard', x: 270, y: 47, w: 156, aspect: 1.67 },
  { file: 'hand', x: 345, y: 48, w: 90, aspect: 1.033 },
  { file: 'publish', x: 745, y: 249, w: 162, aspect: 1.954 },
  { file: 'comet', x: 63, y: 38, w: 126, aspect: 1.637 },
  { file: 'figma', x: 170, y: 148, w: 75, aspect: 1 },
  { file: 'name-your-layers', x: 450, y: 212, w: 282, aspect: 3.929 },
  { file: 'tape-green', x: 955, y: 255, w: 90, aspect: 1.506 },
  { file: 'switch', x: 840, y: 243, w: 105, aspect: 1.794 },
  { file: 'vibe-check', x: 585, y: 132, w: 126, aspect: 2.181 },
  { file: 'say-less', x: 900, y: 48, w: 84, aspect: 1.682 },
]

type Body = { x: number; y: number; vx: number; vy: number; angle: number; spin: number; hw: number; hh: number }

export default function StickerMat() {
  const matRef = useRef<HTMLDivElement>(null)
  const stickerRefs = useRef<(HTMLImageElement | null)[]>([])

  useEffect(() => {
    const mat = matRef.current
    if (!mat) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const bodies: Body[] = STICKERS.map((s) => ({
      x: s.x,
      y: s.y,
      vx: 0,
      vy: 0,
      angle: 0,
      spin: 0,
      hw: s.w / 2,
      hh: s.w / s.aspect / 2,
    }))
    let scale = mat.getBoundingClientRect().width / MAT_W
    let frame = 0
    let running = false
    let last = 0
    let cursor: { x: number; y: number } | null = null

    function place() {
      bodies.forEach((b, i) => {
        const el = stickerRefs.current[i]
        if (!el) return
        const dx = (b.x - STICKERS[i].x) * scale
        const dy = (b.y - STICKERS[i].y) * scale
        el.style.transform = `translate(${dx}px, ${dy}px) rotate(${b.angle}deg)`
      })
    }

    // Returns true when the sticker is resting on or hitting the floor.
    function bounceOffWalls(b: Body) {
      const rad = (b.angle * Math.PI) / 180
      const cos = Math.abs(Math.cos(rad))
      const sin = Math.abs(Math.sin(rad))
      const hx = b.hw * cos + b.hh * sin
      const hy = b.hw * sin + b.hh * cos
      if (b.x < hx) {
        b.x = hx
        b.vx = Math.abs(b.vx) * BOUNCE
        b.spin -= b.vy * 0.1
      } else if (b.x > MAT_W - hx) {
        b.x = MAT_W - hx
        b.vx = -Math.abs(b.vx) * BOUNCE
        b.spin += b.vy * 0.1
      }
      if (b.y < hy) {
        b.y = hy
        b.vy = Math.abs(b.vy) * BOUNCE
        b.spin += b.vx * 0.1
      } else if (b.y >= MAT_H - hy) {
        b.y = MAT_H - hy
        b.vy = b.vy > 1 ? -b.vy * FLOOR_BOUNCE : 0
        b.spin -= b.vx * 0.02
        return true
      }
      return false
    }

    function tick(now: number) {
      const dt = Math.min((now - last) / (1000 / 60), 2)
      last = now
      let moving = false
      for (const b of bodies) {
        b.vy += GRAVITY * dt
        b.x += b.vx * dt
        b.y += b.vy * dt
        b.angle += b.spin * dt
        const grounded = bounceOffWalls(b)
        b.vx *= (grounded ? FLOOR_FRICTION : FRICTION) ** dt
        b.spin *= SPIN_FRICTION ** dt
        if (grounded) {
          // Topple onto the nearest flat side, upright or upside down.
          const target = Math.round(b.angle / 180) * 180
          b.spin += (target - b.angle) * RIGHTING * dt
          b.spin *= FLOOR_SPIN_FRICTION ** dt
          if (Math.abs(b.vx) < 0.05 && b.vy === 0 && Math.abs(b.spin) < 0.05 && Math.abs(target - b.angle) < 0.2) {
            b.vx = 0
            b.spin = 0
            b.angle = target
            b.y = MAT_H - b.hh
            continue
          }
        }
        moving = true
      }
      place()
      if (moving) {
        frame = requestAnimationFrame(tick)
      } else {
        running = false
      }
    }

    function start() {
      if (running) return
      running = true
      last = performance.now()
      frame = requestAnimationFrame(tick)
    }

    function touches(b: Body, x: number, y: number) {
      const rad = (-b.angle * Math.PI) / 180
      const dx = x - b.x
      const dy = y - b.y
      const lx = dx * Math.cos(rad) - dy * Math.sin(rad)
      const ly = dx * Math.sin(rad) + dy * Math.cos(rad)
      return Math.abs(lx) < b.hw + CURSOR_RADIUS && Math.abs(ly) < b.hh + CURSOR_RADIUS
    }

    function onMove(e: PointerEvent) {
      const rect = mat!.getBoundingClientRect()
      const x = (e.clientX - rect.left) / scale
      const y = (e.clientY - rect.top) / scale
      const from = cursor
      cursor = { x, y }
      if (!from) return
      const dx = x - from.x
      const dy = y - from.y
      const speed = Math.hypot(dx, dy)
      if (speed === 0) return

      // Check along the path so a fast flick can't jump over a sticker.
      const steps = Math.ceil(speed / CURSOR_RADIUS)
      let hit = false
      for (const b of bodies) {
        for (let i = 1; i <= steps; i++) {
          const px = from.x + (dx * i) / steps
          const py = from.y + (dy * i) / steps
          if (!touches(b, px, py)) continue
          const rx = b.x - px
          const ry = b.y - py
          const dist = Math.hypot(rx, ry) || 1
          b.vx += dx * TRANSFER + (rx / dist) * speed * NUDGE
          b.vy += dy * TRANSFER + (ry / dist) * speed * NUDGE - speed * LIFT
          const v = Math.hypot(b.vx, b.vy)
          if (v > MAX_SPEED) {
            b.vx *= MAX_SPEED / v
            b.vy *= MAX_SPEED / v
          }
          b.spin = Math.max(-MAX_SPIN, Math.min(MAX_SPIN, b.spin + (rx * dy - ry * dx) * -0.002))
          hit = true
          break
        }
      }
      if (hit) start()
    }

    function onLeave() {
      cursor = null
    }

    const ro = new ResizeObserver(() => {
      scale = mat.getBoundingClientRect().width / MAT_W
      place()
    })
    ro.observe(mat)

    if (reduceMotion) {
      for (const b of bodies) b.y = MAT_H - b.hh
      place()
      return () => ro.disconnect()
    }

    const dropTimer = window.setTimeout(start, DROP_DELAY_MS)
    mat.addEventListener('pointermove', onMove)
    mat.addEventListener('pointerleave', onLeave)

    return () => {
      window.clearTimeout(dropTimer)
      cancelAnimationFrame(frame)
      ro.disconnect()
      mat.removeEventListener('pointermove', onMove)
      mat.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={matRef}
      role="img"
      aria-label="Stickers scattered around a photo of John on a green cutting mat"
      className="relative touch-pan-y overflow-hidden select-none"
    >
      <img src={`${DIR}/mat.webp`} alt="" width={2400} height={751} className="h-auto w-full" />
      {STICKERS.map((s, i) => (
        <img
          key={s.file}
          ref={(el) => {
            stickerRefs.current[i] = el
          }}
          src={`${DIR}/stickers/${s.file}.webp`}
          alt=""
          draggable={false}
          className="pointer-events-none absolute"
          style={{
            left: `${((s.x - s.w / 2) / MAT_W) * 100}%`,
            top: `${((s.y - s.w / s.aspect / 2) / MAT_H) * 100}%`,
            width: `${(s.w / MAT_W) * 100}%`,
            aspectRatio: s.aspect,
          }}
        />
      ))}
    </div>
  )
}
