import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'

// Components
import { getClassByTeacherId, getClassByLiderTeacherId, getUserById } from '../../api/httpRequest'
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Siderbar } from '../Siderbar/Sidebar'
import { Pagination } from '../Utils/Pagination/Pagination'
import { Card3D } from '../Utils/Card/Card'

export const TeacherClass = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [teacherClass, setTeacherClass] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const [rol, setRol] = useState('')

  useEffect(() => {
    getUser(id)
  }, [id])

  const getUser = async (id) => {
    try {
      const response = await getUserById(id)
      const { id_rol } = response.data.data[0]
      setRol(id_rol)
    } catch (error) {
      throw new Error(error)
    }
  }

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

  const getClassData = async (id, apiRoute) => {
    return (await apiRoute) === 'getClassByTeacherId' ? getClassByTeacherId(id) : getClassByLiderTeacherId(id)
  }

  useEffect(() => {
    setLoading(false)
  }, [])

  const coursesPerPage = 6
  const pageCount = Math.ceil(teacherClass.length / coursesPerPage)
  const startIndex = pageNumber * coursesPerPage
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
                return <Card3D key={i} header={course.numero_ficha} title={course.nombre_programa_formacion} subtitle={course.estado} item1={course.seguimiento_nombre_completo} item2={course.lider_nombre_completo} item3={course.fecha_fin_lectiva.split('T')[0]} item4={course.fecha_inicio_practica.split('T')[0]} />
              })
            )}
          </section>
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
