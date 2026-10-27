import Contact from '../components/Contact'
import ProjectGallery from '../components/ProjectGallery'
import { useLandOnSection } from '../lib/navContext'

export default function ProjectsPage() {
  useLandOnSection()

  return (
    <div className="font-epilogue">
      <section className="site-container px-6 pt-36 pb-6 md:px-10">
        <h1 className="font-moonwalk text-5xl leading-none text-black md:text-7xl lg:text-8xl">
          <span className="flex items-center gap-6">
            PROJECTS
            <span
              aria-hidden
              className="h-[0.07em] flex-1"
              style={{
                backgroundImage: 'repeating-linear-gradient(to right, currentColor 0 0.35em, transparent 0.35em 0.5em)',
              }}
            />
          </span>
          <span className="mt-4 flex items-center gap-6">
            ©2020
            <span aria-hidden className="h-[0.1em] flex-1 bg-current" />
            2026
          </span>
        </h1>
      </section>

      <section id="projects-list">
        <ProjectGallery />
      </section>

      <div className="site-container border-t border-neutral-200" />
      <Contact />
    </div>
  )
}
