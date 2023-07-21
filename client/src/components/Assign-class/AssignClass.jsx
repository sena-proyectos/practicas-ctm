import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Button } from '../Utils/Button/Button'
import { FaUser } from 'react-icons/fa'

export const AssignClass = () => {
  return (
    <main className="flex flex-row min-h-screen">
      <Siderbar />
      <section className="relative grid flex-auto w-min grid-rows-3-10-75-15">
        <header className="grid place-items-center">
          <Search searchFilter />
        </header>
        <section>
          <h2 className="text-center">Stiven Blandón Urrego</h2>
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-10 h-[25rem] gap-4 pt-5">
            <div className="flex flex-col gap-1 p-3 border-2 rounded-xl border-sky-400 h-fit">
              <header className="flex flex-row w-fit ">
                <div className="border-2 rounded-full w-14 h-14 bg-sky-200 border-sky-500">
                  <FaUser className="w-full h-full scale-75 rounded-full" />
                </div>
                <div className="relative w-24 h-5 my-auto text-center rounded-r-full bg-sky-200 border-1 border-sky-500 right-2 -z-10">
                  <p className="text-xs font-medium">2473196</p>
                </div>
              </header>
              <p className="text-sm font-light">Fabricación de muebles contemporaneos</p>
              <div className="ml-auto w-fit">
                <Button value={'asignar'} bg="bg-slate-300" textColor="text-black" font="font-extraligth" rounded="rounded-full" textSize="text-sm" px="px-5" py="py-1" />
              </div>
            </div>
            <div className="flex flex-col gap-1 p-3 border-2 rounded-xl border-sky-950 h-fit">
              <header className="flex flex-row w-fit ">
                <div className="border-2 rounded-full w-14 h-14 bg-slate-500 border-sky-950">
                  <FaUser className="w-full h-full scale-75 rounded-full" />
                </div>
                <div className="relative w-24 h-5 my-auto text-center rounded-r-full bg-slate-500 border-1 border-sky-950 right-2 -z-10">
                  <p className="text-xs font-medium">2473196</p>
                </div>
              </header>
              <p className="text-sm font-light">Fabricación de muebles contemporaneos</p>
              <div className="ml-auto w-fit">
                <Button value={'asignar'} bg="bg-slate-300" textColor="text-black" font="font-extraligth" rounded="rounded-full" textSize="text-sm" px="px-5" py="py-1" />
              </div>
            </div>
            <div className="flex flex-col gap-1 p-3 border-2 rounded-xl border-sky-400 h-fit">
              <header className="flex flex-row w-fit ">
                <div className="border-2 rounded-full w-14 h-14 bg-sky-200 border-sky-500">
                  <FaUser className="w-full h-full scale-75 rounded-full" />
                </div>
                <div className="relative w-24 h-5 my-auto text-center rounded-r-full bg-sky-200 border-1 border-sky-500 right-2 -z-10">
                  <p className="text-xs font-medium">2473196</p>
                </div>
              </header>
              <p className="text-sm font-light">Fabricación de muebles contemporaneos</p>
              <div className="ml-auto w-fit">
                <Button value={'asignar'} bg="bg-slate-300" textColor="text-black" font="font-extraligth" rounded="rounded-full" textSize="text-sm" px="px-5" py="py-1" />
              </div>
            </div>
          </section>
        </section>
        <Footer />
      </section>
    </main>
  )
}
