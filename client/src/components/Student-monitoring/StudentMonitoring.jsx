import { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Pagination } from '@nextui-org/pagination'

// Components
import { Siderbar } from '../Siderbar/Sidebar'
import { Search } from '../Search/Search'
import { CardStudent } from '../Utils/Card/Card'
import { FilterModal } from '../Utils/Modals/Modals'
import { Footer } from '../Footer/Footer'
import { GetUserByName, detailInfoStudents } from '../../api/httpRequest'
import { Button } from '../Utils/Button/Button'
import { Select } from '../Utils/Select/Select'
import { modalities } from '../../import/staticData'

export const StudentMonitoring = () => {
  const [apprentices, setApprentices] = useState([])
  const [searchedApprentices, setSearchedApprentices] = useState([])
  const [error, setError] = useState(null)
  const [modalFilter, setModalFilter] = useState(false)
  const [loading, setLoading] = useState(true)
  const [pageNumber, setPageNumber] = useState(1)
  const [currentStudentList, setCurrentStudentList] = useState({})

  /**
   * Función para manejar el clic en el icono.
   *
   * @function
   * @name handleIconClick
   * @returns {void}
   *
   * @example
   * handleIconClick();
   */
  const handleIconClick = () => {
    setModalFilter(!modalFilter)
  }

  /**
   * Función para manejar el modal.
   *
   * @function
   * @name handleModal
   * @returns {void}
   *
   * @example
   * handleModal();
   */
  const handleModal = () => {
    setModalFilter(!modalFilter)
  }

  /**
   * Función asincrónica para buscar aprendices por nombre de usuario.
   *
   * @async
   * @function
   * @name searchApprentices
   * @param {string} searchTerm - Término de búsqueda para el aprendiz.
   * @throws {Error} Error en caso de fallo en la solicitud.
   * @returns {void}
   *
   * @example
   * searchApprentices('John Doe');
   */
  const searchApprentices = async (searchTerm) => {
    if (searchTerm.trim() === '') {
      setError(null)
      setSearchedApprentices([])
      return
    }
    try {
      const response = await GetUserByName(searchTerm)
      const { data } = response.data
      if (searchTerm.trim() === '') {
        setError(null)
        setSearchedApprentices([])
      } else {
        setError(null)
        setSearchedApprentices(data)
      }
    } catch (error) {
      const message = error?.response?.data?.error?.info?.message

      setError(message ?? 'Usuario no existente')
      setSearchedApprentices([])
    }
  }

  /**
   * Función asincrónica para obtener la lista de aprendices.
   *
   * @async
   * @function
   * @name getApprentices
   * @throws {Error} Error en caso de fallo en la solicitud.
   * @returns {void}
   *
   * @example
   * getApprentices();
   */
  const getApprentices = async () => {
    try {
      const response = await detailInfoStudents()
      const { data } = response.data
      setApprentices(data)
      setLoading(false)
    } catch (error) {
      setError('Error al obtener los aprendices')
    }
  }

  useEffect(() => {
    getApprentices()
  }, [])

  // Cambia el numero de paginas dependiendo de la cantidad de estudiantes
  useEffect(() => {
    if (searchedApprentices.length > 0 && !error) {
      setCurrentStudentList(searchedApprentices)
      setPageNumber(1)
    } else {
      setCurrentStudentList(apprentices)
    }
  }, [searchedApprentices, error, apprentices])

  /**
   * Número de aprendices a mostrar por página.
   *
   * @constant
   * @name studentsPerPage
   * @type {number}
   * @default 6
   *
   * @example
   * const aprendicesPorPagina = studentsPerPage;
   */
  const studentsPerPage = 6
  /**
   * Calcula el número de páginas necesarias para la paginación de aprendices.
   *
   * @constant
   * @name pageCount
   * @type {number}
   *
   * @example
   * const numeroDePaginas = pageCount;
   */
  const pageCount = Math.ceil(currentStudentList.length / studentsPerPage)
  /**
   * Índice de inicio de la lista de aprendices a mostrar en la página actual.
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
   * Índice de fin de la lista de aprendices a mostrar en la página actual.
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
   * Opciones de modalidades para filtrar aprendices.
   *
   * @constant
   * @name option
   * @type {Array<Object>}
   *
   * @example
   * const opcionesModalidades = option;
   */
  const option = modalities.map((modality) => ({
    value: modality.name,
    key: modality.value
  }))

  return (
    <>
      {modalFilter && (
        <FilterModal title={'Filtrar Aprendices'} width='w-3/4 md:w-1/3' closeModal={handleModal}>
          <form className='flex flex-col gap-5'>
            <section className='flex flex-col gap-3'>
              <section className='grid grid-rows-2'>
                <label htmlFor='' className='text-sm text-cyan-700'>
                  Fichas
                </label>
                <input type='text' className='border-gray-400 focus:text-gray-900 rounded-lg w-full border-[1.2px] bg-white py-[1px] pl-3 text-sm text-black focus:bg-white focus:outline-none' placeholder='Ej: 2473196' />
              </section>
              <section className='grid grid-rows-2'>
                <label htmlFor='' className='text-sm text-cyan-700'>
                  Programa de Formación
                </label>
                <input type='text' className='border-gray-400 focus:text-gray-900 rounded-lg border-[1.2px] w-full bg-white py-[1px] pl-3 text-sm text-black focus:bg-white focus:outline-none' placeholder='Ej: Análisis y Desarrollo de Software' />
              </section>
              <section className='grid grid-rows-2'>
                <label htmlFor='' className='text-sm text-cyan-700'>
                  Modalidad
                </label>
                <Select placeholder={'Selecciona la modalidad'} options={option} hoverColor='hover:bg-slate-600' hoverTextColor='hover:text-white' placeholderSearch='Ingrese nombre instructor' selectedColor='bg-slate-600 text-white' rounded='rounded-lg' py='py-[2.6px]' borderColor='border-slate-500' textSize={'text-sm'} />
              </section>
            </section>
            <Button rounded='rounded-xl' px='px-8' py='py-1' textSize='text-base'>
              Filtrar
            </Button>
          </form>
        </FilterModal>
      )}
      <main className='flex flex-row min-h-screen bg-whitesmoke'>
        <Siderbar />
        <section className='relative grid flex-auto w-min grid-rows-[auto_1fr_auto] '>
          <header className='grid place-items-center h-[10vh]'>
            <Search searchFilter icon placeholder={'Busca un aprendiz'} iconClick={handleIconClick} searchStudent={searchApprentices} />
          </header>
          <section className='flex flex-col justify-around'>
            {searchedApprentices.length > 0 && !error ? (
              <div className='grid grid-cols-1 gap-5 pt-3 px-7 st2:grid-cols-1 st1:grid-cols-2 md:grid-cols-3'>
                {searchedApprentices.slice(startIndex, endIndex).map((apprentice, i) => (
                  <CardStudent key={i} userID={apprentice.id_aprendiz} nameStudent={apprentice.nombre_completo} emailStudent={apprentice.email_aprendiz} programStudent={apprentice.nombre_programa_formacion} courseStudent={apprentice.numero_ficha} height={'h-[11.5rem]'} />
                ))}
              </div>
            ) : (
              <div className='grid grid-cols-1 gap-5 pt-3 px-7 st2:grid-cols-1 st1:grid-cols-2 md:grid-cols-3'>
                {loading ? (
                  <>
                    <SkeletonLoading />
                  </>
                ) : error ? (
                  <h2 className='text-red-500'>{error}</h2>
                ) : (
                  apprentices.slice(startIndex, endIndex).map((apprentice, i) => {
                    return <CardStudent key={i} userID={apprentice.id_aprendiz} nameStudent={apprentice.nombre_completo} emailStudent={apprentice.email_aprendiz} programStudent={apprentice.nombre_programa_formacion} courseStudent={apprentice.numero_ficha} height={'h-[11.5rem]'} />
                  })
                )}
              </div>
            )}
            <div className='flex items-center justify-center py-3'>{loading ? <></> : <Pagination total={pageCount} color='secondary' variant='flat' page={pageNumber} onChange={setPageNumber} className=' h-fit' />}</div>
          </section>
          <Footer />
        </section>
      </main>
    </>
  )
}

const SkeletonLoading = ({ number = 6 }) =>
  [...Array(number)].map((_, i) => (
    <div key={i}>
      <Skeleton height={'11.5rem'} borderRadius={'0.5rem'} className='scale-100' />
    </div>
  ))
