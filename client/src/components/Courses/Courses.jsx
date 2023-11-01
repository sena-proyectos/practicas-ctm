import { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useNavigate } from 'react-router-dom'

// Icons
import { LuBookPlus } from 'react-icons/lu'
import { PiAddressBook, PiCaretRightBold } from 'react-icons/pi'
import { TiDelete } from 'react-icons/ti'
import { BiSad } from 'react-icons/bi'
import { Pagination } from '@nextui-org/pagination'

// Componentes
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Button } from '../Utils/Button/Button'
import { Siderbar } from '../Siderbar/Sidebar'
import { Card3D } from '../Utils/Card/Card'
import { getClass, GetClassByNumber, sendExcelCourse } from '../../api/httpRequest'
import { RegisterCourses } from '../Utils/Modals/Modals'
import { keysRoles } from '../../import/staticData'
import { AiOutlineFileAdd } from 'react-icons/ai'
import Swal from 'sweetalert2'

export const Courses = () => {
  const idRol = Number(localStorage.getItem('idRol'))
  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading] = useState(true)
  const [courses, setCourses] = useState([])
  const [coursesOriginal, setCoursesOriginal] = useState([])
  const [showFiltros, setShowFiltros] = useState(false)
  const [filtersButtons, setFiltersButtons] = useState({ etapa: false, nivel: false, inicioLectiva: false, inicioPractica: false })
  const [activeFilter, setActiveFilter] = useState(false)
  const [error, setError] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [searchedCourses, setSearchedCourses] = useState([])
  const inputFileRef = useRef(null)
  const [getCourses, setGetCourses] = useState(false)
  const [originalSearched, setOriginalSearched] = useState([])
  const [currentCoursesList, setCurrentCoursesList] = useState({})

  /**
   * Función asincrónica para buscar fichas por numero de ficha.
   *
   * @async
   * @function
   * @name searchCourses
   * @param {string} searchTerm - Término de búsqueda para las fichas.
   * @throws {Error} Error en caso de fallo en la solicitud.
   * @returns {void}
   *
   * @example
   * searchCourses('John Doe');
   */
  const searchCourses = async (searchTerm) => {
    if (searchTerm.trim() === '') {
      setError(null)
      setSearchedCourses([])
      setOriginalSearched([])
      return
    }
    try {
      const response = await GetClassByNumber(searchTerm)
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
        setSearchedCourses([])
        setOriginalSearched([])
      } else {
        setError(null)
        setSearchedCourses(data)
        setOriginalSearched(data)
      }
    } catch (error) {
      const message = error?.response?.data?.error?.info?.message

      setError(message ?? 'Curso no existe')
      setSearchedCourses([])
    }
  }

  const handleCoursesModal = () => {
    setIsOpen(true)
  }
  const handleCloseModal = () => setIsOpen(false)
  /**
   * Función para manejar la visualización de los filtros.
   *
   * @function
   * @name handleFilter
   * @returns {void}
   *
   * @example
   * handleFilter();
   */
  const handleFilter = () => {
    setShowFiltros(!showFiltros)
  }

  /**
   * Función asincrónica para obtener la lista de cursos.
   *
   * @async
   * @function
   * @name getCursos
   * @throws {Error} Error en caso de fallo en la solicitud.
   * @returns {void}
   *
   * @example
   * getCursos();
   */
  const getCursos = async () => {
    try {
      const response = await getClass()
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
      setCoursesOriginal(data)
      setLoading(false)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    getCursos()
  }, [])

  // Cambia el numero de paginas dependiendo de la cantidad de cursos
  useEffect(() => {
    if (searchedCourses.length > 0 && !error) {
      setCurrentCoursesList(searchedCourses)
      setPageNumber(1)
    } else {
      setCurrentCoursesList(courses)
    }
  }, [searchedCourses, error, courses])

  /**
   * Número de cursos a mostrar por página.
   *
   * @constant
   * @name coursesPerPage
   * @type {number}
   * @default 6
   *
   * @example
   * const cursosPorPagina = coursesPerPage;
   */
  const coursesPerPage = 6
  /**
   * Calcula el número de páginas necesarias para la paginación.
   *
   * @constant
   * @name pageCount
   * @type {number}
   *
   * @example
   * const numeroDePaginas = pageCount;
   */
  const pageCount = Math.ceil(currentCoursesList.length / coursesPerPage)

  /**
   * Índice de inicio de la lista de cursos a mostrar en la página actual.
   *
   * @constant
   * @name startIndex
   * @type {number}
   *
   * @example
   * const indiceInicio = startIndex;
   */
  const startIndex = (pageNumber - 1) * coursesPerPage

  /**
   * Índice de fin de la lista de cursos a mostrar en la página actual.
   *
   * @constant
   * @name endIndex
   * @type {number}
   *
   * @example
   * const indiceFin = endIndex;
   */
  const endIndex = startIndex + coursesPerPage

  const navigate = useNavigate()

  /**
   * Función para navegar a la página de detalles de estudiantes por ficha.
   *
   * @function
   * @name handleStudents
   * @param {string} ficha - Número de ficha de aprendices.
   * @returns {void}
   *
   * @example
   * handleStudents('12345');
   */
  const handleStudents = (ficha) => {
    return navigate(`/fichas/aprendices/${ficha}`)
  }

  /**
   * Función para navegar a la página de asignar instructor a una ficha.
   *
   * @function
   * @name handleAsign
   * @returns {void}
   *
   * @example
   * handleAsign();
   */
  const handleAsign = () => {
    return navigate('/asignar-ficha')
  }

  /**
   * Deshabilita la visualización de los filtros después de un breve retraso.
   *
   * @function
   * @name disableShowFiltros
   * @returns {void}
   *
   * @example
   * disableShowFiltros();
   */
  const disableShowFiltros = () => {
    setTimeout(() => {
      setShowFiltros(false)
      setFiltersButtons({ etapa: false, nivel: false, finLectiva: false, inicioPractica: false })
    }, 100)
  }

  /**
   * Muestra u oculta el filtro especificado.
   *
   * @function
   * @name ShowFilter
   * @param {string} filterType - Tipo de filtro ('etapa', 'nivel', 'finLectiva' o 'inicioPractica').
   * @returns {void}
   *
   * @example
   * ShowFilter('etapa');
   */
  const ShowFilter = (filterType) => {
    if (filterType === 'etapa') setFiltersButtons({ etapa: !filtersButtons.etapa, nivel: false, fecha: false, inicioPractica: false })
    if (filterType === 'nivel') setFiltersButtons({ nivel: !filtersButtons.nivel, modalidad: false, fecha: false, inicioPractica: false })
    if (filterType === 'inicioLectiva') setFiltersButtons({ inicioLectiva: !filtersButtons.inicioLectiva, etapa: false, nivel: false, inicioPractica: false })
    if (filterType === 'inicioPractica') setFiltersButtons({ inicioPractica: !filtersButtons.inicioPractica, etapa: false, nivel: false, inicioLectiva: false })
  }

  /**
   * Maneja la selección de filtro de tipo y actualiza la lista de cursos.
   *
   * @function
   * @name handleFilterType
   * @param {string} filterType - Tipo de filtro ('etapa' o 'nivel').
   * @param {string} filter - Valor del filtro seleccionado.
   * @returns {void}
   *
   * @example
   * handleFilterType('etapa', 'Activo');
   */
  const handleFilterType = (filterType, filter) => {
    if (filterType === 'etapa') {
      let filterMap
      if (originalSearched.length > 0 && !error) {
        filterMap = originalSearched.filter((course) => course.estado === filter)
        setSearchedCourses({})
      } else {
        filterMap = coursesOriginal.filter((course) => course.estado === filter)
      }
      setCourses(filterMap)
    }
    if (filterType === 'nivel') {
      let filterMap
      if (originalSearched.length > 0 && !error) {
        filterMap = originalSearched.filter((course) => course.nivel_formacion === filter)
        setSearchedCourses({})
      } else {
        filterMap = coursesOriginal.filter((course) => course.nivel_formacion === filter)
      }
      setCourses(filterMap)
    }
    if (filterType === 'inicioLectiva') {
      let filterMap = []

      if (filter === 'Hoy') {
        const today = new Date()
        if (originalSearched.length > 0 && !error) {
          filterMap = originalSearched.filter((course) => {
            setSearchedCourses({})
            const courseDate = new Date(course.fecha_inicio_lectiva + 'T00:00:00')
            return courseDate.toDateString() === today.toDateString()
          })
        } else {
          filterMap = coursesOriginal.filter((course) => {
            const courseDate = new Date(course.fecha_inicio_lectiva + 'T00:00:00')
            return courseDate.getFullYear() === today.getFullYear() && courseDate.getMonth() === today.getMonth() && courseDate.getDate() === today.getDate()
          })
        }
      } else if (filter === 'Esta Semana') {
        const today = new Date()
        const nextWeek = new Date(today)
        nextWeek.setDate(today.getDate() + 7)
        if (originalSearched.length > 0 && !error) {
          filterMap = originalSearched.filter((course) => {
            setSearchedCourses({})
            const courseDate = new Date(course.fecha_inicio_lectiva + 'T00:00:00')
            return courseDate.toDateString() >= today.toDateString() && courseDate <= nextWeek
          })
        } else {
          filterMap = coursesOriginal.filter((course) => {
            const courseDate = new Date(course.fecha_inicio_lectiva + 'T00:00:00')
            return courseDate.toDateString() >= today.toDateString() && courseDate <= nextWeek
          })
        }
      } else if (filter === 'Próxima Semana') {
        const today = new Date()
        const nextWeek = new Date(today)
        nextWeek.setDate(today.getDate() + 7)
        const weekAfterNext = new Date(nextWeek)
        weekAfterNext.setDate(nextWeek.getDate() + 7)
        if (originalSearched.length > 0 && !error) {
          filterMap = originalSearched.filter((course) => {
            setSearchedCourses({})
            const courseDate = new Date(course.fecha_inicio_lectiva + 'T00:00:00')
            return courseDate >= nextWeek && courseDate <= weekAfterNext
          })
        } else {
          filterMap = coursesOriginal.filter((course) => {
            const courseDate = new Date(course.fecha_inicio_lectiva + 'T00:00:00')
            return courseDate >= nextWeek && courseDate <= weekAfterNext
          })
        }
      } else if (filter === 'Este Mes') {
        const today = new Date()
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        if (originalSearched.length > 0 && !error) {
          filterMap = originalSearched.filter((course) => {
            setSearchedCourses({})
            const courseDate = new Date(course.fecha_inicio_lectiva + 'T00:00:00')
            return courseDate >= firstDayOfMonth && courseDate <= lastDayOfMonth
          })
        } else {
          filterMap = coursesOriginal.filter((course) => {
            const courseDate = new Date(course.fecha_inicio_lectiva + 'T00:00:00')
            return courseDate >= firstDayOfMonth && courseDate <= lastDayOfMonth
          })
        }
      } else if (filter === 'Próximo Mes') {
        const today = new Date()
        const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0)
        if (originalSearched.length > 0 && !error) {
          filterMap = originalSearched.filter((course) => {
            setSearchedCourses({})
            const courseDate = new Date(course.fecha_inicio_lectiva + 'T00:00:00')
            return courseDate >= nextMonth && courseDate <= endOfMonth
          })
        } else {
          filterMap = coursesOriginal.filter((course) => {
            const courseDate = new Date(course.fecha_inicio_lectiva + 'T00:00:00')
            return courseDate >= nextMonth && courseDate <= endOfMonth
          })
        }
      }

      setCourses(filterMap)
    }
    if (filterType === 'inicioPractica') {
      let filterMap = []

      if (filter === 'Hoy') {
        const today = new Date()
        if (originalSearched.length > 0 && !error) {
          filterMap = originalSearched.filter((course) => {
            setSearchedCourses({})
            const courseDate = new Date(course.fecha_inicio_practica + 'T00:00:00')
            return courseDate.getFullYear() === today.getFullYear() && courseDate.getMonth() === today.getMonth() && courseDate.getDate() === today.getDate()
          })
        } else {
          filterMap = coursesOriginal.filter((course) => {
            const courseDate = new Date(course.fecha_inicio_practica + 'T00:00:00')
            return courseDate.getFullYear() === today.getFullYear() && courseDate.getMonth() === today.getMonth() && courseDate.getDate() === today.getDate()
          })
        }
      } else if (filter === 'Esta Semana') {
        const today = new Date()
        const nextWeek = new Date(today)
        nextWeek.setDate(today.getDate() + 7)
        if (originalSearched.length > 0 && !error) {
          filterMap = originalSearched.filter((course) => {
            setSearchedCourses({})
            const courseDate = new Date(course.fecha_inicio_practica + 'T00:00:00')
            return courseDate.toDateString() >= today.toDateString() && courseDate <= nextWeek
          })
        } else {
          filterMap = coursesOriginal.filter((course) => {
            const courseDate = new Date(course.fecha_inicio_practica + 'T00:00:00')
            return courseDate.toDateString() >= today.toDateString() && courseDate <= nextWeek
          })
        }
      } else if (filter === 'Próxima Semana') {
        const today = new Date()
        const nextWeek = new Date(today)
        nextWeek.setDate(today.getDate() + 7)
        const weekAfterNext = new Date(nextWeek)
        weekAfterNext.setDate(nextWeek.getDate() + 7)
        if (originalSearched.length > 0 && !error) {
          filterMap = originalSearched.filter((course) => {
            setSearchedCourses({})
            const courseDate = new Date(course.fecha_inicio_practica + 'T00:00:00')
            return courseDate >= nextWeek && courseDate <= weekAfterNext
          })
        } else {
          filterMap = coursesOriginal.filter((course) => {
            const courseDate = new Date(course.fecha_inicio_practica + 'T00:00:00')
            return courseDate >= nextWeek && courseDate <= weekAfterNext
          })
        }
      } else if (filter === 'Este Mes') {
        const today = new Date()
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        if (originalSearched.length > 0 && !error) {
          filterMap = originalSearched.filter((course) => {
            setSearchedCourses({})
            const courseDate = new Date(course.fecha_inicio_practica + 'T00:00:00')
            return courseDate >= firstDayOfMonth && courseDate <= lastDayOfMonth
          })
        } else {
          filterMap = coursesOriginal.filter((course) => {
            const courseDate = new Date(course.fecha_inicio_practica + 'T00:00:00')
            return courseDate >= firstDayOfMonth && courseDate <= lastDayOfMonth
          })
        }
      } else if (filter === 'Próximo Mes') {
        const today = new Date()
        const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0)
        if (originalSearched.length > 0 && !error) {
          filterMap = originalSearched.filter((course) => {
            setSearchedCourses({})
            const courseDate = new Date(course.fecha_inicio_practica + 'T00:00:00')
            return courseDate >= nextMonth && courseDate <= endOfMonth
          })
        } else {
          filterMap = coursesOriginal.filter((course) => {
            const courseDate = new Date(course.fecha_inicio_practica + 'T00:00:00')
            return courseDate >= nextMonth && courseDate <= endOfMonth
          })
        }
      }

      setCourses(filterMap)
    }
    disableShowFiltros()
    setActiveFilter(true)
  }

  /**
   * Restablece los filtros y muestra la lista original de cursos.
   *
   * @function
   * @name handleResetFilter
   * @returns {void}
   *
   * @example
   * handleResetFilter();
   */
  const handleResetFilter = () => {
    setCourses(coursesOriginal)
    disableShowFiltros()
    setActiveFilter(false)
    setSearchedCourses(originalSearched)
  }

  const sendExcelFile = async () => {
    const [file] = inputFileRef.current.files
    const formData = new FormData()
    try {
      formData.append('excelFile', file)
      return await sendExcelCourse(formData)
    } catch (error) {
      throw new Error(error)
    }
  }

  const handleExcelFile = (e) => {
    const [file] = e.target.files
    Swal.fire({
      title: '¿Estás seguro que quieres subir este archivo?',
      text: `Nombre del archivo: ${file.name}`,
      showCancelButton: true,
      confirmButtonText: 'Subir archivo',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return new Promise((resolve, reject) => {
          sendExcelFile()
            .then(({ data }) => {
              const { readedIDs } = data
              resolve(readedIDs)
            })
            .catch(() => {
              reject(new Error('Error al subir el archivo'))
            })
        })
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
      .then(({ value }) => {
        Swal.fire({
          title: 'Ficha cargada correctamente.'
        })
        getCursos()
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error al subir el archivo'
        })
        console.error(error)
      })
  }

  if (getCourses) {
    getCursos()
  }

  return (
    <main className='flex flex-row min-h-screen bg-whitesmoke'>
      {isOpen && <RegisterCourses closedModal={handleCloseModal} setGetCourses={setGetCourses} title={'Agrega una ficha'} />}
      <Siderbar />
      <section className='relative grid flex-auto grid-rows-[auto_1fr_auto]'>
        <header className='grid place-items-center h-[10vh]'>
          <Search searchItem={searchCourses} searchFilter placeholder={'Busca una ficha'} icon iconClick={handleFilter} />
          <ul className={`absolute right-48  mt-1 top-4 w-40 flex flex-col gap-y-1 py-2 text-sm border border-gray rounded-lg bg-white ${showFiltros ? 'visible' : 'hidden'} z-10 transition-all duration-200`} onMouseLeave={disableShowFiltros}>
            <li>
              <button type='button' className='relative flex items-center justify-between w-full h-full px-3 py-1 hover:bg-whitesmoke text-slate-800' onClick={() => ShowFilter('etapa')}>
                Etapa Formación
                <PiCaretRightBold className={`text-md mt-[1px] ${filtersButtons.etapa ? 'rotate-90' : 'rotate-0'} transition-all duration-200`} />
                {filtersButtons.etapa && (
                  <section className='absolute left-full ml-[2px] bg-white top-0 border border-gray rounded-lg'>
                    <ul className='flex flex-col w-40 gap-1 py-2'>
                      <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleFilterType('etapa', 'Lectiva')}>
                        Lectiva
                      </li>
                      <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleFilterType('etapa', 'Práctica')}>
                        Práctica
                      </li>
                    </ul>
                  </section>
                )}
              </button>
            </li>
            <li>
              <button type='button' className='relative flex items-center justify-between w-full h-full px-3 py-1 hover:bg-whitesmoke text-slate-800' onClick={() => ShowFilter('nivel')}>
                Nivel Formación
                <PiCaretRightBold className={`text-md mt-[1px] ${filtersButtons.nivel ? 'rotate-90' : 'rotate-0'} transition-all duration-200`} />
                {filtersButtons.nivel && (
                  <section className='absolute left-full ml-[2px] bg-white top-0 border border-gray rounded-lg'>
                    <ul className='flex flex-col w-40 gap-1 py-2'>
                      <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleFilterType('nivel', 'Técnico')}>
                        Técnica
                      </li>
                      <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleFilterType('nivel', 'Tecnología')}>
                        Tecnólogo
                      </li>
                      <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleFilterType('nivel', 'Auxiliar')}>
                        Auxiliar
                      </li>
                    </ul>
                  </section>
                )}
              </button>
            </li>
            <li>
              <button type='button' className='relative flex items-center justify-between w-full h-full px-3 py-1 hover:bg-whitesmoke text-slate-800' onClick={() => ShowFilter('inicioLectiva')}>
                Inicio Lectiva
                <PiCaretRightBold className={`text-md mt-[1px] ${filtersButtons.inicioLectiva ? 'rotate-90' : 'rotate-0'} transition-all duration-200`} />
                {filtersButtons.inicioLectiva && (
                  <section className='absolute left-full ml-[2px] bg-white top-0 border border-gray rounded-lg'>
                    <ul className='flex flex-col w-40 gap-1 py-2'>
                      <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleFilterType('inicioLectiva', 'Hoy')}>
                        Hoy
                      </li>
                      <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleFilterType('inicioLectiva', 'Esta Semana')}>
                        Esta Semana
                      </li>
                      <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleFilterType('inicioLectiva', 'Próxima Semana')}>
                        Próxima Semana
                      </li>
                      <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleFilterType('inicioLectiva', 'Este Mes')}>
                        Este Mes
                      </li>
                      <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleFilterType('inicioLectiva', 'Próximo Mes')}>
                        Próximo Mes
                      </li>
                    </ul>
                  </section>
                )}
              </button>
            </li>
            <li>
              <button type='button' className='relative flex items-center justify-between w-full h-full px-3 py-1 hover:bg-whitesmoke text-slate-800' onClick={() => ShowFilter('inicioPractica')}>
                Inicio Productiva
                <PiCaretRightBold className={`text-md mt-[1px] ${filtersButtons.inicioPractica ? 'rotate-90' : 'rotate-0'} transition-all duration-200`} />
                {filtersButtons.inicioPractica && (
                  <section className='absolute left-full ml-[2px] bg-white top-0 border border-gray rounded-lg'>
                    <ul className='flex flex-col w-40 gap-1 py-2'>
                      <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleFilterType('inicioPractica', 'Hoy')}>
                        Hoy
                      </li>
                      <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleFilterType('inicioPractica', 'Esta Semana')}>
                        Esta Semana
                      </li>
                      <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleFilterType('inicioPractica', 'Próxima Semana')}>
                        Próxima Semana
                      </li>
                      <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleFilterType('inicioPractica', 'Este Mes')}>
                        Este Mes
                      </li>
                      <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleFilterType('inicioPractica', 'Próximo Mes')}>
                        Próximo Mes
                      </li>
                    </ul>
                  </section>
                )}
              </button>
            </li>
          </ul>
          {activeFilter && (
            <section className='absolute right-3'>
              <button type='button' className='text-sm font-light flex items-center gap-[2px] hover:text-red-500 transition-colors' onClick={handleResetFilter}>
                <TiDelete className='text-xl text-red-500' /> Borrar Filtro
              </button>
            </section>
          )}
        </header>
        <section className='flex flex-col justify-around'>
          {searchedCourses.length > 0 && !error ? (
            <section className='grid grid-cols-1 gap-6 pt-3 px-7 st2:grid-cols-1 st1:grid-cols-2 md:grid-cols-3'>
              {searchedCourses.slice(startIndex, endIndex).map((course, i) => {
                return <Card3D key={i} header={course.numero_ficha} title={course.nombre_programa_formacion} subtitle={course.estado} item1={course.seguimiento_nombre_completo} item2={course.nivel_formacion} item3={course.fecha_inicio_lectiva} item4={course.fecha_inicio_practica} onClick={() => handleStudents(course.numero_ficha)} item1text={'Instructor de seguimiento'} item2text={'Nivel de formación'} item3text={'Inicio Lectiva'} item4text={'Inicio Practica'} />
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
                <SkeletonLoading number={6} />
              ) : courses.length > 0 ? (
                courses.slice(startIndex, endIndex).map((course, i) => {
                  return <Card3D key={i} header={course.numero_ficha} title={course.nombre_programa_formacion} subtitle={course.estado} item1={course.seguimiento_nombre_completo} item2={course.nivel_formacion} item3={course.fecha_inicio_lectiva} item4={course.fecha_inicio_practica} onClick={() => handleStudents(course.numero_ficha)} item1text={'Instructor de seguimiento'} item2text={'Nivel de formación'} item3text={'Inicio Lectiva'} item4text={'Inicio Practica'} />
                })
              ) : (
                <section className='absolute flex justify-center w-full top-32'>
                  <section className='flex items-center gap-1 mx-auto text-xl text-red-500'>
                    <p>¡Oops! No hay ningún curso con este filtro.</p>
                    <BiSad className='text-2xl' />
                  </section>
                </section>
              )}
            </section>
          )}

          <div className='flex flex-col items-center gap-1 pt-2 pb-1'>
            <div className='flex justify-center w-full'>{currentCoursesList.length === 0 || error || loading ? <></> : <Pagination total={pageCount} color='secondary' variant='flat' page={pageNumber} onChange={setPageNumber} className=' h-fit' />}</div>
            {(idRol === Number(keysRoles[0]) || idRol === Number(keysRoles[1])) && (
              <div className='grid w-full grid-flow-col-dense gap-3 place-content-end px-7'>
                <div className='ml-auto bg-green-600 rounded-full shadow-md'>
                  <label htmlFor='upload' className='flex items-center w-full h-full gap-1.5 px-3 py-1.5 text-white rounded-full cursor-pointer'>
                    <span className='text-sm font-medium text-white select-none'>Subir arhivo</span>
                    <AiOutlineFileAdd />
                  </label>
                  <input id='upload' accept='.xlsx, .xls' type='file' className='hidden w-full' ref={inputFileRef} onChange={handleExcelFile} />
                </div>
                <Button rounded='rounded-full' bg='bg-green-600' px='px-3' py='py-1.5' textSize='text-sm' font='font-medium' textColor='text-white' onClick={handleAsign} inline>
                  <PiAddressBook className='text-xl' /> Asignar
                </Button>
                <Button rounded='rounded-full' bg='bg-blue-600' px='px-3' py='py-1.5' textSize='text-sm' font='font-medium' textColor='text-white' onClick={handleCoursesModal} inline>
                  <LuBookPlus className='text-xl' /> Agregar ficha
                </Button>
              </div>
            )}
          </div>
        </section>
        <Footer />
      </section>
    </main>
  )
}

const SkeletonLoading = ({ number = 6 }) => [...Array(number)].map((_, i) => <Card3D header={<Skeleton />} title={<Skeleton />} subtitle={<Skeleton />} item1={<Skeleton />} item2={<Skeleton />} item3={<Skeleton />} item4={<Skeleton />} key={i} />)
