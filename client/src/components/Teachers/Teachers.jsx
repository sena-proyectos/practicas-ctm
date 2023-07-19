import { React } from 'react'
import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'

export const Teachers = () => {
  const colorsOddRow = [
    {
      hrColor: 'border-purple-400',
      sideColor: 'bg-purple-400',
      linkColor: 'bg-purple-600',
    },
    {
      hrColor: 'border-aqua',
      sideColor: 'bg-aqua',
      linkColor: 'bg-emerald-400',
    },
    {
      hrColor: 'border-salmon/75',
      sideColor: 'bg-salmon/75',
      linkColor: 'bg-salmon',
    },
    {
      hrColor: 'border-third',
      sideColor: 'bg-third',
      linkColor: 'bg-sky-400',
    },
  ]
  const colorsRowPair = [
    {
      hrColor: 'border-third',
      sideColor: 'bg-third',
      linkColor: 'bg-sky-400',
    },
    {
      hrColor: 'border-salmon/75',
      sideColor: 'bg-salmon/75',
      linkColor: 'bg-salmon',
    },
    {
      hrColor: 'border-aqua',
      sideColor: 'bg-aqua',
      linkColor: 'bg-emerald-400',
    },
    {
      hrColor: 'border-purple-400',
      sideColor: 'bg-purple-400',
      linkColor: 'bg-purple-600',
    },
  ]

  return (
    <main className="flex flex-row min-h-screen">
      <Siderbar />
      <section className="relative grid flex-auto w-min grid-rows-3-10-75-15">
        <header className="grid place-items-center">
          <Search searchFilter />
        </header>
        <section className="grid grid-cols-4 px-12 py-gap-4 gap-x-10">
          <div className="rounded-[2rem] grid grid-cols-2-90-10 shadow-2xl h-[10rem]">
            <div className="flex flex-col w-4/5 gap-2 mx-auto my-auto">
              <h6 className="font-medium text-center text-[0.9rem]">Guillermo Stiven Benjumea Morales</h6>
              <hr className="font-bold border-purple-300 border-1" />
              <p className="text-[0.8rem] font-light text-center">Instructor Seguimiento</p>
            </div>
            <div className="w-full h-full rounded-r-[2rem] bg-purple-400"></div>
          </div>
          <div className="rounded-[2rem] grid grid-cols-2-90-10 shadow-2xl h-[10rem]">
            <div className="flex flex-col w-4/5 gap-2 mx-auto my-auto">
              <h6 className="font-medium text-center text-[0.9rem]">Guillermo Stiven Benjumea Morales</h6>
              <hr className="font-bold border-purple-300 border-1" />
              <p className="text-[0.8rem] font-light text-center">Instructor Líder</p>
            </div>
            <div className="w-full h-full rounded-r-[2rem] bg-purple-400"></div>
          </div>
        </section>
        <Footer />
      </section>
    </main>
  )
}
