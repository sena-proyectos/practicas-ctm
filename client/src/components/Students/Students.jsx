import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Pagination } from '@nextui-org/pagination'
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover'
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify'
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@nextui-org/table'

// Icons
import { AiOutlineEye } from 'react-icons/ai'
import { PiCaretRightBold, PiDownloadSimple, PiPencilSimple } from 'react-icons/pi'
import { TiDelete } from 'react-icons/ti'
import { BsInfoCircle } from 'react-icons/bs'
import { LuSave } from 'react-icons/lu'

// Componentes
import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'
import { Button } from '../Utils/Button/Button'
import { GetClassByNumber, GetStudentsByCourse, editDateClass, generateExcelClass } from '../../api/httpRequest'
import { ModalWithChildren } from '../Utils/Modals/Modals'
import { keysRoles } from '../../import/staticData'

export const Students = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [detailCourse, setDetailCourse] = useState([])
  const [studentsCourse, setStudentsCourse] = useState([])
  const [studentsCourseOriginal, setStudentsCourseOriginal] = useState([])
  const { id: courseNumber } = useParams()
  const [showFiltros, setShowFiltros] = useState(false)
  const [filtersButtons, setFiltersButtons] = useState({ modalidad: false, etapa: false })
  const [activeFilter, setActiveFilter] = useState(false)
  // const [isOpen, setIsOpen] = useState(false)
  const [loadingData, setLoadingData] = useState({ course: true, students: true })
  const [modalDates, setModalDates] = useState(false)
  const idRol = Number(localStorage.getItem('idRol'))

  /**
   * Función asincrónica para obtener la lista de estudiantes por curso.
   *
   * @async
   * @function
   * @name getStudents
   * @param {number} payload - Número de curso.
   * @throws {Error} Error en caso de fallo en la solicitud.
   * @returns {void}
   *
   * @example
   * getStudents(123);
   */
  const getStudents = async (payload) => {
    try {
      const response = await GetStudentsByCourse(payload)
      const { data } = response.data
      data.forEach((element) => {
        element.nombre_completo = element.nombre_completo
          .split(' ')
          .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          })
          .join(' ')
      })
      setStudentsCourse(data)
      setStudentsCourseOriginal(data)
      setLoadingData({ students: false })
    } catch (err) {
      throw new Error(err)
    }
  }
  // const handleStudentModal = () => {
  //   setIsOpen(true)
  // }

  useEffect(() => {
    getStudents(courseNumber)
    getCourseData(courseNumber)
  }, [])

  /**
   * Función asincrónica para obtener los detalles del curso.
   *
   * @async
   * @function
   * @name getCourseData
   * @param {number} payload - Número de curso.
   * @throws {Error} Error en caso de fallo en la solicitud.
   * @returns {void}
   *
   * @example
   * getCourseData(123);
   */
  const getCourseData = async (payload) => {
    try {
      const response = await GetClassByNumber(payload)
      const { data } = response.data
      data.forEach((element) => {
        element.nombre_programa_formacion = element.nombre_programa_formacion
          .split(' ')
          .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          })
          .join(' ')
      })
      const fechaInicioLectiva = data[0].fecha_inicio_lectiva
      const fechaInicioPractica = data[0].fecha_inicio_practica
      const parsedDateStart = fechaInicioLectiva ? fechaInicioLectiva.split('T')[0].split('-').join('-') : fechaInicioLectiva
      const parsedDateEnd = fechaInicioPractica ? fechaInicioPractica.split('T')[0].split('-').join('-') : fechaInicioPractica
      data[0].fecha_inicio_lectiva = parsedDateStart
      data[0].fecha_inicio_practica = parsedDateEnd
      setDetailCourse(data[0])
      setLoadingData({ course: false })
    } catch (error) {
      throw new Error(error)
    }
  }

  // const handleCloseModal = () => setIsOpen(false)

  /**
   * Número de estudiantes a mostrar por página.
   *
   * @constant
   * @name studentsPerPage
   * @type {number}
   * @default 5
   *
   * @example
   * const estudiantesPorPagina = studentsPerPage;
   */
  const studentsPerPage = 5
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
  const pageCount = Math.ceil(studentsCourse.length / studentsPerPage)
  /**
   * Índice de inicio de la lista de estudiantes a mostrar en la página actual.
   *
   * @constant
   * @name startIndex
   * @type {number}
   *
   * @example
   * const indiceInicio = startIndex;
   */
  const startIndex = (pageNumber - 1) * studentsPerPage
  /**
   * Índice de fin de la lista de estudiantes a mostrar en la página actual.
   *
   * @constant
   * @name endIndex
   * @type {number}
   *
   * @example
   * const indiceFin = endIndex;
   */
  const endIndex = startIndex + studentsPerPage

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
      setFiltersButtons({ modalidad: false, etapa: false })
    }, 100)
  }

  /**
   * Maneja la visualización de los filtros.
   *
   * @function
   * @name handleShowFiltros
   * @returns {void}
   *
   * @example
   * handleShowFiltros();
   */
  const handleShowFiltros = () => {
    setShowFiltros(!showFiltros)
  }

  /**
   * Muestra u oculta el filtro especificado.
   *
   * @function
   * @name ShowFilter
   * @param {string} filterType - Tipo de filtro ('modalidad' o 'estado').
   * @returns {void}
   *
   * @example
   * ShowFilter('modalidad');
   */
  const ShowFilter = (filterType) => {
    if (filterType === 'modalidad') setFiltersButtons({ modalidad: !filtersButtons.modalidad, etapa: false })
    if (filterType === 'estado') setFiltersButtons({ etapa: !filtersButtons.etapa, modalidad: false })
  }

  /**
   * Maneja la selección de filtro de modalidad o estado y actualiza la lista de estudiantes.
   *
   * @function
   * @name handleModalidadFilter
   * @param {string} filterType - Tipo de filtro ('modalidad' o 'estado').
   * @param {string} filter - Valor del filtro seleccionado.
   * @returns {void}
   *
   * @example
   * handleModalidadFilter('modalidad', 'Presencial');
   */
  const handleModalidadFilter = (filterType, filter) => {
    if (filterType === 'modalidad') {
      const filterMap = studentsCourseOriginal.filter((student) => student.nombre_modalidad === filter)
      setStudentsCourse(filterMap)
    }
    if (filterType === 'estado') {
      const filterMap = studentsCourseOriginal.filter((student) => student.estado_aprendiz === filter)
      setStudentsCourse(filterMap)
    }
    disableShowFiltros()
    setActiveFilter(true)
  }

  /**
   * Restablece los filtros y muestra la lista original de estudiantes.
   *
   * @function
   * @name handleResetFilter
   * @returns {void}
   *
   * @example
   * handleResetFilter();
   */
  const handleResetFilter = () => {
    setStudentsCourse(studentsCourseOriginal)
    disableShowFiltros()
    setActiveFilter(false)
  }

  const generateExcel = async () => {
    try {
      const response = await generateExcelClass(courseNumber)

      const date = new Date()
      const fullDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

      const url = window.URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = `registros_${courseNumber}_${fullDate}.xlsx`
      document.body.appendChild(a)
      a.click()

      window.URL.revokeObjectURL(url)
    } catch (error) {
      Swal.fire({
        title: 'Ha ocurrido un error al generar el archivo excel.',
        icon: 'error'
      })
      console.error(error)
    }
  }

  const handleModal = () => {
    setModalDates(!modalDates)
  }

  const handleEditCourse = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    formData.append('numero_ficha', detailCourse.numero_ficha)
    const data = Object.fromEntries(formData)
    if (data.id_nivel_formacion === 'Técnico') {
      data.id_nivel_formacion = 1
    } else if (data.id_nivel_formacion === 'Tecnología') {
      data.id_nivel_formacion = 2
    } else {
      data.id_nivel_formacion = 3
    }
    try {
      await editDateClass(data)
      toast.success('Ficha actualizada con éxito')
      setModalDates(false)
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <main className='flex flex-row min-h-screen bg-whitesmoke'>
      {/* {isOpen && <RegisterStudentModal closedModal={handleCloseModal} title={'Registra un estudiante'} />} */}
      {modalDates && (
        <ModalWithChildren closeModal={handleModal} title={'Editar ficha'} width='w-11/12 md:w-1/3'>
          <section className='flex justify-center'>
            <section className='flex flex-col w-full gap-3 my-5'>
              <header>
                <h3 className='text-[16px] font-medium text-right'>{detailCourse.numero_ficha}</h3>
                <h3 className='text-[16px] font-light text-right'>{detailCourse.nombre_programa_formacion}</h3>
              </header>
              <form className='flex flex-col gap-4' onSubmit={handleEditCourse}>
                <div className='flex flex-col'>
                  <label htmlFor='nivel_formacion' className='text-sm font-light'>
                    Nivel de formación
                  </label>
                  <select id='nivel_formacion' name='id_nivel_formacion' className='px-2 py-[5px] text-sm text-black bg-gray-300 rounded-lg focus:outline-none placeholder:text-gray-500' value={detailCourse.nivel_formacion}>
                    <option value='' disabled>
                      Nivel de formacion
                    </option>
                    <option value='Tecnología'>Tecnología</option>
                    <option value='Técnico'>Técnico</option>
                    <option value='Auxiliar'>Auxiliar</option>
                  </select>
                </div>
                <section className='grid grid-cols-2 gap-2'>
                  <div className='flex flex-col'>
                    <label htmlFor='inicio_lectiva' className='text-sm font-light'>
                      Fecha Inicio Lectiva
                    </label>
                    <input id='inicio_lectiva' defaultValue={detailCourse.fecha_inicio_lectiva} name='fecha_inicio_lectiva' type='date' className='px-2 py-1 text-sm text-black bg-gray-300 rounded-lg focus:outline-none placeholder:text-gray-500' />
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor='inicio_practica' className='text-sm font-light'>
                      Fecha Inicio Practica
                    </label>
                    <input id='inicio_practica' defaultValue={detailCourse.fecha_inicio_practica} name='fecha_inicio_practica' type='date' className='px-2 py-1 text-sm text-black bg-gray-300 rounded-lg focus:outline-none placeholder:text-gray-500' />
                  </div>
                </section>
                <Button bg={'bg-green-600'} px={'px-3'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'lg'} inline>
                  <LuSave />
                  Guardar
                </Button>
              </form>
            </section>
          </section>
        </ModalWithChildren>
      )}
      <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} theme='colored' />
      <Siderbar />
      <section className='relative grid flex-auto w-min grid-rows-[auto_1fr_auto]'>
        <header className='flex flex-col gap-2 pt-2 h-fit'>
          <div className='flex flex-col items-center w-full text-slate-800'>
            {loadingData.course ? (
              <>
                <Skeleton width={'20rem'} height={20} />
                <Skeleton width={'8rem'} height={15} />
              </>
            ) : (
              <>
                <h2 className='text-base font-medium text-center w-[35ch]'>{detailCourse.nombre_programa_formacion}</h2>
                <h3 className='text-sm font-light'>{detailCourse.numero_ficha}</h3>
              </>
            )}
          </div>
          <div className='flex flex-row justify-between w-full px-8'>
            <div className='relative flex items-center w-full '>
              <button className='flex items-center justify-between gap-1 border border-gray focus:outline-none  font-medium rounded-lg text-sm px-3 py-1 w-32 bg-white relative text-slate-800 hover:bg-[#ffd6a5]/30' onClick={handleShowFiltros} type='button'>
                Filtros
                <PiCaretRightBold className={`text-md mt-[1px] ${showFiltros ? 'rotate-90' : 'rotate-0'} transition-all duration-200`} />
              </button>
              <ul className={`absolute left-0 mt-1 top-full w-36 flex flex-col gap-y-1 py-2 text-sm border border-gray rounded-lg bg-white ${showFiltros ? 'visible' : 'hidden'} z-10 transition-all duration-200`} onMouseLeave={disableShowFiltros}>
                <li>
                  <button type='button' className='relative flex items-center justify-between w-full h-full px-3 py-1 hover:bg-whitesmoke text-slate-800' onClick={() => ShowFilter('modalidad')}>
                    Modalidad <PiCaretRightBold className={`text-md mt-[1px] ${filtersButtons.modalidad ? 'rotate-90' : 'rotate-0'} transition-all duration-200`} />
                    {filtersButtons.modalidad && (
                      <section className='absolute left-full ml-[2px] bg-white top-0 border border-gray rounded-lg'>
                        <ul className='flex flex-col w-40 gap-1 py-2'>
                          <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleModalidadFilter('modalidad', 'Pasantías')}>
                            Pasantías
                          </li>
                          <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleModalidadFilter('modalidad', 'Contrato de aprendizaje')}>
                            Contrato de aprendizaje
                          </li>
                          <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleModalidadFilter('modalidad', 'Proyecto Productivo')}>
                            Proyecto Productivo
                          </li>
                          <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleModalidadFilter('modalidad', 'Monitoría')}>
                            Monitoría
                          </li>
                          <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleModalidadFilter('modalidad', 'Vinculación laboral')}>
                            Vinculación laboral
                          </li>
                        </ul>
                      </section>
                    )}
                  </button>
                </li>
                <li>
                  <button type='button' className='relative flex items-center justify-between w-full h-full px-3 py-1 hover:bg-whitesmoke text-slate-800' onClick={() => ShowFilter('estado')}>
                    Estado <PiCaretRightBold className={`text-md mt-[1px] ${filtersButtons.etapa ? 'rotate-90' : 'rotate-0'} transition-all duration-200`} />
                    {filtersButtons.etapa && (
                      <section className='absolute left-full ml-[2px] bg-white top-0 border border-gray rounded-lg'>
                        <ul className='flex flex-col w-40 gap-1 py-2'>
                          <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleModalidadFilter('estado', 'Lectiva')}>
                            Lectiva
                          </li>
                          <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleModalidadFilter('estado', 'Prácticas')}>
                            Prácticas
                          </li>
                          <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleModalidadFilter('estado', 'Finalizada')}>
                            Finalizada
                          </li>
                        </ul>
                      </section>
                    )}
                  </button>
                </li>
              </ul>
              {activeFilter && (
                <section className='ml-2 justify-self-end '>
                  <button type='button' className='text-sm font-light flex items-center gap-[2px] hover:text-red-500 transition-colors' onClick={handleResetFilter}>
                    <TiDelete className='text-lg text-red-500' /> Borrar Filtro
                  </button>
                </section>
              )}
            </div>
            {(idRol === Number(keysRoles[0]) || idRol === Number(keysRoles[1])) && (
              <div className='grid w-full grid-flow-col-dense gap-1 place-content-end'>
                <Button type='button' px={'px-2'} font={'font-normal'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-lg'} inline bg='bg-blue-200' textColor='text-black' onClick={generateExcel}>
                  <PiDownloadSimple />
                  Reporte
                </Button>
                {/* <Button bg={'bg-orange-600'} px={'px-3'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'lg'} inline onClick={handleStudentModal}>
                    <GrAddCircle className='text-white' />
                    Agregar
                </Button> */}
                <Button bg={'bg-blue-600'} px={'px-2'} font={'font-normal'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-lg'} shadow={'lg'} inline onClick={handleModal} classNames='whitespace-nowrap'>
                  <PiPencilSimple className='text-white' />
                  Editar ficha
                </Button>
              </div>
            )}
          </div>
        </header>
        <div className='w-[96%] mx-auto px-3 pt-1.5 overflow-x-auto '>
          <Table
            aria-label='table_students'
            classNames={{
              base: 'w-full',
              th: 'bg-black '
            }}
            bottomContent={<div className='flex justify-center w-full py-0.5 '>{studentsCourse.length === 0 || loadingData.students ? <></> : <Pagination total={pageCount} color='secondary' variant='flat' onChange={setPageNumber} className='h-fit' />}</div>}
          >
            <TableHeader>
              <TableColumn className='text-center text-white uppercase w-[28rem]'>Nombre Completo</TableColumn>
              <TableColumn className='text-center text-white uppercase w-[130px]'>Modalidad</TableColumn>
              <TableColumn className='flex items-center text-white justify-center gap-1.5 text-center uppercase'>
                Estado
                <Popover placement='right'>
                  <PopoverTrigger>
                    <button>
                      <BsInfoCircle className='text-sm' />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className='flex flex-col gap-1.5 mx-auto text-xs font-light '>
                      <div className='flex flex-row items-center'>
                        <div className='w-2.5 h-2.5 mr-2 bg-red-500 rounded-full' />
                        Lectiva
                      </div>
                      <div className='flex flex-row items-center'>
                        <div className='h-2.5 w-2.5 rounded-full bg-yellow-500 mr-2' />
                        Prácticas
                      </div>
                      <div className='flex flex-row items-center'>
                        <div className='h-2.5 w-2.5 rounded-full bg-green-500 mr-2' />
                        Finalizada
                      </div>
                      <div className='flex flex-row items-center'>
                        <div className='h-2.5 w-2.5 rounded-full bg-gray-500 mr-2' />
                        Condicionado
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableColumn>
              <TableColumn className='text-center text-white uppercase'>Detalles</TableColumn>
            </TableHeader>
            <TableBody emptyContent={'No se encontraron estudiantes'}>
              {studentsCourse.length > 0
                ? studentsCourse.slice(startIndex, endIndex).map((student, i) => (
                    <TableRow key={i}>
                      <TableCell className='flex flex-col items-center justify-center text-center'>
                        <h2 className='text-base font-semibold break-words whitespace-normal w-[30ch] text-center'>{student.nombre_completo}</h2>
                        <span className='text-sm font-light text-center break-all'>{student.email_aprendiz}</span>
                      </TableCell>
                      <TableCell className='text-sm font-light text-center w-[130px]'>
                        <h3 className='w-[12ch] text-center'>{student.nombre_modalidad ? student.nombre_modalidad : 'N/A'}</h3>
                      </TableCell>
                      <TableCell>
                        <div className={`h-3.5 w-3.5 rounded-full ${student.estado_aprendiz === 'lectiva' || student.estado_aprendiz === 'en formacion' ? 'bg-red-500' : student.estado_aprendiz === 'practicas' || student.estado_aprendiz === 'contratado' ? 'bg-yellow-500' : student.estado_aprendiz === 'finalizada' || student.estado_aprendiz === 'terminado' ? 'bg-green-500' : student.estado_aprendiz === 'condicionado' ? 'bg-gray-500' : null} m-auto`} />
                      </TableCell>
                      <TableCell className='text-2xl text-center'>
                        <Link to={`/info-aprendiz/${student.id_aprendiz}`} type='button'>
                          <AiOutlineEye />
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                : loadingData.students
                ? [...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell className='flex flex-col items-center justify-center text-center'>
                        <h2 className='text-base font-semibold break-words whitespace-normal w-[30ch] text-center'>
                          <Skeleton width={'12rem'} height={15} />
                        </h2>
                        <span className='text-sm font-light text-center break-all'>
                          <Skeleton width={'10rem'} height={10} />
                        </span>
                      </TableCell>
                      <TableCell className='text-sm font-light text-center w-[130px]'>
                        <h3 className='w-[12ch] text-center'>
                          <Skeleton width={'6rem'} height={15} />
                        </h3>
                      </TableCell>
                      <TableCell className='text-center'>
                        <Skeleton width={30} height={15} />
                      </TableCell>
                      <TableCell className='text-2xl text-center'>
                        <Skeleton width={30} height={15} />
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </div>
        <Footer />
      </section>
    </main>
  )
}
