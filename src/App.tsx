import { useState } from 'react'
import Preloader from './components/Preloader'

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <div />
    </>
  )
}

export default App
