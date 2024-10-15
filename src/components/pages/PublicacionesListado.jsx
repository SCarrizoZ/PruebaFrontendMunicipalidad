import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar, Download } from "lucide-react"
import { useEffect, useState } from 'react'
import TablaPublicaciones from '../TablaPublicaciones'
// date fns and popover
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { set } from "date-fns"
import { CalendarIcon, ArrowLeftIcon, FilterIcon, DownloadIcon, HomeIcon, FileTextIcon, BellIcon, BarChartIcon } from "lucide-react"
import DatePicker from "../DatePicker"
export default function PublicacionesListado({
  isOpened,
  setIsOpened
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const [categorias, setCategorias] = useState([])
  const [juntasVecinales, setJuntasVecinales] = useState([])

  const [selectedCategoria, setSelectedCategoria] = useState(null)
  const [selectedSituacion, setSelectedSituacion] = useState(null)
  const [selectedJunta, setSelectedJunta] = useState(null)
  const [filteredPublicaciones, setFilteredPublicaciones] = useState([])
  const [selectedIniDate, setSelectedIniDate] = useState(null)
  const [selectedEndDate, setSelectedEndDate] = useState(null)
  const situaciones = [
    "Recibido",
    "En curso",
    "Resuelto"
  ]
  // https://proyecto-municipal-vercel-a4o9opiq6-scarrizozs-projects.vercel.app/api/v1/situaciones-publicaciones/
  // https://proyecto-municipal-vercel-a4o9opiq6-scarrizozs-projects.vercel.app/api/v1/categorias/
  const fetchURLS = async (urls) =>{
    try{
      const [categorias, juntasVecinales] = await Promise.all(urls.map(url => fetch(url).then(res => res.json())))
      
      console.log(categorias)
      console.log(juntasVecinales)
      setCategorias(categorias)
      setJuntasVecinales(juntasVecinales)

    }catch(e){
      console.error(e)
    }
  }
  useEffect(() => {
    // fetch all
    fetchURLS([
      "https://proyecto-municipal-vercel-a4o9opiq6-scarrizozs-projects.vercel.app/api/v1/categorias/",
      "https://proyecto-municipal-vercel-a4o9opiq6-scarrizozs-projects.vercel.app/api/v1/juntas-vecinales/"
    ])

  }, [])

  
  const [selectedDate, setSelectedDate] = useState(null)





  const publicacionesPorPagina = 3

  const handleOpenSidebar = () => {
    setIsOpened(!isOpened)
  }
  const handleDownload = () => {
    console.log('Descargando datos')
    // change the href to the correct url
    window.location.href = "https://proyecto-municipal-vercel-a4o9opiq6-scarrizozs-projects.vercel.app/api/export-to-excel/"


  }
  const aplicarFiltros = () => {

    

    const category = selectedCategoria ? "categoria=" + selectedCategoria + "&" : ""
    const junta = selectedJunta ? "junta_vecinal=" + selectedJunta +"&" : ""
    const situation = selectedSituacion ? "situacion=" + selectedSituacion +"&" : ""
    const iniDate= selectedIniDate ? "fecha_publicacion_after="+format(selectedIniDate, "yyyy-MM-dd") +"&" : ""
    const endDate = selectedEndDate ? "fecha_publicacion_before="+ format(selectedEndDate, "yyyy-MM-dd") : ""
    console.log(iniDate)
    console.log(endDate)
    const url = `https://proyecto-municipal-vercel-a4o9opiq6-scarrizozs-projects.vercel.app/api/v1/publicaciones/?${category}${junta}${situation}${iniDate}${endDate}`
    
    console.log(url)
  
    fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setFilteredPublicaciones(data.results)
    })
    .catch(e => console.error(e))

    console.log(selectedCategoria)
    console.log(selectedSituacion)
    console.log(selectedJunta)
  }
  const limpiarFiltros = () => {
    setSelectedCategoria(null)
    setSelectedSituacion(null)
    setSelectedJunta(null)
    setSelectedIniDate(null)
    setFilteredPublicaciones([])
  }

  return (


    <div className="bg-[#00A86B] min-h-screen min-w-[400px]">
      <header className="burger-btn p-4 flex items-center">
        <button
          onClick={handleOpenSidebar}
          className="text-white mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-white text-3xl font-bold">Listado de publicaciones</h1>
      </header>

      <main className="bg-white m-4 p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <h2 className="mb-2 font-semibold">Categoría</h2>
            <Select
            value={selectedCategoria ? selectedCategoria : ""}
              onValueChange={(val)=>{setSelectedCategoria(val)}}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent>
                {
                  categorias.map(categoria => (
                    <SelectItem key={categoria.id} value={categoria.nombre.toString()}>{categoria.nombre}</SelectItem>
                  ))
                }
                {/* <SelectItem value="todas">Todas las categorías</SelectItem>
                <SelectItem value="basura">Basura</SelectItem>
                <SelectItem value="seguridad">Seguridad</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
          <div>
            <h2 className="mb-2 font-semibold">Estado de la publicación</h2>
            <Select
              value={selectedSituacion ? selectedSituacion : ""}
              onValueChange={(val)=>{setSelectedSituacion(val)}}
            >
              <SelectTrigger>

                <SelectValue
                placeholder="Todos los estados" />
              </SelectTrigger>
              <SelectContent>
                {
                  situaciones.map(situacion => (
                    <SelectItem key={situacion} value={situacion}>{situacion}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
          <div>
            <h2 className="mb-2 font-semibold">Junta vecinal</h2>
            <Select
              value={selectedJunta ? selectedJunta : ""}
              onValueChange={(val)=>{setSelectedJunta(val)}}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todas las juntas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las juntas</SelectItem>
                {
                  juntasVecinales.map(junta => (
                    <SelectItem key={junta.id} value={junta.nombre_calle.toString()}>{junta.nombre_calle} {junta.numero_calle}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h2 className="mb-2 font-semibold">Fecha inicial</h2>
            <div className="flex">
              <DatePicker 
                selectedDate={selectedIniDate}
                setSelectedDate={setSelectedIniDate}
                // handleDateSelect={handleDateSelect}
              />
            </div>
          </div>
          <div>
            <h2 className="mb-2 font-semibold">Fecha fin</h2>
            <div className="flex">
              {/* <input type="text" className="border rounded-l px-2 py-1 w-full" placeholder="Ej: 31-10-2024" /> */}
              
              
              <DatePicker
                selectedDate={selectedEndDate}
                setSelectedDate={setSelectedEndDate}
                // handleDateSelect={handleDateSelect}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between  mb-6 btn-section">
          <Button variant="outline" onClick={handleDownload} className="bg-blue-500 hover:bg-blue-600 filter-btn  ">
            
              <span className="text-white flex justify-items-center justify-center">
                <Download className="mr-2 h-4 w-4" />
                Descargar datos
              </span>
           

          </Button>
          <div className="filter-btn-cont">
            <Button onClick={limpiarFiltros} className="filter-btn" variant="outline">Limpiar filtros</Button>
            <Button onClick={aplicarFiltros} className="bg-green-500 hover:bg-green-600 text-white filter-btn">Aplicar filtros</Button>

          </div>
        </div>

        <TablaPublicaciones
          currentPage={currentPage}
          publicacionesPorPagina={publicacionesPorPagina}
          setCurrentPage={setCurrentPage}
          filteredPublicaciones={filteredPublicaciones}
        />


      </main>
    </div>

  )
}