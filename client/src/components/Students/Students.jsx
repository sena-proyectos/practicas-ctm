import { Link } from 'react-router-dom'

// Icons
import { AiOutlineEye } from 'react-icons/ai'

// Componentes
import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'

export const Students = () => {
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
              <div className='flex flex-col items-end text-slate-800'>
                <h2 className='text-base font-normal'>Análisis y Desarrollo de Sofware</h2>
                <h3 className='text-sm font-light'>2473196</h3>
              </div>
              {/* <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input type="text" id="table-search-users" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-slate-700 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search for users" />
              </div> */}
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
                <tr className='border-b border-gray bg-white text-slate-800 hover:bg-[#ffd6a5]/30 grid grid-cols-4-columns-table justify-items-center items-center h-[60px] transition-colors'>
                  <th scope='row' className='flex items-center text-slate-200 whitespace-nowrap '>
                    <div className='text-slate-800'>
                      <div className='text-base font-semibold'>Stiven Blandón Urrego</div>
                      <div className='font-light'>blandon0207s@gmail.com</div>
                    </div>
                  </th>
                  <td className='text-base font-light'>Monitorias</td>
                  <td>
                    <div className='flex items-center text-base font-light'>
                      <div className='h-2.5 w-2.5 rounded-full bg-red-500 mr-2'></div> Lectiva
                    </div>
                  </td>
                  <td className='text-2xl'>
                    <Link to='/fichas'>
                      <AiOutlineEye />
                    </Link>
                  </td>
                </tr>
                <tr className='border-b border-gray bg-white text-slate-800 hover:bg-[#ffd6a5]/30 grid grid-cols-4-columns-table justify-items-center items-center h-[60px] transition-colors'>
                  <th scope='row' className='flex items-center text-slate-200 whitespace-nowrap '>
                    <div className='text-slate-800'>
                      <div className='text-base font-semibold'>Stiven Blandón Urrego</div>
                      <div className='font-light'>blandon0207s@gmail.com</div>
                    </div>
                  </th>
                  <td className='text-base font-light'>Monitorias</td>
                  <td>
                    <div className='flex items-center text-base font-light'>
                      <div className='h-2.5 w-2.5 rounded-full bg-yellow-500 mr-2'></div> Practica
                    </div>
                  </td>
                  <td className='text-2xl'>
                    <Link to='/fichas'>
                      <AiOutlineEye />
                    </Link>
                  </td>
                </tr>
                <tr className='border-b border-gray bg-white text-slate-800 hover:bg-[#ffd6a5]/30 grid grid-cols-4-columns-table justify-items-center items-center h-[60px] transition-colors'>
                  <th scope='row' className='flex items-center text-slate-200 whitespace-nowrap '>
                    <div className='text-slate-800'>
                      <div className='text-base font-semibold'>Stiven Blandón Urrego</div>
                      <div className='font-light'>blandon0207s@gmail.com</div>
                    </div>
                  </th>
                  <td className='text-base font-light'>Monitorias</td>
                  <td>
                    <div className='flex items-center text-base font-light'>
                      <div className='h-2.5 w-2.5 rounded-full bg-green-500 mr-2'></div> Finalizado
                    </div>
                  </td>
                  <td className='text-2xl'>
                    <Link to='/fichas'>
                      <AiOutlineEye />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <Footer />
      </section>
    </main>
  )
}
