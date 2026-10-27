import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import PageTransition, { type PageTransitionHandle } from './PageTransition'

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
  const [activeId, setActiveId] = useState('home')
  const panelRef = useRef<HTMLDivElement>(null)
  const transitionRef = useRef<PageTransitionHandle>(null)

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const pct = max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0
      setProgress(pct)
      setOpen(false)

      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
        (el): el is HTMLElement => !!el,
      )
      const current = sections.find((el) => {
        const rect = el.getBoundingClientRect()
        return rect.top <= 120 && rect.bottom > 120
      })
      if (current) setActiveId(current.id)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!panelRef.current) return
    if (open) {
      gsap.set(panelRef.current, { display: 'block' })
      gsap.fromTo(
        panelRef.current,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.45, ease: 'power3.out' },
      )
    } else {
      gsap.to(panelRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: 'power3.in',
        onComplete: () => gsap.set(panelRef.current, { display: 'none' }),
      })
    }
  }, [open])

  function scrollTo(id: string, label: string) {
    setOpen(false)
    transitionRef.current?.play(label.replace(/\.$/, ''), () => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'instant' as ScrollBehavior })
    })
  }

  return (
    <>
      <nav className="fixed top-6 left-1/2 z-[70] w-[92%] max-w-md -translate-x-1/2 font-epilogue">
      <div className="overflow-hidden rounded-[28px] bg-white p-2.5 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.45)]">
        <div className="flex items-center justify-between rounded-3xl bg-black px-3 py-3">
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/10"
          >
            <img
              src={open ? '/images/Huge-icon.svg' : '/images/menu.svg'}
              alt=""
              className="h-5 w-5"
            />
          </button>

          <span className="rounded-full bg-neutral-700/80 px-4 py-1.5 text-sm font-medium text-white tabular-nums">
            {progress}%
          </span>

          <span className="pr-2 text-sm font-medium text-white">Menu</span>
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
                    onClick={() => scrollTo(item.id, item.label)}
                    className="flex items-center gap-2.5 text-left"
                  >
                    <span
                      aria-hidden
                      className={`inline-block h-[18px] w-[18px] shrink-0 transition-colors ${
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
        </div>
      </div>
      </nav>
      <PageTransition ref={transitionRef} />
    </>
  )
}
