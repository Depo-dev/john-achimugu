import { useCallback, useEffect, useRef, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PageTransition, { type PageTransitionHandle } from '../components/PageTransition'
import { NAV_TRANSITION_EVENT, NavContext, PageNavContext, routeFor, scrollToSection, type GoTo, type GoToPage } from './navContext'

export function NavProvider({ children }: { children: ReactNode }) {
  const transitionRef = useRef<PageTransitionHandle>(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const pathRef = useRef(pathname)
  const playing = useRef(false)

  useEffect(() => {
    pathRef.current = pathname
  }, [pathname])

  const playTransition = useCallback((label: string, onCovered: () => void) => {
    if (playing.current) return
    playing.current = true
    window.dispatchEvent(new CustomEvent(NAV_TRANSITION_EVENT, { detail: 'start' }))
    transitionRef.current?.play(label, onCovered, () => {
      playing.current = false
      window.dispatchEvent(new CustomEvent(NAV_TRANSITION_EVENT, { detail: 'end' }))
    })
  }, [])

  const goTo = useCallback<GoTo>(
    (id) => {
      const target = routeFor(id)
      playTransition(id, () => {
        if (pathRef.current === target) scrollToSection(id)
        else navigate(target, { state: { scrollTo: id } })
      })
    },
    [navigate, playTransition],
  )

  const goToPage = useCallback<GoToPage>(
    (path, label) => playTransition(label, () => navigate(path)),
    [navigate, playTransition],
  )

  return (
    <NavContext.Provider value={goTo}>
      <PageNavContext.Provider value={goToPage}>
        {children}
        <PageTransition ref={transitionRef} />
      </PageNavContext.Provider>
    </NavContext.Provider>
  )
}
