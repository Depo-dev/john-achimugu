import { useEffect, useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AppRoutes from './AppRoutes'
import { NavProvider } from './lib/navigation'
import { isLockPage } from './lib/projectLock'
import { applySeo, seoFor } from './lib/seo'
import { useLenis } from './lib/useLenis'

function App() {
  const [loading, setLoading] = useState(true)
  const [navReady, setNavReady] = useState(false)
  useLenis()
  const { pathname } = useLocation()
  const lockPage = isLockPage(pathname)
  useLayoutEffect(() => {
    document.documentElement.classList.add('app-ready')
  }, [])
  useEffect(() => {
    applySeo(seoFor(pathname))
  }, [pathname])
  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', pathname === '/resume' || lockPage)
  }, [pathname, lockPage])

  return (
    <NavProvider>
      {loading && (
        <Preloader onReveal={() => setNavReady(true)} onComplete={() => setLoading(false)} />
      )}
      {(navReady || !loading) && <Navbar />}
      {!lockPage && (
        <div
          aria-hidden
          className="site-container pointer-events-none fixed inset-y-0 left-0 right-0 z-50 border-x border-neutral-200 dark:border-neutral-800"
        />
      )}
      <main className="bg-white dark:bg-black">
        <AppRoutes />
      </main>
      {!lockPage && <Footer />}
    </NavProvider>
  )
}

export default App
