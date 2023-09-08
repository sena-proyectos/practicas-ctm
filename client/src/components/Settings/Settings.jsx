import { useState } from 'react'
import { HiOutlinePencil } from 'react-icons/hi'
import { BsCheck2Circle } from 'react-icons/bs'

import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'
import { Button } from '../Utils/Button/Button'
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
        <section className='relative grid flex-auto w-min grid-rows-2-90-10'>
          <div className='grid place-items-center '>
            <div className='h-[30rem] w-3/4 rounded-3xl bg-[#d9d9d9]/50 shadow-xl md:w-1/2'>
              <header className='grid pt-5 place-items-center'>
                <h2 className='w-3/5 text-2xl font-medium text-center border-b-2 border-primary'>Editar</h2>
              </header>
              <section className='flex flex-col w-4/5 gap-2 mx-auto mt-5'>
                <div className='mx-auto my-auto w-[5rem] rounded-full'>
                  <img className='object-cover' src='/user.png' alt='img_user' />
                </div>
                <div className='my-auto'>
                  <h4 className='text-center'>Stiven Blandón Urrego</h4>
                  <p className='text-sm font-semibold text-center'>Administrador</p>
                </div>
              </section>
              <form className='flex flex-col justify-center w-4/5 gap-2 mx-auto my-6'>
                <section className='grid grid-cols-1'>
                  <label className='font-semibold w-fit whitespace-nowrap' htmlFor=''>
                    Correo institucional
                  </label>
                  <div className='relative w-full mx-auto text-gray-400'>
                    <input type='text' className='focus:text-gray-900 flex w-full border-b-1 bg-transparent py-[0.9px]  pl-3 text-base text-slate-500 focus:outline-none' disabled />
                  </div>
                </section>
                <section className='grid grid-cols-1'>
                  <label className='font-semibold w-fit' htmlFor=''>
                    Teléfono
                  </label>
                  <div className='relative w-full mx-auto text-gray-400'>
                    <span className='absolute inset-y-0 left-[94%] flex transform cursor-pointer items-center pr-3 hover:scale-125 hover:text-purple-500'>
                      <HiOutlinePencil />
                    </span>
                    <input type='text' className='focus:text-gray-900 w-full border-b-1 bg-transparent py-[0.9px]  pl-3 text-base text-black focus:outline-none' disabled />
                  </div>
                </section>
                <section className='grid grid-cols-1'>
                  <label className='font-semibold w-fit' htmlFor=''>
                    Contraseña
                  </label>
                  <div className='relative w-full mx-auto text-gray-400'>
                    <span className='absolute inset-y-0 left-[94%] flex transform cursor-pointer items-center pr-3 hover:scale-125 hover:text-purple-500' onClick={handleEditModal}>
                      <HiOutlinePencil />
                    </span>
                    <input type='password' className='focus:text-gray-900 w-full border-b-1 bg-transparent py-[0.9px]  pl-3 text-base text-black focus:outline-none' disabled />
                  </div>
                </section>
                <div className='relative mx-auto my-5'>
                  <span className='absolute inset-y-0 flex items-center text-white left-2'>
                    <BsCheck2Circle />
                  </span>
                  <Button bg={'bg-primary'} px={'pl-7 pr-2'} font={'font-normal'} textSize='text-md' py={'py-1'} rounded={'rounded-xl'} shadow={'shadow-lg'}>
                    Guardar
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <Footer />
        </section>
      </main>
    </>
  )
}
