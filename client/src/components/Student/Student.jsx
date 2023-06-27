import { useState, useEffect } from 'react'
import { GetUsersHttp } from '../../api/httpRequest'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'

import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'
import { Card } from '../Card/Card'
import { Search } from '../Search/Search'

export const Student = () => {
  const [apprentices, setApprentices] = useState([])

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) window.location.href = '/'

    const getApprentices = async () => {
      const response = await GetUsersHttp()
      const { data } = response.data

      setApprentices(data)
    }

    getApprentices()
  }, [])

  const showInfo = () => {
    Swal.fire({
      icon: 'info',
      title: '¡Información!',
      text: 'Esta funcionalidad aún no está disponible',
    })
  }
  return (
    <main className="flex flex-row min-h-screen">
      <Siderbar />
      <section className="grid grid-rows-3-10-75-15 flex-auto w-min relative">
        <header className="grid place-items-center">
          <Search searchFilter />
        </header>
        <div className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-2 md:grid-cols-3">
          {apprentices.map((apprentice, i) => {
            return <Card cardUser shadow={'shadow-2xl'} marginLink={'mx-auto'} scale={'scale-90'} title={`${apprentice.nombres_inscripcion} ${apprentice.apellidos_inscripcion}`} subtitle={apprentice.correo_electronico_inscripcion} lione={apprentice.programa_formacion_inscripcion} litwo={apprentice.numero_ficha_inscripcion} key={i} roundedLink={'rounded-xl'} borderColor={'border-primary'} buttonText={'Más información'} isButton showModal />
          })}
        </div>
        <Footer />
      </section>
    </main>
  )
}
