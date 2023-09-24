import { Accordion, AccordionItem } from '@nextui-org/accordion'

// Icons
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { LuSave } from 'react-icons/lu'
import { HiOutlinePencil } from 'react-icons/hi'

// Components
import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'
import { Button } from '../Utils/Button/Button'
// import { Pagination } from '../Utils/Pagination/Pagination'

export const Bitacoras = () => {
  const form = (
    <form action='' className='flex flex-col gap-2.5 p-3'>
      <div className='flex flex-row justify-between'>
        <input type='date' className='px-2 text-sm border-gray-600 rounded-[10px] focus:outline-none border-1' />
        <h3>2473196 - ADSO</h3>
      </div>
      <div className='flex flex-row justify-between'>
        <h3>Estudiante No. 1</h3>
        <h3>CC 000000000</h3>
      </div>
      <textarea name='' className='w-full h-20 p-1.5 overflow-y-auto text-sm border-gray-600 focus:outline-none resize-none rounded-xl border-1' placeholder='Observaciones...' />
      <div className='flex flex-row justify-end gap-4'>
        <Button name='edit' type='button' bg={'bg-[#ffba00]'} px={'px-2'} hover hoverConfig='bg-red-700' font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} inline>
          <HiOutlinePencil />
          Modificar
        </Button>
        <Button name='save' type='button' bg={'bg-[#16a34a]'} px={'px-2'} hover hoverConfig='bg-red-700' font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} inline>
          <LuSave /> Guardar
        </Button>
      </div>
    </form>
  )

  return (
    <main className='flex flex-row min-h-screen bg-whitesmoke'>
      <Siderbar />
      <section className='relative grid flex-auto w-min grid-rows-2-80-20'>
        <section className='grid items-start py-5 grid-rows-80-20'>
          <div className='w-11/12 mx-auto bg-white border-gray-600 rounded-2xl border-[0.5px]'>
            <Accordion>
              <AccordionItem
                key='1'
                aria-label='Accordion 1'
                indicator={({ isOpen }) =>
                  isOpen ? (
                    <FiChevronUp className='text-xl' />
                  ) : (
                    <div className='flex flex-row gap-16'>
                      <div className='bg-[#bbf7d0] text-[#047857] text-sm  font-medium rounded-xl w-[130px]'>Aprobado</div>
                      <FiChevronDown className='text-xl' />
                    </div>
                  )
                }
                className='p-2'
                title='Carta Inicial'
              >
                {form}
              </AccordionItem>
              <AccordionItem
                key='2'
                aria-label='Accordion 2'
                indicator={({ isOpen }) =>
                  isOpen ? (
                    <FiChevronUp className='text-xl' />
                  ) : (
                    <div className='flex flex-row gap-16'>
                      <div className='bg-[#bbf7d0] text-[#047857] text-sm font-medium rounded-xl w-[130px]'>Aprobado</div>
                      <FiChevronDown className='text-xl' />
                    </div>
                  )
                }
                className='p-2'
                title='Evaluacion Inicial'
              >
                {form}
              </AccordionItem>
              <AccordionItem
                key='3'
                aria-label='Accordion 3'
                indicator={({ isOpen }) =>
                  isOpen ? (
                    <FiChevronUp className='text-xl' />
                  ) : (
                    <div className='flex flex-row gap-16'>
                      <div className='bg-[#bbf7d0] text-[#047857] text-sm font-medium rounded-xl w-[130px]'>Aprobado</div>
                      <FiChevronDown className='text-xl' />
                    </div>
                  )
                }
                className='p-2'
                title='Bitácora 1'
              >
                {form}
              </AccordionItem>
              <AccordionItem
                key='4'
                aria-label='Accordion 4'
                indicator={({ isOpen }) =>
                  isOpen ? (
                    <FiChevronUp className='text-xl' />
                  ) : (
                    <div className='flex flex-row gap-16'>
                      <div className='bg-[#bbf7d0] text-[#047857] text-sm font-medium rounded-xl w-[130px]'>Aprobado</div>
                      <FiChevronDown className='text-xl' />
                    </div>
                  )
                }
                className='p-2'
                title='Bitácora 2'
              >
                {form}
              </AccordionItem>
              <AccordionItem
                key='5'
                aria-label='Accordion 5'
                indicator={({ isOpen }) =>
                  isOpen ? (
                    <FiChevronUp className='text-xl' />
                  ) : (
                    <div className='flex flex-row gap-16'>
                      <div className='bg-[#e2e8f0] text-[#475569] text-sm font-medium rounded-xl w-[130px]'>Sin revisar </div>
                      <FiChevronDown className='text-xl' />
                    </div>
                  )
                }
                className='p-2'
                title='Bitácora 3'
              >
                {form}
              </AccordionItem>
              <AccordionItem
                key='6'
                aria-label='Accordion 6'
                indicator={({ isOpen }) =>
                  isOpen ? (
                    <FiChevronUp className='text-xl' />
                  ) : (
                    <div className='flex flex-row gap-16'>
                      <div className='bg-[#e2e8f0] text-[#475569] text-sm font-medium rounded-xl w-[130px]'>Sin revisar </div>
                      <FiChevronDown className='text-xl' />
                    </div>
                  )
                }
                className='p-2'
                title='Bitácora 4'
              >
                {form}
              </AccordionItem>
            </Accordion>
          </div>
          {/* <div>
            <Pagination />
          </div> */}
        </section>
        <Footer />
      </section>
    </main>
  )
}
