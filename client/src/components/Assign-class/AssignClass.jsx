import { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'

// icons
import { HiOutlineUserAdd } from 'react-icons/hi'
import { BsJournalBookmark } from 'react-icons/bs'

// Componentes
import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Button } from '../Utils/Button/Button'
import { Modals } from '../Utils/Modals/Modals'
import { Pagination } from '../Utils/Pagination/Pagination'
import { getClass, GetClassByNumber } from '../../api/httpRequest'

export const AssignClass = () => {
  const [modalAsign, setModalAsign] = useState(false)
  const [pageNumber, setPageNumber] = useState(0)
  const [loading, setLoading] = useState(true)
  const [courses, setCourses] = useState([])
  const [detailCourse, setDetailCourse] = useState([])

  const getCursos = async () => {
    try {
      const response = await getClass()
      const { data } = response.data
      setCourses(data)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    getCursos()
  }, [])

  const handleModal = () => setModalAsign(false)

  const handleDetailCourse = async (numero_ficha) => {
    try {
      setModalAsign(true)
      const response = await GetClassByNumber(numero_ficha)
      const { data } = response.data
      setDetailCourse(data[0])
    } catch (error) {
      throw new Error(error)
    }
  }

  const coursesPerPage = 6
  const pageCount = Math.ceil(courses.length / coursesPerPage)
  const startIndex = pageNumber * coursesPerPage
  const endIndex = startIndex + coursesPerPage

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <>
      {modalAsign && <Modals bodyAsign title={'Asignar Instructor'} numero_ficha={detailCourse.numero_ficha} programa_formacion={detailCourse.nombre_programa_formacion} closeModal={handleModal} />}
      <main className='flex flex-row min-h-screen bg-whitesmoke'>
        <Siderbar />
        <section className='relative grid flex-auto w-min grid-rows-3-10-75-15'>
          <header className='grid place-items-center'>
            <Search searchFilter />
          </header>
          <section>
            <section className='grid grid-cols-1 px-10 pt-5 pb-2 gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3'>
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
                courses.slice(startIndex, endIndex).map((course, i) => {
                  return (
                    <div className=' group flex flex-col gap-3 rounded-xl md:h-[11rem] sm:h-[12.5rem] h-[10.5rem] justify-center p-3 shadow-lg border-slate-100 border-1' key={i}>
                      <header className='flex flex-row w-fit '>
                        <div className='z-10 bg-teal-200 border-2 border-teal-800 rounded-full w-14 h-14'>
                          <BsJournalBookmark className='w-full h-full scale-50' />
                        </div>
                        <div className='relative w-24 h-5 my-auto text-center bg-teal-200 border-2 border-teal-800 rounded-r-full right-2'>
                          <p className='text-xs font-medium'>{course.numero_ficha}</p>
                        </div>
                      </header>
                      <section>
                        <p className='text-sm font-medium'>{course.nombre_programa_formacion}</p>
                        <span className='text-xs font-light'>{course.estado}</span>
                      </section>
                      <div className='relative ml-auto bottom-2 w-fit'>
                        <Button value={'Asignar'} rounded='rounded-full' bg='bg-slate-200' px='px-3' py='py-[4px]' textSize='text-sm' font='font-medium' clickeame={() => handleDetailCourse(course.numero_ficha)} textColor='text-slate-600' icon={<HiOutlineUserAdd className='text-xl' />} />
                      </div>
                    </div>
                  )
                })
              )}
            </section>
            <div className='flex justify-center h-[13vh] relative bottom-0'>
              <Pagination setPageNumber={setPageNumber} pageCount={pageCount} />
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
    <div className=' group flex flex-col gap-3 rounded-xl md:h-[10.5rem] sm:h-[11.5rem] h-[9rem] justify-center p-3 shadow-lg border-slate-100 border-1'>
      <header className='flex flex-row w-fit '>
        <div className='bg-teal-200 border-2 border-teal-800 rounded-full w-14 h-14'>
          <BsJournalBookmark className='w-full h-full scale-50' />
        </div>
        <div className='relative w-24 h-5 my-auto text-center bg-teal-200 border-2 border-teal-800 rounded-r-full right-2 -z-10'>
          <p className='text-xs font-medium'>
            <Skeleton />
          </p>
        </div>
      </header>
      <section>
        <p className='text-sm font-medium'>
          <Skeleton />
        </p>
        <span className='text-xs font-light'>
          <Skeleton />
        </span>
      </section>
      <div className='mt-auto ml-auto w-fit'>
        <Skeleton />
      </div>
    </div>
  )
}
