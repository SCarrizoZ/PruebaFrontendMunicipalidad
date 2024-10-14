import React from 'react'
import logo from '../assets/logotipo-muni.png'
const Sidebar = ({
  isOpened
}) => {
  
  return (
    <nav className={`sidebar ${!isOpened ? "closed" : "" }`}>
      <header className="sidebar-header">
        <div className="logo-cont">
          <img className='logo-image' src={logo} alt="Logo de la municipalidad" />
        </div>
        <span>Dashboard Municipal</span>
      </header>
      <ul className="sidebar-list">
        <li>
          <a href="#">Inicio</a>
        </li>
        <li>
          <a href="#">Publicaciones</a>
        </li>
        <li>
          <a href="#">Usuarios</a>
        </li>
        <li>
          <a href="#">Cerrar sesión</a>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar