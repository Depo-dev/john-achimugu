import StickerTrail from '../components/StickerTrail'
import Asterisk from '../components/Asterisk'
import Contact from '../components/Contact'
import ExperienceEntry from '../components/ExperienceEntry'
import { EDUCATION, WORK } from '../data/experience'
import { useLandOnSection } from '../lib/navContext'

// Drop photos into public/images/life/ and set `src` to show them instead of placeholders.
const GALLERY = [
  { src: '/images/life/john1.webp', alt: 'Rainy view of a plane wing from the window seat', className: 'aspect-square' },
  { src: '/images/life/john2.webp', alt: 'John on his phone at an outdoor cafe', className: 'aspect-[4/5]' },
  { src: '/images/life/john3.webp', alt: 'Laptop running Out of Words beside a handheld console', className: 'aspect-[4/5]' },
  { src: '/images/life/john4.webp', alt: 'Black and white shot of John’s desk setup', className: 'aspect-[4/5]' },
]

function SectionHeader({ label, title, children }: { label: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="px-6 pt-10 pb-8 md:px-10">
      <p className="flex items-center gap-1.5 text-sm text-neutral-500">
        <Asterisk className="h-3 w-3 bg-neutral-400" />
        {label}
      </p>
      <h2 className="mt-2 font-moonwalk text-3xl text-black md:text-4xl">{title}</h2>
      {children && <p className="mt-3 text-sm text-neutral-500">{children}</p>}
    </div>
  )
}

export default function Life() {
  useLandOnSection()

  return (
    <div className="font-epilogue">
      <section className="site-container border-b border-neutral-200 px-6 pt-36 pb-20 md:px-10">
        <StickerTrail>
          <h1 className="max-w-5xl text-2xl leading-snug text-neutral-800 md:text-3xl">
            I'm <span className="font-semibold text-black">John Achimugu</span>, a Product Designer
            who enjoys turning complex problems into simple, thoughtful, and engaging digital
            experiences. When I'm not designing, I'm usually somewhere between a good game, an
            interesting movie, an anime episode, a gym session, a new destination, or a great
            conversation with an interesting person.
          </h1>
        </StickerTrail>

        <div className="mt-12 max-w-3xl space-y-6 text-sm leading-7 text-neutral-500 md:ml-[12%]">
          <p>
            I've always been curious about how things work. That curiosity naturally found its way
            into design. As a Product Designer, I enjoy taking something complicated, breaking it
            down, understanding the people and systems behind it, and rebuilding the experience into
            something that feels simple and intuitive.
          </p>
          <p>
            I love the moment when a messy problem starts to become clear. That moment feels a little
            like looking at a constellation and suddenly realizing the stars form a pattern. That's
            what design is to me – finding the pattern inside the complexity.
          </p>
          <p>
            I spend a lot of my time thinking about products, users, interfaces, business problems,
            and how technology can make people's lives easier.
          </p>
        </div>
      </section>

      <section className="site-container border-b border-neutral-200">
        <SectionHeader label="my lifestyle" title="LIFE OUTSIDE THE COCKPIT">
          I'm naturally curious, and I enjoy discovering things that give me a different perspective
          on the world.
        </SectionHeader>
        <div className="px-6 pb-20 md:px-10">
          <div className="@container overflow-hidden">
            <div className="animate-marquee-slow flex w-max items-start">
              {[...GALLERY, ...GALLERY].map((photo, i) => (
                <div key={i} className="w-[calc(100cqw/3+0.75rem)] shrink-0 pr-3">
                  <img
                    src={photo.src}
                    alt={i < GALLERY.length ? photo.alt : ''}
                    aria-hidden={i >= GALLERY.length}
                    className={`${photo.className} w-full object-cover`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="resume" className="site-container border-b border-neutral-200">
        <div className="border-b border-neutral-200">
          <SectionHeader label="work experience" title="MY EXPEDITIONS" />
        </div>
        <ul className="grid gap-x-16 gap-y-8 px-6 py-10 md:grid-cols-2 md:px-10">
          {WORK.map((entry) => (
            <ExperienceEntry key={entry.name} entry={entry} theme="light" />
          ))}
        </ul>
      </section>

      <section className="site-container border-b border-neutral-200">
        <div className="border-b border-neutral-200">
          <SectionHeader label="education" title="TRANSMISSION FROM EARTH" />
        </div>
        <ul className="grid gap-x-16 gap-y-8 px-6 py-10 md:grid-cols-2 md:px-10">
          {EDUCATION.map((entry) => (
            <ExperienceEntry key={entry.name} entry={entry} theme="light" />
          ))}
        </ul>
      </section>

      <Contact />
    </div>
  )
}
