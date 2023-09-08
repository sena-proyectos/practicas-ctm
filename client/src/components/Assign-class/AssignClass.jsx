import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// icons
import { HiOutlineUserAdd } from 'react-icons/hi'
import { BsJournalBookmark } from 'react-icons/bs'
import { IoReturnDownBack } from 'react-icons/io5'

// Componentes
import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Button } from '../Utils/Button/Button'
import { AsignTeacherModal } from '../Utils/Modals/Modals'
import { Pagination } from '../Utils/Pagination/Pagination'
import { getClassFree, GetClassByNumber } from '../../api/httpRequest'

export const AssignClass = () => {
  const [modalAsign, setModalAsign] = useState(false)
  const [pageNumber, setPageNumber] = useState(0)
  const [loading, setLoading] = useState(true)
  const [courses, setCourses] = useState([])
  const [detailCourse, setDetailCourse] = useState([])
  const [isEmptyLeader, setIsEmptyLeader] = useState()
  const [isEmptyPractical, setIsEmptyPractical] = useState()

  const getCursos = async () => {
    try {
      const response = await getClassFree()
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
      const emptyPractical = !data[0].id_instructor_seguimiento
      const emptyLeader = !data[0].id_instructor_lider
      setIsEmptyPractical(emptyPractical)
      setIsEmptyLeader(emptyLeader)
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

  const [notify, setNotify] = useState(false)

  useEffect(() => {
    if (notify) {
      toast.success('Se ha asignado el instructor', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        className: 'text-sm'
      })
    }
    setNotify(false)
    getCursos()
  }, [notify])

  return (
    <>
      {modalAsign && <AsignTeacherModal title={'Asignar Instructor'} numero_ficha={detailCourse.numero_ficha} emptyLeader={isEmptyLeader} emptyPractical={isEmptyPractical} programa_formacion={detailCourse.nombre_programa_formacion} setNotify={setNotify} closeModal={handleModal} />}
      <main className='flex flex-row min-h-screen bg-whitesmoke'>
        <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} theme='colored' />
        <Siderbar />
        <section className='relative grid flex-auto w-min grid-rows-3-10-75-15'>
          <header className='grid place-items-center'>
            <Search searchFilter placeholder={'Busca una ficha'} />
          </header>
          <section>
            <section className='grid grid-cols-1 px-10 pt-3 pb-2 gap-x-4 gap-y-7 md:h-[85%] sm:grid-cols-2 md:grid-cols-3'>
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
                    <div className=' group flex flex-col gap-3 rounded-xl md:h-[11rem] sm:h-[12.5rem] h-[10.5rem] justify-center p-3 bg-white shadow-lg border-slate-100 border-1' key={i}>
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
                        <Button rounded='rounded-full' bg='bg-slate-200' px='px-3' py='py-[4px]' textSize='text-sm' font='font-medium' onClick={() => handleDetailCourse(course.numero_ficha)} textColor='text-slate-600' inline>
                          <HiOutlineUserAdd className='text-xl' /> Asignar
                        </Button>
                      </div>
                    </div>
                  )
                })
              )}
            </section>
            <div className='absolute top-4 left-8'>
              <Link to='/fichas' className='flex items-center gap-2 text-sm font-medium rounded-full text-white bg-slate-600 px-4 py-[2px] transition-colors'>
                <IoReturnDownBack />
                Regresar
              </Link>
            </div>
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

