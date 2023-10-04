import { useState } from 'react'

// Icons
import { IoSettingsOutline } from 'react-icons/io5'

// Components
import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'
import { Button } from '../Utils/Button/Button'
import { LuSave } from 'react-icons/lu'
import { HiOutlinePencil } from 'react-icons/hi'
import { PasswordModal } from '../Utils/Modals/Modals'

export const Settings = () => {
  const [mostrarModal, setMostrarModal] = useState(false)

  const handleEditModal = () => {
    setMostrarModal(!mostrarModal)
  }

  const handleModal = () => {
    setMostrarModal(!mostrarModal)
  }
  return (
    <>
      {mostrarModal && <PasswordModal bodyPassword title={'Cambiar Contraseña'} closeModal={handleModal} />}
      <main className='flex flex-row min-h-screen bg-whitesmoke'>
        <Siderbar />
        <section className='relative grid flex-auto w-min grid-rows-2-93-6'>
          <div className='grid place-items-center '>
            <div className='grid w-10/12 m-auto bg-white shadow-md rounded-xl h-4/5 grid-rows-2-20-80'>
              <header className='flex flex-row items-center w-11/12 h-full gap-2 mx-auto'>
                <IoSettingsOutline className='text-5xl text-fifth' />
                <div>
                  <h2>Admin Admin</h2>
                  <p>CC 1082882294</p>
                </div>
              </header>
              <section className='h-full'>
                <hr className='w-11/12 mx-auto border-1.5 rounded-lg' />
                <form className='flex flex-col justify-center h-full gap-8 px-14'>
                  <section className='grid grid-cols-2 gap-8'>
                    <div className='flex flex-col'>
                      <label htmlFor=''>Nombres</label>
                      <input type='text' className='rounded-[10px] border-1 border-gray-300 focus:outline-none px-2' />
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor=''>Apellidos</label>
                      <input type='text' className='rounded-[10px] border-1 border-gray-300 focus:outline-none px-2' />
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor=''>Correo electrónico</label>
                      <input type='text' className='rounded-[10px] border-1 border-gray-300 focus:outline-none px-2' />
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor=''>No. Documento</label>
                      <input type='text' className='rounded-[10px] border-1 border-gray-300 focus:outline-none px-2' />
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor=''>No. Contacto</label>
                      <input type='text' className='rounded-[10px] border-1 border-gray-300 focus:outline-none px-2' />
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor=''>Contraseña</label>
                      <div className='relative w-full'>
                        <HiOutlinePencil className='absolute inset-y-0 left-[80%] md:left-[92%] flex transform cursor-pointer items-center pr-3 hover:scale-125 text-2xl hover:text-purple-500' onClick={handleEditModal} />

                        <input type='text' className='rounded-[10px] border-1 border-gray-300 focus:outline-none px-2 w-full' />
                      </div>
                    </div>
                  </section>
                  <div className='flex flex-row gap-5 w-fit'>
                    <Button name='edit' type='button' bg={'bg-[#ffba00]'} px={'px-2'} hover hoverConfig='bg-red-700' font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} inline>
                      <HiOutlinePencil />
                      Modificar
                    </Button>
                    <Button name='save' type='button' bg={'bg-[#16a34a]'} px={'px-2'} hover hoverConfig='bg-red-700' font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} inline>
                      <LuSave /> Guardar
                    </Button>
                  </div>
                </form>
              </section>
            </div>
          </div>
          <Footer />
        </section>
      </main>
    </>
  )
}
