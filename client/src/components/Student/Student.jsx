import { useState, useEffect } from 'react'
import { GetUsersHttp } from '../../api/httpRequest'

import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'
import { Card } from '../Card/Card'

export const Student = () => {
  const [apprentices, setApprentices] = useState([])

  useEffect(() => {
    const getApprentices = async () => {
      const response = await GetUsersHttp()
      const { data } = response.data
      setApprentices(data)
    }

    getApprentices()
  }, [])
  return (
    <main className="flex flex-row">
      <Siderbar />
      <section className="grid grid-rows-3-10-75-15 flex-auto w-min">
        <header className="grid place-items-center">
          <h1 className="text-center font-bold text-2xl">Aprendices</h1>
        </header>
        <div className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-2 md:grid-cols-3">
          {apprentices.map((apprentice) => {
            return <Card cardUser shadow={'shadow-2xl'} marginLink={'mx-auto'} scale={'scale-90'} title={`${apprentice.nombres_aprendiz_inscripcion} ${apprentice.apellidos_aprendiz_inscripcion}`} subtitle={apprentice.correo_electronico_aprendiz_inscripcion} lione={apprentice.programa_formacion_aprendiz_inscripcion} litwo={apprentice.numero_ficha_aprendiz_inscripcion} key={apprentice.id_aprendiz_inscripcion} roundedLink={'rounded-xl'} borderColor={'border-primary'} buttonText={'Más información'} link={'/home'} />
          })}
        </div>
        <Footer />
      </section>
    </main>
  )
}
