import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import { Pagination } from '@nextui-org/pagination'
import { toast, ToastContainer } from 'react-toastify'

// Icons
import { FaAngleRight } from 'react-icons/fa'
import { HiOutlineUserAdd } from 'react-icons/hi'

// Components
import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { colorsOddRow, keysRoles } from '../../import/staticData'
import { getTeachers, GetTeacherByName } from '../../api/httpRequest'
import { AddTeacherModal } from '../Utils/Modals/Modals'
import { Button } from '../Utils/Button/Button'

export const Teachers = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading] = useState(true)
  const [teacher, setTeacher] = useState([])
  const [searchedTeachers, setSearchedTeachers] = useState([])
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [notify, setNotify] = useState(false)

  /**
   * Identificador del rol del usuario almacenado en el almacenamiento local.
   *
   * @constant
   * @name idRol
   * @type {number}
   *
   * @example
   * const idRolUsuario = idRol;
   */
  const idRol = Number(localStorage.getItem('idRol'))

  /**
   * Función asincrónica para buscar aprendices por nombre de usuario.
   *
   * @async
   * @function
   * @name searchTeachers
   * @param {string} searchTerm - Término de búsqueda para el aprendiz.
   * @throws {Error} Error en caso de fallo en la solicitud.
   * @returns {void}
   *
   * @example
   * searchTeachers('John Doe');
   */
  const searchTeachers = async (searchTerm) => {
    if (searchTerm.trim() === '') {
      setError(null)
      setSearchedTeachers([])
      return
    }
    try {
      const response = await GetTeacherByName(searchTerm)
      const { data } = response.data
      if (searchTerm.trim() === '') {
        setError(null)
        setSearchedTeachers([])
      } else {
        setError(null)
        setSearchedTeachers(data)
      }
    } catch (error) {
      const message = error?.response?.data?.error?.info?.message

      setError(message ?? 'Usuario no existente')
      setSearchedTeachers([])
    }
  }

  /**
   * Función asincrónica para obtener la lista de instructores.
   *
   * @async
   * @function
   * @name getInstructores
   * @throws {Error} Error en caso de fallo en la solicitud.
   * @returns {void}
   *
   * @example
   * getInstructores();
   */
  const getInstructores = async () => {
    try {
      const response = await getTeachers()
      const { data } = response.data
      setTeacher(data)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    getInstructores()
  }, [])

  /**
   * Número de instructores a mostrar por página.
   *
   * @constant
   * @name instructoresPerPage
   * @type {number}
   * @default 8
   *
   * @example
   * const instructoresPorPagina = instructoresPerPage;
   */
  const instructoresPerPage = 8
  /**
   * Calcula el número de páginas necesarias para la paginación de instructores.
   *
   * @constant
   * @name pageCount
   * @type {number}
   *
   * @example
   * const numeroDePaginas = pageCount;
   */
  const pageCount = Math.ceil(teacher.length / instructoresPerPage)
  /**
   * Mapea los colores para las filas impares de la lista de instructores.
   *
   * @constant
   * @name allColors
   * @type {Array<Object>}
   *
   * @example
   * const coloresFilasImpares = allColors;
   */
  const allColors = teacher.map((_, index) => ({
    ...colorsOddRow[index % colorsOddRow.length]
  }))
  /**
   * Índice de inicio de la lista de instructores a mostrar en la página actual.
   *
   * @constant
   * @name startIndex
   * @type {number}
   *
   * @example
   * const indiceInicio = startIndex;
   */
  const startIndex = (pageNumber - 1) * instructoresPerPage
  /**
   * Índice de fin de la lista de instructores a mostrar en la página actual.
   *
   * @constant
   * @name endIndex
   * @type {number}
   *
   * @example
   * const indiceFin = endIndex;
   */
  const endIndex = startIndex + instructoresPerPage

  const navigate = useNavigate()

  useEffect(() => {
    setLoading(false)
  }, [])

  /**
   * Función para navegar a la página de fichas de instructor por su ID.
   *
   * @function
   * @name handleCourse
   * @param {number} id - ID del instructor.
   * @returns {void}
   *
   * @example
   * handleCourse(123);
   */
  const handleCourse = (id) => {
    return navigate(`/fichas-instructor/${id}`)
  }

  /**
   * Función para manejar el cierre del modal de asignación.
   *
   * @function
   * @name handleCloseModal
   * @returns {void}
   *
   * @example
   * handleCloseModal();
   */
  const handleModal = () => {
    setShowModal(!showModal)
  }

  /**
   * Efecto secundario para mostrar una notificación de crear instructor y actualizar la lista de instructores.
   *
   * @function
   * @name useEffectMostrarNotificacionYActualizarInstructores
   * @param {boolean} notify - Estado de notificación.
   * @returns {void}
   *
   * @example
   * useEffectMostrarNotificacionYActualizarInstructores(true);
   */
  useEffect(() => {
    if (notify) {
      toast.success('Se ha creado el instructor', {
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
    getInstructores()
  }, [notify])

  return (
    <>
      {showModal && <AddTeacherModal title={'Agregar instructor'} closeModal={handleModal} setNotify={setNotify} />}
      <main className='flex flex-row min-h-screen bg-whitesmoke'>
        <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} theme='colored' />
        <Siderbar />
        <section className='relative grid flex-auto w-min grid-rows-3-10-75-15'>
          <header className='grid place-items-center'>
            <Search searchFilter placeholder={'Busca un instructor'} searchStudent={searchTeachers} />
          </header>
          <section className='flex flex-col h-full gap-3'>
            {searchedTeachers.length > 0 && !error ? (
              <section className='grid grid-cols-1 gap-x-3 gap-y-4 md:grid-cols-4 px-8 md:px-12 pt-6 md:gap-y-2 md:gap-x-8 h-fit md:h-[85%] st1:grid-cols-3 st1:gap-y-4 st2:gap-y-4 st2:grid-cols-2'>
                {allColors.slice(startIndex, endIndex).map((color, index) =>
                  searchedTeachers[startIndex + index] ? (
                    <div className='rounded-[2rem] grid grid-cols-2-90-10 shadow-2xl h-[9rem] bg-white' key={index} {...color}>
                      <div className='flex flex-col w-4/5 gap-2 mx-auto my-auto'>
                        <h6 className='font-medium text-center text-[0.9rem]'>{`${searchedTeachers[startIndex + index].nombres_usuario} ${searchedTeachers[startIndex + index].apellidos_usuario}`}</h6>
                        <hr className={`font-bold ${color.hrcolor} border-1`} />
                        <p className='text-[0.8rem] font-light text-center'>{searchedTeachers[startIndex + index].id_rol === 3 && 'Instructor Seguimiento'}</p>
                      </div>
                      <div className={`w-full h-full rounded-r-[2rem] ${color.sidecolor}`}>
                        <div className={`w-full h-[3rem] rounded-tr-[2rem] text-white text-xl ${color.linkcolor}`}>
                          <button className='w-full h-full' onClick={() => handleCourse(searchedTeachers[startIndex + index].id_usuario)}>
                            <FaAngleRight className='h-full py-3 mx-auto' />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null
                )}
              </section>
            ) : (
              <section className='grid grid-cols-1 gap-x-3 gap-y-4 md:grid-cols-4 px-8 md:px-12 pt-6 md:gap-y-2 md:gap-x-8 h-fit md:h-[85%] st1:grid-cols-3 st1:gap-y-4 st2:gap-y-4 st2:grid-cols-2'>
                {loading ? (
                  <>
                    <SkeletonLoading />
                  </>
                ) : error ? (
                  <h2 className='text-red-500'>{error}</h2>
                ) : (
                  allColors.slice(startIndex, endIndex).map((color, index) =>
                    teacher[startIndex + index] ? (
                      <div className='rounded-[2rem] grid grid-cols-2-90-10 shadow-2xl h-[9rem] bg-white' key={index} {...color}>
                        <div className='flex flex-col w-4/5 gap-2 mx-auto my-auto'>
                          <h6 className='font-medium text-center text-[0.9rem]'>{`${teacher[startIndex + index].nombres_usuario} ${teacher[startIndex + index].apellidos_usuario}`}</h6>
                          <hr className={`font-bold ${color.hrcolor} border-1`} />
                          <p className='text-[0.8rem] font-light text-center'>{teacher[startIndex + index].id_rol === 3 && 'Instructor Seguimiento'}</p>
                        </div>
                        <div className={`w-full h-full rounded-r-[2rem] ${color.sidecolor}`}>
                          <div className={`w-full h-[3rem] rounded-tr-[2rem] text-white text-xl ${color.linkcolor}`}>
                            <button className='w-full h-full' onClick={() => handleCourse(teacher[startIndex + index].id_usuario)}>
                              <FaAngleRight className='h-full py-3 mx-auto' />
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : null
                  )
                )}
              </section>
            )}

            <div className='flex justify-center h-[13vh] relative st1:bottom-[-1.5rem] st2:bottom-[-3rem] bottom-[-4rem] md:bottom-0'>
              <Pagination total={pageCount} color='secondary' variant='flat' onChange={setPageNumber} className=' h-fit' />
            </div>
            {(idRol === Number(keysRoles[0]) || idRol === Number(keysRoles[1])) && (
              <div className='absolute flex flex-row-reverse gap-3 right-12 bottom-16'>
                <Button rounded='rounded-full' bg='bg-green-600' px='px-3' py='py-[4px]' textSize='text-sm' font='font-medium' textColor='text-white' onClick={handleModal} inline>
                  <HiOutlineUserAdd className='text-xl' />
                </Button>
              </div>
            )}
          </section>
          <Footer />
        </section>
      </main>
    </>
  )
}

const SkeletonLoading = () => {
  return colorsOddRow.map((color, index) => {
    return (
      <div className='rounded-[2rem] grid grid-cols-2-90-10 shadow-2xl h-[9rem]' key={index} {...color}>
        <div className='flex flex-col w-4/5 gap-2 mx-auto my-auto'>
          <h6 className='font-medium text-center text-[0.9rem]'>
            <Skeleton />
          </h6>
          <hr className={`font-bold ${color.hrcolor} border-1`} />
          <p className='text-[0.8rem] font-light text-center'>
            <Skeleton />
          </p>
        </div>
        <div className={`w-full h-full rounded-r-[2rem] ${color.sidecolor}`}>
          <div className={`w-full h-[3rem] rounded-tr-[2rem] text-white text-xl ${color.linkcolor}`}>
            <Link to='/fichas'>
              <FaAngleRight className='h-full py-3 mx-auto' />
            </Link>
          </div>
        </div>
      </div>
    )
  })
}
