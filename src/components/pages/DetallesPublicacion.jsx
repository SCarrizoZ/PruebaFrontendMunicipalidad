import React from 'react'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeftIcon, MapPinIcon, ImageIcon, FileIcon } from "lucide-react"

import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const DetallesPublicacion = ({ isOpened, setIsOpened }) => {

  const { id } = useParams();
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [publicacion, setPublicacion] = useState({})
  const url_local = import.meta.env.VITE_URL_PROD
  const url = `${"https://backend-dashboard-tau.vercel.app/publicaciones/"}${id}`
  const fetchPublicacion = (url) => {
    setLoading(true)
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data.results)
        console.log(data.results.id)
        setPublicacion(data.results)
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
    fetchPublicacion(url)
  }, [])
  const handleOpenSidebar = () => {
    setIsOpened(!isOpened)
  }
  const [activeTab, setActiveTab] = useState('info')
  return (
    <div className="bg-green-500 min-h-screen p-8">
      <Card className="w-full max-w-4xl mx-auto bg-white">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center mb-4">
            <Button variant="outline" className="bg-white text-green-600 border-green-600 hover:bg-green-50">
              <Link className='w-[100%] flex justify-center'  to="/">
                <ArrowLeftIcon className="mr-2 h-4 w-4" /> 
                <span>Volver al listado</span>
              </Link>
            </Button>
            <div>
              <Button
                variant={activeTab === 'info' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('info')}
                className={`mr-2 ${activeTab === 'info' ? 'bg-green-600 text-white' : 'text-green-600'}`}
              >
                Información
              </Button>
              <Button
                variant={activeTab === 'ubicacion' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('ubicacion')}
                className={`mr-2 ${activeTab === 'ubicacion' ? 'bg-green-600 text-white' : 'text-green-600'}`}
              >
                <MapPinIcon className="mr-2 h-4 w-4" />
                Ubicación
              </Button>
              <Button
                variant={activeTab === 'evidencias' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('evidencias')}
                className={activeTab === 'evidencias' ? 'bg-green-600 text-white' : 'text-green-600'}
              >
                <ImageIcon className="mr-2 h-4 w-4" />
                Evidencias
              </Button>
            </div>
          </div>
          <CardTitle className="text-2xl text-green-700">{publicacion.titulo + ` (${publicacion.id})`}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {activeTab === 'info' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-700">Información general</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="grid grid-cols-1 gap-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="font-medium text-green-600">Categoría:</dt>
                        <dd>Infraestructura</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium text-green-600">Fecha de publicación:</dt>
                        <dd>01/01/2024</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium text-green-600">Junta Vecinal:</dt>
                        <dd>Centro</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium text-green-600">Estado:</dt>
                        <dd><Badge className="bg-green-100 text-green-800">En progreso</Badge></dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium text-green-600">Responsable:</dt>
                        <dd>Juan Pérez</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-700">Detalles del proyecto</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="grid grid-cols-1 gap-2 text-sm">
                      <div>
                        <dt className="font-medium text-green-600">Descripción:</dt>
                        <dd className="mt-1">Descripción del proyecto de ejemplo.</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium text-green-600">Presupuesto:</dt>
                        <dd>$100,000</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium text-green-600">Fecha de inicio:</dt>
                        <dd>01/02/2024</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium text-green-600">Fecha de finalización:</dt>
                        <dd>31/12/2024</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium text-green-600">Avance:</dt>
                        <dd>50%</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-700">Comentarios</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="bg-green-50 p-3 rounded">
                      <p className="text-sm text-green-600 mb-1">María González - 15/01/2024</p>
                      <p>Excelente iniciativa para nuestra comunidad.</p>
                    </li>
                    <li className="bg-green-50 p-3 rounded">
                      <p className="text-sm text-green-600 mb-1">Carlos Rodríguez - 16/01/2024</p>
                      <p>¿Cuándo se espera que comience la obra?</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
          {activeTab === 'ubicacion' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-green-700">Ubicación del proyecto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-green-100 rounded-md overflow-hidden flex items-center justify-center">
                  <div className="text-center">
                    <MapPinIcon className="h-12 w-12 mx-auto mb-2 text-green-600" />
                    <p className="font-medium text-green-700">Mapa no disponible</p>
                    <p className="text-sm text-green-600">Coordenadas: -33.4569, -70.6483</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          {activeTab === 'evidencias' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-green-700">Evidencias del proyecto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="w-full h-48 bg-green-100 rounded-md mb-2 flex items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-green-600" />
                      </div>
                      <p className="text-sm text-green-700">Foto del sitio antes de la intervención</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="w-full h-48 bg-green-100 rounded-md mb-2 flex items-center justify-center">
                        <FileIcon className="h-12 w-12 text-green-600" />
                      </div>
                      <p className="text-sm text-green-700">Documento de planificación del proyecto</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default DetallesPublicacion