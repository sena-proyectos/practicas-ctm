import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useNavigate } from 'react-router-dom'

// Componentes
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Siderbar } from '../Siderbar/Sidebar'
import { Card3D } from '../Utils/Card/Card'
import { Pagination } from '../Utils/Pagination/Pagination'
import { getClass } from '../../api/httpRequest'

export const Courses = () => {
  const [pageNumber, setPageNumber] = useState(-1)
  const [loading, setLoading] = useState(true)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const getCursos = async () => {
      try {
        const response = await getClass()
        const { data } = response.data
        setCourses(data)
      } catch (error) {
        throw new Error(error)
      }
    }
    getCursos()
  }, [])

  const coursesPerPage = 6
  const pageCount = Math.ceil(courses.length / coursesPerPage)
  const startIndex = (pageNumber + 1) * coursesPerPage
  const endIndex = startIndex + coursesPerPage

  useEffect(() => {
    setLoading(false)
  }, [])

  const navigate = useNavigate()
  const handleStudents = (id) => {
    return navigate(`/fichas/aprendices/${id}`)
  }

  return (
    <main className='flex flex-row min-h-screen bg-whitesmoke'>
      <Siderbar />
      <section className='relative grid flex-auto grid-rows-3-10-75-15'>
        <header className='grid place-items-center'>
          <Search searchFilter />
        </header>
        <section className='grid content-center'>
          <section className='grid grid-cols-1 px-10 pt-3 pb-2 gap-x-4 gap-y-7 sm:grid-cols-2 md:grid-cols-3'>
            {loading ? (
              <>
                <SkeletonLoading />
                <SkeletonLoading />
                <SkeletonLoading />
                <SkeletonLoading />
                <SkeletonLoading />
                <SkeletonLoading />
              </>
            ) : (
              courses.slice(startIndex, endIndex).map((course, i) => {
                return <Card3D key={i} header={course.numero_ficha} title={course.nombre_programa_formacion} subtitle={course.estado} item1={course.id_instructor_seguimiento} item2={course.id_instructor_lider} item3={course.fecha_fin_lectiva.split('T')[0]} item4={course.fecha_inicio_practica.split('T')[0]} onClick={() => handleStudents(course.id_ficha)} />
              })
            )}
          </section>
          <div className='flex justify-center h-[13vh] relative bottom-0'>
            <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} pageCount={pageCount} />
          </div>
        </section>
        <Footer />
      </section>
    </main>
  )
}

const SkeletonLoading = () => {
  return <Card3D header={<Skeleton />} title={<Skeleton />} subtitle={<Skeleton />} item1={<Skeleton />} item2={<Skeleton />} item3={<Skeleton />} item4={<Skeleton />} />
}
