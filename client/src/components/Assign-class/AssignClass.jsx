import { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'

//icons
import { HiOutlineUserAdd } from 'react-icons/hi'
import { BsJournalBookmark } from 'react-icons/bs'

//Componentes
import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Button } from '../Utils/Button/Button'
import { Modals } from '../Utils/Modals/Modals'
import { Pagination } from '../Utils/Pagination/Pagination'

export const AssignClass = () => {
  const [modalAsign, setModalAsign] = useState(false)
  const [pageNumber, setPageNumber] = useState(0)
  const [loading, setLoading] = useState(true)

  const courses = {
    data: [
      {
        ficha: 2473196,
        name: 'Fabricación de muebles contemporaneos',
        etapa: 'Lectiva',
      },
      {
        ficha: 2689476,
        name: 'Analisis y desarrollo de software',
        etapa: 'Productiva',
      },
      {
        ficha: 2869467,
        name: 'Pan y Tomate',
        etapa: 'Lectiva',
      },
      {
        ficha: 1234567,
        name: 'Fabricación de muebles contemporaneos',
        etapa: 'Productiva',
      },
      {
        ficha: 7654321,
        name: 'Analisis y desarrollo de software',
        etapa: 'Lectiva',
      },
      {
        ficha: 1234765,
        name: 'Pan y Tomate',
        etapa: 'Productiva',
      },
    ],
  }

  const coursesPerPage = 6
  const pageCount = Math.ceil(courses.data.length / coursesPerPage)
  const startIndex = pageNumber * coursesPerPage
  const endIndex = startIndex + coursesPerPage

  const handleAsign = () => {
    setModalAsign(!modalAsign)
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

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
            <section className="grid grid-cols-1 px-10 pt-5 pb-2 gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3">
              {loading ? (
                <>
                  <SkeletonLoading />
                  <SkeletonLoading />
                  <SkeletonLoading />
                  <SkeletonLoading />
                  <SkeletonLoading />
                  <SkeletonLoading />
                </>
              ) : (
                courses.data.slice(startIndex, endIndex).map((course, i) => {
                  return (
                    <div className=" group flex flex-col gap-3 rounded-xl md:h-[11rem] sm:h-[12.5rem] h-[10.5rem] justify-center p-3 shadow-lg border-slate-100 border-1" key={i}>
                      <header className="flex flex-row w-fit ">
                        <div className="bg-teal-200 border-2 border-teal-800 rounded-full w-14 h-14">
                          <BsJournalBookmark className="w-full h-full scale-50" />
                        </div>
                        <div className="relative w-24 h-5 my-auto text-center bg-teal-200 border-2 border-teal-800 rounded-r-full right-2 -z-10">
                          <p className="text-xs font-medium">{course.ficha}</p>
                        </div>
                      </header>
                      <section>
                        <p className="text-sm font-medium">{course.name}</p>
                        <span className="text-xs font-light">{course.etapa}</span>
                      </section>
                      <div className="relative ml-auto bottom-2 w-fit">
                        <Button value={'Asignar'} rounded="rounded-full" bg="bg-slate-200" px="px-3" py="py-[4px]" textSize="text-sm" font="font-medium" clickeame={handleAsign} textColor="text-slate-600" icon={<HiOutlineUserAdd className="text-xl" />} />
                      </div>
                    </div>
                  )
                })
              )}
            </section>
            <div className="flex justify-center h-[13vh] relative bottom-0">
              <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} pageCount={pageCount} />
            </div>
          </section>
          <Footer />
        </section>
      </main>
    </>
  )
}

const SkeletonLoading = () => {
  return (
    <div className=" group flex flex-col gap-3 rounded-xl md:h-[10.5rem] sm:h-[11.5rem] h-[9rem] justify-center p-3 shadow-lg border-slate-100 border-1">
      <header className="flex flex-row w-fit ">
        <div className="bg-teal-200 border-2 border-teal-800 rounded-full w-14 h-14">
          <BsJournalBookmark className="w-full h-full scale-50" />
        </div>
        <div className="relative w-24 h-5 my-auto text-center bg-teal-200 border-2 border-teal-800 rounded-r-full right-2 -z-10">
          <p className="text-xs font-medium">
            <Skeleton />
          </p>
        </div>
      </header>
      <section>
        <p className="text-sm font-medium">
          <Skeleton />
        </p>
        <span className="text-xs font-light">
          <Skeleton />
        </span>
      </section>
      <div className="mt-auto ml-auto w-fit">
        <Skeleton />
      </div>
    </div>
  )
}
