import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { useEffect, useState } from 'react'

import {Link} from 'react-router-dom';

const TablaPublicaciones = ({ currentPage, publicacionesPorPagina, setCurrentPage }) => {
  const [publicaciones, setPublicaciones] = useState([])
  const [nextPageUrl, setNextPageUrl] = useState(null)
  const [prevPageUrl, setPrevPageUrl] = useState(null)
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const url_local = import.meta.env.VITE_URL_PROD
  const fetchPublicaciones = (url) => {
    setLoading(true)
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data.results)
        setPublicaciones(data.results)
        // setNextPageUrl(data.next)
        // setPrevPageUrl(data.previous)
        setLoading(false)
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })
  }

  useEffect(() => {
    if (currentPage === 1) {
      fetchPublicaciones("https://backend-dashboard-tau.vercel.app/publicaciones/")
    } else {
      fetchPublicaciones(`${"https://backend-dashboard-tau.vercel.app/publicaciones/"}?page=${currentPage}`)
    }
  }, [currentPage])

  const handleNextPage = () => {
    
      setCurrentPage(currentPage + 1)
      fetchPublicaciones(nextPageUrl)
    
  }

  const handlePrevPage = () => {
    if (prevPageUrl) {
      setCurrentPage(currentPage - 1)
      fetchPublicaciones(prevPageUrl)
    }
  }

  if (loading) return <div>Cargando...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Fecha de publicación</TableHead>
            <TableHead>Junta vecinal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {publicaciones.map((pub) => (
            <TableRow key={pub.id}>
              <TableCell>
                <Link to={`/publicacion/${pub.id}`}>
                  {pub.titulo}
                
                </Link>
              </TableCell>
              <TableCell>{pub.descripcion}</TableCell>
              <TableCell>{pub.situacion.nombre}</TableCell>
              <TableCell>{pub.categoria.nombre}</TableCell>
              <TableCell>{new Date(pub.fecha_publicacion).toLocaleDateString()}</TableCell>
              <TableCell>{pub.junta_vecinal.nombre_calle} {pub.junta_vecinal.numero_calle}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between mt-4">
        <span>Página {currentPage}</span>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => setCurrentPage(1)} disabled={!prevPageUrl}>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setCurrentPage(currentPage - 1)} disabled={
            currentPage > 1 ? false : true
          }>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setCurrentPage(currentPage + 1)} disabled={
            currentPage < 50 ? false : true 
           }>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setCurrentPage(currentPage + 1)} disabled={!nextPageUrl}>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  )
}

export default TablaPublicaciones