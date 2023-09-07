import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useNavigate } from 'react-router-dom'

// Icons
import { LuBookPlus } from 'react-icons/lu'

// Componentes
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Button } from '../Utils/Button/Button'
import { Siderbar } from '../Siderbar/Sidebar'
import { Card3D } from '../Utils/Card/Card'
import { Pagination } from '../Utils/Pagination/Pagination'
import { getClass } from '../../api/httpRequest'

export const Courses = () => {
  const [pageNumber, setPageNumber] = useState(0)
  const [loading, setLoading] = useState(true)
  const [courses, setCourses] = useState([])

  const getCursos = async () => {
    try {
      const response = await getClass()
      const { data } = response.data
      setCourses(data)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    getCursos()
  }, [])

  const coursesPerPage = 6
  const pageCount = Math.ceil(courses.length / coursesPerPage)
  const startIndex = pageNumber * coursesPerPage
  const endIndex = startIndex + coursesPerPage

  useEffect(() => {
    setLoading(false)
  }, [])

  const navigate = useNavigate()
  const handleStudents = (ficha) => {
    return navigate(`/fichas/aprendices/${ficha}`)
  }
  const handleAsign = () => {
    return navigate('/asignar-ficha')
  }

  return (
    <main className='flex flex-row min-h-screen bg-whitesmoke'>
      <Siderbar />
      <section className='relative grid flex-auto grid-rows-3-10-75-15'>
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
              courses.slice(startIndex, endIndex).map((course, i) => {
                return <Card3D key={i} header={course.numero_ficha} title={course.nombre_programa_formacion} subtitle={course.estado} item1={course.seguimiento_nombre_completo} item2={course.lider_nombre_completo} item3={course.fecha_fin_lectiva.split('T')[0]} item4={course.fecha_inicio_practica.split('T')[0]} onClick={() => handleStudents(course.numero_ficha)} item1text={'Instructor de seguimiento'} item2text={'Instructor Lider'} item3text={'Final Lectiva'} item4text={'Inicio Practica'} />
              })
            )}
          </section>
          <div className='flex justify-center h-[13vh] relative bottom-0'>
            <Pagination setPageNumber={setPageNumber} pageCount={pageCount} />
          </div>
          <div className='absolute right-12 bottom-20'>
            <Button rounded='rounded-full' bg='bg-green-600' px='px-3' py='py-[4px]' textSize='text-sm' font='font-medium' textColor='text-white' onClick={handleAsign} inline>
              <LuBookPlus className='text-xl' /> Asignar
            </Button>
          </div>
        </section>
        <Footer />
      </section>
    </main>
  )
}

const SkeletonLoading = ({ number = 6 }) => [...Array(number)].map((_, i) => <Card3D header={<Skeleton />} title={<Skeleton />} subtitle={<Skeleton />} item1={<Skeleton />} item2={<Skeleton />} item3={<Skeleton />} item4={<Skeleton />} key={i} />)
