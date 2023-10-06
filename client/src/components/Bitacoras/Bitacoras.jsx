import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Accordion, AccordionItem } from '@nextui-org/accordion'

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
import { GetStudentsDetailById } from '../../api/httpRequest'

export const Bitacoras = () => {
  const [edit, setEdit] = useState(false)
  const { id } = useParams()
  const [name, setName] = useState('')

  const getInfoStudent = async () => {
    try {
      const { data } = await GetStudentsDetailById(id)
      const info = await data.data[0]
      const { nombre_completo } = info
      setName(nombre_completo)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getInfoStudent()
  }, [])

  const options = [
    { key: 1, value: 'Aprobado' },
    { key: 2, value: 'Pendiente' },
    { key: 3, value: 'Rechazado' }
  ]

  const handleEdit = () => {
    setEdit(true)
  }

  const prueba = [
    { key: 1, label: 'Accordion 1', title: 'Bitácora 1', State: 'Aprobado' },
    { key: 2, label: 'Accordion 2', title: 'Bitácora 2', State: 'Pendiente' },
    { key: 3, label: 'Accordion 3', title: 'Bitácora 3', State: 'Rechazado' },
    { key: 4, label: 'Accordion 4', title: 'Bitácora 4', State: 'Aprobado' },
    { key: 5, label: 'Accordion 5', title: 'Bitácora 5', State: 'Pendiente' },
    { key: 6, label: 'Accordion 6', title: 'Bitácora 6', State: 'Rechazado' },
    { key: 7, label: 'Accordion 7', title: 'Bitácora 7', State: 'Aprobado' },
    { key: 8, label: 'Accordion 8', title: 'Bitácora 8', State: 'Pendiente' },
    { key: 9, label: 'Accordion 9', title: 'Bitácora 9', State: 'Rechazado' },
    { key: 10, label: 'Accordion 10', title: 'Bitácora 10', State: 'Aprobado' },
    { key: 11, label: 'Accordion 11', title: 'Bitácora 11', State: 'Pendiente' },
    { key: 12, label: 'Accordion 12', title: 'Bitácora 12', State: 'Rechazado' }
  ]

  return (
    <main className='flex flex-row min-h-screen bg-whitesmoke'>
      <Siderbar />
      <section className='relative grid flex-auto w-min grid-rows-[auto_1fr_auto]'>
        <header className='grid place-items-center h-[12vh]'>
          <Link to={`/info-aprendiz/${id}`} className='flex items-center gap-2 text-sm font-medium rounded-full text-white bg-slate-600 px-4 py-[2px] transition-colors absolute left-10'>
            <IoReturnDownBack />
            Regresar
          </Link>
          <h1 className='text-2xl font-light '>{name}</h1>
        </header>
        <section className='grid items-start h-full py-5'>
          <div className='w-11/12 mx-auto bg-white border-gray-400 rounded-2xl border-[0.5px]'>
            <Accordion>
              {prueba.map((item) => {
                return (
                  <AccordionItem
                    key={item.key}
                    aria-label={item.label}
                    indicator={({ isOpen }) =>
                      isOpen ? (
                        <FiChevronUp className='text-xl' />
                      ) : (
                        <div className='flex flex-row gap-16'>
                          <div className={`${item.State === 'Aprobado' ? 'bg-[#bbf7d0] text-[#047857]' : item.State === 'Rechazado' ? 'bg-[#fecaca] text-[#b91c1c]' : item.State === 'Pendiente' ? 'bg-[#e2e8f0] text-[#475569]' : ''} text-sm  font-light rounded-xl w-[130px]`}>{item.State}</div>
                          <FiChevronDown className='text-xl' />
                        </div>
                      )
                    }
                    className='px-2 py-1.5'
                    title={item.title}
                  >
                    <hr className='border-gray-300' />
                    <form className='flex flex-col gap-2.5 p-3 '>
                      <div className='flex flex-row justify-between'>
                        <input type='date' className='px-2 text-sm border-gray-600 rounded-[10px] focus:outline-none border-1' />
                        <div className='h-[2rem] w-[8rem]'>
                          <Select name='calificacion' placeholder='Calificación' rounded='rounded-lg' py='py-1' hoverColor='hover:bg-gray' hoverTextColor='hover:text-black' textSize='text-sm' options={options} shadow={'shadow-md shadow-slate-400'} border='none' selectedColor={'bg-slate-300'} />
                        </div>
                      </div>
                      <div className='flex flex-row justify-between'>
                        <h3>Estudiante No. 1</h3>
                        <h3>CC 000000000</h3>
                      </div>
                      <textarea name='' className='w-full h-20 p-1.5 overflow-y-auto text-sm border-gray-600 focus:outline-none resize-none rounded-xl border-1' placeholder='Observaciones...' />
                      <div className='flex flex-row items-center justify-between'>
                        <h3>2473196 - ADSO</h3>
                        <div className='grid grid-flow-col gap-3 place-self-end'>
                          <Button name='edit' type='button' bg={'bg-[#ffba00]'} px={'px-2'} hover hoverConfig='bg-red-700' font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} inline onClick={handleEdit}>
                            <HiOutlinePencil />
                            Modificar
                          </Button>
                          {edit && (
                            <Button name='save' type='button' bg={'bg-[#16a34a]'} px={'px-2'} hover hoverConfig='bg-red-700' font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} inline>
                              <LuSave /> Guardar
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
  )
}
