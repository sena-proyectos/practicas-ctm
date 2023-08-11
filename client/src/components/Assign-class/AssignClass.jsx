import { useState } from 'react'

//icons
import { FaUser } from 'react-icons/fa'
import { HiOutlineUserAdd } from 'react-icons/hi'

//Componentes
import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Button } from '../Utils/Button/Button'
import { Modals } from '../Utils/Modals/Modals'

export const AssignClass = () => {
  const [modalAsign, setModalAsign] = useState(false)

  const courses = {
    data: [
      {
        ficha: 2473196,
        name: 'Fabricación de muebles contemporaneos',
      },
      {
        ficha: 2689476,
        name: 'Analisis y desarrollo de software',
      },
      {
        ficha: 2869467,
        name: 'Pan y Tomate',
      },
      {
        ficha: 1234567,
        name: 'Fabricación de muebles contemporaneos',
      },
      {
        ficha: 7654321,
        name: 'Analisis y desarrollo de software',
      },
      {
        ficha: 1234765,
        name: 'Pan y Tomate',
      },
    ],
  }

  const colorsCard = [
    {
      bordercolor: 'border-sky-400',
      bgcolor: 'bg-third',
    },
    {
      bordercolor: 'border-sky-950',
      bgcolor: 'bg-slate-500',
    },
  ]

  const allColors = courses.data.map((_, index) => ({
    ...colorsCard[index % colorsCard.length],
  }))

  const handleAsign = () => {
    setModalAsign(!modalAsign)
  }

  return (
    <>
      {modalAsign && <Modals bodyAsign title={'Asignar Instructor'} closeModal={handleAsign} />}
      <main className="flex flex-row min-h-screen">
        <Siderbar />
        <section className="relative grid flex-auto w-min grid-rows-3-10-75-15">
          <header className="grid place-items-center">
            <Search searchFilter />
          </header>
          <section>
            <section className="grid grid-cols-1 px-10 pt-5 pb-2 gap-x-4 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
              {allColors.map((color, index) =>
                courses.data[index] ? (
                  <div key={index} {...color} className={`flex flex-col gap-1 p-3 border-2 rounded-xl ${color.bordercolor} md:h-[10.5rem] sm:h-[10rem]`}>
                    <header className="flex flex-row w-fit ">
                      <div className={`border-2 rounded-full w-14 h-14 ${color.bgcolor} ${color.bordercolor}`}>
                        <FaUser className="w-full h-full scale-75 rounded-full" />
                      </div>
                      <div className={`relative w-24 h-5 my-auto text-center rounded-r-full ${color.bgcolor} ${color.bordercolor} right-2 -z-10`}>
                        <p className="text-xs font-medium">{courses.data[index].ficha}</p>
                      </div>
                    </header>
                    <p className="text-[13px] font-light text-justify">{courses.data[index].name}</p>
                    <div className="mt-auto ml-auto w-fit">
                      <Button value={'Asignar'} rounded="rounded-full" bg="bg-rosa" px="px-3" py="py-[4px]" textSize="text-sm" font="font-medium" clickeame={handleAsign} textColor="text-white" icon={<HiOutlineUserAdd className="text-xl" />} />
                    </div>
                  </div>
                ) : null
              )}
            </section>
          </section>
          <Footer />
        </section>
      </main>
    </>
  )
}
