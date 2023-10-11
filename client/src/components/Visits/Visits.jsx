import { toast, ToastContainer } from 'react-toastify'
import { Accordion, AccordionItem } from '@nextui-org/accordion'
import { Footer } from '../Footer/Footer'
import { Siderbar } from '../Siderbar/Sidebar'
import { CardInfoStudent } from '../Card-info-student/CardInfoStudent'
import { Link, useParams } from 'react-router-dom'
import { apprenticeStore } from '../../store/config'
import { useEffect, useRef, useState } from 'react'
import { UIButton } from '../Utils/Button/Button'

import { Select } from '../Utils/Select/Select'
import { getVisitDataById, getVisitsIDByStudent, patchVisitById } from '../../api/httpRequest'
import { getUserID } from '../../import/getIDActualUser'

export const Visits = () => {
  const { id } = useParams()
  const { apprenticeData } = apprenticeStore()

  const [editStateVisit, setEditStateVisit] = useState(true)
  const [visitsDataID, setVisitsDataID] = useState([])
  const [visitData, setVisitData] = useState([])
  const [stateVisit, setStateVisit] = useState(null)
  const [actualKey, setActualKey] = useState([
    { key: null, isOpen: false, numberVisit: 1 },
    { key: null, isOpen: false, numberVisit: 2 }
  ])
  const [typeSubmitBtn, setTypeSubmitBtn] = useState('disabled')
  const formRef = useRef(null)
  const textAreaRef1 = useRef(null)

  useEffect(() => {
    const cachedData = JSON.parse(sessionStorage.getItem('apprenticeData'))
    if (cachedData) {
      apprenticeStore.setState({ apprenticeData: cachedData })
    }
  }, [])

  const getVisitsID = async () => {
    try {
      const { data } = await getVisitsIDByStudent(id)
      setVisitsDataID(data)
    } catch (error) {
      toast.error('Error al conseguir las visitas')
    }
  }
  useEffect(() => {
    getVisitsID()
  }, [])

  const states = {
    Pendiente: 'text-yellow-500',
    Realizado: 'text-green-500'
  }

  const options = [
    { key: 'Pendiente', value: 'Pendiente' },
    { key: 'Realizado', value: 'Realizado' }
  ]

  const checkSelectedState = (e) => {
    setStateVisit(e)
    if (textAreaRef1 !== null && textAreaRef1.current.value.length > 0) {
      setTypeSubmitBtn('submit')
    }
  }

  const checkObservationLength = (e) => {
    const { value } = e.target
    if (value.length > 0 && stateVisit !== null) {
      setTypeSubmitBtn('submit')
      return
    }
    setTypeSubmitBtn('disabled')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(formRef.current)
    const entries = Object.fromEntries(formData)
    const id = actualKey[0].key === null ? actualKey[1].key : actualKey[0].key
    const numero_visita = actualKey[0].key === null ? actualKey[1].visitNumber : actualKey[0].visitNumber
    const usuario_responsable = getUserID().user.id_usuario
    const data = { ...entries, estado_visita: stateVisit, numero_visita, usuario_responsable }
    sendData(id, data)
  }

  const sendData = async (id, payload) => {
    try {
      await patchVisitById(id, payload)
      setEditStateVisit(false)
      toast.success('Visita actualizada')
      handleVisitData(payload.numero_visita - 1)
    } catch (error) {
      toast.error('Error al actualizar la visita')
    }
  }

  const handleVisitData = (index) => {
    if (actualKey[index].isOpen === true) {
      getVisitData(actualKey[index].key)
    }
  }

  const getVisitData = async (key) => {
    const { data } = await getVisitDataById(key)
    data[0].fecha_modificacion = new Date(data[0].fecha_modificacion)
    data[0].fecha_modificacion = data[0].fecha_modificacion.toLocaleDateString()
    if (data[0].fecha_visita !== 'Sin fecha') {
      data[0].fecha_visita = new Date(data[0].fecha_visita)
      data[0].fecha_visita = data[0].fecha_visita.toLocaleDateString()
    }
    setEditStateVisit(false)
    setVisitData(data)
  }

  return (
    <>
      <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='colored' />
      <main className='grid grid-cols-[auto_1fr] min-h-screen bg-whitesmoke'>
        <Siderbar />
        <section className='grid grid-rows-[1fr_auto]'>
          <section className='px-4 pt-5 grid grid-rows-[auto_1fr] h-full gap-8'>
            <header className='grid grid-cols-[auto_1fr] place-items-center'>
              <Link to={`/info-aprendiz/${id}`} className='flex items-center gap-2 px-4 py-1 text-sm font-medium text-white transition-colors rounded-full bg-slate-600'>
                Regresar
              </Link>
              <h2 className='text-xl justify-self-center'>
                Cartas del aprendiz <span className='font-semibold'>{apprenticeData.nombre_completo}</span>
              </h2>
            </header>
            <section className='grid gap-5 p-4 auto-rows-max'>
              <CardInfoStudent />
              {visitsDataID && visitsDataID.length !== 0 && (
                <Accordion variant='shadow'>
                  <AccordionItem
                    key='1'
                    onPress={() => handleVisitData(0)}
                    onPressUp={() =>
                      setActualKey([
                        { key: visitsDataID[0].id_visita, isOpen: !actualKey[0].isOpen, visitNumber: 1 },
                        { key: null, isOpen: false, visitNumber: 2 }
                      ])
                    }
                    aria-label='Accordion 1'
                    title='Visita de seguimiento inicial'
                  >
                    <section className='grid gap-3 px-2 auto-rows-max'>
                      <header className='grid items-center grid-cols-2'>
                        <span className='flex flex-row gap-1'>Estado: {editStateVisit === false ? <span className={states[visitData[0].estado_visita]}>{visitData[0].estado_visita}</span> : <Select name='estado_visita' placeholder='Calificación' rounded='rounded-lg' py='py-1' hoverColor='hover:bg-gray' hoverTextColor='hover:text-black' textSize='text-sm' options={options} shadow={'shadow'} onChange={checkSelectedState} border='none' selectedColor={'bg-slate-300'} />}</span>
                        <UIButton hoverColor='gray-700' classNames='justify-self-end bg-gray-500' type='button' onClick={() => setEditStateVisit(!editStateVisit)}>
                          <span>{editStateVisit === false ? 'Editar' : 'Cancelar'}</span>
                        </UIButton>
                      </header>
                      <section aria-label='main-content'>
                        {editStateVisit === false ? (
                          <section className='grid grid-cols-[1fr_auto] items-start'>
                            <section>
                              <h4 className='text-lg font-medium'>Observaciones</h4>
                              <p>{visitData[0].observaciones_visita}</p>
                            </section>
                            <section className='flex flex-col gap-0'>
                              <div>
                                <p>Fecha de modificación: </p>
                                <span>{visitData[0].fecha_modificacion}</span>
                              </div>
                              <div>
                                <p>Fecha de la visita: </p>
                                <span>{visitData[0].fecha_visita}</span>
                              </div>
                            </section>
                          </section>
                        ) : (
                          <form onSubmit={handleSubmit} ref={formRef} className='flex flex-col gap-3'>
                            <label htmlFor='fecha_visita'>Fecha de la visita</label>
                            <input type='date' name='fecha_visita' id='fecha_visita' className='border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-[0.9px] pl-3 text-base text-black focus:bg-white focus:outline-none md:w-1/3' />
                            <textarea required aria-required name='observaciones_visita' id='editor' rows='3' className='block w-full h-[5rem] px-3 py-2 overflow-y-auto text-sm text-black bg-white shadow-md border-t-[0.5px] border-slate-200 resize-none focus:text-gray-900 rounded-xl shadow-slate-400 focus:bg-white focus:outline-none placeholder:text-slate-400 placeholder:font-light' placeholder='Deja una observación' onInput={checkObservationLength} ref={textAreaRef1} />
                            <UIButton bgColor='blue-500' hoverColor='blue-700' type={typeSubmitBtn} classNames='mx-auto'>
                              Enviar
                            </UIButton>
                          </form>
                        )}
                      </section>
                    </section>
                  </AccordionItem>
                  <AccordionItem
                    key='2'
                    onPress={() => handleVisitData(1)}
                    onPressUp={() =>
                      setActualKey([
                        { key: null, isOpen: false, visitNumber: 1 },
                        { key: visitsDataID[1].id_visita, isOpen: !actualKey[1].isOpen, visitNumber: 2 }
                      ])
                    }
                    aria-label='Accordion 2'
                    title='Visita de seguimiento final'
                  >
                    <section className='grid gap-3 px-2 auto-rows-max'>
                      <header className='grid items-center grid-cols-2'>
                        <span className='flex flex-row gap-1'>Estado: {editStateVisit === false ? <span className={states[visitData[0].estado_visita]}>{visitData[0].estado_visita}</span> : <Select name='estado_visita' placeholder='Calificación' rounded='rounded-lg' py='py-1' hoverColor='hover:bg-gray' hoverTextColor='hover:text-black' textSize='text-sm' options={options} shadow={'shadow'} onChange={checkSelectedState} border='none' selectedColor={'bg-slate-300'} />}</span>
                        <UIButton hoverColor='gray-700' classNames='justify-self-end bg-gray-500' type='button' onClick={() => setEditStateVisit(!editStateVisit)}>
                          <span>{editStateVisit === false ? 'Editar' : 'Cancelar'}</span>
                        </UIButton>
                      </header>
                      <section aria-label='main-content'>
                        {editStateVisit === false ? (
                          <section className='grid grid-cols-[1fr_auto] items-start'>
                            <section>
                              <h4 className='text-lg font-medium'>Observaciones</h4>
                              <p>{visitData[0].observaciones_visita}</p>
                            </section>
                            <section className='flex flex-col gap-0'>
                              <div>
                                <p>Fecha de modificación: </p>
                                <span>{visitData[0].fecha_modificacion}</span>
                              </div>
                              <div>
                                <p>Fecha de la visita: </p>
                                <span>{visitData[0].fecha_visita}</span>
                              </div>
                            </section>
                          </section>
                        ) : (
                          <form onSubmit={handleSubmit} ref={formRef} className='flex flex-col gap-3'>
                            <label htmlFor='fecha_visita'>Fecha de la visita</label>
                            <input type='date' name='fecha_visita' id='fecha_visita' className='border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-[0.9px] pl-3 text-base text-black focus:bg-white focus:outline-none md:w-1/3' />
                            <textarea required aria-required name='observaciones_visita' id='editor' rows='3' className='block w-full h-[5rem] px-3 py-2 overflow-y-auto text-sm text-black bg-white shadow-md border-t-[0.5px] border-slate-200 resize-none focus:text-gray-900 rounded-xl shadow-slate-400 focus:bg-white focus:outline-none placeholder:text-slate-400 placeholder:font-light' placeholder='Deja una observación' onInput={checkObservationLength} ref={textAreaRef1} />
                            <UIButton bgColor='blue-500' hoverColor='blue-700' type={typeSubmitBtn} classNames='mx-auto'>
                              Enviar
                            </UIButton>
                          </form>
                        )}
                      </section>
                    </section>
                  </AccordionItem>
                </Accordion>
              )}
            </section>
          </section>
          <Footer />
        </section>
      </main>
    </>
  )
}

