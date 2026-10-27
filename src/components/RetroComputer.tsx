import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

const BEIGE = 0xd9d0c1
const BEIGE_LIGHT = 0xe6dfd3
const BEIGE_DARK = 0xc4b9a7

type Star = { x: number; y: number; z: number; twinkle: number }

function makeScreen() {
  const canvas = document.createElement('canvas')
  canvas.width = 640
  canvas.height = 480
  const ctx = canvas.getContext('2d')!
  const stars: Star[] = Array.from({ length: 260 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    z: Math.random() * 0.9 + 0.1,
    twinkle: Math.random() * Math.PI * 2,
  }))
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace

  function draw(t: number) {
    const g = ctx.createRadialGradient(320, 240, 40, 320, 240, 420)
    g.addColorStop(0, '#0d0b1f')
    g.addColorStop(1, '#020205')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (const s of stars) {
      s.x -= s.z * 0.6
      if (s.x < 0) s.x += canvas.width
      const a = 0.45 + 0.55 * Math.abs(Math.sin(t * 0.002 + s.twinkle))
      ctx.fillStyle = `rgba(${200 + s.z * 55},${200 + s.z * 40},255,${a * s.z})`
      ctx.fillRect(s.x, s.y, s.z * 2.2, s.z * 2.2)
    }

    const px = 420 + Math.sin(t * 0.0004) * 14
    const py = 200 + Math.cos(t * 0.0003) * 10
    const planet = ctx.createRadialGradient(px - 18, py - 18, 6, px, py, 56)
    planet.addColorStop(0, '#c9b6ff')
    planet.addColorStop(1, '#3b2a7a')
    ctx.fillStyle = planet
    ctx.beginPath()
    ctx.arc(px, py, 52, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = 'rgba(214,200,255,0.55)'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.ellipse(px, py, 88, 18, -0.35, 0, Math.PI * 2)
    ctx.stroke()

    ctx.fillStyle = 'rgba(255,255,255,0.04)'
    for (let y = 0; y < canvas.height; y += 4) ctx.fillRect(0, y, canvas.width, 1)

    texture.needsUpdate = true
  }

  return { texture, draw }
}

function box(w: number, h: number, d: number, radius: number, color: number, roughness = 0.75) {
  return new THREE.Mesh(
    new RoundedBoxGeometry(w, h, d, 4, radius),
    new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.02 }),
  )
}

function buildComputer(screen: THREE.Texture) {
  const group = new THREE.Group()

  const body = box(2.3, 2.5, 2.1, 0.12, BEIGE)
  body.position.y = 0.35
  group.add(body)

  const chin = box(2.3, 0.75, 2.1, 0.12, BEIGE_DARK)
  chin.position.y = -1.25
  group.add(chin)

  const frame = box(2.0, 1.8, 0.12, 0.08, BEIGE_LIGHT)
  frame.position.set(0, 0.6, 1.02)
  group.add(frame)

  const bezel = box(1.66, 1.3, 0.1, 0.12, 0x1a1a1a, 0.4)
  bezel.position.set(0, 0.68, 1.1)
  group.add(bezel)

  const glass = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.14),
    new THREE.MeshBasicMaterial({ map: screen, toneMapped: false }),
  )
  glass.position.set(0, 0.68, 1.156)
  group.add(glass)

  const slotPlate = box(0.9, 0.14, 0.04, 0.03, BEIGE_LIGHT)
  slotPlate.position.set(0.45, -0.55, 1.07)
  group.add(slotPlate)

  const slot = box(0.72, 0.045, 0.03, 0.01, 0x111111, 0.5)
  slot.position.set(0.4, -0.55, 1.092)
  group.add(slot)

  const ventMaterial = new THREE.MeshStandardMaterial({ color: 0x3a342c, roughness: 0.9 })
  const ventGeometry = new THREE.BoxGeometry(0.02, 0.09, 0.02)
  for (let i = 0; i < 18; i++) {
    const vent = new THREE.Mesh(ventGeometry, ventMaterial)
    vent.position.set(0.05 + i * 0.045, -1.0, 1.051)
    group.add(vent)
  }

  const port = box(0.28, 0.18, 0.04, 0.03, BEIGE_LIGHT)
  port.position.set(0.82, -1.35, 1.06)
  group.add(port)

  return group
}

export default function RetroComputer({ className = '' }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50)
    camera.position.set(0, 0, 9.6)

    scene.add(new THREE.AmbientLight(0xffffff, 1.1))
    const key = new THREE.DirectionalLight(0xfff4e6, 2.2)
    key.position.set(3, 4, 5)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0xc9d6ff, 0.9)
    rim.position.set(-4, 2, -3)
    scene.add(rim)

    const { texture, draw } = makeScreen()
    const computer = buildComputer(texture)
    scene.add(computer)

    const target = { x: 0, y: -0.35 }
    const current = { x: 0, y: -0.35 }

    function resize() {
      const { width, height } = mount!.getBoundingClientRect()
      renderer.setSize(width, height, false)
      renderer.domElement.style.width = '100%'
      renderer.domElement.style.height = '100%'
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    function onPointerMove(e: PointerEvent) {
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      target.y = -0.35 + nx * 0.8
      target.x = ny * 0.35
    }

    let frame = 0
    let visible = true
    function render(t: number) {
      current.x += (target.x - current.x) * 0.06
      current.y += (target.y - current.y) * 0.06
      computer.rotation.set(current.x, current.y, 0)
      computer.position.y = reduceMotion ? 0 : Math.sin(t * 0.0012) * 0.08
      draw(reduceMotion ? 0 : t)
      renderer.render(scene, camera)
      if (!reduceMotion && visible) frame = requestAnimationFrame(render)
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !reduceMotion) {
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(render)
      }
    })

    resize()
    render(0)
    const ro = new ResizeObserver(() => {
      resize()
      if (reduceMotion) render(0)
    })
    ro.observe(mount)
    io.observe(mount)
    if (!reduceMotion) window.addEventListener('pointermove', onPointerMove)

    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      computer.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose()
          ;(obj.material as THREE.Material).dispose()
        }
      })
      texture.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={mountRef} aria-hidden className={className} />
}
