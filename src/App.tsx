import { useState } from 'react'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'

const SECTIONS = ['home', 'life', 'projects', 'resume', 'contact']

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      {!loading && <Navbar />}
      <main className="bg-white">
        {SECTIONS.map((id) => (
          <section
            key={id}
            id={id}
            className="flex h-screen items-center justify-center border-b border-neutral-200 text-black"
          >
            <h2 className="font-epilogue text-3xl capitalize">{id}</h2>
          </section>
        ))}
      </main>
    </>
  )
}

export default App
