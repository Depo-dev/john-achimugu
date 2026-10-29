import Asterisk from './Asterisk'
import ProjectGallery from './ProjectGallery'
import { PROJECTS } from '../data/projects'

export default function Projects() {
  return (
    <section id="projects" className="bg-white font-epilogue">
      <div className="site-container border-b border-neutral-200 px-6 pt-16 pb-8 md:px-10">
        <p className="flex items-center gap-1.5 text-sm text-neutral-500">
          <Asterisk className="h-3 w-3 bg-neutral-400" />
          projects
        </p>
        <div className="mt-2 flex items-start gap-2">
          <h2 className="font-moonwalk text-3xl text-black md:text-4xl">MISSION CONTROL</h2>
          <span className="mt-1 rounded-full bg-neutral-100 px-2 py-0.5 text-[0.625rem] font-medium text-neutral-600">
            {PROJECTS.length}
          </span>
        </div>
        <p className="mt-3 text-sm text-neutral-500">
          Here are some of the missions I've worked on and helped navigate.
        </p>
      </div>

      <ProjectGallery limit={9} />
    </section>
  )
}
