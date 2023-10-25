import { useState, useEffect, useRef } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Pagination } from '@nextui-org/pagination'
import Swal from 'sweetalert2'

// Components
import { Siderbar } from '../Siderbar/Sidebar'
import { Search } from '../Search/Search'
import { CardStudent } from '../Utils/Card/Card'
import { Footer } from '../Footer/Footer'
import { GetUserByName, detailInfoStudents, generateExcelStudents, generateExcelStudentsByModality, generateExcelStudentsNoPractical, generateExcelStudentsPractical, sendExcelContrato } from '../../api/httpRequest'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { HiOutlineDocumentText } from 'react-icons/hi'

export const StudentMonitoring = () => {
  const [apprentices, setApprentices] = useState([])
  const [searchedApprentices, setSearchedApprentices] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [pageNumber, setPageNumber] = useState(1)
  const [currentStudentList, setCurrentStudentList] = useState({})
  const inputFileRef = useRef(null)
  const [optionsExcel, setOptionsExcel] = useState(false)
  const [optionsModality, setOptionsModality] = useState(false)

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
      data.forEach((element) => {
        element.nombre_completo = element.nombre_completo
          .split(' ')
          .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          })
          .join(' ')
        element.nombre_programa_formacion = element.nombre_programa_formacion
          .split(' ')
          .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          })
          .join(' ')
      })
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
      data.forEach((element) => {
        element.nombre_completo = element.nombre_completo
          .split(' ')
          .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          })
          .join(' ')
        element.nombre_programa_formacion = element.nombre_programa_formacion
          .split(' ')
          .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          })
          .join(' ')
      })
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

  const sendExcelFile = async () => {
    const [file] = inputFileRef.current.files
    const formData = new FormData()
    try {
      formData.append('excelFile', file)
      return await sendExcelContrato(formData)
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
          title: `${value} aprendices de subidos correctamente.`
        })
        getApprentices()
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error al subir el archivo'
        })
        console.error(error)
      })
  }

  const disabledOptions = () => {
    setTimeout(() => {
      setOptionsExcel(false)
    }, 100)
  }

  const handleShowOptionsExcel = () => {
    setOptionsExcel(!optionsExcel)
  }

  const showModality = () => {
    setOptionsModality(!optionsModality)
  }

  const date = new Date()
  const fullDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`

  const generateExcel = async () => {
    try {
      const response = await generateExcelStudents()

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

      const url = window.URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = `estudiantes_${fullDate}.xlsx`
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

  const generateStudentsPractical = async () => {
    try {
      const response = await generateExcelStudentsPractical()

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

      const url = window.URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = `estudiantes_en_practicas_${fullDate}.xlsx`
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

  const generateExcelModality = async (modality) => {
    try {
      const response = await generateExcelStudentsByModality(modality)

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

      const url = window.URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = `estudiantes_${modality}_${fullDate}.xlsx`
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

  const generateExcelNoPractical = async () => {
    try {
      const response = await generateExcelStudentsNoPractical()

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

      const url = window.URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = `estudiantes_sin_practicas_${fullDate}.xlsx`
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

  return (
    <main className='flex flex-row min-h-screen bg-whitesmoke'>
      <Siderbar />
      <section className='grid flex-auto w-min grid-rows-[auto_1fr_auto] '>
        <header className='grid place-items-center h-[10vh]'>
          <Search searchFilter placeholder={'Busca un aprendiz'} searchStudent={searchApprentices} />
          <section className='absolute top-4 right-7'>
            <button className='flex items-center gap-1 py-1 px-1.5 text-sm bg-blue-200 rounded-lg' onClick={handleShowOptionsExcel}>
              Reportes
              <HiOutlineDocumentText />
            </button>
            <ul className={`absolute right-0 mt-1 top-full w-40 flex flex-col gap-y-1 py-2 text-sm border border-gray rounded-lg bg-white ${optionsExcel ? 'visible' : 'hidden'} z-50 transition-all duration-200 px-2`} onMouseLeave={disabledOptions}>
              <li>
                <button className='flex items-center justify-center w-full h-[34px] text-xs font-light bg-blue-200 rounded-lg py-0.5 px-1.5' onClick={generateExcel}>
                  Todos los aprendices
                </button>
              </li>
              <li>
                <button className='flex items-center justify-center w-full h-[34px] text-xs font-light bg-blue-200 rounded-lg py-0.5 px-1.5' onClick={generateStudentsPractical}>
                  Aprendices en prácticas
                </button>
              </li>
              <li>
                <button className='flex items-center justify-center w-full h-[34px] text-xs font-light bg-blue-200 rounded-lg py-0.5 px-1.5' onClick={generateExcelNoPractical}>
                  Aprendices sin prácticas
                </button>
              </li>
              <li>
                <button className='flex items-center justify-center w-full h-[34px] text-xs font-light bg-blue-200 rounded-lg py-0.5 px-1.5' onClick={showModality}>
                  Modalidades
                  {optionsModality && (
                    <section className='absolute right-full mr-[2px] bg-white top-0 border border-gray rounded-lg' onMouseLeave={showModality}>
                      <ul className='flex flex-col gap-1 p-2 w-36'>
                        <li>
                          <button className='flex items-center justify-center w-full h-[34px] text-xs font-light bg-blue-200 rounded-lg py-0.5 px-1.5' onClick={() => generateExcelModality('pasantias')}>
                            Pasantías
                          </button>
                        </li>
                        <li>
                          <button className='flex items-center justify-center w-full h-[34px] text-xs font-light bg-blue-200 rounded-lg py-0.5 px-1.5' onClick={() => generateExcelModality('monitoria')}>
                            Monitoría
                          </button>
                        </li>
                        <li>
                          <button className='flex items-center justify-center w-full h-[34px] text-xs font-light bg-blue-200 rounded-lg py-0.5 px-1.5' onClick={() => generateExcelModality('vinculacion laboral')}>
                            Vinculación laboral
                          </button>
                        </li>
                        <li>
                          <button className='flex items-center justify-center w-full h-[34px] text-xs font-light bg-blue-200 rounded-lg py-0.5 px-1.5' onClick={() => generateExcelModality('proyecto productivo')}>
                            Proyecto productivo
                          </button>
                        </li>
                        <li>
                          <button className='flex items-center justify-center w-full h-[34px] text-xs font-light bg-blue-200 rounded-lg py-0.5 px-1.5' onClick={() => generateExcelModality('contrato de aprendizaje')}>
                            Contrato de aprendizaje
                          </button>
                        </li>
                      </ul>
                    </section>
                  )}
                </button>
              </li>
            </ul>
          </section>
        </header>
        <section className='grid grid-rows-[1fr_auto] py-1'>
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
          <div className='grid grid-rows-[auto_auto] gap-0.5 place-items-center px-7 pt-4'>
            {loading ? <></> : <Pagination total={pageCount} color='secondary' variant='flat' page={pageNumber} onChange={setPageNumber} className='h-fit' />}
            <section className='ml-auto '>
              <div className='ml-auto bg-blue-600 rounded-full shadow-md'>
                <label htmlFor='upload' className='flex items-center w-full h-full gap-2 px-3 py-1 text-white rounded-full cursor-pointer'>
                  <span className='text-sm font-medium text-white select-none'>Subir arhivo</span>
                  <AiOutlineFileAdd />
                </label>
                <input id='upload' accept='.xlsx, .xls' type='file' className='hidden w-full' ref={inputFileRef} onChange={handleExcelFile} />
              </div>
            </section>
          </div>
        </section>
        <Footer />
      </section>
    </main>
  )
}

const SkeletonLoading = ({ number = 6 }) =>
  [...Array(number)].map((_, i) => (
    <div key={i}>
      <Skeleton height={'11.5rem'} borderRadius={'0.5rem'} className='scale-100' />
    </div>
  ))
