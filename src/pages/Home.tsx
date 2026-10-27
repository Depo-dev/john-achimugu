import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Tools from '../components/Tools'
import Experience from '../components/Experience'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import { useLandOnSection } from '../lib/navContext'

export default function Home() {
  useLandOnSection()

  return (
    <>
      <Hero />
      <Projects />
      <div className="site-container bg-[#070707]">
        <Tools />
        <Experience />
      </div>
      <Testimonials />
      <Contact />
    </>
  )
}
