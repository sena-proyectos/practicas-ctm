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
import { GetUserByName, detailInfoStudents, generateExcelStudents, generateExcelStudentsByModality, generateExcelStudentsNoPractical, generateExcelStudentsPractical, getStudentsByTeacherId, sendExcelContrato } from '../../api/httpRequest'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { HiOutlineDocumentText } from 'react-icons/hi'
import { getUserID } from '../../import/getIDActualUser'
import { keysRoles } from '../../import/staticData'

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
   * @function
   * @name searchApprentices
   * @async
   *
   * @description
   * Esta función se utiliza para buscar aprendices por su nombre. Si el término de búsqueda está vacío, restablece el estado de error y la lista de aprendices buscados. En caso de éxito, procesa el nombre del aprendiz, actualiza el estado `searchedApprentices` con los resultados de la búsqueda y elimina el error. Si se produce un error, muestra un mensaje de error indicando que el aprendiz no existe y restablece la lista de aprendices buscados.
   *
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
   * @function
   * @name getApprentices
   * @async
   *
   * @description
   * Esta función se utiliza para obtener la lista de aprendices. Dependiendo del rol del usuario autenticado (instructor o no), se utiliza la función correspondiente para obtener la lista de aprendices. En caso de ser instructor, se utiliza la función `getApprenticesTrackingInstructor(id_usuario)`, y en caso de ser otro rol, se utiliza `detailInfoStudents()`. Los resultados se formatean y se almacenan en el estado `apprentices` para su uso en el componente.
   *
   * @throws {Error} Error en caso de fallo en la solicitud.
   * @returns {void}
   *
   * @example
   * getApprentices();
   */
  const getApprentices = async () => {
    const { id_rol, id_usuario } = getUserID().user
    if (String(id_rol) === '3') {
      getApprenticesTrackingInstructor(id_usuario)
      return
    }

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

  /**
   * @function
   * @name getApprenticesTrackingInstructor
   * @async
   *
   * @description
   * Esta función se utiliza para obtener la lista de aprendices que están de instructor de seguimiento en específico.
   * Utiliza la función `getStudentsByTeacherId(id)` para obtener los datos de los aprendices del instructor de seguimiento con el ID proporcionado. Los resultados se formatean y se almacenan en el estado `apprentices` para su uso en el componente. Si se produce un error, se establece un mensaje de error en el estado `error`.
   *
   * @param {number} id - El ID del instructor del cual se desean recuperar los aprendices asignados.
   * @throws {Error} Si ocurre un error al realizar la solicitud.
   * @returns {void}
   */
  const getApprenticesTrackingInstructor = async (id) => {
    try {
      const response = await getStudentsByTeacherId(id)
      const { data } = response
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

  /**
   * @function
   *
   * @description
   * Este efecto se activa cuando hay cambios en `searchedApprentices`, `error` o `apprentices`. Si `searchedApprentices` tiene elementos y no hay errores, actualiza `currentStudentList` con los aprendices buscados y establece `pageNumber` en 1. En caso contrario, restablece `currentStudentList` a la lista completa de aprendices almacenada en `apprentices`.
   *
   * @param {function} effect - La función que contiene la lógica del efecto.
   * @param {array} dependencies - Un arreglo de dependencias que determina cuándo se debe ejecutar el efecto.
   * @returns {void}
   *
   */
  useEffect(() => {
    if (searchedApprentices.length > 0 && !error) {
      setCurrentStudentList(searchedApprentices)
      setPageNumber(1)
    } else {
      setCurrentStudentList(apprentices)
    }
  }, [searchedApprentices, error, apprentices])

  /**
   * @type {number}
   * @name studentsPerPage
   * @default 6
   * @description
   * Almacena la cantidad de aprendices que se muestran por página en la paginación de aprendices.
   */
  const studentsPerPage = 6

  /**
   * @type {number}
   * @name pageCount
   * @description
   * Almacena el número de páginas necesarias para mostrar todos los aprendices en función de la cantidad de aprendices por página.
   */
  const pageCount = Math.ceil(currentStudentList.length / studentsPerPage)

  /**
   * @type {number}
   * @name startIndex
   * @description
   * Almacena el índice de inicio de un rango de aprendices en función del número de página actual y la cantidad de aprendices por página.
   */
  const startIndex = (pageNumber - 1) * studentsPerPage

  /**
   * @type {number}
   * @name endIndex
   * @description
   * Almacena el índice de fin de un rango de aprendices que se muestra en una paginación.
   */
  const endIndex = startIndex + studentsPerPage

  /**
   * @function
   * @name sendExcelFile
   * @async
   *
   * @description
   * Esta función se utiliza para enviar un archivo Excel al servidor. El archivo se selecciona utilizando un input y se adjunta al objeto FormData. Luego se llama a la función `sendExcelContrato(formData)` para enviar el archivo al servidor. La función devuelve una promesa que se debe esperar para obtener la respuesta del servidor. Si se produce un error al enviar el archivo, se lanza una excepción con el error.
   *
   * @returns {Promise} Una promesa que se resuelve cuando se ha enviado el archivo exitosamente.
   * @throws {Error} Si ocurre un error al enviar el archivo.
   */
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

  /**
   * @function
   * @name handleExcelFile
   *
   * @description
   * Esta función se utiliza para manejar la subida de un archivo Excel. Muestra un cuadro de diálogo de confirmación para que el usuario confirme la subida del archivo. Luego, llama a la función `sendExcelFile()` para cargar el archivo. Si la carga es exitosa, muestra un mensaje indicando la cantidad de aprendices subidos correctamente y actualiza la lista de aprendices llamando a la función `getApprentices()`. En caso de error, muestra un mensaje de error.
   *
   * @param {Event} e - El evento de cambio de archivo que desencadenó la función.
   */
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

  /**
   * @function
   * @name disabledOptions
   *
   * @description
   * Esta función deshabilita ciertas opciones después de un breve período de tiempo.
   */
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

  /**
   * Genera un excel con todos los aprendices que se encuentren en el software y permite descargarlo
   *
   * @function
   * @name generateExcel
   * @async
   *
   * @description
   * Esta función llama a `generateExcelStudents()` para obtener los datos del archivo Excel. Luego, crea un Blob a partir de los datos y lo convierte en un objeto URL. A continuación, crea un elemento `<a>` en el DOM, establece la URL generada y un nombre de archivo para el enlace. Finalmente, desencadena la descarga del archivo haciendo clic en el enlace y elimina el objeto URL después de la descarga.
   *
   * @returns {void}
   */
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

  /**
   * Genera un excel con todos los aprendices que se encuentren en el practicas y permite descargarlo

   * @function
   * @name generateStudentsPractical
   * @async
   *
   * @description
   * Esta función llama a `generateExcelStudentsPractical()` para obtener los datos del archivo Excel. Luego, crea un Blob a partir de los datos y lo convierte en un objeto URL. A continuación, crea un elemento `<a>` en el DOM, establece la URL generada y un nombre de archivo para el enlace. Finalmente, desencadena la descarga del archivo haciendo clic en el enlace y elimina el objeto URL después de la descarga.
   *
   * @returns {void}
   */
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

  /**
   * Genera un excel con todos los aprendices por una modalidad y permite descargarlo

   * @function
   * @name generateExcelModality
   * @async
   *
   * @description
   * Esta función llama a `generateExcelStudentsByModality(modality)` para obtener los datos del archivo Excel específicos para la modalidad proporcionada. Luego, crea un Blob a partir de los datos y lo convierte en un objeto URL. A continuación, crea un elemento `<a>` en el DOM, establece la URL generada y un nombre de archivo para el enlace. Finalmente, desencadena la descarga del archivo haciendo clic en el enlace y elimina el objeto URL después de la descarga.
   *
   * @param {string} modality - La modalidad de los estudiantes para filtrar la información.
   * @returns {void}
   */
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

  /**
   * Genera un excel con todos los aprendices que ya estan en etapa aun no estan en prácticas y permite descargarlo

   * @function
   * @name generateExcelNoPractical
   * @async
   *
   * @description
   * Esta función llama a `generateExcelStudentsNoPractical()` para obtener los datos del archivo Excel específicos para estudiantes que no están en prácticas. Luego, crea un Blob a partir de los datos y lo convierte en un objeto URL. A continuación, crea un elemento `<a>` en el DOM, establece la URL generada y un nombre de archivo para el enlace. Finalmente, desencadena la descarga del archivo haciendo clic en el enlace y elimina el objeto URL después de la descarga.
   *
   * @returns {void}
   */
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
          <Search searchFilter placeholder={'Busca un aprendiz'} searchItem={searchApprentices} />
          {(idRol === Number(keysRoles[0]) || idRol === Number(keysRoles[1])) && (
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
          )}
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
            {loading || currentStudentList.length === 0 || error ? <></> : <Pagination total={pageCount} color='secondary' variant='flat' page={pageNumber} onChange={setPageNumber} className='h-fit' />}
            <section className='ml-auto '>
              <div className='ml-auto bg-blue-600 rounded-full shadow-md'>
                <label htmlFor='upload' className='flex items-center w-full h-full gap-2 px-3 py-1 text-white rounded-full cursor-pointer'>
                  <span className='text-sm font-medium text-white select-none'>Subir Archivo</span>
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
