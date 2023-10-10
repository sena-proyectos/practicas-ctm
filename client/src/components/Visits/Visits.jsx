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

export const Visits = () => {
  const { id } = useParams()
  const { apprenticeData } = apprenticeStore()

  const [editStateVisit, setEditStateVisit] = useState(true)
  const [stateVisit, setStateVisit] = useState(null)
  const [typeSubmitBtn, setTypeSubmitBtn] = useState('disabled')
  const formRef = useRef(null)
  const textAreaRef1 = useRef(null)
  const textAreaRef2 = useRef(null)

  useEffect(() => {
    const cachedData = JSON.parse(sessionStorage.getItem('apprenticeData'))
    if (cachedData) {
      apprenticeStore.setState({ apprenticeData: cachedData })
    }
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
    // if (textAreaRef2 !== null && textAreaRef2.current.value.length > 0) {
    //   setTypeSubmitBtn('submit')
    // }
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
    const data = Object.fromEntries(formData)
    console.log(data)
    console.log('hola')
  }

  const test = (number) => {
    console.log(number)
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
              <Accordion variant='shadow'>
                <AccordionItem key='1' aria-label='Accordion 1' title='Visita de seguimiento inicial'>
                  <section className='grid gap-3 auto-rows-max'>
                    <header className='grid items-center grid-cols-2'>
                      <span className='flex flex-row gap-1'>Estado: {editStateVisit === false ? <span className={states.Pendiente}>Pendiente</span> : <Select name='estado_visita' placeholder='Calificación' rounded='rounded-lg' py='py-1' hoverColor='hover:bg-gray' hoverTextColor='hover:text-black' textSize='text-sm' options={options} shadow={'shadow'} onChange={checkSelectedState} border='none' selectedColor={'bg-slate-300'} />}</span>
                      <UIButton bgColor='gray-500' hoverColor='gray-700' classNames='justify-self-end' type='disabled'>
                        <span>Editar</span>
                      </UIButton>
                    </header>
                    <section aria-label='main-content' className='px-2'>
                      <form onSubmit={handleSubmit} onSubmitCapture={() => test(1)} ref={formRef} className='flex flex-col gap-3'>
                        <textarea required aria-required name='observations' id='editor' rows='3' className='block w-full h-[5rem] px-3 py-2 overflow-y-auto text-sm text-black bg-white shadow-md border-t-[0.5px] border-slate-200 resize-none focus:text-gray-900 rounded-xl shadow-slate-400 focus:bg-white focus:outline-none placeholder:text-slate-400 placeholder:font-light' placeholder='Deja una observación' onInput={checkObservationLength} ref={textAreaRef1} />
                        <UIButton bgColor='blue-500' hoverColor='blue-700' type={typeSubmitBtn} classNames='mx-auto'>
                          Enviar
                        </UIButton>
                      </form>
                    </section>
                  </section>
                </AccordionItem>
                <AccordionItem key='2' aria-label='Accordion 2' title='Visita de seguimiento final'>
                  <section className='grid gap-3 auto-rows-max'>
                    <header className='grid items-center grid-cols-2'>
                      <span className='flex flex-row gap-1'>Estado: {editStateVisit === false ? <span className={states.Pendiente}>Pendiente</span> : <Select name='estado_visita' placeholder='Calificación' rounded='rounded-lg' py='py-1' hoverColor='hover:bg-gray' hoverTextColor='hover:text-black' textSize='text-sm' options={options} shadow={'shadow'} onChange={checkSelectedState} border='none' selectedColor={'bg-slate-300'} />}</span>
                      <UIButton bgColor='gray-500' hoverColor='gray-700' classNames='justify-self-end' type='disabled'>
                        <span>Editar</span>
                      </UIButton>
                    </header>
                    <section aria-label='main-content' className='px-2'>
                      <form onSubmit={handleSubmit} onSubmitCapture={() => test(2)} ref={formRef} className='flex flex-col gap-3'>
                        <textarea required aria-required name='observations' id='editor' rows='3' className='block w-full h-[5rem] px-3 py-2 overflow-y-auto text-sm text-black bg-white shadow-md border-t-[0.5px] border-slate-200 resize-none focus:text-gray-900 rounded-xl shadow-slate-400 focus:bg-white focus:outline-none placeholder:text-slate-400 placeholder:font-light' placeholder='Deja una observación' onInput={checkObservationLength} ref={textAreaRef2} />
                        <UIButton bgColor='blue-500' hoverColor='blue-700' type={typeSubmitBtn} classNames='mx-auto'>
                          Enviar
                        </UIButton>
                      </form>
                    </section>
                  </section>
                </AccordionItem>
              </Accordion>
            </section>
          </section>
          <Footer />
        </section>
      </main>
    </>
  )
}
