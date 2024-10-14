import PublicacionesListado from './components/pages/PublicacionesListado'
import Dashboard from './components/pages/Dashboard'
import Sidebar from './components/Sidebar'
import DetallesPublicacion from './components/pages/DetallesPublicacion'  

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import { useState } from 'react'

function App() {
  // TEMPORAL
  const [isOpened, setIsOpened] = useState(true)

  return (
    <>
      <Router>
        <Sidebar
          isOpened={isOpened}
        />
        <div className="content">
          <Routes>
            <Route path="/" element={<PublicacionesListado isOpened={isOpened} setIsOpened={setIsOpened} />} />
            <Route path="/dashboard"  element={<Dashboard isOpened={isOpened} setIsOpened={setIsOpened} />}  />
            <Route path="/publicacion/:id" element={<DetallesPublicacion isOpened={isOpened} setIsOpened={setIsOpened} />} />
          </Routes>
        </div>
      </Router>





    </>
  )
}

export default App
