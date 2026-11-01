import { useEffect, useRef } from 'react'

// Base sizes at a 16px root font; scaled to the actual root size at build time.
const BASE_SPACING = 14
const BASE_DOT = 1.3
const BASE_INFLUENCE = 240
const MAGNIFY = 0.35
const GROW = 2.6
const NAME_GROW = 2.4
const NAME_STRETCH = 1.8
const LIME = [209, 238, 112]
const NAME = 'John Achimugu'
const NAME_FONT = 'Clash Display'
const NAME_WEIGHT = 500
const NAME_TRACKING = 0.05
const BASE_REVEAL = 230
const IDLE_MS = 120

type Dot = { x: number; y: number; ox: number; oy: number; r: number; t: boolean; v: number }

export default function DotField({ className = '', dark = false }: { className?: string; dark?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let dots: Dot[] = []
    let width = 0
    let height = 0
    const pointer = { x: -9999, y: -9999, active: false, movedAt: 0 }
    let frame = 0
    let running = false
    let SPACING = BASE_SPACING
    let BASE_RADIUS = BASE_DOT
    let INFLUENCE = BASE_INFLUENCE
    let REVEAL = BASE_REVEAL

    function build() {
      const scale = parseFloat(getComputedStyle(document.documentElement).fontSize) / 16
      SPACING = BASE_SPACING * scale
      BASE_RADIUS = BASE_DOT * scale
      INFLUENCE = BASE_INFLUENCE * scale
      REVEAL = BASE_REVEAL * scale
      const rect = canvas!.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      width = rect.width
      height = rect.height
      canvas!.width = Math.round(width * dpr)
      canvas!.height = Math.round(height * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      const cols = Math.floor(width / SPACING)
      const rows = Math.floor(height / SPACING)
      const offsetX = (width - (cols - 1) * SPACING) / 2
      const offsetY = (height - (rows - 1) * SPACING) / 2
      const mask = buildMask()
      dots = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = offsetX + c * SPACING
          const y = offsetY + r * SPACING
          const t = !!mask && mask[(Math.round(y) * Math.ceil(width) + Math.round(x)) * 4 + 3] > 128
          dots.push({ x, y, ox: 0, oy: 0, r: BASE_RADIUS, t, v: 0 })
        }
      }
      draw()
    }

    function buildMask() {
      const w = Math.ceil(width)
      const h = Math.ceil(height)
      if (!w || !h) return null
      const off = document.createElement('canvas')
      off.width = w
      off.height = h
      const octx = off.getContext('2d')
      if (!octx) return null
      octx.font = `${NAME_WEIGHT} 100px '${NAME_FONT}', sans-serif`
      octx.textBaseline = 'alphabetic'
      const m = octx.measureText(NAME)
      const chars = [...NAME]
      const advances = chars.map((c) => octx.measureText(c).width)
      const textW = advances.reduce((a, b) => a + b, 0) + NAME_TRACKING * 100 * (chars.length - 1)
      const textH = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent
      const k = Math.min((w * 0.94) / textW, (h * 0.92) / textH)
      const sy = Math.min(NAME_STRETCH, (h * 0.92) / (textH * k))
      octx.font = `${NAME_WEIGHT} ${100 * k}px '${NAME_FONT}', sans-serif`
      octx.setTransform(1, 0, 0, sy, 0, 0)
      const baseline = h / (2 * sy) + ((m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) * k) / 2
      let x = (w - textW * k) / 2
      chars.forEach((c, i) => {
        octx.fillText(c, x, baseline)
        x += (advances[i] + NAME_TRACKING * 100) * k
      })
      return octx.getImageData(0, 0, w, h).data
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height)
      for (const d of dots) {
        const lift = (d.r - BASE_RADIUS) / (GROW * BASE_RADIUS)
        const grey = dark ? 58 : 212
        const ink = dark ? 245 : 10
        const [r, g, b] = LIME.map((c) => {
          const hover = grey + (c - grey) * lift
          return Math.round(hover + (ink - hover) * d.v)
        })
        ctx!.fillStyle = `rgb(${r},${g},${b})`
        ctx!.beginPath()
        ctx!.arc(d.x + d.ox, d.y + d.oy, d.r + BASE_RADIUS * NAME_GROW * d.v, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    function tick() {
      let moving = false
      for (const d of dots) {
        let tx = 0
        let ty = 0
        let tr = BASE_RADIUS
        if (pointer.active) {
          const dx = d.x - pointer.x
          const dy = d.y - pointer.y
          const dist = Math.hypot(dx, dy)
          if (dist < INFLUENCE) {
            const falloff = 1 - dist / INFLUENCE
            const eased = falloff * falloff * (3 - 2 * falloff)
            tx = dx * MAGNIFY * eased
            ty = dy * MAGNIFY * eased
            tr = BASE_RADIUS * (1 + GROW * eased)
          }
        }
        d.ox += (tx - d.ox) * 0.15
        d.oy += (ty - d.oy) * 0.15
        d.r += (tr - d.r) * 0.15
        if (Math.abs(tx - d.ox) > 0.05 || Math.abs(ty - d.oy) > 0.05 || Math.abs(tr - d.r) > 0.01) {
          moving = true
        }
      }
      const revealing = pointer.active && performance.now() - pointer.movedAt < IDLE_MS
      for (const d of dots) {
        if (!d.t) continue
        let target = 0
        if (revealing) {
          const dist = Math.hypot(d.x - pointer.x, d.y - pointer.y)
          if (dist < REVEAL) {
            const falloff = 1 - dist / REVEAL
            target = falloff * falloff * (3 - 2 * falloff)
          }
        }
        d.v += (target - d.v) * (target > d.v ? 0.35 : 0.25)
        if (d.v < 0.01) d.v = 0
        else moving = true
      }
      draw()
      if (moving || pointer.active) {
        frame = requestAnimationFrame(tick)
      } else {
        running = false
      }
    }

    function start() {
      if (reduceMotion || running) return
      running = true
      frame = requestAnimationFrame(tick)
    }

    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active = true
      pointer.movedAt = performance.now()
      start()
    }

    function onLeave() {
      pointer.active = false
      start()
    }

    build()
    const nameFont = new FontFace(NAME_FONT, 'url(/fonts/clash-display/ClashDisplay-Medium.woff2)', { weight: String(NAME_WEIGHT) })
    nameFont.load().then((f) => {
      document.fonts.add(f)
      build()
    })
    const ro = new ResizeObserver(build)
    ro.observe(canvas)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className={`block h-full w-full ${className}`} />
}
