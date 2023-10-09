import { Link, useParams } from 'react-router-dom'
import { Footer } from '../Footer/Footer'
import { Siderbar } from '../Siderbar/Sidebar'
import { apprenticeStore } from '../../store/config'
import { Fragment, useEffect, useState } from 'react'
import { CardWithChildren } from '../Utils/Card/Card'
import { Button } from '../Utils/Button/Button'
import { Slide, ToastContainer, toast } from 'react-toastify'
import { getLettersByStudentID } from '../../api/httpRequest'
import { LuSave } from 'react-icons/lu'

export const Letters = () => {
  const { id } = useParams()
  const { apprenticeData } = apprenticeStore()
  const [lettersInfo, setLettersInfo] = useState([])
  const [modifyState, setModifyState] = useState({ 0: false, 1: false })

  const getDataLetters = async () => {
    try {
      const response = await getLettersByStudentID(id)
      setLettersInfo(response.data)
    } catch (error) {
      console.log(error)
      const { message } = error.response.data.error.info
      toast.error(message ?? 'Error')
    }
  }

  useEffect(() => {
    getDataLetters()
    const cachedData = JSON.parse(sessionStorage.getItem('apprenticeData'))
    if (cachedData) {
      apprenticeStore.setState({ apprenticeData: cachedData })
    }
  }, [])

  const colorStates = {
    Presentado: 'text-green-500',
    'No presentado': 'text-red-500'
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
    const formData = new FormData(e.target.current)
    const selectedOption = formData.get(`option-fin`)
    console.log(selectedOption)

    setModifyState({ ...modifyState, 1: false })
  }

  const formHandleStateStart = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target.current)
    const selectedOption = formData.get(`option-inicio`)
    const a = Object.entries(formData)
    console.log(selectedOption, a)
    setModifyState({ ...modifyState, 0: false })
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
            <main className='grid grid-rows-[auto_auto] place-items-center gap-8 pb-5'>
              <CardWithChildren classNames='grid grid-rows-[auto_1fr] gap-3 text-center'>
                <header aria-describedby='title'>
                  <h3 className='text-lg font-semibold text-center'>Información del aprendiz</h3>
                </header>
                <section className='grid justify-center grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                  {Object.entries(apprenticeData).map(([key, value]) => {
                    return (
                      <div key={key}>
                        <p className='font-semibold capitalize whitespace-pre-wrap'>
                          {key
                            .split('_')
                            .join(' ')
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </p>
                        <p className='break-words whitespace-pre-wrap'>{value ?? 'N/A'}</p>
                      </div>
                    )
                  })}
                </section>
              </CardWithChildren>
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
                          <form onSubmit={formHandleStateStart}>
                            <label className='text-sm'>Selecciona una opción:</label>
                            <section className='flex justify-center gap-3'>
                              <input type='radio' required name={`option-inicio`} id={`presentado-1-inicio`} value='Presentado' />
                              <label htmlFor={`presentado-1-inicio`}>Presentado</label>
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
                          <form className='' onSubmit={formHandleStateEnd}>
                            <label className='text-sm'>Selecciona una opción:</label>
                            <section className='flex justify-center gap-3'>
                              <input type='radio' required name={`option-fin`} id={`presentado-1-fin`} value='Presentado' />
                              <label htmlFor={`presentado-1`}>Presentado</label>
                            </section>
                            <section className='flex justify-center gap-3'>
                              <input type='radio' required name={`option-fin`} id={`no_presentado-2-fin`} value='No presentado' />
                              <label htmlFor={`no_presentado-2`}>No Presentado</label>
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
