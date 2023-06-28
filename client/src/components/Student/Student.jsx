// MODULOS DE REACT
import { useState, useEffect } from 'react'
// MODULOS EXTERNOS
import { GetUsersHttp, GetUserByName } from '../../api/httpRequest'
import { Siderbar } from '../Siderbar/Sidebar'
import { Search } from '../Search/Search'
import { Card } from '../Card/Card'
import { Footer } from '../Footer/Footer'
import Cookies from 'js-cookie'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const Student = () => {

  const [apprentices, setApprentices] = useState([])
  const [searchedApprentices, setSearchedApprentices] = useState([])
  const [error, setError] = useState(null)

  const searchApprentices = async (searchTerm) => {
    try {
      const response = await GetUserByName(searchTerm)
      const { data } = response.data
      if (searchTerm.trim() === '') {
        setError(null)
        setSearchedApprentices([])
      } else {
        setError(null)
        setSearchedApprentices(data)
      }
    } catch (error) {
      const message = error.response.data.error.info.message
      setError(message)
      setSearchedApprentices([])
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
    setTimeout(getApprentices, 1000)
    // getApprentices()
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
            {apprentices.length === 0 && !error && searchedApprentices.length === 0 &&(
              <>
                <Skeleton width={350} height={250} style={{ marginBottom: '1rem', margin: '1.2em' }} />
                <Skeleton width={350} height={250} style={{ marginBottom: '1rem', margin: '1.2em' }} />
                <Skeleton width={350} height={250} style={{ marginBottom: '1rem', margin: '1.2em' }} />
              </>
            )}
          </div>
        )}
        <Footer />
      </section>
    </main>
  )
}
