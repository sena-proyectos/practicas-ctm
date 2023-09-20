import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'

// Icons
import { IoReturnDownBack } from 'react-icons/io5'

// Components
import { getClassByTeacherId, getClassByLiderTeacherId, getUserById } from '../../api/httpRequest'
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Siderbar } from '../Siderbar/Sidebar'
import { Pagination } from '../Utils/Pagination/Pagination'
import { Card3D } from '../Utils/Card/Card'
import { keysRoles } from '../../import/staticData'

export const TeacherClass = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [teacherClass, setTeacherClass] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const [rol, setRol] = useState('')
  const idRol = Number(localStorage.getItem('idRol'))

  useEffect(() => {
    getUser(id)
  }, [id])

  /**
   * Función asincrónica para obtener el rol del usuario por su ID.
   *
   * @async
   * @function
   * @name getUser
   * @param {number} id - ID del usuario.
   * @throws {Error} Error en caso de fallo en la solicitud.
   * @returns {void}
   *
   * @example
   * getUser(123);
   */
  const getUser = async (id) => {
    try {
      const response = await getUserById(id)
      const { id_rol } = response.data.data[0]
      setRol(id_rol)
    } catch (error) {
      throw new Error(error)
    }
  }

  /**
   * Efecto secundario para obtener y establecer la lista de clases del usuario según su rol.
   *
   * @function
   * @name useEffect
   * @param {number} rol - Rol del usuario (3 o 4).
   * @param {number} id - ID del usuario.
   * @returns {void}
   */
  useEffect(() => {
    if (rol && (rol === 3 || rol === 4)) {
      const apiRoute = rol === 3 ? 'getClassByTeacherId' : 'getClassByLiderTeacherId'

      const fetchData = async () => {
        try {
          const response = await getClassData(id, apiRoute)
          const { data } = response.data
          setTeacherClass(data)
        } catch (error) {
          throw new Error(error)
        }
      }

      fetchData()
    }
  }, [rol, id])

  /**
   * Función para obtener los datos de las clases según el rol y el ID del usuario.
   *
   * @function
   * @name getClassData
   * @param {number} id - ID del usuario.
   * @param {string} apiRoute - Ruta de la API para obtener los datos de las clases.
   * @throws {Error} Error en caso de fallo en la solicitud.
   * @returns {Promise} Promesa que devuelve los datos de las clases.
   *
   * @example
   * getClassData(123, 'getClassByTeacherId');
   */
  const getClassData = async (id, apiRoute) => {
    return (await apiRoute) === 'getClassByTeacherId' ? getClassByTeacherId(id) : getClassByLiderTeacherId(id)
  }

  useEffect(() => {
    setLoading(false)
  }, [])

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
   * Calcula el número de páginas necesarias para la paginación de cursos.
   *
   * @constant
   * @name pageCount
   * @type {number}
   *
   * @example
   * const numeroDePaginas = pageCount;
   */
  const pageCount = Math.ceil(teacherClass.length / coursesPerPage)
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
  const startIndex = pageNumber * coursesPerPage
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

  return (
    <main className='flex flex-row min-h-screen bg-whitesmoke'>
      <Siderbar />
      <section className='relative grid flex-auto w-min grid-rows-3-10-75-15'>
        <header className='grid place-items-center'>
          <Search searchFilter />
        </header>
        <section className='flex flex-col h-full gap-3'>
          <section className='grid grid-cols-1 px-10 pt-3 pb-2 gap-x-4 gap-y-7 md:h-[85%] sm:grid-cols-2 md:grid-cols-3'>
            {loading ? (
              <>
                <SkeletonLoading number={6} />
              </>
            ) : (
              teacherClass.slice(startIndex, endIndex).map((course, i) => {
                return <Card3D key={i} header={course.numero_ficha} title={course.nombre_programa_formacion} subtitle={course.estado} item1={course.seguimiento_nombre_completo} item2={course.lider_nombre_completo} item3={course.fecha_fin_lectiva.split('T')[0]} item4={course.fecha_inicio_practica.split('T')[0]} item1text={'Instructor de seguimiento'} item2text={'Instructor Lider'} item3text={'Final Lectiva'} item4text={'Inicio Practica'} />
              })
            )}
          </section>
          {(idRol === Number(keysRoles[0]) || idRol === Number(keysRoles[1])) && (
            <div className='absolute top-4 left-8'>
              <Link to='/instructores' className='flex items-center gap-2 text-sm font-medium rounded-full text-white bg-slate-600 px-4 py-[2px] transition-colors'>
                <IoReturnDownBack />
                Regresar
              </Link>
            </div>
          )}
          <div className='flex justify-center h-[13vh] relative bottom-0'>
            <Pagination setPageNumber={setPageNumber} pageCount={pageCount} />
          </div>
        </section>
        <Footer />
      </section>
    </main>
  )
}

const SkeletonLoading = ({ number = 6 }) => [...Array(number)].map((_, i) => <Card3D header={<Skeleton />} title={<Skeleton />} subtitle={<Skeleton />} item1={<Skeleton />} item2={<Skeleton />} item3={<Skeleton />} item4={<Skeleton />} key={i} />)
