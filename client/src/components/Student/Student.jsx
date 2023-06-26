// MODULOS DE REACT
import { useState, useEffect } from 'react'
// MODULOS EXTERNOS
import { GetUsersHttp, GetUserByName } from '../../api/httpRequest'
import { Siderbar } from '../Siderbar/Sidebar'
import { Search } from '../Search/Search'
import { Card } from '../Card/Card'
import { Footer } from '../Footer/Footer'
import Cookies from 'js-cookie'


export const Student = () => {
  const [apprentices, setApprentices] = useState([])
  const [searchedApprentices, setSearchedApprentices] = useState([])
  const [error, setError] = useState(null)

  const searchApprentices = async (searchTerm) => {
    try {
      const response = await GetUserByName(searchTerm)
      const { data } = response.data
      if (searchTerm.trim() === '') {
        setError(null) // Reinicia el estado del error cuando se borra el contenido de la barra de búsqueda
        setSearchedApprentices([]) // Limpia los resultados de búsqueda al borrar el contenido de la barra de búsqueda
        return
      }
      setSearchedApprentices(data)
    } catch (error) {
      const message = error.response.data.error.info.message
      setError(message)
      setSearchedApprentices([]) // Limpia los resultados de búsqueda en caso de error
    }
  }

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) window.location.href = '/'

    const getApprentices = async () => {
      try {
        const response = await GetUsersHttp()
        const { data } = response.data
        setApprentices(data)
      } catch (error) {
        setError('Error al obtener los aprendices')
      }
    }
    getApprentices()
  }, [])

  return (
    <main className="flex flex-row min-h-screen">
      <Siderbar />
      <section className="grid grid-rows-3-10-75-15 flex-auto w-min relative">
        <header className="grid place-items-center">
          <Search searchApprentices={searchApprentices} />
        </header>
        {searchedApprentices.length > 0 && !error ? (
          <div className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-2 md:grid-cols-3">
            {searchedApprentices.map((apprentice, i) => (
              <Card cardUser shadow={'shadow-2xl'} marginLink={'mx-auto'} scale={'scale-90'} title={`${apprentice.nombre} ${apprentice.apellido}`} subtitle={apprentice.correo_electronico} lione={apprentice.programa_formacion_inscripcion} litwo={apprentice.numero_ficha_inscripcion} key={i} roundedLink={'rounded-xl'} borderColor={'border-primary'} buttonText={'Más información'} link={'/home'} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-2 md:grid-cols-3">
            {error ? (
              <h2 className="text-red-500">{error}</h2>
            ) : (
              apprentices.map((apprentice, i) => (
                <Card cardUser shadow={'shadow-2xl'} marginLink={'mx-auto'} scale={'scale-90'} title={`${apprentice.nombre} ${apprentice.apellido}`} subtitle={apprentice.correo_electronico} lione={apprentice.programa_formacion_inscripcion} litwo={apprentice.numero_ficha_inscripcion} key={i} roundedLink={'rounded-xl'} borderColor={'border-primary'} buttonText={'Más información'} link={'/home'} />
              ))
            )}
          </div>
        )}
        <Footer />
      </section>
    </main>
  )
}
