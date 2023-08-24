import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

// Icons
import { AiOutlineEye } from 'react-icons/ai'

// Componentes
import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'
import { Pagination } from '../Utils/Pagination/Pagination'
import { GetClassByNumber, GetStudentsByCourse, GetStudentsDetailById } from '../../api/httpRequest'
import { Modals } from '../Utils/Modals/Modals'

export const Students = () => {
  const [pageNumber, setPageNumber] = useState(-1)
  const [detailCourse, setDetailCourse] = useState([])
  const [studentsCourse, setStudentsCourse] = useState([])
  const [userInfoById, setUserInfoById] = useState([])
  const [dates, setDates] = useState({})
  const [showModalStudent, setShowModalStudent] = useState(null)
  const { id: courseNumber } = useParams()

  const getStudents = async (payload) => {
    try {
      const response = await GetStudentsByCourse(payload)
      const { data } = response.data
      setStudentsCourse(data)
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
      setDetailCourse(data)
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

  const studentsPerPage = 6
  const pageCount = Math.ceil(studentsCourse.length / studentsPerPage)

  const startIndex = (pageNumber + 1) * studentsPerPage
  const endIndex = startIndex + studentsPerPage

  return (
    <main className='flex flex-row min-h-screen bg-whitesmoke'>
      {showModalStudent && <Modals closeModal={handleStateModal} bodyStudent title={userInfoById.nombre_completo} emailStudent={userInfoById.email_aprendiz} documentStudent={userInfoById.numero_documento_aprendiz} celStudent={userInfoById.celular_aprendiz} trainingProgram={userInfoById.nombre_programa_formacion} ficha={userInfoById.numero_ficha} academicLevel={userInfoById.nivel_formacion} trainingStage={userInfoById.etapa_formacion} modalitie={userInfoById.nombre_modalidad} finLectiva={dates.fin_lectiva} inicioProductiva={dates.inicio_practicas} company={userInfoById.nombre_empresa} innmediateSuperior={userInfoById.nombre_jefe} workstation={userInfoById.cargo_jefe} emailSuperior={userInfoById.email_jefe} celSuperior={userInfoById.numero_contacto_jefe} arl={userInfoById.nombre_arl} />}
      <Siderbar />
      <section className='relative grid flex-auto w-min grid-rows-2-85-15'>
        <section className='w-[95%] h-[95%] m-auto'>
          <div className='relative h-full overflow-x-auto bg-white shadow-md sm:rounded-lg'>
            <div className='flex items-center justify-between h-16 px-3 '>
              <div>
                <button id='dropdownActionButton' data-dropdown-toggle='dropdownAction' className='inline-flex items-center text-gray-500 border border-gray focus:outline-none hover:bg-[#ffd6a5]/30 focus:ring-4 focus:ring-[#ffd6a5] font-medium rounded-lg text-sm px-3 py-1.5 bg-white' type='button'>
                  <span className='sr-only'>Action button</span>
                  Filtros
                  <svg className='w-2.5 h-2.5 ml-2.5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'>
                    <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 4 4 4-4' />
                  </svg>
                </button>
                <div id='dropdownAction' className='z-10 hidden divide-y divide-gray-100 rounded-lg shadow w-44 bg-slate-700 dark:divide-gray-600'>
                  <ul className='py-1 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdownActionButton'>
                    <li>
                      <a href='#' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                        Reward
                      </a>
                    </li>
                    <li>
                      <a href='#' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                        Promote
                      </a>
                    </li>
                    <li>
                      <a href='#' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                        Activate account
                      </a>
                    </li>
                  </ul>
                  <div className='py-1'>
                    <a href='#' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'>
                      Delete User
                    </a>
                  </div>
                </div>
              </div>
              <label htmlFor='table-search' className='sr-only'>
                Search
              </label>
              {detailCourse.map((item, i) => {
                return (
                  <div className='flex flex-col items-end text-slate-800' key={i}>
                    <h2 className='text-base font-normal'>{item.nombre_programa_formacion}</h2>
                    <h3 className='text-sm font-light'>{item.numero_ficha}</h3>
                  </div>
                )
              })}
            </div>
            <table className='w-full text-sm text-left'>
              <thead className='uppercase bg-[#ffd6a5] border-y-[0.5px] border-gray'>
                <tr className='grid w-full grid-cols-4-columns-table justify-items-center text-slate-800'>
                  <th scope='col' className='px-6 py-3'>
                    Nombre completo
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Modalidad
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Etapa
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Detalles
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentsCourse.slice(startIndex, endIndex).map((student, i) => {
                  return (
                    <tr className='border-b border-gray bg-white text-slate-800 hover:bg-[#ffd6a5]/30 grid grid-cols-4-columns-table justify-items-center items-center h-[60px] transition-colors' key={i}>
                      <th scope='row' className='flex items-center text-slate-200 whitespace-nowrap '>
                        <div className='text-slate-800'>
                          <div className='text-base font-semibold'>{student.nombre_completo}</div>
                          <div className='font-light'>{student.email_aprendiz}</div>
                        </div>
                      </th>
                      <td className='text-base font-light max-w-[10ch]'>{student.nombre_modalidad}</td>
                      <td className='w-full'>
                        <div className='flex flex-row items-center text-base font-light '>
                          <div className={`h-2.5 w-2.5 rounded-full ${student.estado_aprendiz === 'Lectiva' ? 'bg-red-500' : student.estado_aprendiz === 'Prácticas' ? 'bg-yellow-500' : student.estado_aprendiz === 'Finalizada' ? 'bg-green-500' : null}  mr-2`} />
                          {student.estado_aprendiz}
                        </div>
                      </td>
                      <td className='text-2xl'>
                        <button onClick={() => handleDetailInfoStudent(student.id_aprendiz)}>
                          <AiOutlineEye />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className='flex justify-center h-[13vh] relative st1:bottom-[5.5rem] st2:bottom-0 bottom-[-4rem] md:bottom-0'>
              <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} pageCount={pageCount} />
            </div>
          </div>
        </section>
        <Footer />
      </section>
    </main>
  )
}

