// Generates the JA preloader flicker frames (public/images/preloader/frame-XX.png).
// Run: node scripts/generate-preloader-frames.mjs
//
// 13 original freehand pennants (1076x764, white on black, pointing right)
// with JA written inside. Each frame has its own shape, a different fill
// (solid, shaded, patterned or outline only) and a different handwriting.
import fs from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const root = path.resolve(import.meta.dirname, '..')

const browser = await chromium.launch()
const page = await browser.newPage()
const frames = await page.evaluate(() => {
  const W = 1076
  const H = 764

  let seed = 1
  const rand = () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  const between = (a, b) => a + rand() * (b - a)

  // Smooth 1D wobble: a few sines with random phases, like an unsteady hand.
  const wave = (amp, freq) => {
    const parts = [1, 2.3, 4.1].map((m) => [between(0, Math.PI * 2), m * freq, amp / m])
    return (t) => parts.reduce((s, [p, f, a]) => s + a * Math.sin(t * f * Math.PI * 2 + p), 0)
  }

  const chaikin = (pts, iterations, closed) => {
    let out = pts
    for (let k = 0; k < iterations; k++) {
      const next = []
      const n = closed ? out.length : out.length - 1
      if (!closed) next.push(out[0])
      for (let i = 0; i < n; i++) {
        const [ax, ay] = out[i]
        const [bx, by] = out[(i + 1) % out.length]
        next.push([ax * 0.75 + bx * 0.25, ay * 0.75 + by * 0.25], [ax * 0.25 + bx * 0.75, ay * 0.25 + by * 0.75])
      }
      if (!closed) next.push(out[out.length - 1])
      out = next
    }
    return out
  }

  const quad = (a, c, b, n) =>
    Array.from({ length: n }, (_, k) => {
      const t = k / n
      const u = 1 - t
      return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]]
    })

  // Freehand pennant: three loose corners joined by bulging, wobbly edges.
  const makePennant = ({ wobble = 6, roundness = 3 } = {}) => {
    const tl = [between(70, 230), between(90, 260)]
    const bl = [between(80, 250), between(590, 725)]
    const tip = [between(840, 1000), between(220, 450)]
    const corners = [tl, tip, bl]
    const pts = []
    corners.forEach((a, i) => {
      const b = corners[(i + 1) % 3]
      const mx = (a[0] + b[0]) / 2
      const my = (a[1] + b[1]) / 2
      const nx = -(b[1] - a[1])
      const ny = b[0] - a[0]
      const len = Math.hypot(nx, ny)
      const bulge = between(-0.09, 0.13) * len
      const ctrl = [mx + (nx / len) * bulge, my + (ny / len) * bulge]
      const w = wave(wobble, between(1.5, 3.5))
      quad(a, ctrl, b, 60).forEach(([x, y], k) => {
        const d = w(k / 60)
        pts.push([x + (nx / len) * d, y + (ny / len) * d])
      })
    })
    const outline = chaikin(pts, roundness, true)
    const edgeAt = (x) => {
      const t = Math.min(1, Math.max(0, (x - tl[0]) / (tip[0] - tl[0])))
      return [tl[1] + (tip[1] - tl[1]) * t, bl[1] + (tip[1] - bl[1]) * t]
    }
    return { outline, tl, bl, tip, edgeAt }
  }

  // Pen stroke with pressure: width swells and tapers along the line.
  const penStroke = (ctx, pts, width, { pressure = 0.3, taper = 0.25, closed = false } = {}) => {
    const p = wave(pressure, between(1, 3))
    const list = closed ? [...pts, pts[0]] : pts
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    for (let i = 0; i < list.length - 1; i++) {
      const t = i / (list.length - 1)
      const ends = closed ? 1 : Math.min(1, t / taper, (1 - t) / taper)
      ctx.lineWidth = Math.max(1, width * (1 + p(t)) * (0.35 + 0.65 * ends))
      ctx.beginPath()
      ctx.moveTo(...list[i])
      ctx.lineTo(...list[i + 1])
      ctx.stroke()
    }
  }

  // Letter skeletons in a unit box (y down). Each is a list of strokes.
  const C = (a, c, b, n = 8) => quad(a, c, b, n).concat([b])
  const J = {
    print: () => [
      [[0.05, 0.04], [0.95, 0.02]],
      [[0.62, 0.03], [0.62, 0.7], ...C([0.62, 0.7], [0.6, 1.02], [0.3, 0.98]).slice(1), ...C([0.3, 0.98], [0.04, 0.94], [0.06, 0.7]).slice(1)],
    ],
    hook: () => [[[0.7, 0], [0.68, 0.72], ...C([0.68, 0.72], [0.62, 1.04], [0.3, 0.98]).slice(1), ...C([0.3, 0.98], [0.02, 0.9], [0.1, 0.68]).slice(1)]],
    script: () => [
      [
        ...C([0.15, 0.22], [0.35, -0.08], [0.85, 0.04]),
        ...C([0.85, 0.04], [0.55, 0.1], [0.58, 0.55]).slice(1),
        ...C([0.58, 0.55], [0.62, 1.15], [0.3, 1.08]).slice(1),
        ...C([0.3, 1.08], [0.05, 0.98], [0.35, 0.8]).slice(1),
        ...C([0.35, 0.8], [0.6, 0.62], [0.95, 0.6]).slice(1),
      ],
    ],
    curl: () => [
      [
        ...C([0.25, 0.14], [0.4, -0.08], [0.62, 0.06]),
        [0.64, 0.72],
        ...C([0.64, 0.72], [0.64, 1.02], [0.34, 1]).slice(1),
        ...C([0.34, 1], [0.08, 0.98], [0.1, 0.78]).slice(1),
      ],
    ],
    tall: () => [
      [[0.25, 0.02], [0.95, 0.02]],
      [[0.62, 0.02], [0.62, 0.84], ...C([0.62, 0.84], [0.6, 1], [0.38, 1]).slice(1), [0.22, 0.92]],
    ],
  }
  const A = {
    print: () => [
      [[0.02, 1], [0.5, 0.02], [0.98, 1]],
      [[0.22, 0.62], [0.8, 0.6]],
    ],
    round: () => [
      [[0.04, 1], ...C([0.04, 1], [0.12, -0.25], [0.5, 0.02]).slice(1), ...C([0.5, 0.02], [0.88, -0.25], [0.96, 1]).slice(1)],
      [[0.12, 0.6], [0.88, 0.62]],
    ],
    script: () => [
      [
        [0.02, 1],
        [0.48, 0.02],
        [0.95, 0.98],
        ...C([0.95, 0.98], [0.9, 0.6], [0.5, 0.6]).slice(1),
        ...C([0.5, 0.6], [0.1, 0.62], [0.22, 0.75]).slice(1),
      ],
    ],
    flat: () => [
      [[0.02, 1], [0.32, 0.02], [0.68, 0.02], [0.98, 1]],
      [[0.18, 0.6], [0.84, 0.58]],
    ],
    open: () => [
      [[0.04, 1], [0.46, 0.04]],
      [[0.56, 0.02], [0.96, 1]],
      [[0.2, 0.62], [0.86, 0.66]],
    ],
  }

  const resample = (pts, step) => {
    const out = []
    for (let i = 0; i < pts.length - 1; i++) {
      const [ax, ay] = pts[i]
      const [bx, by] = pts[i + 1]
      const n = Math.max(1, Math.round(Math.hypot(bx - ax, by - ay) / step))
      for (let k = 0; k < n; k++) out.push([ax + ((bx - ax) * k) / n, ay + ((by - ay) * k) / n])
    }
    out.push(pts[pts.length - 1])
    return out
  }

  // Lay JA out inside the pennant and return pixel strokes for each letter.
  // Area centroid of the pennant outline: the visual centre of the shape.
  const centroid = (pts) => {
    let a = 0
    let cx = 0
    let cy = 0
    for (let i = 0; i < pts.length; i++) {
      const [x0, y0] = pts[i]
      const [x1, y1] = pts[(i + 1) % pts.length]
      const cross = x0 * y1 - x1 * y0
      a += cross
      cx += (x0 + x1) * cross
      cy += (y0 + y1) * cross
    }
    return [cx / (3 * a), cy / (3 * a)]
  }

  // Lay JA out so the middle of its drawn letters sits on the pennant's centre.
  const layoutJA = (pen, style) => {
    const [cx, cy] = centroid(pen.outline)
    const [top, bottom] = pen.edgeAt(cx)
    const span = style.jWidth + style.gap + style.aWidth
    let h = Math.min((bottom - top) * style.size * 1.25, ((pen.tip[0] - pen.tl[0]) * 0.5) / span)
    // The pennant narrows toward the tip, so the A side must fit too.
    for (let k = 0; k < 3; k++) {
      const [t, b] = pen.edgeAt(cx + h * span * 0.45)
      h = Math.min(h, (b - t) * 0.72)
    }
    const jw = h * style.jWidth
    const aw = h * style.aWidth
    const boxes = [
      [0, 0, jw, h, J[style.j]()],
      [jw + h * style.gap, 0, aw, h, A[style.a]()],
    ]
    const strokes = []
    for (const [bx, by, bw, bh, letter] of boxes) {
      for (const stroke of letter) {
        const pts = stroke.map(([u, v]) => [bx + u * bw + (1 - v) * bh * style.slant, by + v * bh])
        const dense = resample(pts, 6)
        const wx = wave(style.shake, between(2, 5))
        const wy = wave(style.shake, between(2, 5))
        const shaky = dense.map(([x, y], k) => [x + wx(k / dense.length), y + wy(k / dense.length)])
        strokes.push(chaikin(shaky, 2, false))
      }
    }
    const all = strokes.flat()
    const minX = Math.min(...all.map(([x]) => x))
    const maxX = Math.max(...all.map(([x]) => x))
    const minY = Math.min(...all.map(([, y]) => y))
    const maxY = Math.max(...all.map(([, y]) => y))
    const dx = cx - (minX + maxX) / 2
    const dy = cy - (minY + maxY) / 2
    return strokes.map((s) => s.map(([x, y]) => [x + dx, y + dy]))
  }

  const drawJA = (ctx, strokes, width, color, opts = {}) => {
    ctx.strokeStyle = color
    for (const s of strokes) penStroke(ctx, s, width, opts)
  }





  const STYLE = {
    marker: { j: 'print', a: 'print', size: 0.5, jWidth: 0.6, aWidth: 0.75, gap: 0.18, slant: 0, shake: 3 },
    brush: { j: 'hook', a: 'flat', size: 0.56, jWidth: 0.55, aWidth: 0.85, gap: 0.12, slant: 0.05, shake: 5 },
    script: { j: 'script', a: 'script', size: 0.52, jWidth: 0.62, aWidth: 0.8, gap: 0.08, slant: 0.22, shake: 3 },
    shaky: { j: 'print', a: 'open', size: 0.5, jWidth: 0.6, aWidth: 0.8, gap: 0.16, slant: -0.04, shake: 7 },
    tall: { j: 'tall', a: 'print', size: 0.64, jWidth: 0.38, aWidth: 0.5, gap: 0.14, slant: 0, shake: 4 },
    italic: { j: 'curl', a: 'print', size: 0.5, jWidth: 0.55, aWidth: 0.72, gap: 0.12, slant: 0.32, shake: 3 },
    sketch: { j: 'print', a: 'round', size: 0.5, jWidth: 0.62, aWidth: 0.8, gap: 0.16, slant: 0.06, shake: 7 },
    hollow: { j: 'hook', a: 'flat', size: 0.54, jWidth: 0.58, aWidth: 0.85, gap: 0.16, slant: 0, shake: 3 },
    round: { j: 'curl', a: 'round', size: 0.5, jWidth: 0.6, aWidth: 0.82, gap: 0.12, slant: 0.1, shake: 4 },
    wobbly: { j: 'hook', a: 'print', size: 0.52, jWidth: 0.58, aWidth: 0.8, gap: 0.14, slant: -0.08, shake: 8 },
    pen: { j: 'script', a: 'open', size: 0.54, jWidth: 0.6, aWidth: 0.78, gap: 0.1, slant: 0.18, shake: 2 },
  }

  // Every frame is a freehand pennant outline with JA written inside, white on
  // black. Only the line style and the handwriting change.
  const outlineDashed = (ctx, pts, width, dash, gap) => {
    let run = []
    let drawn = 0
    let on = true
    for (let k = 0; k < pts.length; k++) {
      const [x, y] = pts[k]
      const [px, py] = pts[k ? k - 1 : 0]
      drawn += Math.hypot(x - px, y - py)
      if (on) run.push([x, y])
      if (drawn > (on ? dash : gap)) {
        if (on && run.length > 1) penStroke(ctx, run, width, { pressure: 0.4, taper: 0.3 })
        run = []
        drawn = 0
        on = !on
      }
    }
    if (on && run.length > 1) penStroke(ctx, run, width, { pressure: 0.4, taper: 0.3 })
  }

  const fill = (ctx, pen, paint) => {
    ctx.save()
    const path = new Path2D()
    pen.outline.forEach(([x, y], k) => (k ? path.lineTo(x, y) : path.moveTo(x, y)))
    path.closePath()
    ctx.clip(path)
    paint()
    ctx.restore()
  }
  const halo = (ctx, strokes, width, opts = {}) => {
    drawJA(ctx, strokes, width + 20, '#fff', { ...opts, taper: 0.05 })
    drawJA(ctx, strokes, width, '#000', opts)
  }
  const outline = (ctx, pen, width, opts = {}) => {
    ctx.strokeStyle = '#fff'
    penStroke(ctx, pen.outline, width, { pressure: 0.3, ...opts, closed: true })
  }

  const frames = [
    // solid grainy fill, black marker JA
    (ctx) => {
      const pen = makePennant({ wobble: 7 })
      fill(ctx, pen, () => {
        ctx.fillStyle = '#f2f2f2'
        ctx.fillRect(0, 0, W, H)
        ctx.fillStyle = 'rgba(0,0,0,0.35)'
        for (let k = 0; k < 12000; k++) ctx.fillRect(rand() * W, rand() * H, 1 + rand() * 2.5, 1 + rand() * 2.5)
      })
      drawJA(ctx, layoutJA(pen, STYLE.marker), 26, '#000')
    },
    // marker outline, white rounded JA
    (ctx) => {
      const pen = makePennant({ wobble: 6 })
      outline(ctx, pen, 16)
      drawJA(ctx, layoutJA(pen, STYLE.round), 16, '#fff')
    },
    // pen hatching inside, outline, JA with halo
    (ctx) => {
      const pen = makePennant({ wobble: 8 })
      fill(ctx, pen, () => {
        ctx.strokeStyle = '#fff'
        for (let k = -H; k < W + H; k += between(16, 24)) {
          const line = resample([[k, H + 20], [k + H * 0.6, -20]], 30).map(([x, y]) => [x + between(-3, 3), y])
          penStroke(ctx, line, between(3, 5), { pressure: 0.5 })
        }
      })
      outline(ctx, pen, 9)
      halo(ctx, layoutJA(pen, STYLE.brush), 26)
    },
    // polka dots, JA with halo
    (ctx) => {
      const pen = makePennant({ wobble: 5 })
      fill(ctx, pen, () => {
        ctx.fillStyle = '#fff'
        for (let y = 60; y < 760; y += 34) {
          for (let x = 40; x < 1060; x += 34) {
            ctx.beginPath()
            ctx.arc(x + ((y / 34) % 2) * 17 + between(-2, 2), y + between(-2, 2), between(8, 11), 0, Math.PI * 2)
            ctx.fill()
          }
        }
      })
      outline(ctx, pen, 7)
      halo(ctx, layoutJA(pen, STYLE.shaky), 22)
    },
    // thin pen outline, cursive white JA
    (ctx) => {
      const pen = makePennant({ wobble: 9 })
      outline(ctx, pen, 6, { pressure: 0.45 })
      drawJA(ctx, layoutJA(pen, STYLE.script), 10, '#fff', { pressure: 0.5 })
    },
    // pencil shading, fading toward the tip
    (ctx) => {
      const pen = makePennant({ wobble: 7 })
      fill(ctx, pen, () => {
        for (let k = 0; k < 900; k++) {
          const x = between(pen.tl[0] - 40, pen.tip[0] + 20)
          const t = (x - pen.tl[0]) / (pen.tip[0] - pen.tl[0])
          ctx.strokeStyle = 'rgba(255,255,255,' + (0.55 - 0.4 * t) + ')'
          ctx.lineWidth = between(3, 7)
          ctx.beginPath()
          const y = between(60, 740)
          ctx.moveTo(x, y)
          ctx.lineTo(x + between(30, 70), y - between(40, 90))
          ctx.stroke()
        }
      })
      outline(ctx, pen, 6)
      halo(ctx, layoutJA(pen, STYLE.italic), 20, { pressure: 0.35 })
    },
    // wobbly stripes along the pennant
    (ctx) => {
      const pen = makePennant({ wobble: 6 })
      fill(ctx, pen, () => {
        ctx.strokeStyle = '#fff'
        for (let f = 0; f < 1.05; f += 0.12) {
          const w = wave(6, between(1, 3))
          const pts = []
          for (let x = 40; x <= 1040; x += 20) {
            const [t, b] = pen.edgeAt(x)
            pts.push([x, t + f * (b - t) + w(x / 1000)])
          }
          penStroke(ctx, pts, between(14, 22), { pressure: 0.3 })
        }
      })
      halo(ctx, layoutJA(pen, STYLE.tall), 18)
    },
    // tiny pennants as the pattern
    (ctx) => {
      const pen = makePennant({ wobble: 6 })
      fill(ctx, pen, () => {
        ctx.strokeStyle = '#fff'
        ctx.fillStyle = '#fff'
        for (let y = 40; y < 760; y += 58) {
          for (let x = 30; x < 1060; x += 76) {
            const ox = x + ((y / 58) % 2) * 38 + between(-4, 4)
            const oy = y + between(-4, 4)
            const s = between(0.85, 1.15)
            const tri = [[ox, oy], [ox + 52 * s, oy + 16 * s], [ox + 2, oy + 36 * s]]
            ctx.beginPath()
            tri.forEach(([tx, ty], k) => (k ? ctx.lineTo(tx, ty) : ctx.moveTo(tx, ty)))
            ctx.closePath()
            if (rand() > 0.5) ctx.fill()
            else {
              ctx.lineWidth = 3
              ctx.stroke()
            }
          }
        }
      })
      outline(ctx, pen, 8)
      halo(ctx, layoutJA(pen, STYLE.marker), 24)
    },
    // re-traced sketchy outline, sketchy JA
    (ctx) => {
      const pen = makePennant({ wobble: 6 })
      ctx.strokeStyle = '#fff'
      for (let pass = 0; pass < 3; pass++) {
        penStroke(ctx, pen.outline.map(([x, y]) => [x + between(-5, 5), y + between(-5, 5)]), 5, { pressure: 0.5, closed: true })
      }
      const strokes = layoutJA(pen, STYLE.sketch)
      for (let pass = 0; pass < 3; pass++) {
        drawJA(ctx, strokes.map((st) => st.map(([x, y]) => [x + between(-5, 5), y + between(-5, 5)])), 5, '#fff', { pressure: 0.5 })
      }
    },
    // crosshatch fill
    (ctx) => {
      const pen = makePennant({ wobble: 8 })
      fill(ctx, pen, () => {
        ctx.strokeStyle = '#fff'
        for (let k = -H; k < W + H; k += 26) {
          penStroke(ctx, [[k, -20], [k + H * 0.8, H + 20]], 3, { pressure: 0.4 })
          penStroke(ctx, [[k, H + 20], [k + H * 0.8, -20]], 3, { pressure: 0.4 })
        }
      })
      outline(ctx, pen, 10, { pressure: 0.4 })
      halo(ctx, layoutJA(pen, STYLE.hollow), 24)
    },
    // stipple, dense at the wide end and fading toward the tip
    (ctx) => {
      const pen = makePennant({ wobble: 9 })
      fill(ctx, pen, () => {
        ctx.fillStyle = '#fff'
        for (let k = 0; k < 60000; k++) {
          const x = between(pen.tl[0] - 40, pen.tip[0] + 20)
          const t = (x - pen.tl[0]) / (pen.tip[0] - pen.tl[0])
          if (rand() > 1 - t * 0.85) continue
          ctx.beginPath()
          ctx.arc(x, rand() * H, between(1.2, 3), 0, Math.PI * 2)
          ctx.fill()
        }
      })
      halo(ctx, layoutJA(pen, STYLE.pen), 16)
    },
    // chalky dashed outline, wobbly JA
    (ctx) => {
      const pen = makePennant({ wobble: 10 })
      ctx.strokeStyle = '#fff'
      outlineDashed(ctx, pen.outline, 11, 70, 14)
      drawJA(ctx, layoutJA(pen, STYLE.wobbly), 14, '#fff', { pressure: 0.4 })
    },
    // solid white with a heavy brush edge, black brush JA
    (ctx) => {
      const pen = makePennant({ wobble: 12, roundness: 4 })
      fill(ctx, pen, () => {
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, W, H)
      })
      outline(ctx, pen, 18, { pressure: 0.6 })
      drawJA(ctx, layoutJA(pen, STYLE.brush), 30, '#000', { pressure: 0.5 })
    },
  ]

  return frames.map((draw, i) => {
    seed = 1000 + i * 97
    const canvas = document.createElement('canvas')
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, W, H)
    draw(ctx)
    return canvas.toDataURL('image/png')
  })
})
await browser.close()

const outDir = path.join(root, 'public/images/preloader')
await fs.mkdir(outDir, { recursive: true })
await Promise.all(
  frames.map((url, i) =>
    fs.writeFile(
      path.join(outDir, `frame-${String(i + 1).padStart(2, '0')}.png`),
      Buffer.from(url.split(',')[1], 'base64'),
    ),
  ),
)
console.log(`${frames.length} frames written`)
