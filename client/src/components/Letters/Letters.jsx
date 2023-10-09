import { Link, useParams } from 'react-router-dom'
import { Footer } from '../Footer/Footer'
import { Siderbar } from '../Siderbar/Sidebar'
import { apprenticeStore } from '../../store/config'
import { Fragment, useEffect, useRef, useState } from 'react'
import { CardWithChildren } from '../Utils/Card/Card'
import { Button } from '../Utils/Button/Button'
import { Slide, ToastContainer, toast } from 'react-toastify'
import { getLettersByStudentID, patchLetterByID } from '../../api/httpRequest'
import { LuSave } from 'react-icons/lu'
import { getUserID } from '../../import/getIDActualUser'
import { CardInfoStudent } from '../Card-info-student/CardInfoStudent'

export const Letters = () => {
  const { id } = useParams()
  const { apprenticeData } = apprenticeStore()

  const [lettersInfo, setLettersInfo] = useState([])
  const [modifyState, setModifyState] = useState({ 0: false, 1: false })
  const formStartRef = useRef(null)
  const formEndRef = useRef(null)

  const getDataLetters = async () => {
    try {
      const response = await getLettersByStudentID(id)
      setLettersInfo(response.data)
    } catch (error) {
      const { message } = error.response.data.error.info
      toast.error(message ?? 'Error')
    }
  }

  useEffect(() => {
    const cachedData = JSON.parse(sessionStorage.getItem('apprenticeData'))
    if (cachedData) {
      apprenticeStore.setState({ apprenticeData: cachedData })
    }
  }, [])

  useEffect(() => {
    getDataLetters()
  }, [])

  const colorStates = {
    Presentado: 'text-green-500',
    'No presentado': 'text-red-500'
  }

  const typeOfLetter = {
    start: 'inicio',
    end: 'fin'
  }

  const btnHandleState = (index) => {
    if (index === 1) {
      setModifyState({ ...modifyState, 0: true })
    } else {
      setModifyState({ ...modifyState, 1: true })
    }
  }

  const formHandleStateEnd = (e) => {
    e.preventDefault()
    const formData = new FormData(formEndRef.current)
    const selectedOption = formData.get('option-fin')
    const { id_carta_aprendiz } = lettersInfo[1]
    const { id_usuario: usuario_responsable } = getUserID().user
    modifyLetterState(id_carta_aprendiz, { tipo_carta_aprendiz: typeOfLetter.end, estado_carta_aprendiz: selectedOption, usuario_responsable })

    setModifyState({ ...modifyState, 1: false })
  }

  const formHandleStateStart = (e) => {
    e.preventDefault()
    const formData = new FormData(formStartRef.current)
    const selectedOption = formData.get(`option-inicio`)
    const { id_carta_aprendiz } = lettersInfo[0]
    const { id_usuario: usuario_responsable } = getUserID().user
    modifyLetterState(id_carta_aprendiz, { tipo_carta_aprendiz: typeOfLetter.start, estado_carta_aprendiz: selectedOption, usuario_responsable })
    setModifyState({ ...modifyState, 0: false })
  }

  const modifyLetterState = async (id, payload) => {
    try {
      const { data } = await patchLetterByID(id, payload)
      if (data.affectedRows === 0) throw new Error()
      toast.success('Se ha modificado correctamente la carta de inicio')
      getDataLetters()
    } catch (error) {
      const message = error.response.data.error.info.message
      toast.error(message ?? 'Error')
    }
  }

  return (
    <>
      <ToastContainer transition={Slide} theme='colored' />
      <section className='grid grid-cols-[auto_1fr] min-h-screen bg-whitesmoke'>
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
            <main className='grid gap-3 pb-5 auto-rows-max place-items-center'>
              <CardInfoStudent />
              <section className='grid w-5/6 grid-cols-1 gap-y-3 md:grid-cols-2 place-items-center'>
                {lettersInfo.length > 0 ? (
                  <Fragment>
                    <CardWithChildren classNames='flex flex-col gap-3 w-4/5'>
                      <header aria-roledescription='title'>
                        <h3 className='text-lg font-normal text-center'>Carta de {lettersInfo[0].tipo_carta}</h3>
                      </header>
                      <section className='flex flex-col items-center justify-center gap-4'>
                        <p className={colorStates[lettersInfo[0].estado_carta]}>{lettersInfo[0].estado_carta}</p>
                        {modifyState[0] === false ? (
                          <Button onClick={() => btnHandleState(1)} classNames='' bg='bg-blue-500' px='px-2' font='font-base' textSize='text-sm' py='py-1' rounded='rounded-lg'>
                            Modificar estado
                          </Button>
                        ) : (
                          <form className='flex flex-col gap-2' onSubmit={formHandleStateStart} ref={formStartRef}>
                            <label className='text-sm'>Selecciona una opción:</label>
                            <section className='flex justify-center gap-3'>
                              <input type='radio' required name='option-inicio' id='presentado-1-inicio' value='Presentado' />
                              <label htmlFor='presentado-1-inicio'>Presentado</label>
                            </section>
                            <section className='flex justify-center gap-3'>
                              <input type='radio' required name={`option-inicio`} id={`no_presentado-2-inicio`} value='No presentado' />
                              <label htmlFor={`no_presentado-2-inicio`}>No Presentado</label>
                            </section>
                            <Button name='save' type='submit' bg={'bg-[#16a34a]'} px={'px-2'} hover hoverConfig='bg-red-700' font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} inline>
                              <LuSave /> Guardar
                            </Button>
                          </form>
                        )}
                      </section>
                    </CardWithChildren>
                    <CardWithChildren classNames='flex flex-col gap-3 w-4/5'>
                      <header aria-roledescription='title'>
                        <h3 className='text-lg font-normal text-center'>Carta de {lettersInfo[1].tipo_carta}</h3>
                      </header>
                      <section className='flex flex-col items-center justify-center gap-4'>
                        <p className={colorStates[lettersInfo[1].estado_carta]}>{lettersInfo[1].estado_carta}</p>
                        {modifyState[1] === false ? (
                          <Button onClick={() => btnHandleState(2)} classNames='' bg='bg-blue-500' px='px-2' font='font-base' textSize='text-sm' py='py-1' rounded='rounded-lg'>
                            Modificar estado
                          </Button>
                        ) : (
                          <form className='flex flex-col gap-2' onSubmit={formHandleStateEnd} ref={formEndRef}>
                            <label className='text-sm'>Selecciona una opción:</label>
                            <section className='flex justify-center gap-3'>
                              <input type='radio' required name='option-fin' id={`presentado-1-fin`} value='Presentado' />
                              <label htmlFor={`presentado-1-fin`}>Presentado</label>
                            </section>
                            <section className='flex justify-center gap-3'>
                              <input type='radio' required name={`option-fin`} id={`no_presentado-2-fin`} value='No presentado' />
                              <label htmlFor={`no_presentado-2-fin`}>No Presentado</label>
                            </section>
                            <Button name='save' type='submit' bg={'bg-[#16a34a]'} px={'px-2'} hover hoverConfig='bg-red-700' font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} inline>
                              <LuSave /> Guardar
                            </Button>
                          </form>
                        )}
                      </section>
                    </CardWithChildren>
                  </Fragment>
                ) : (
                  <h2>Error al conseguir las cartas del aprendiz</h2>
                )}
              </section>
            </main>
          </section>
          <Footer />
        </section>
      </section>
    </>
  )
}
