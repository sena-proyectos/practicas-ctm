import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

// Icons
import { IoReturnDownBack } from 'react-icons/io5'
import { PiBooksLight, PiScrollLight, PiCalendarCheckLight } from 'react-icons/pi'

// Components
import { Footer } from '../Footer/Footer'
import { Siderbar } from '../Siderbar/Sidebar'
import { GetStudentsDetailById } from '../../api/httpRequest'
import { apprenticeStore } from '../../store/config'

export const InfoStudent = () => {
  const { id } = useParams()
  const { setApprenticeData } = apprenticeStore()

  const [{ cargo_jefe, celular_aprendiz, email_aprendiz, email_jefe, etapa_formacion, fecha_inicio_lectiva, fecha_inicio_practica, nivel_formacion, nombre_arl, nombre_completo, nombre_empresa, nombre_jefe, nombre_modalidad, nombre_programa_formacion, numero_contacto_jefe, numero_documento_aprendiz, numero_ficha }, setInfoStudent] = useState({})

  const getInfoStudent = async () => {
    try {
      const { data } = await GetStudentsDetailById(id)
      const info = data.data[0]
      let { fecha_inicio_lectiva, fecha_inicio_practica } = info
      fecha_inicio_lectiva = new Date(fecha_inicio_lectiva).toLocaleDateString('es-ES')
      fecha_inicio_practica = new Date(fecha_inicio_practica).toLocaleDateString('es-ES')
      setInfoStudent({ ...info, fecha_inicio_lectiva, fecha_inicio_practica })
      setApprenticeData({ ...info, fecha_inicio_lectiva, fecha_inicio_practica })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getInfoStudent()
  }, [])

  return (
    <main className='flex flex-row min-h-screen bg-whitesmoke'>
      <Siderbar />
      <section className='relative grid flex-auto w-min grid-rows-[auto_1fr_auto]'>
        <header className='grid place-items-center h-[12vh]'>
          <Link to='/seguimiento-aprendices' className='flex items-center gap-2 text-sm font-medium rounded-full text-white bg-slate-600 px-4 py-[2px] transition-colors absolute left-10'>
            <IoReturnDownBack />
            Regresar
          </Link>
          <h1 className='text-2xl font-light'>{nombre_completo}</h1>
        </header>
        <section className='flex flex-col items-center gap-4 px-6 pb-5 md:justify-center'>
          <section className='grid w-full gap-2 bg-white shadow-lg md:w-1/2 border-t-1 grid-rows-3-rows rounded-xl'>
            <header className='flex items-center justify-center h-full pt-4'>
              <h2 className='text-lg font-medium'>Info. Personal</h2>
            </header>
            <section className='flex flex-col justify-center px-3 py-3'>
              <div className='grid grid-cols-2-40-60'>
                <h3 className='font-medium'>Email:</h3>
                <p className='break-words whitespace-pre-wrap'>{email_aprendiz ?? 'No registrado'}</p>
              </div>
              <div className='grid grid-cols-2-40-60'>
                <p className='font-medium'>No. Documento:</p>
                <p>{numero_documento_aprendiz}</p>
              </div>
              <div className='grid grid-cols-2-40-60'>
                <p className='font-medium'>Contacto:</p>
                <p>{celular_aprendiz ?? 'No registrado'}</p>
              </div>
            </section>
          </section>
          <section className='grid flex-col w-full gap-4 md:grid-cols-2 '>
            <section className='grid w-full bg-white shadow-lg border-t-1 grid-rows-2-20-80 rounded-xl'>
              <header className='flex items-center justify-center h-full'>
                <h2 className='text-lg font-medium'>Info. Acádemica</h2>
              </header>
              <section className='flex flex-col px-3 pb-7'>
                <div className='grid grid-cols-2-40-60'>
                  <p className='font-medium'>Programa:</p>
                  <p>{nombre_programa_formacion}</p>
                </div>
                <div className='grid grid-cols-2-40-60'>
                  <p className='font-medium'>Ficha:</p>
                  <p>{numero_ficha}</p>
                </div>
                <div className='grid grid-cols-2-40-60'>
                  <p className='font-medium'>Nivel académico:</p>
                  <p>{nivel_formacion}</p>
                </div>
                <div className='grid grid-cols-2-40-60'>
                  <p className='font-medium'>Etapa:</p>
                  <p>{etapa_formacion}</p>
                </div>
                <div className='grid grid-cols-2-40-60'>
                  <p className='font-medium'>Modalidad:</p>
                  <p>{nombre_modalidad}</p>
                </div>
                <div className='grid grid-cols-2-40-60'>
                  <p className='font-medium'>Fin lectiva:</p>
                  <p>{fecha_inicio_lectiva}</p>
                </div>
                <div className='grid grid-cols-2-40-60'>
                  <p className='font-medium'>Inicio prácticas:</p>
                  <p>{fecha_inicio_practica}</p>
                </div>
              </section>
            </section>
            <section className='grid w-full bg-white shadow-lg border-t-1 grid-rows-2-20-80 rounded-xl'>
              <header className='flex items-center justify-center h-full'>
                <h2 className='text-lg font-medium'>Info. Laboral</h2>
              </header>
              <section className='flex flex-col px-3 pb-3'>
                <div className='grid grid-cols-2-40-60'>
                  <p className='font-medium'>Empresa:</p>
                  <p>{nombre_empresa ?? 'No aplica'}</p>
                </div>
                <div className='grid grid-cols-2-40-60'>
                  <p className='font-medium'>Jefe Inmediato:</p>
                  <p>{nombre_jefe ?? 'No aplica'}</p>
                </div>
                <div className='grid grid-cols-2-40-60'>
                  <p className='font-medium'>Cargo:</p>
                  <p>{cargo_jefe ?? 'No aplica'}</p>
                </div>
                <div className='grid grid-cols-2-40-60'>
                  <p className='font-medium'>Email:</p>
                  <p>{email_jefe ?? 'No aplica'}</p>
                </div>
                <div className='grid grid-cols-2-40-60'>
                  <p className='font-medium'>Contacto:</p>
                  <p>{numero_contacto_jefe ?? 'No aplica'}</p>
                </div>
                <div className='grid grid-cols-2-40-60'>
                  <p className='font-medium'>ARL:</p>
                  <p>{nombre_arl ?? 'No aplica'}</p>
                </div>
              </section>
            </section>
          </section>
          <section className='flex flex-row gap-6 justify-evenly'>
            <Link to={`/bitacoras/${id}`} className='flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-blue-600 shadow-md shadow-blue-600 rounded-xl'>
              <PiBooksLight className='text-xl' />
              Bitácoras
            </Link>
            <Link to={`/cartas/${id}`} className='flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-yellow-600 shadow-md shadow-yellow-600 rounded-xl'>
              <PiScrollLight className='text-xl' /> Cartas
            </Link>
            <Link to={`/visitas/${id}`} className='flex items-center gap-1 px-3 py-2 text-sm font-medium text-white bg-green-600 shadow-md shadow-green-600 rounded-xl'>
              <PiCalendarCheckLight className='text-xl' /> Visitas
            </Link>
          </section>
        </section>
        <Footer />
      </section>
    </main>
  )
}
