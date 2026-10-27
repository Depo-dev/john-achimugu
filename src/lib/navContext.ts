import { createContext, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export type GoTo = (id: string) => void

export const NavContext = createContext<GoTo>(() => {})

const PAGE_ROUTES: Record<string, string> = {
  home: '/',
  life: '/life',
  projects: '/projects',
  contact: '/contact',
}

export function routeFor(id: string) {
  return PAGE_ROUTES[id] ?? '/'
}

export function activeIdFor(pathname: string) {
  return Object.keys(PAGE_ROUTES).find((id) => id !== 'home' && PAGE_ROUTES[id] === pathname)
}

export function scrollToSection(id: string) {
  if (id in PAGE_ROUTES) {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    return
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'instant' as ScrollBehavior })
}

export function useSiteNav() {
  return useContext(NavContext)
}

// Pages call this on mount to land on the section a cross-page link asked for.
export function useLandOnSection() {
  const location = useLocation()
  useEffect(() => {
    const id = (location.state as { scrollTo?: string } | null)?.scrollTo
    if (id) scrollToSection(id)
    else window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [location.key, location.state])
}
