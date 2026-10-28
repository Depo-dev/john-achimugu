import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Life from './pages/Life'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetail from './pages/ProjectDetail'
import ContactPage from './pages/ContactPage'
import { NavProvider } from './lib/navigation'
import { useLenis } from './lib/useLenis'

function App() {
  const [loading, setLoading] = useState(true)
  useLenis()

  return (
    <NavProvider>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      {!loading && <Navbar />}
      <div
        aria-hidden
        className="site-container pointer-events-none fixed inset-y-0 left-0 right-0 z-50 border-x border-neutral-200"
      />
      <main className="bg-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/life" element={<Life />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </NavProvider>
  )
}

export default App
