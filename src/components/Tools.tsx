import Asterisk from './Asterisk'

const ICON = 'h-8 w-8'

const TOOLS = [
  { name: 'Figma', icon: 'figma.svg', size: ICON },
  { name: 'Mobbin', icon: 'mobbin.svg', size: 'h-5' },
  { name: 'Framer', icon: 'framer.svg', size: 'h-6' },
  { name: 'Claude', icon: 'claude.svg', size: 'h-6' },
  { name: 'Cursor', icon: 'cursor.svg', size: 'h-6' },
  { name: 'Notion', icon: 'notion.svg', size: 'h-7' },
  { name: 'ChatGPT', icon: 'chatgpt.svg', size: ICON },
  { name: 'Adobe XD', icon: 'adobe-xd.svg', size: ICON },
  { name: 'Adobe Illustrator', icon: 'adobe-illustrator.svg', size: ICON },
  { name: 'Slack', icon: 'slack.svg', size: ICON },
  { name: 'Miro', icon: 'symbol.svg', size: ICON },
  { name: 'Canva', icon: 'canva.svg', size: ICON },
]

export default function Tools() {
  return (
    <section id="tools" className="font-epilogue">
      <div className="px-6 pt-14 pb-10 md:px-10">
        <p className="flex items-center gap-1.5 text-sm text-neutral-400">
          <Asterisk className="h-3 w-3 bg-neutral-500" />
          Tools
        </p>
        <h2 className="mt-2 font-moonwalk text-3xl text-white md:text-4xl">THE COCKPIT</h2>
        <p className="mt-3 text-sm text-neutral-400">
          I am always committed to staying updated with the latest design trends and technologies
        </p>
      </div>

      <ul className="grid grid-cols-3 border-t border-neutral-800 md:grid-cols-6">
        {TOOLS.map((tool) => (
          <li
            key={tool.name}
            className="flex h-20 items-center justify-center border-r border-b border-neutral-800 px-4 nth-[3n]:border-r-0 md:nth-[3n]:border-r md:nth-[6n]:border-r-0"
          >
            <img
              src={`/images/${tool.icon}`}
              alt={tool.name}
              title={tool.name}
              loading="lazy"
              className={`${tool.size} max-w-full object-contain`}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
