import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// Icons
import { AiOutlineEye } from 'react-icons/ai'
import { PiCaretRightBold } from 'react-icons/pi'
import { TiDelete } from 'react-icons/ti'

// Componentes
import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'
import { Pagination } from '../Utils/Pagination/Pagination'
import { GetClassByNumber, GetStudentsByCourse, GetStudentsDetailById } from '../../api/httpRequest'
import { Modals } from '../Utils/Modals/Modals'
import { BiSad } from 'react-icons/bi'

export const Students = () => {
  const [pageNumber, setPageNumber] = useState(0)
  const [detailCourse, setDetailCourse] = useState([])
  const [studentsCourse, setStudentsCourse] = useState([])
  const [studentsCourseOriginal, setStudentsCourseOriginal] = useState([])
  const [userInfoById, setUserInfoById] = useState([])
  const [dates, setDates] = useState({})
  const [showModalStudent, setShowModalStudent] = useState(null)
  const { id: courseNumber } = useParams()
  const [showFiltros, setShowFiltros] = useState(false)
  const [filtersButtons, setFiltersButtons] = useState({ modalidad: false, etapa: false })
  const [activeFilter, setActiveFilter] = useState(false)
  const [loadingData, setLoadingData] = useState({ course: true, students: true })

  const getStudents = async (payload) => {
    try {
      const response = await GetStudentsByCourse(payload)
      const { data } = response.data
      console.log(data)
      setStudentsCourse(data)
      setStudentsCourseOriginal(data)
    } catch (err) {
      throw new Error(err)
    }
  }

  useEffect(() => {
    getStudents(courseNumber)
    getCourseData(courseNumber)
  }, [])

  const getCourseData = async (payload) => {
    try {
      const response = await GetClassByNumber(payload)
      const { data } = response.data
      setDetailCourse(data[0])
      setLoadingData({ course: false })
    } catch (error) {
      throw new Error(error)
    }
  }

  const handleStateModal = () => setShowModalStudent(false)

  const handleDetailInfoStudent = async (id) => {
    try {
      setShowModalStudent(true)
      const response = await GetStudentsDetailById(id)
      const { data } = response.data
      const { fecha_fin_lectiva, fecha_inicio_practica } = data[0]
      setDates({ fin_lectiva: fecha_fin_lectiva.split('T')[0], inicio_practicas: fecha_inicio_practica.split('T')[0] })
      setUserInfoById(data[0])
    } catch (err) {
      throw new Error(err)
    }
  }

  const studentsPerPage = 5
  const pageCount = Math.ceil(studentsCourse.length / studentsPerPage)

  const startIndex = pageNumber * studentsPerPage
  const endIndex = startIndex + studentsPerPage

  const disableShowFiltros = () => {
    setTimeout(() => {
      setShowFiltros(false)
      setFiltersButtons({ modalidad: false, etapa: false })
    }, 100)
  }

  const handleShowFiltros = () => {
    setShowFiltros(!showFiltros)
  }

  const ShowFilter = (filterType) => {
    if (filterType === 'modalidad') setFiltersButtons({ modalidad: !filtersButtons.modalidad, etapa: false })
    if (filterType === 'estado') setFiltersButtons({ etapa: !filtersButtons.etapa, modalidad: false })
  }

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

  const handleResetFilter = () => {
    setStudentsCourse(studentsCourseOriginal)
    disableShowFiltros()
    setActiveFilter(false)
  }

  return (
    <main className='flex flex-row min-h-screen bg-whitesmoke'>
      {showModalStudent && <Modals closeModal={handleStateModal} bodyStudent title={userInfoById.nombre_completo} emailStudent={userInfoById.email_aprendiz} documentStudent={userInfoById.numero_documento_aprendiz} celStudent={userInfoById.celular_aprendiz} trainingProgram={userInfoById.nombre_programa_formacion} ficha={userInfoById.numero_ficha} academicLevel={userInfoById.nivel_formacion} trainingStage={userInfoById.etapa_formacion} modalitie={userInfoById.nombre_modalidad} finLectiva={dates.fin_lectiva} inicioProductiva={dates.inicio_practicas} company={userInfoById.nombre_empresa} innmediateSuperior={userInfoById.nombre_jefe} workstation={userInfoById.cargo_jefe} emailSuperior={userInfoById.email_jefe} celSuperior={userInfoById.numero_contacto_jefe} arl={userInfoById.nombre_arl} />}
      <Siderbar />
      <section className='relative grid flex-auto w-min grid-rows-2-85-15'>
        <section className='w-[95%] h-[95%] m-auto'>
          <div className='relative h-full bg-white shadow-md sm:rounded-lg'>
            <div className='grid items-center justify-between h-16 grid-cols-3 px-3'>
              <div className='relative flex items-center w-full'>
                <button className='flex items-center justify-between gap-1 text-gray-500 border border-gray focus:outline-none  font-medium rounded-lg text-sm px-3 py-1.5 w-36 bg-white relative text-slate-800 hover:bg-[#ffd6a5]/30' onClick={handleShowFiltros} type='button'>
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

              <div className='flex flex-row gap-3 mx-auto text-sm font-light '>
                <div className='flex flex-row items-center'>
                  <div className='h-2.5 w-2.5 rounded-full bg-red-500 mr-2' />
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
              </div>
              <div className='flex flex-col items-end text-slate-800'>
                {loadingData.course ? (
                  <>
                    <Skeleton width={55} height={20} />
                    <Skeleton width={55} height={15} />
                  </>
                ) : (
                  <>
                    <h2 className='text-base font-normal'>{detailCourse.nombre_programa_formacion}</h2>
                    <h3 className='text-sm font-light'>{detailCourse.numero_ficha}</h3>
                  </>
                )}
              </div>
            </div>
            <table className='w-full text-sm text-left h-[72%]'>
              <thead className='uppercase bg-[#ffd6a5] border-y-[0.5px] border-gray'>
                <tr className='grid w-full grid-cols-4-columns-table justify-items-center text-slate-800'>
                  <th scope='col' className='px-6 py-3'>
                    Nombre completo
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Modalidad
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Estado
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Detalles
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentsCourse.length > 0 ? (
                  studentsCourse.slice(startIndex, endIndex).map((student, i) => {
                    return (
                      <tr className='border-b border-gray bg-white text-slate-800 hover:bg-[#ffd6a5]/30 grid grid-cols-4-columns-table justify-items-center items-center h-[10vh] transition-colors' key={i}>
                        <th scope='row' className='flex items-center text-slate-200 whitespace-nowrap '>
                          <div className='text-slate-800'>
                            <div className='text-base font-semibold break-words whitespace-normal max-w-[40ch] text-center'>{student.nombre_completo}</div>
                            <div className='font-light text-center'>{student.email_aprendiz}</div>
                          </div>
                        </th>
                        <td className='text-base font-light text-center max-w-[10ch]'>{student.nombre_modalidad}</td>
                        <td>
                          <div className={`h-3.5 w-3.5 rounded-full ${student.estado_aprendiz === 'Lectiva' ? 'bg-red-500' : student.estado_aprendiz === 'Prácticas' ? 'bg-yellow-500' : student.estado_aprendiz === 'Finalizada' ? 'bg-green-500' : null}  mr-2`} />
                        </td>
                        <td className='flex items-center text-2xl'>
                          <button onClick={() => handleDetailInfoStudent(student.id_aprendiz)}>
                            <AiOutlineEye />
                          </button>
                        </td>
                      </tr>
                    )
                  })
                ) : loadingData.course ? (
                  <LoadingDataStudents number={5} />
                ) : (
                  <tr className='grid h-full place-content-center'>
                    <th scope='row' className='flex items-center gap-1 text-xl text-red-500'>
                      <p>¡Oops! No hay ningún aprendiz con este filtro.</p>
                      <BiSad className='text-2xl' />
                    </th>
                  </tr>
                )}
              </tbody>
            </table>
            <div className='flex justify-center h-[13vh] relative st1:bottom-[5.5rem] st2:bottom-0 bottom-[-4rem] md:bottom-0'>
              <Pagination setPageNumber={setPageNumber} pageCount={pageCount} />
            </div>
          </div>
        </section>
        <Footer />
      </section>
    </main>
  )
}

const LoadingDataStudents = ({ number = 6 }) =>
  [...Array(number)].map((_, i) => (
    <tr className='border-b border-gray bg-white text-slate-800 hover:bg-[#ffd6a5]/30 grid grid-cols-4-columns-table justify-items-center items-center h-[10vh] transition-colors' key={i}>
      <th scope='row' className='flex items-center text-slate-200 whitespace-nowrap '>
        <div className='text-slate-800'>
          <div className='text-base font-semibold break-words whitespace-normal max-w-[40ch] text-center'>
            <Skeleton width={'12rem'} height={15} />
          </div>
          <div className='font-light text-center'>
            <Skeleton width={'10rem'} height={10} />
          </div>
        </div>
      </th>
      <td className='text-base font-light text-center max-w-[10ch]'>
        <Skeleton width={'6rem'} height={15} />
      </td>
      <td>
        <Skeleton width={30} height={15} />
      </td>
      <td className='flex items-center text-2xl'>
        <Skeleton width={30} height={15} />
      </td>
    </tr>
  ))
