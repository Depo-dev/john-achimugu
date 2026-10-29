import { useCallback, useEffect, useRef, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PageTransition, { type PageTransitionHandle } from '../components/PageTransition'
import { NAV_TRANSITION_EVENT, NavContext, routeFor, scrollToSection, type GoTo } from './navContext'

export function NavProvider({ children }: { children: ReactNode }) {
  const transitionRef = useRef<PageTransitionHandle>(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const pathRef = useRef(pathname)

  useEffect(() => {
    pathRef.current = pathname
  }, [pathname])

  const goTo = useCallback<GoTo>(
    (id) => {
      const target = routeFor(id)
      window.dispatchEvent(new CustomEvent(NAV_TRANSITION_EVENT, { detail: 'start' }))
      transitionRef.current?.play(
        id,
        () => {
          if (pathRef.current === target) scrollToSection(id)
          else navigate(target, { state: { scrollTo: id } })
        },
        () => window.dispatchEvent(new CustomEvent(NAV_TRANSITION_EVENT, { detail: 'end' })),
      )
    },
    [navigate],
  )

  return (
    <NavContext.Provider value={goTo}>
      {children}
      <PageTransition ref={transitionRef} />
    </NavContext.Provider>
  )
}
