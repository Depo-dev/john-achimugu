import { useEffect, useRef } from 'react'

const SPACING = 14
const BASE_RADIUS = 1.3
const INFLUENCE = 140
const MAGNIFY = 0.35
const GROW = 2.6

type Dot = { x: number; y: number; ox: number; oy: number; r: number }

export default function DotField({ className = '' }: { className?: string }) {
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
    const pointer = { x: -9999, y: -9999, active: false }
    let frame = 0
    let running = false

    function build() {
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
      dots = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({ x: offsetX + c * SPACING, y: offsetY + r * SPACING, ox: 0, oy: 0, r: BASE_RADIUS })
        }
      }
      draw()
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height)
      for (const d of dots) {
        const lift = (d.r - BASE_RADIUS) / (GROW * BASE_RADIUS)
        const shade = Math.round(212 - lift * 120)
        ctx!.fillStyle = `rgb(${shade},${shade},${shade})`
        ctx!.beginPath()
        ctx!.arc(d.x + d.ox, d.y + d.oy, d.r, 0, Math.PI * 2)
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
      start()
    }

    function onLeave() {
      pointer.active = false
      start()
    }

    build()
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
