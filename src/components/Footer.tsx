import Asterisk from './Asterisk'
import { useLocation } from 'react-router-dom'
import DotField from './DotField'

const YEAR = new Date().getFullYear()

export default function Footer() {
  const dark = useLocation().pathname === '/resume'
  return (
    <footer className="site-container bg-white font-epilogue dark:bg-black">
      <div className="h-40 border-b border-neutral-200 px-3 py-4 md:h-44 dark:border-neutral-800">
        <DotField key={String(dark)} dark={dark} />
      </div>
      <div className="flex items-center justify-between px-6 py-6 text-xs text-neutral-500 md:px-10">
        <span className="flex items-center gap-2">
          ©John
          <Asterisk className="h-3 w-3 bg-neutral-400" />
          Achimugu {YEAR}
        </span>
        <span>All Rights Reserved</span>
      </div>
    </footer>
  )
}
