import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Accordion, AccordionItem } from '@nextui-org/accordion'
import { toast, ToastContainer } from 'react-toastify'

// Icons
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { LuSave } from 'react-icons/lu'
import { HiOutlinePencil } from 'react-icons/hi'
import { IoReturnDownBack } from 'react-icons/io5'

// Components
import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'
import { Button } from '../Utils/Button/Button'
import { Select } from '../Utils/Select/Select'
import { GetStudentsDetailById, getBitacorasByStudentId, patchBitacoraById } from '../../api/httpRequest'
import { getUserID } from '../../import/getIDActualUser'
import { CardInfoStudent } from '../Card-info-student/CardInfoStudent'

export const Bitacoras = () => {
  const { id } = useParams()
  const bitacorasRef = useRef(null)
  const [edit, setEdit] = useState(false)
  const [dataStudent, setDataStudent] = useState([])
  const [bitacorasInfo, setBitacorasInfo] = useState([])

  const getInfoStudent = async () => {
    try {
      const { data } = await GetStudentsDetailById(id)
      const info = await data.data[0]
      setDataStudent(info)
    } catch (error) {
      console.error(error)
    }
  }

  const getDataBitacoras = async () => {
    try {
      const response = await getBitacorasByStudentId(id)
      setBitacorasInfo(response.data)
    } catch (error) {
      const { message } = error.response.data.error.info
      toast.error(message ?? 'Error')
    }
  }

  useEffect(() => {
    getDataBitacoras()
    getInfoStudent()
  }, [])

  const options = [
    { key: 'Aprobado', value: 'Aprobado' },
    { key: 'Rechazado', value: 'Rechazado' }
  ]

  const handleEdit = () => {
    setEdit(true)
  }

  const handleBitacora = (e, id_bitacora) => {
    e.preventDefault()
    const { id_usuario: usuario_responsable } = getUserID().user
    const formData = new FormData(bitacorasRef.current)
    const data = Object.fromEntries(formData)
    console.log(id_bitacora, usuario_responsable, data)
    modifyBitacora(id_bitacora, { ...data, usuario_responsable })
  }

  const modifyBitacora = async (id, payload) => {
    try {
      await patchBitacoraById(id, payload)
      toast.success('Bitácora modificada correctamente', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        className: 'text-sm'
      })
      getDataBitacoras()
      setEdit(false)
    } catch (error) {
      const message = error.response.data.error.info.message
      toast.error(message ?? 'Error')
    }
  }

  return (
    <>
      <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='colored' />
      <main className='flex flex-row min-h-screen bg-whitesmoke'>
        <Siderbar />
        <section className='relative grid flex-auto w-min grid-rows-[auto_1fr_auto]'>
          <header className='grid place-items-center h-[12vh]'>
            <Link to={`/info-aprendiz/${id}`} className='flex items-center gap-2 text-sm font-medium rounded-full text-white bg-slate-600 px-4 py-[2px] transition-colors absolute left-10'>
              <IoReturnDownBack />
              Regresar
            </Link>
            <h1 className='text-2xl font-light '>{dataStudent.nombre_completo}</h1>
          </header>
          <section className='grid items-start w-11/12 h-full gap-3 py-5 mx-auto'>
            <CardInfoStudent />
            <div className='w-full mx-auto bg-white border-gray-400 rounded-2xl border-[0.5px]'>
              <Accordion>
                {bitacorasInfo.map((x) => {
                  return (
                    <AccordionItem
                      key={x.id_bitacora}
                      aria-label={`Bitacora ${x.numero_bitacora}`}
                      indicator={({ isOpen }) =>
                        isOpen ? (
                          <FiChevronUp className='text-xl' />
                        ) : (
                          <div className='flex flex-row gap-16'>
                            <div className={`${x.calificacion_bitacora === 'Aprobado' ? 'bg-[#bbf7d0] text-[#047857]' : x.calificacion_bitacora === 'Rechazado' ? 'bg-[#fecaca] text-[#b91c1c]' : x.calificacion_bitacora === null ? 'bg-[#e2e8f0] text-[#475569]' : ''} text-sm  font-light rounded-xl w-[130px]`}>{x.calificacion_bitacora === null ? 'Sin Calificar' : x.calificacion_bitacora}</div>
                            <FiChevronDown className='text-xl' />
                          </div>
                        )
                      }
                      className='px-2 py-1.5'
                      title={`Bitácora ${x.numero_bitacora}`}
                    >
                      <hr className='border-gray-300' />
                      <form className='flex flex-col gap-2.5 p-3' ref={bitacorasRef} onSubmit={(e) => handleBitacora(e, x.id_bitacora)}>
                        <div className='flex flex-row justify-between'>
                          <input type='date' defaultValue={x.fecha_modificacion} className='px-2 text-sm border-gray-600 rounded-[10px] focus:outline-none border-1 disabled:bg-gray-200' disabled={!edit} />
                          <div className='h-[2rem] w-[8rem]'>
                            <Select name='calificacion_bitacora' placeholder='Calificación' rounded='rounded-lg' py='py-1' hoverColor='hover:bg-gray' hoverTextColor='hover:text-black' textSize='text-sm' options={options} shadow={'shadow-md shadow-slate-400'} border='none' selectedColor={'bg-slate-300'} />
                          </div>
                        </div>
                        <div className='flex flex-row justify-between'>
                          <h3>{dataStudent.nombre_completo}</h3>
                          <h3>CC {dataStudent.numero_documento_aprendiz}</h3>
                        </div>
                        <textarea name='observaciones_bitacora' defaultValue={x.observaciones_bitacora} className='w-full h-20 p-1.5 overflow-y-auto text-sm border-gray-600 focus:outline-none resize-none rounded-xl border-1 disabled:bg-gray-200' placeholder='Observaciones...' disabled={!edit} />
                        <div className='flex flex-row items-center justify-between'>
                          <h3>
                            {dataStudent.numero_ficha} - {dataStudent.nombre_programa_formacion}
                          </h3>
                          <div className='grid grid-flow-col gap-3 place-self-end'>
                            <Button name='edit' type='button' bg={'bg-[#ffba00]'} px={'px-2'} hover hoverConfig='bg-red-700' font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} inline onClick={handleEdit}>
                              <HiOutlinePencil />
                              Modificar
                            </Button>
                            {edit && (
                              <Button bg={'bg-green-600'} px={'px-3'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'lg'} inline>
                                <LuSave />
                                Guardar
                              </Button>
                            )}
                          </div>
                        </div>
                      </form>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            </div>
          </section>
          <Footer />
        </section>
      </main>
    </>
  )
}
