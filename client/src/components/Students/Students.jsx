import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

// Icons
import { AiOutlineEye } from 'react-icons/ai'

// Componentes
import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'
import { Pagination } from '../Utils/Pagination/Pagination'
import { getClassById } from '../../api/httpRequest'

export const Students = () => {
  const [pageNumber, setPageNumber] = useState(-1)
  const [detailCourse, setDetailCourse] = useState([])
  const { id } = useParams()

  useEffect(() => {
    getCursosById(id)
  }, [id])

  const studentsCourse = {
    data: [
      {
        name: 'Stiven Blandón Urrego',
        email: 'blandon0207s@gmial.com',
        modalitie: 'Monitoría',
        etapa: 'Lectiva'
      },
      {
        name: 'Angie Tatiana Mosquera',
        email: 'atatianamosquera@gmail.com',
        modalitie: 'Contrato de aprendizaje',
        etapa: 'Práctica'
      },
      {
        name: 'Lorena Quiceno Giraldo',
        email: 'lorenquiceno@gmail.com',
        modalitie: 'Pasantía',
        etapa: 'Finalizada'
      }
    ]
  }

  const getCursosById = async (id) => {
    try {
      const response = await getClassById(id)
      const { data } = response.data
      setDetailCourse(data)
    } catch (error) {
      throw new Error(error)
    }
  }

  const studentsPerPage = 6
  const pageCount = Math.ceil(studentsCourse.data.length / studentsPerPage)

  const startIndex = (pageNumber + 1) * studentsPerPage
  const endIndex = startIndex + studentsPerPage

  return (
    <main className='flex flex-row min-h-screen bg-whitesmoke'>
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
                {studentsCourse.data.slice(startIndex, endIndex).map((student, i) => {
                  return (
                    <tr className='border-b border-gray bg-white text-slate-800 hover:bg-[#ffd6a5]/30 grid grid-cols-4-columns-table justify-items-center items-center h-[60px] transition-colors' key={i}>
                      <th scope='row' className='flex items-center text-slate-200 whitespace-nowrap '>
                        <div className='text-slate-800'>
                          <div className='text-base font-semibold'>{student.name}</div>
                          <div className='font-light'>{student.email}</div>
                        </div>
                      </th>
                      <td className='text-base font-light max-w-[10ch]'>{student.modalitie}</td>
                      <td className='w-full'>
                        <div className='flex flex-row items-center text-base font-light '>
                          <div className={`h-2.5 w-2.5 rounded-full ${student.etapa === 'Lectiva' ? 'bg-red-500' : student.etapa === 'Práctica' ? 'bg-yellow-500' : student.etapa === 'Finalizada' ? 'bg-green-500' : null}  mr-2`} />
                          {student.etapa}
                        </div>
                      </td>
                      <td className='text-2xl'>
                        <Link to='/fichas'>
                          <AiOutlineEye />
                        </Link>
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
