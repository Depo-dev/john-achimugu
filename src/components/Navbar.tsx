import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useLocation } from 'react-router-dom'
import { activeIdFor, NAV_TRANSITION_EVENT, useSiteNav } from '../lib/navContext'

const NAV_ITEMS = [
  { id: 'home', label: 'home.' },
  { id: 'life', label: 'life.' },
  { id: 'projects', label: 'projects.' },
  { id: 'resume', label: 'resume.' },
  { id: 'contact', label: 'contact.' },
]

const SOCIALS = [
  { href: 'https://linkedin.com', icon: '/images/linkedin.svg', label: 'LinkedIn' },
  { href: 'https://x.com', icon: '/images/x.svg', label: 'X' },
  { href: 'https://instagram.com', icon: '/images/instagram.svg', label: 'Instagram' },
  { href: 'https://github.com', icon: '/images/github.svg', label: 'GitHub' },
  { href: 'https://dribbble.com', icon: '/images/dribble.svg', label: 'Dribbble' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [spiedId, setSpiedId] = useState('home')
  const [collapsed, setCollapsed] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const goTo = useSiteNav()
  const { pathname } = useLocation()
  const activeId = activeIdFor(pathname) ?? spiedId
  const lastY = useRef(0)

  const shellRef = useRef<HTMLDivElement>(null)
  const expandedRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)
  const expandedWrapRef = useRef<HTMLDivElement>(null)
  const pillWrapRef = useRef<HTMLDivElement>(null)
  const hasPlaced = useRef(false)
  const panelWasOpen = useRef(false)
  const collapsedRef = useRef(collapsed)
  const transitioning = useRef(false)

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const y = window.scrollY
      const pct = max > 0 ? Math.min(100, Math.round((y / max) * 100)) : 0
      setProgress(pct)

      const goingDown = y > lastY.current
      if (transitioning.current) {
        // Page transitions own the collapse/expand; ignore the jump they cause.
      } else if (y <= 24) {
        setCollapsed(false)
      } else if (goingDown) {
        setCollapsed(true)
        setOpen(false)
      } else {
        setCollapsed(false)
      }
      lastY.current = y

      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
        (el): el is HTMLElement => !!el,
      )
      const current = sections.find((el) => {
        const rect = el.getBoundingClientRect()
        return rect.top <= 120 && rect.bottom > 120
      })
      if (current) setSpiedId(current.id)
    }

    function onTransition(e: Event) {
      const phase = (e as CustomEvent<'start' | 'end'>).detail
      transitioning.current = phase === 'start'
      setOpen(false)
      setCollapsed(phase === 'start')
      lastY.current = window.scrollY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener(NAV_TRANSITION_EVENT, onTransition)
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener(NAV_TRANSITION_EVENT, onTransition)
    }
  }, [])

  // Morph the shell between the expanded-bar rect and the pill rect.
  useLayoutEffect(() => {
    const shell = shellRef.current
    const expandedWrap = expandedWrapRef.current
    const pillWrap = pillWrapRef.current
    if (!shell || !expandedWrap || !pillWrap) return

    // Measure both target geometries (both are kept in the DOM, laid out via
    // fixed positioning so getBoundingClientRect reflects their true size).
    const expandedRect = expandedRef.current!.getBoundingClientRect()
    const pillRect = pillRef.current!.getBoundingClientRect()

    collapsedRef.current = collapsed
    const target = collapsed ? pillRect : expandedRect
    const duration = hasPlaced.current ? 0.6 : 0
    hasPlaced.current = true

    gsap.to(shell, {
      top: target.top,
      left: target.left,
      width: target.width,
      height: target.height,
      borderRadius: collapsed ? pillRect.height / 2 : 0,
      boxShadow: collapsed
        ? '0 20px 50px -10px rgba(0,0,0,0.45)'
        : '0 0px 0px 0px rgba(0,0,0,0)',
      duration,
      ease: 'power3.inOut',
      overwrite: true,
    })

    gsap.to(expandedWrap, {
      opacity: collapsed ? 0 : 1,
      pointerEvents: collapsed ? 'none' : 'auto',
      duration: collapsed ? 0.2 : 0.35,
      delay: collapsed ? 0 : 0.25,
      overwrite: true,
    })
    gsap.to(pillWrap, {
      opacity: collapsed ? 1 : 0,
      pointerEvents: collapsed ? 'auto' : 'none',
      duration: collapsed ? 0.35 : 0.2,
      delay: collapsed ? 0.25 : 0,
      overwrite: true,
    })
  }, [collapsed])

  useEffect(() => {
    const panel = panelRef.current
    const shell = shellRef.current
    const pillRect = pillRef.current
    if (!panel || !shell || !pillRect) return
    const wasOpen = panelWasOpen.current
    panelWasOpen.current = open
    if (!open && !wasOpen) return

    if (open) {
      const pillTargetRect = pillRect.getBoundingClientRect()
      gsap.set(panel, { display: 'block' })
      gsap.set(shell, { width: pillTargetRect.width })
      const panelHeight = panel.scrollHeight
      const pillBaseHeight = pillTargetRect.height

      gsap.fromTo(
        panel,
        { height: 0, opacity: 0 },
        { height: panelHeight, opacity: 1, duration: 0.45, ease: 'power3.out' },
      )
      gsap.to(shell, {
        height: pillBaseHeight + panelHeight,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    } else {
      const pillBaseHeight = pillRect.getBoundingClientRect().height
      gsap.to(panel, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: 'power3.in',
        onComplete: () => gsap.set(panel, { display: 'none' }),
      })
      if (collapsedRef.current) {
        gsap.to(shell, {
          height: pillBaseHeight,
          duration: 0.35,
          ease: 'power3.in',
          overwrite: 'auto',
        })
      }
    }
  }, [open])

  function scrollTo(id: string) {
    setOpen(false)
    goTo(id)
  }

  // Small screens: the bar hamburger morphs the bar into the pill with its menu open.
  function openMenuFromBar() {
    setCollapsed(true)
    setOpen(true)
  }

  function toggleMenu() {
    if (open && window.scrollY <= 24) setCollapsed(false)
    setOpen((v) => !v)
  }

  return (
    <>
      {/* Invisible reference layouts used purely for measuring target geometry */}
      <div ref={expandedRef} className="fixed top-0 left-0 w-full" style={{ visibility: 'hidden' }}>
        <div className="mx-auto max-w-6xl px-6 py-5 md:px-10">
          <div className="h-[2.875rem]" />
        </div>
      </div>
      <div
        ref={pillRef}
        className="fixed top-6 left-1/2 w-[92%] max-w-md -translate-x-1/2"
        style={{ visibility: 'hidden' }}
      >
        <div className="h-20" />
      </div>

      {/* The morphing shell */}
      <div
        ref={shellRef}
        className={`fixed z-[65] overflow-hidden bg-white ${collapsed ? '' : 'dark:bg-black'}`}
      >
        {/* Expanded bar content */}
        <div
          ref={expandedWrapRef}
          className="absolute inset-0 font-epilogue"
        >
          <div className="site-container flex h-full items-center justify-between border-x border-b border-neutral-200 px-6 dark:border-neutral-800 md:px-10">
            <button
              type="button"
              aria-label="John Achimugu — home"
              onClick={() => scrollTo('home')}
              className="font-moonwalk text-lg tracking-wide text-black dark:text-white"
            >
              JOHN ACHIMUGU
            </button>

            <ul className="hidden items-center gap-7 md:flex">
              {NAV_ITEMS.filter((item) => item.id !== 'home').map((item) => {
                const isActive = item.id === activeId
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => scrollTo(item.id)}
                      className="flex items-center gap-1.5 text-sm"
                    >
                      <span
                        aria-hidden
                        className={`inline-block h-3 w-3 shrink-0 ${isActive ? 'bg-lime' : 'bg-neutral-400'}`}
                        style={{
                          WebkitMaskImage: 'url(/images/asterisk.svg)',
                          maskImage: 'url(/images/asterisk.svg)',
                          WebkitMaskSize: 'contain',
                          maskSize: 'contain',
                          WebkitMaskRepeat: 'no-repeat',
                          maskRepeat: 'no-repeat',
                        }}
                      />
                      <span className={isActive ? 'font-semibold text-black dark:text-white' : 'text-neutral-500'}>
                        {item.label}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>

            <button
              type="button"
              onClick={() => goTo('contact')}
              className="hidden items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 md:flex dark:bg-neutral-800 dark:hover:bg-neutral-700"
            >
              <img src="/images/sms.svg" alt="" className="h-4 w-4 invert" />
              Let's Talk
            </button>

            <button
              type="button"
              aria-label="Open menu"
              onClick={openMenuFromBar}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black transition-colors hover:bg-neutral-800 md:hidden dark:bg-neutral-800"
            >
              <img src="/images/menu.svg" alt="" className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Pill content */}
        <div ref={pillWrapRef} className="absolute inset-x-0 top-0 p-2.5 font-epilogue opacity-0">
            <div className="relative flex items-center justify-between rounded-full bg-black px-3 py-3">
              <button
                type="button"
                aria-label="John Achimugu — home"
                onClick={() => scrollTo('home')}
                className="flex h-9 items-center px-3 font-moonwalk text-lg tracking-wide text-white"
              >
                JA
              </button>

              <span className="absolute left-1/2 -translate-x-1/2 rounded-full bg-neutral-700/80 px-4 py-1.5 text-sm font-medium text-white tabular-nums">
                {progress}%
              </span>

              <button
                type="button"
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={toggleMenu}
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/10"
              >
                <img
                  src={open ? '/images/Huge-icon.svg' : '/images/menu.svg'}
                  alt=""
                  className="h-5 w-5"
                />
              </button>
            </div>

            <div ref={panelRef} className="hidden overflow-hidden px-3 pb-3">
              <p className="pt-5 pb-4 text-xs text-neutral-400">Menu</p>
              <ul className="flex flex-col gap-5">
                {NAV_ITEMS.map((item) => {
                  const isActive = item.id === activeId
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => scrollTo(item.id)}
                        className="flex items-center gap-2.5 text-left"
                      >
                        <span
                          aria-hidden
                          className={`inline-block size-[1.125rem] shrink-0 transition-colors ${
                            isActive ? 'bg-lime' : 'bg-neutral-400'
                          }`}
                          style={{
                            WebkitMaskImage: 'url(/images/asterisk.svg)',
                            maskImage: 'url(/images/asterisk.svg)',
                            WebkitMaskSize: 'contain',
                            maskSize: 'contain',
                            WebkitMaskRepeat: 'no-repeat',
                            maskRepeat: 'no-repeat',
                          }}
                        />
                        <span className={isActive ? 'font-semibold text-black' : 'text-black'}>
                          {item.label}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>

              <div className="my-5 border-t border-dashed border-neutral-300" />

              <p className="pb-4 text-xs text-neutral-400">Socials</p>
              <div className="flex gap-3 pb-2">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 transition-colors hover:bg-neutral-700"
                  >
                    <span
                      aria-hidden
                      className="h-4 w-4 bg-lime"
                      style={{
                        WebkitMaskImage: `url(${social.icon})`,
                        maskImage: `url(${social.icon})`,
                        WebkitMaskSize: 'contain',
                        maskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        maskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                        maskPosition: 'center',
                      }}
                    />
                  </a>
                ))}
              </div>

              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-black py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800 md:hidden"
              >
                <img src="/images/sms.svg" alt="" className="h-4 w-4 invert" />
                Let's Talk
              </button>
            </div>
        </div>
      </div>
    </>
  )
}
