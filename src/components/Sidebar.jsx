import React from 'react'
import logo from '../assets/logotipo-muni.png'
const Sidebar = ({
  isOpened
}) => {

  return (
    <nav className={`sidebar ${!isOpened ? "closed" : ""}`}>
      <header className="sidebar-header">
        <div className="logo-cont">
          <img className='logo-image' src={logo} alt="Logo de la municipalidad" />
        </div>
        <span>Dashboard Municipal</span>
      </header>
      <div className="menu">
        <ul className="menu-list">
          <li class="nav-link">
            <a href="#">
              <i class="bx bx-pie-chart icon"></i>
              <span class="text nav-text">
                Dashboard
              </span>
            </a>
          </li>
          <li class="nav-link">
            <a href="#">
              <i class="bx bx-file icon"></i>
              <span class="text nav-text">
                Publicaciones
              </span>
            </a>
          </li>
          <li class="nav-link">
            <a href="#">
              <i class="bx bx-file icon"></i>
              <span class="text nav-text">
                Anuncios
              </span>
            </a>
          </li>
          <li class="nav-link">
            <a href="#">
              <i class="bx bx-bar-chart-alt-2 icon"></i>
              <span class="text nav-text">
                Reportes
              </span>
            </a>
          </li>
          <li class="nav-link">
            <a href="#">
              <i class="bx bx-map-alt icon"></i>
              <span class="text nav-text">
                Mapa
              </span>
            </a>
          </li>


        </ul>


        <div className="bottom-menu">
          <li class="nav-link">
            <a href="#">
              <i class="bx bx-log-out icon"></i>
              <span class="text nav-text">
                Cerrar sesión
              </span>
            </a>
          </li>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar