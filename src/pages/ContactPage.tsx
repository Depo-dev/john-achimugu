import { lazy, Suspense, useState, type FormEvent } from 'react'
import Contact from '../components/Contact'
import { useLandOnSection } from '../lib/navContext'

const RetroComputer = lazy(() => import('../components/RetroComputer'))

const EMAIL = 'achimugunusa11@gmail.com'
const PHONE = '+234 811 804 7150'

const SOCIALS = [
  { href: 'https://linkedin.com', icon: '/images/linkedin.svg', label: 'LinkedIn' },
  { href: 'https://x.com', icon: '/images/x.svg', label: 'X' },
  { href: 'https://instagram.com', icon: '/images/instagram.svg', label: 'Instagram' },
  { href: 'https://github.com', icon: '/images/github.svg', label: 'GitHub' },
  { href: 'https://dribbble.com', icon: '/images/dribble.svg', label: 'Dribbble' },
]

const FIELDS = [
  { name: 'name', label: 'What is your name?', placeholder: 'John Doe', type: 'text', required: true, autoComplete: 'name' },
  { name: 'email', label: 'What is your email?', placeholder: 'pete@spotify.com', type: 'email', required: true, autoComplete: 'email' },
  { name: 'organization', label: 'What is the name of your organization?', placeholder: 'Acme Inc.', type: 'text', required: false, autoComplete: 'organization' },
  { name: 'services', label: 'What services are you looking for?', placeholder: 'Product Design, Web Development, Brand Identity...', type: 'text', required: false, autoComplete: 'off' },
] as const

function ContactForm() {
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const get = (key: string) => String(data.get(key) ?? '').trim()
    const details = [
      `Name: ${get('name')}`,
      `Email: ${get('email')}`,
      get('organization') && `Organization: ${get('organization')}`,
      get('services') && `Services: ${get('services')}`,
    ].filter(Boolean)
    const body = [details.join('\n'), get('message')].filter(Boolean).join('\n\n')
    const subject = `New project enquiry from ${get('name')}`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const inputClass =
    'mt-2 w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm text-black placeholder:text-neutral-400 outline-none transition-colors focus:border-black'

  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-neutral-200 p-6 font-nunito-sans md:p-7">
      <div className="space-y-5">
        {FIELDS.map((f) => (
          <label key={f.name} className="block text-sm text-black">
            {f.label}
            {f.required && <span className="text-red-500">*</span>}
            <input
              name={f.name}
              type={f.type}
              required={f.required}
              autoComplete={f.autoComplete}
              placeholder={f.placeholder}
              className={inputClass}
            />
          </label>
        ))}
        <label className="block text-sm text-black">
          Your message
          <textarea
            name="message"
            rows={3}
            placeholder="Hello John, can you help me with..."
            className={`${inputClass} resize-y`}
          />
        </label>
      </div>
      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-black py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
      >
        Submit
      </button>
      {sent && (
        <p role="status" className="mt-4 text-center text-xs text-neutral-500">
          Your email app should open with your message ready to send. If it doesn't, email{' '}
          <a href={`mailto:${EMAIL}`} className="text-black underline">
            {EMAIL}
          </a>
          .
        </p>
      )}
    </form>
  )
}

export default function ContactPage() {
  useLandOnSection()

  return (
    <div className="font-epilogue">
      <section className="site-container grid gap-14 border-b border-neutral-200 px-6 pt-36 pb-24 md:px-10 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
        <div>
          <h1 className="font-moonwalk text-4xl leading-tight text-black md:text-5xl">
            LET'S START A
            <br />
            PROJECT TOGETHER
          </h1>
          <div className="mt-14">
            <ContactForm />
          </div>
        </div>

        <div>
          <div className="aspect-[3/4] w-full max-w-md">
            <Suspense fallback={<div className="h-full w-full rounded-2xl bg-neutral-100" />}>
              <RetroComputer className="h-full w-full" />
            </Suspense>
          </div>

          <p className="mt-10 text-sm text-neutral-500">Contact Details</p>
          <a href={`mailto:${EMAIL}`} className="mt-3 block tracking-wide text-black hover:opacity-60">
            {EMAIL}
          </a>
          <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="mt-1 block tracking-wide text-black hover:opacity-60">
            {PHONE}
          </a>

          <p className="mt-10 text-sm text-neutral-500">Socials</p>
          <div className="mt-4 flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 transition-colors hover:bg-neutral-200"
              >
                <span
                  aria-hidden
                  className="h-4 w-4 bg-neutral-700"
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
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </div>
  )
}
