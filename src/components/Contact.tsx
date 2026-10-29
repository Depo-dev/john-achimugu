import Asterisk from './Asterisk'
import { useSiteNav } from '../lib/navContext'

const LINKS = ['home', 'life', 'projects', 'resume', 'contact']

const SOCIALS = [
  { href: 'https://linkedin.com', icon: '/images/linkedin.svg', label: 'LinkedIn' },
  { href: 'https://x.com', icon: '/images/x.svg', label: 'X' },
  { href: 'https://instagram.com', icon: '/images/instagram.svg', label: 'Instagram' },
  { href: 'https://github.com', icon: '/images/github.svg', label: 'GitHub' },
  { href: 'https://dribbble.com', icon: '/images/dribble.svg', label: 'Dribbble' },
]

export default function Contact() {
  const goTo = useSiteNav()
  return (
    <section
      id="contact"
      className="site-container flex flex-col gap-12 border-b border-neutral-200 bg-white px-6 py-20 dark:border-neutral-800 dark:bg-black font-epilogue md:flex-row md:items-center md:justify-between md:px-10"
    >
      <div>
        <p className="text-2xl text-black md:text-3xl dark:text-white">
          Have a product that needs a <span className="font-moonwalk">CO-PILOT?</span>
        </p>
        <p className="mt-4 font-moonwalk text-2xl text-black md:text-3xl dark:text-white">LET'S WORK TOGETHER.</p>
        <button
          type="button"
          onClick={() => goTo('contact')}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1.5 text-sm text-black transition-colors hover:bg-neutral-200 dark:bg-white"
        >
          <img src="/images/sms.svg" alt="" className="h-4 w-4" />
          Let's Talk
        </button>
      </div>

      <div className="flex gap-16">
        <ul className="flex flex-col gap-3">
          {LINKS.map((id) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => goTo(id)}
                className="flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-black dark:hover:text-white"
              >
                <Asterisk className="h-3 w-3 bg-neutral-400" />
                {id}.
              </button>
            </li>
          ))}
        </ul>

        <ul className="flex flex-col gap-2">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-7 w-7 items-center justify-center rounded-md bg-neutral-100 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
              >
                <span
                  aria-hidden
                  className="h-3.5 w-3.5 bg-neutral-700 dark:bg-neutral-400"
                  style={{
                    WebkitMaskImage: `url(${s.icon})`,
                    maskImage: `url(${s.icon})`,
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                  }}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
