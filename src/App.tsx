import { useState } from 'react'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Tools from './components/Tools'
import Experience from './components/Experience'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useLenis } from './lib/useLenis'

function App() {
  const [loading, setLoading] = useState(true)
  useLenis()

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      {!loading && <Navbar />}
      <div
        aria-hidden
        className="site-container pointer-events-none fixed inset-y-0 left-0 right-0 z-50 border-x border-neutral-200"
      />
      <main className="bg-white">
        <Hero />
        <Projects />
        <div className="site-container bg-[#070707]">
          <Tools />
          <Experience />
        </div>
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
