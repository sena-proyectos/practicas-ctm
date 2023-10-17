import { Link, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

// Icons
import { IoReturnDownBack } from 'react-icons/io5'
import { HiOutlinePencil } from 'react-icons/hi'

// Components
import { Footer } from '../Footer/Footer'
import { Siderbar } from '../Siderbar/Sidebar'
import { GetStudentsDetailById, editStudentState, getStudentState } from '../../api/httpRequest'
import { apprenticeStore } from '../../store/config'
import { Bitacoras } from '../Bitacoras/Bitacoras'
import { Letters } from '../Letters/Letters'
import { Visits } from '../Visits/Visits'
import { Button } from '../Utils/Button/Button'
import { AddVisitModal } from '../Utils/Modals/Modals'
import { PiCalendarPlus } from 'react-icons/pi'
import { CardWithChildren } from '../Utils/Card/Card'
import { LuSave } from 'react-icons/lu'
import { toast } from 'react-toastify'

export const InfoStudent = () => {
  const { id } = useParams()
  const { setApprenticeData } = apprenticeStore()
  const [showModal, setShowModal] = useState(false)

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

  const handleModal = () => {
    setShowModal(!showModal)
  }

  return (
    <>
      {showModal && <AddVisitModal title={'Crear nueva visita'} closeModal={handleModal} id={id} />}
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
          </section>
          <section className='flex flex-col gap-2 px-6 pb-1'>
            <section className='p-4 border-gray-500 border-b-1'>
              <Novedades />
            </section>
            <section className='p-4 border-gray-500 border-b-1'>
              <h2 className='py-2 text-2xl font-medium text-center'>Cartas</h2>
              <Letters />
            </section>
            <section className='p-4 border-gray-500 border-b-1'>
              <h2 className='py-2 text-2xl font-medium text-center'>Visitas</h2>
              <Visits />
              <Button rounded='rounded-full' bg='bg-green-600' px='px-3' py='py-[4px]' textSize='text-sm' font='font-medium' textColor='text-white' onClick={handleModal} inline classNames='mt-3'>
                <PiCalendarPlus className='text-xl' />
                Visita extracurricular
              </Button>
            </section>
            <section className='p-4 '>
              <h2 className='py-2 text-2xl font-medium text-center'>Bitácoras</h2>
              <Bitacoras />
            </section>
          </section>
          <Footer />
        </section>
      </main>
    </>
  )
}

const Novedades = () => {
  const { id } = useParams()
  const [state, setState] = useState([])
  const [edit, setEdit] = useState(false)
  const formRef = useRef(null)

  const getStateStudent = async () => {
    try {
      const { data } = await getStudentState(id)
      setState(data.data[0])
      console.log(state)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getStateStudent()
  }, [])

  const handleEdit = () => {
    setEdit(true)
  }

  const handleState = async (e) => {
    e.preventDefault()

    const formData = new FormData(formRef.current)
    const estado = formData.get('estado_aprendiz')

    try {
      await editStudentState(id, { estado_aprendiz: estado })
      toast.success('Se ha modificado correctamente el estado')
      getStateStudent()
      setEdit(false)
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <CardWithChildren classNames='flex flex-col gap-3 items-center w-full md:w-1/2 mx-auto'>
      <h3 className='text-xl font-medium text-center'>Novedades</h3>
      <hr className='w-3/5 mx-auto border-gray-300 border-1 rounded-xl' />
      {edit ? (
        <form ref={formRef} onSubmit={handleState} className='flex flex-col w-full gap-4'>
          <div className='flex flex-col items-center gap-1.5'>
            <label htmlFor='state' className='font-light '>
              Estado Aprendiz
            </label>
            <select name='estado_aprendiz' id='state' className='px-2 py-1 text-sm text-black bg-gray-300 rounded-lg focus:outline-none placeholder:text-gray-500' required>
              <option value=''>Sin seleccionar</option>
              <option value='Lectiva'>Lectiva</option>
              <option value='Prácticas'>Prácticas</option>
              <option value='Terminado'>Terminado</option>
              <option value='Contratado'>Contratado</option>
              <option value='Cancelado'>Cancelado</option>
            </select>
          </div>
          <hr className='w-3/5 mx-auto border-gray-300 border-1 rounded-xl' />
          <Button bg={'bg-green-600'} px={'px-3'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'lg'} inline>
            <LuSave />
            Guardar
          </Button>
        </form>
      ) : (
        <>
          <h5 className='font-medium'>Estado actual del aprendiz</h5>
          <p>{state.estado_aprendiz}</p>
        </>
      )}
      {!edit && (
        <>
          <hr className='w-3/5 mx-auto border-gray-300 border-1 rounded-xl' />
          <Button bg={'bg-yellow-600'} px={'px-3'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'lg'} inline onClick={handleEdit}>
            <HiOutlinePencil />
            Editar
          </Button>
        </>
      )}
    </CardWithChildren>
  )
}
