import PublicacionesListado from './components/PublicacionesListado'
import Sidebar from './components/Sidebar'
import './index.css'
import { useState } from 'react'

function App() {
  // TEMPORAL
  const [isOpened, setIsOpened] = useState(true)

  return (
    <>
      <Sidebar 
        isOpened={isOpened}
        
      />
      <PublicacionesListado 
        isOpened={isOpened}
        setIsOpened={setIsOpened}
      />
    </>
  )
}

export default App
