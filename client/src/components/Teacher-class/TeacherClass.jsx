import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import { Pagination } from '@nextui-org/pagination'
import Swal from 'sweetalert2'

// Icons
import { IoReturnDownBack } from 'react-icons/io5'
import { BiSad } from 'react-icons/bi'

// Components
import { generateExcelStudentsByInstructor, getClassByTeacherId, getClassTeacherByClassNumber } from '../../api/httpRequest'
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Siderbar } from '../Siderbar/Sidebar'
import { Card3D } from '../Utils/Card/Card'
import { keysRoles } from '../../import/staticData'
import { UIButton } from '../Utils/Button/Button'

export const TeacherClass = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [dataTeacherClass, setDataTeacherClass] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [nameInstructor, setNameInstructor] = useState(null)
  const [error, setError] = useState(null)
  const [searchedCourses, setSearchedCourses] = useState([])
  const [currentCourses, setCurrentCourses] = useState({})
  const idRol = Number(localStorage.getItem('idRol'))

  /**
   * @function
   * @name searchCourses
   * @async
   *
   * @description
   * Esta función se utiliza para buscar cursos por su número de ficha. Si el término de búsqueda está vacío, restablece el estado de error y la lista de cursos buscados. En caso de éxito, procesa el nombre del programa de formación, actualiza el estado `searchedCourses` con los resultados de la búsqueda y elimina el error. Si se produce un error, muestra un mensaje de error indicando que el curso no existe y restablece la lista de cursos buscados.
   *
   * @param {string} searchTerm - Término de búsqueda para el curso.
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
      return
    }
    try {
      const response = await getClassTeacherByClassNumber(id, searchTerm)
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
      } else {
        setError(null)
        setSearchedCourses(data)
      }
    } catch (error) {
      const message = error?.response?.data?.error?.info?.message

      setError(message ?? 'Curso no existe')
      setSearchedCourses([])
    }
  }

  /**
   * @function
   * @name getTeacherClass
   * @async
   *
   * @description
   * Esta función realiza una solicitud para obtener la lista de cursos por instructor de seguimiento utilizando la función `getClassByTeacherId`. Luego, procesa el nombre de cada programa de formación para capitalizar las primeras letras de cada palabra. Finalmente, actualiza el estado `dataTeacherClass` con los datos obtenidos, almacena el nombre del instructor en el estado `nameInstructor` y establece el estado `loading` como `false`.
   *
   * @throws {Error} Si la solicitud no se procesa con éxito, se lanza un error.
   * @returns {Promise<void>}
   *
   * @reference
   * Esta función se utiliza para obtener información de cursos y formatear los nombres de los programas de formación antes de actualizar el estado del componente.
   *
   * @example
   * getTeacherClass();
   *
   */
  const getTeacherClass = async () => {
    try {
      const response = await getClassByTeacherId(id)
      const { data } = response.data
      data.forEach((element) => {
        element.nombre_programa_formacion = element.nombre_programa_formacion
          .split(' ')
          .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          })
          .join(' ')
      })
      const { seguimiento_nombre_completo } = data[0]
      setNameInstructor(seguimiento_nombre_completo)
      setDataTeacherClass(data)
      setLoading(false)
    } catch (error) {
      const message = error?.response?.data?.error?.info?.message
      setError(message ?? 'No hay cursos')
      throw new Error(error)
    }
  }

  useEffect(() => {
    getTeacherClass()
  }, [])

  /**
   * @function
   *
   * @description
   * Este efecto se activa cuando hay cambios en `searchedCourses`, `error` o `dataTeacherClass`. Si `searchedCourses` tiene elementos y no hay errores, actualiza `currentCourses` con los cursos buscados y establece `pageNumber` en 1. En caso contrario, restablece `currentCourses` a la lista completa de cursos almacenada en `dataTeacherClass`.
   *
   * @param {function} effect - La función que contiene la lógica del efecto.
   * @param {array} dependencies - Un arreglo de dependencias que determina cuándo se debe ejecutar el efecto.
   * @returns {void}
   *
   */
  useEffect(() => {
    if (searchedCourses.length > 0 && !error) {
      setCurrentCourses(searchedCourses)
      setPageNumber(1)
    } else {
      setCurrentCourses(dataTeacherClass)
    }
  }, [searchedCourses, error, dataTeacherClass])

  /**
   * @type {number}
   * @name coursesPerPage
   * @default 6
   * @description
   * Almacena la cantidad de cursos que se muestran por página en la paginación de cursos.
   */
  const coursesPerPage = 6

  /**
   * @type {number}
   * @name pageCount
   * @description
   * Almacena el número de páginas necesarias para mostrar todos los cursos disponibles en función de la cantidad de cursos por página.
   */
  const pageCount = Math.ceil(currentCourses.length / coursesPerPage)

  /**
   * @type {number}
   * @name startIndex
   * @description
   * Almacena el índice de inicio de un rango de cursos en función del número de página actual y la cantidad de cursos por página.
   */
  const startIndex = (pageNumber - 1) * coursesPerPage

  /**
   * @type {number}
   * @name endIndex
   * @description
   * Almacena el índice de fin de un rango de cursos que se muestra en una paginación.
   */
  const endIndex = startIndex + coursesPerPage

  /**
   * Genera un excel con todos los aprendices por un instructor y permite descargarlo

   * @function
   * @name ExcelStudentsByInstructor
   * @async
   *
   * @description
   * Esta función llama a `generateExcelStudentsByInstructor(nameInstructor)` para obtener los datos del archivo Excel específicos para el instructor proporcionado. Luego, crea un Blob a partir de los datos y lo convierte en un objeto URL. A continuación, crea un elemento `<a>` en el DOM, establece la URL generada y un nombre de archivo para el enlace. Finalmente, desencadena la descarga del archivo haciendo clic en el enlace y elimina el objeto URL después de la descarga.
   *
   * @param {string} nameInstructor - El nombre del instructor de seguimiento para filtrar la información.
   * @returns {void}
   */
  const ExcelStudentsByInstructor = async () => {
    try {
      const response = await generateExcelStudentsByInstructor(nameInstructor)

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

      const url = window.URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = `estudiantes_de_${nameInstructor}.xlsx`
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
      <section className='relative grid flex-auto w-min grid-rows-[auto_1fr_auto]'>
        <header className='grid place-items-center h-[10vh]'>
          <Search searchFilter placeholder={'Busca una ficha'} searchItem={searchCourses} />
        </header>
        <section className='flex flex-col justify-around'>
          {searchedCourses.length > 0 && !error ? (
            <section className='grid grid-cols-1 gap-6 pt-3 px-7 st2:grid-cols-1 st1:grid-cols-2 md:grid-cols-3'>
              {searchedCourses.slice(startIndex, endIndex).map((course, i) => {
                return <Card3D key={i} header={course.numero_ficha} title={course.nombre_programa_formacion} subtitle={course.estado} item1={course.seguimiento_nombre_completo} item2={course.nivel_formacion} item3={course.fecha_inicio_lectiva} item4={course.fecha_inicio_practica} item1text={'Instructor de seguimiento'} item2text={'Nivel de formación'} item3text={'Inicio Lectiva'} item4text={'Inicio Practica'} />
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
                <>
                  <SkeletonLoading number={6} />
                </>
              ) : dataTeacherClass.length > 0 ? (
                dataTeacherClass.slice(startIndex, endIndex).map((course, i) => {
                  return <Card3D key={i} header={course.numero_ficha} title={course.nombre_programa_formacion} subtitle={course.estado} item1={course.seguimiento_nombre_completo} item2={course.nivel_formacion} item3={course.fecha_inicio_lectiva} item4={course.fecha_inicio_practica} item1text={'Instructor de seguimiento'} item2text={'Nivel de formación'} item3text={'Inicio Lectiva'} item4text={'Inicio Practica'} />
                })
              ) : null}
            </section>
          )}
          {(idRol === Number(keysRoles[0]) || idRol === Number(keysRoles[1])) && (
            <div className='absolute top-4 left-8'>
              <Link to='/instructores' className='flex items-center gap-2 text-sm font-medium rounded-full text-white bg-slate-600 px-4 py-[2px] transition-colors'>
                <IoReturnDownBack />
                Regresar
              </Link>
            </div>
          )}

          <div className='flex flex-col items-center gap-1 pt-2 pb-1'>
            <div className='flex justify-center w-full'>{currentCourses.length === 0 || loading || error ? <></> : <Pagination total={pageCount} color='secondary' variant='flat' onChange={setPageNumber} className=' h-fit' />}</div>
            {error || loading || currentCourses.length === 0 ? (
              <></>
            ) : (
              (idRol === Number(keysRoles[0]) || idRol === Number(keysRoles[1])) && (
                <div className='w-full px-7'>
                  <UIButton type='button' onClick={ExcelStudentsByInstructor} rounded='full' classNames='ml-auto rounded-full bg-green-600 text-sm shadow-md'>
                    Informe Aprendices
                  </UIButton>
                </div>
              )
            )}
          </div>
        </section>
        <Footer />
      </section>
    </main>
  )
}

const SkeletonLoading = ({ number = 6 }) => [...Array(number)].map((_, i) => <Card3D header={<Skeleton />} title={<Skeleton />} subtitle={<Skeleton />} item1={<Skeleton />} item2={<Skeleton />} item3={<Skeleton />} item4={<Skeleton />} key={i} />)
