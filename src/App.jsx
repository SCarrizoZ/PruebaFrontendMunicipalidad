import PublicacionesListado from './components/PublicacionesListado'
import Dashboard from './components/Dashboard'
import Sidebar from './components/Sidebar'

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
            
          </Routes>
        </div>
      </Router>





    </>
  )
}

export default App
