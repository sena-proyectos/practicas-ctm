import { useState } from 'react'
import { HiOutlinePencil } from 'react-icons/hi'
import { BsCheck2Circle } from 'react-icons/bs'

import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'
import { Button } from '../Button/Button'
import { Modals } from '../Utils/Modals/Modals'

const Settings = () => {
  const [mostrarModal, setMostrarModal] = useState(false)

  const handleEditModal = () => {
    setMostrarModal(!mostrarModal)
  }

  const handleModal = () => {
    setMostrarModal(!mostrarModal)
  }
  return (
    <>
      {mostrarModal && <Modals bodyPassword title={'Cambiar Contraseña'} closeModal={handleModal} />}
      <main className="flex min-h-screen flex-row">
        <Siderbar />
        <section className="relative grid w-min flex-auto grid-rows-2-90-10">
          <div className="grid place-items-center ">
            <div className="h-[30rem] w-3/4 rounded-3xl bg-[#d9d9d9]/50 shadow-xl md:w-1/2">
              <header className="grid place-items-center pt-5">
                <h2 className="w-3/5 border-b-2 border-primary text-center text-2xl font-medium">Editar</h2>
              </header>
              <section className="mx-auto mt-5 flex w-4/5 flex-col gap-2">
                <div className="mx-auto my-auto w-[5rem] rounded-full">
                  <img className="object-cover" src="public/user.png" alt="img_user" />
                </div>
                <div className="my-auto">
                  <h4 className="text-center">Stiven Blandón Urrego</h4>
                  <p className="text-center text-sm font-semibold">Administrador</p>
                </div>
              </section>
              <form className="mx-auto my-6 flex w-4/5 flex-col justify-center gap-2">
                <section className="grid grid-cols-1">
                  <label className="w-fit whitespace-nowrap font-semibold" htmlFor="">
                    Correo institucional
                  </label>
                  <div className="text-gray-400 relative mx-auto w-full">
                    <input type="text" className="focus:text-gray-900 flex w-full border-b-1 bg-transparent py-[0.9px]  pl-3 text-base text-slate-500 focus:outline-none" disabled />
                  </div>
                </section>
                <section className="grid grid-cols-1">
                  <label className="w-fit font-semibold" htmlFor="">
                    Teléfono
                  </label>
                  <div className="text-gray-400 relative mx-auto w-full">
                    <span className="absolute inset-y-0 left-[94%] flex transform cursor-pointer items-center pr-3 hover:scale-125 hover:text-purple-500">
                      <HiOutlinePencil />
                    </span>
                    <input type="text" className="focus:text-gray-900 w-full border-b-1 bg-transparent py-[0.9px]  pl-3 text-base text-black focus:outline-none" disabled />
                  </div>
                </section>
                <section className="grid grid-cols-1">
                  <label className="w-fit font-semibold" htmlFor="">
                    Contraseña
                  </label>
                  <div className="text-gray-400 relative mx-auto w-full">
                    <span className="absolute inset-y-0 left-[94%] flex transform cursor-pointer items-center pr-3 hover:scale-125 hover:text-purple-500" onClick={handleEditModal}>
                      <HiOutlinePencil />
                    </span>
                    <input type="password" className="focus:text-gray-900 w-full border-b-1 bg-transparent py-[0.9px]  pl-3 text-base text-black focus:outline-none" disabled />
                  </div>
                </section>
                <div className="relative mx-auto my-5">
                  <span className="absolute inset-y-0 left-2 flex items-center text-white">
                    <BsCheck2Circle />
                  </span>
                  <Button value={'Guardar'} bg={'bg-primary'} px={'pl-7 pr-2'} font={'font-normal'} textSize="text-md" py={'py-1'} rounded={'rounded-xl'} shadow={'shadow-lg'} />
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

export { Settings }
