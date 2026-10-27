const COMPANIES = ['Floatmerchant', 'Luvira', 'DartX', 'NetworkX', 'Ibx', 'Ustacky', 'Browiso']

const TAGS = [
  'Design',
  'Brand Identity',
  'Motion',
  'VR',
  'Gaming & AR Enthusiast',
  'Gamer',
  'Saas & Fintech Expert',
  'Job Hunter',
]

function Asterisk({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 bg-lime ${className}`}
      style={{
        WebkitMaskImage: 'url(/images/asterisk.svg)',
        maskImage: 'url(/images/asterisk.svg)',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
      }}
    />
  )
}

export default function Hero() {
  return (
    <section id="home" className="flex flex-col bg-white pt-28 font-epilogue">
      <div className="site-container px-6 pb-16 md:px-10">
        <div className="mb-10 flex justify-end">
          <div className="flex items-center gap-2.5 rounded-full border border-neutral-200 py-1.5 pr-4 pl-1.5 text-sm">
            <span className="rounded-full bg-lime px-3 py-1 font-moonwalk text-[11px] tracking-wide text-black uppercase">
              Mission Status
            </span>
            <span className="text-neutral-700">Available for new opportunities</span>
          </div>
        </div>

        <h1 className="max-w-4xl text-3xl leading-snug text-neutral-800 md:text-4xl">
          Hi! I'm <span className="font-semibold text-black">John Achimugu</span>, a Product
          Designer focused on turning complex ideas, business problems, and emerging technologies
          into simple, intuitive, and meaningful digital experiences.
        </h1>

        <p className="mt-8 text-sm text-neutral-400">
          currently @{' '}
          {COMPANIES.map((c, i) => (
            <span key={c}>
              {c}
              {i < COMPANIES.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>
      </div>

      <div className="site-container overflow-hidden bg-black py-4">
        <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
          {[...TAGS, ...TAGS].map((tag, i) => (
            <span key={i} className="flex items-center gap-10 text-sm font-medium text-white">
              {tag}
              <Asterisk className="h-4 w-4" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
