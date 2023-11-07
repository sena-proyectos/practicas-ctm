import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Pagination } from '@nextui-org/pagination'

// icons
import { HiOutlineUserAdd } from 'react-icons/hi'
import { BsJournalBookmark } from 'react-icons/bs'
import { IoReturnDownBack } from 'react-icons/io5'
import { BiSad } from 'react-icons/bi'

// Componentes
import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Button } from '../Utils/Button/Button'
import { AsignTeacherModal } from '../Utils/Modals/Modals'
import { getClassFree, GetClassFreeByNumber } from '../../api/httpRequest'

export const AssignClass = () => {
  const [modalAsign, setModalAsign] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading] = useState(true)
  const [courses, setCourses] = useState([])
  const [detailCourse, setDetailCourse] = useState([])
  const [notify, setNotify] = useState(false)
  const [error, setError] = useState(null)
  const [searchedFreeCourses, setSearchedFreeCourses] = useState([])
  const [currentCourses, setCurrentCourses] = useState([])

  /**
   * @function
   * @name searchCourses
   * @async
   *
   * @description
   * Esta función se utiliza para buscar cursos sin instructor por su número de ficha. Si el término de búsqueda está vacío, restablece el estado de error y la lista de cursos buscados. En caso de éxito, procesa el nombre del programa de formación, actualiza el estado `searchedFreeCourses` con los resultados de la búsqueda y elimina el error. Si se produce un error, muestra un mensaje de error indicando que el curso no existe y restablece la lista de cursos buscados.
   *
   * @param {string} searchTerm - Término de búsqueda para el curso.
   * @throws {Error} Error en caso de fallo en la solicitud.
   * @returns {void}
   *
   * @example
   * searchCourses('John Doe');
   */
  const searchCourses = async (searchTerm) => {
    if (searchTerm.trim() === '') {
      setError(null)
      setSearchedFreeCourses([])
      return
    }
    try {
      const response = await GetClassFreeByNumber(searchTerm)
      const { data } = response.data
      data.forEach((element) => {
        element.nombre_programa_formacion = element.nombre_programa_formacion
          .split(' ')
          .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          })
          .join(' ')
      })
      if (searchTerm.trim() === '') {
        setError(null)
        setSearchedFreeCourses([])
      } else {
        setError(null)
        setSearchedFreeCourses(data)
      }
    } catch (error) {
      const message = error?.response?.data?.error?.info?.message

      setError(message ?? 'Usuario no existente')
      setSearchedFreeCourses([])
    }
  }

  /**
   * @function
   * @name getCursos
   * @async
   *
   * @description
   * Esta función realiza una solicitud para obtener la lista de cursos sin instructor utilizando la función `getClassFree`. Luego, procesa el nombre de cada programa de formación para capitalizar las primeras letras de cada palabra. Finalmente, actualiza el estado `courses` con los datos obtenidos y establece el estado `loading` como `false`.
   *
   * @throws {Error} Si la solicitud no se procesa con éxito, se lanza un error.
   * @returns {Promise<void>}
   *
   * @reference
   * Esta función se utiliza para obtener información de cursos disponibles y formatear los nombres de los programas de formación antes de actualizar el estado del componente.
   *
   * @example
   * getCursos();
   *
   */
  const getCursos = async () => {
    try {
      const response = await getClassFree()
      const { data } = response.data
      data.forEach((element) => {
        element.nombre_programa_formacion = element.nombre_programa_formacion
          .split(' ')
          .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          })
          .join(' ')
      })
      setCourses(data)
      setLoading(false)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    getCursos()
  }, [])

  /**
   * Función para manejar el cierre del modal de asignación.
   *
   * @function
   * @name handleModal
   * @returns {void}
   *
   * @example
   * handleModal();
   */
  const handleModal = () => setModalAsign(false)

  /**
   * @function
   * @name handleDetailCourse
   * @async
   *
   * @description
   * Esta función se utiliza para mostrar un modal de detalles del curso y obtener información detallada del curso identificado por `numero_ficha`. Se realiza una solicitud mediante la función `GetClassFreeByNumber`. Luego, se procesa el nombre del programa de formación capitalizando las primeras letras de cada palabra y se actualiza el estado `detailCourse` con los datos obtenidos.
   *
   * @param {string} numero_ficha - Número de ficha del curso.
   * @throws {Error} Error en caso de fallo en la solicitud.
   * @returns {void}
   *
   * @example
   * handleDetailCourse('12345');
   */
  const handleDetailCourse = async (numero_ficha) => {
    try {
      setModalAsign(true)
      const response = await GetClassFreeByNumber(numero_ficha)
      const { data } = response.data
      data.forEach((element) => {
        element.nombre_programa_formacion = element.nombre_programa_formacion
          .split(' ')
          .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          })
          .join(' ')
      })
      setDetailCourse(data[0])
    } catch (error) {
      throw new Error(error)
    }
  }

  /**
   * @function
   *
   * @description
   * Este efecto se activa cuando hay cambios en `searchedFreeCourses`, `error` o `courses`. Si `searchedFreeCourses` tiene elementos y no hay errores, actualiza `currentCourses` con los cursos buscados y establece `pageNumber` en 1. En caso contrario, restablece `currentCourses` a la lista completa de cursos almacenada en `courses`.
   *
   * @param {function} effect - La función que contiene la lógica del efecto.
   * @param {array} dependencies - Un arreglo de dependencias que determina cuándo se debe ejecutar el efecto.
   * @returns {void}
   *
   */
  useEffect(() => {
    if (searchedFreeCourses.length > 0 && !error) {
      setCurrentCourses(searchedFreeCourses)
      setPageNumber(1)
    } else {
      setCurrentCourses(courses)
    }
  }, [searchedFreeCourses, error, courses])

  /**
   * @type {number}
   * @name coursesPerPage
   * @default 6
   * @description
   * Almacena la cantidad de cursos que se muestran por página en la paginación de cursos.
   */
  const coursesPerPage = 6

  /**
   * @type {number}
   * @name pageCount
   * @description
   * Almacena el número de páginas necesarias para mostrar todos los cursos disponibles en función de la cantidad de cursos por página.
   */
  const pageCount = Math.ceil(currentCourses.length / coursesPerPage)

  /**
   * @type {number}
   * @name startIndex
   * @description
   * Almacena el índice de inicio de un rango de cursos en función del número de página actual y la cantidad de cursos por página.
   */
  const startIndex = (pageNumber - 1) * coursesPerPage

  /**
   * @type {number}
   * @name endIndex
   * @description
   * Almacena el índice de fin de un rango de cursos que se muestra en una paginación.
   */
  const endIndex = startIndex + coursesPerPage

  /**
   * @function
   *
   * @description
   * Este efecto se activa cuando cambia el valor de `notify`. Si `notify` es verdadero, muestra una notificación de éxito indicando que se ha asignado un instructor. Luego, establece `notify` como falso y llama a la función `getCursos` para actualizar la lista de cursos.
   *
   * @param {boolean} notify - Estado de notificación.
   * @returns {void}
   *
   */
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
      {modalAsign && <AsignTeacherModal title={'Asignar Instructor'} numero_ficha={detailCourse.numero_ficha} programa_formacion={detailCourse.nombre_programa_formacion} setNotify={setNotify} closeModal={handleModal} />}
      <main className='flex flex-row min-h-screen bg-whitesmoke'>
        <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} theme='colored' />
        <Siderbar />
        <section className='relative grid flex-auto w-min grid-rows-[auto_1fr_auto]'>
          <header className='grid place-items-center h-[10vh]'>
            <Search searchFilter placeholder={'Busca una ficha'} searchItem={searchCourses} />
          </header>
          <section className='flex flex-col justify-around'>
            {searchedFreeCourses.length > 0 && !error ? (
              <section className='grid grid-cols-1 gap-6 pt-3 px-7 st2:grid-cols-1 st1:grid-cols-2 md:grid-cols-3'>
                {searchedFreeCourses.slice(startIndex, endIndex).map((course, i) => {
                  return (
                    <div className='grid grid-rows-[2fr, 1fr, 1fr] gap-y-1 rounded-xl md:h-[11rem] sm:h-[12.5rem] h-[10.5rem] p-3 bg-white shadow-lg ' key={i}>
                      <header className='flex flex-row items-center w-fit '>
                        <div className='z-10 bg-teal-200 border-2 border-teal-800 rounded-full w-14 h-14'>
                          <BsJournalBookmark className='w-full h-full scale-50' />
                        </div>
                        <div className='relative w-24 h-5 my-auto text-center bg-teal-200 border-2 border-teal-800 rounded-r-full right-2'>
                          <p className='text-xs font-medium'>{course.numero_ficha}</p>
                        </div>
                      </header>
                      <section className='h-16'>
                        <p className='text-sm font-medium'>{course.nombre_programa_formacion}</p>
                        <span className='text-xs font-light'>{course.estado}</span>
                      </section>
                      <div className='relative ml-auto w-fit'>
                        <Button rounded='rounded-full' bg='bg-slate-200' px='px-3' py='py-[4px]' textSize='text-sm' font='font-medium' onClick={() => handleDetailCourse(course.numero_ficha)} textColor='text-slate-600' inline classNames='absolute bottom-[1px] right-0'>
                          <HiOutlineUserAdd className='text-xl' /> Asignar
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </section>
            ) : error ? (
              <section className='flex items-center justify-center w-full gap-2 text-red-600'>
                <BiSad className='text-2xl' />
                <h2>{error}</h2>
              </section>
            ) : (
              <section className='grid grid-cols-1 gap-6 pt-3 px-7 st2:grid-cols-1 st1:grid-cols-2 md:grid-cols-3'>
                {loading ? (
                  <>
                    <SkeletonLoading />
                  </>
                ) : (
                  courses.slice(startIndex, endIndex).map((course, i) => {
                    return (
                      <div className='grid grid-rows-[2fr, 1fr, 1fr] gap-y-1 rounded-xl md:h-[11rem] sm:h-[12.5rem] h-[10.5rem] p-3 bg-white shadow-lg ' key={i}>
                        <header className='flex flex-row items-center w-fit '>
                          <div className='z-10 bg-teal-200 border-2 border-teal-800 rounded-full w-14 h-14'>
                            <BsJournalBookmark className='w-full h-full scale-50' />
                          </div>
                          <div className='relative w-24 h-5 my-auto text-center bg-teal-200 border-2 border-teal-800 rounded-r-full right-2'>
                            <p className='text-xs font-medium'>{course.numero_ficha}</p>
                          </div>
                        </header>
                        <section className='h-16'>
                          <p className='text-sm font-medium'>{course.nombre_programa_formacion}</p>
                          <span className='text-xs font-light'>{course.estado}</span>
                        </section>
                        <div className='relative ml-auto w-fit'>
                          <Button rounded='rounded-full' bg='bg-slate-200' px='px-3' py='py-[4px]' textSize='text-sm' font='font-medium' onClick={() => handleDetailCourse(course.numero_ficha)} textColor='text-slate-600' inline classNames='absolute bottom-[1px] right-0'>
                            <HiOutlineUserAdd className='text-xl' /> Asignar
                          </Button>
                        </div>
                      </div>
                    )
                  })
                )}
              </section>
            )}
            <div className='absolute top-4 left-8'>
              <Link to='/fichas' className='flex items-center gap-2 text-sm font-medium rounded-full text-white bg-slate-600 px-4 py-[2px] transition-colors'>
                <IoReturnDownBack />
                Regresar
              </Link>
            </div>
            <div className='flex flex-col items-center pt-2 pb-1'>
              <div className='flex justify-center w-full'>{currentCourses.length === 0 || error || loading ? <></> : <Pagination total={pageCount} color='secondary' variant='flat' page={pageNumber} onChange={setPageNumber} className=' h-fit' />}</div>
            </div>
          </section>
          <Footer />
        </section>
      </main>
    </>
  )
}

const SkeletonLoading = ({ number = 6 }) =>
  [...Array(number)].map((_, i) => (
    <div className=' group flex flex-col gap-3 rounded-xl md:h-[10.5rem] sm:h-[11.5rem] h-[9rem] justify-center p-3 shadow-lg  bg-white ' key={i}>
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
  ))
