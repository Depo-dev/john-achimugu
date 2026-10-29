import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import gsap from 'gsap'

export type PageTransitionHandle = {
  play: (label: string, onCovered: () => void, onDone?: () => void) => void
}

const PageTransition = forwardRef<PageTransitionHandle>((_, ref) => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const [label, setLabel] = useState('')

  useImperativeHandle(ref, () => ({
    play(nextLabel, onCovered, onDone) {
      setLabel(nextLabel)
      const overlay = overlayRef.current
      const labelEl = labelRef.current
      if (!overlay || !labelEl) return

      gsap.set(overlay, { yPercent: 100, display: 'flex' })
      gsap.set(labelEl, { opacity: 0, y: 16 })

      const tl = gsap.timeline()
      tl.to(overlay, { yPercent: 0, duration: 0.6, ease: 'power4.inOut' })
        .to(labelEl, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, '-=0.2')
        .call(() => onCovered())
        .to({}, { duration: 0.25 })
        .to(labelEl, { opacity: 0, y: -16, duration: 0.25, ease: 'power2.in' })
        .to(overlay, {
          yPercent: -100,
          duration: 0.6,
          ease: 'power4.inOut',
          onComplete: () => {
            gsap.set(overlay, { display: 'none', yPercent: 100 })
            onDone?.()
          },
        })
    },
  }))

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60] hidden items-center justify-center bg-lime"
      style={{ display: 'none' }}
    >
      <span
        ref={labelRef}
        className="font-moonwalk text-4xl uppercase tracking-wide text-black md:text-6xl"
      >
        {label}
      </span>
    </div>
  )
})

PageTransition.displayName = 'PageTransition'

export default PageTransition
