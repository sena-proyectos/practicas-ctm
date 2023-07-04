import { HiOutlinePencil } from 'react-icons/hi'
import { BsCheck2Circle } from 'react-icons/bs'
import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'
import { Button } from '../Button/Button'

const Settings = () => {
  return (
    <main className="flex flex-row min-h-screen">
      <Siderbar />
      <section className="grid grid-rows-2-90-10 flex-auto w-min relative">
        <div className="grid place-items-center ">
          <div className="bg-[#d9d9d9]/50 rounded-3xl h-[25rem] w-4/6 shadow-xl">
            <header className="grid place-items-center pt-5">
              <h2 className="text-2xl w-3/5 text-center font-medium border-b-2 border-primary">Editar</h2>
            </header>
            <section className="w-4/5 md:w-1/2 mt-5 flex mx-auto flex-col md:flex-row">
              <div className="w-[5rem] my-auto mx-auto rounded-full">
                <img className="object-cover" src="public/user.png" alt="img_user" />
              </div>
              <div className="my-auto">
                <h4 className="text-center">Stiven Blandón Urrego</h4>
                <p className="text-sm font-semibold text-center">Administrador</p>
              </div>
            </section>
            <form className="flex flex-col justify-center my-6 gap-3 w-4/5 mx-auto">
              <section>
                <section className="grid grid-cols-2 ">
                  <label className="font-semibold w-fit whitespace-nowrap" htmlFor="">
                    Correo institucional
                  </label>
                  <div className="relative text-gray-400 mx-auto">
                    <input type="text" className="flex py-[0.9px] text-base text-slate-500 bg-transparent border-b-1  pl-3 focus:outline-none focus:text-gray-900 w-full" disabled />
                  </div>
                </section>
                <section className="grid grid-cols-2">
                  <label className="font-semibold w-fit" htmlFor="">
                    Teléfono
                  </label>
                  <div className="relative text-gray-400 mx-auto">
                    <span className="absolute inset-y-0 left-[88%] flex items-center pr-3 cursor-pointer transform hover:text-purple-500 hover:scale-125">
                      <HiOutlinePencil />
                    </span>
                    <input type="text" className="py-[0.9px] text-base text-black bg-transparent border-b-1  pl-3 focus:outline-none focus:text-gray-900 w-full" disabled />
                  </div>
                </section>
                <section className="grid grid-cols-2">
                  <label className="font-semibold w-fit" htmlFor="">
                    Contraseña
                  </label>
                  <div className="relative text-gray-400 mx-auto">
                    <span className="absolute inset-y-0 left-[88%] flex items-center pr-3 cursor-pointer transform hover:text-purple-500 hover:scale-125">
                      <HiOutlinePencil />
                    </span>
                    <input type="password" className="py-[0.9px] text-base text-black bg-transparent border-b-1  pl-3 focus:outline-none focus:text-gray-900 w-full" disabled />
                  </div>
                </section>
              </section>
              <div className="relative mx-auto my-8">
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
  )
}

export { Settings }
