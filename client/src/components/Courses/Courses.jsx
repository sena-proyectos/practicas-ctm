import { useEffect, useState } from 'react'

//Componentes
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Siderbar } from '../Siderbar/Sidebar'
import { Card3D } from '../Utils/Card/Card'
import { Pagination } from '../Utils/Pagination/Pagination'
import Skeleton from 'react-loading-skeleton'
import { useNavigate } from 'react-router-dom'

export const Courses = () => {
  const [pageNumber, setPageNumber] = useState(-1)
  const [loading, setLoading] = useState(true)
  const Courses = {
    data: [
      {
        ficha: 2473196,
        name: 'Fabricación de muebles contemporaneos',
        lider: 'Peranito 1',
        seguimiento: 'Seguimient 1',
        etapa: 'Lectiva',
        finLectiva: '04-05-23',
        inicioProductiva: '04-06-23',
      },
      {
        ficha: 2689476,
        name: 'Analisis y desarrollo de software',
        lider: 'Peranito 2',
        seguimiento: 'Seguimient 2',
        etapa: 'Productiva',
        finLectiva: '04-05-23',
        inicioProductiva: '04-06-23',
      },
      {
        ficha: 2869467,
        name: 'Pan y Tomate',
        lider: 'Peranito 3',
        seguimiento: 'Seguimient 3',
        etapa: 'Lectiva',
        finLectiva: '04-05-23',
        inicioProductiva: '04-06-23',
      },
      {
        ficha: 1234567,
        name: 'Fabricación de muebles contemporaneos',
        lider: 'Peranito 4',
        seguimiento: 'Seguimient 4',
        etapa: 'Productiva',
        finLectiva: '04-05-23',
        inicioProductiva: '04-06-23',
      },
      {
        ficha: 7654321,
        name: 'Analisis y desarrollo de software',
        lider: 'Peranito 5',
        seguimiento: 'Seguimient 5',
        etapa: 'Lectiva',
        finLectiva: '04-05-23',
        inicioProductiva: '04-06-23',
      },
      {
        ficha: 1234765,
        name: 'Pan y Tomate',
        lider: 'Peranito 6',
        seguimiento: 'Seguimient 6',
        etapa: 'Productiva',
        finLectiva: '04-05-23',
        inicioProductiva: '04-06-23',
      },
    ],
  }

  const coursesPerPage = 6
  const pageCount = Math.ceil(Courses.data.length / coursesPerPage)
  const startIndex = (pageNumber + 1) * coursesPerPage
  const endIndex = startIndex + coursesPerPage

  useEffect(() => {
    setLoading(false)
  }, [])

  const navigate = useNavigate()
  const handleStudents = () => {
    return navigate(`/aprendices`)
  }

  return (
    <main className="flex flex-row min-h-screen bg-whitesmoke">
      <Siderbar />
      <section className="relative grid flex-auto grid-rows-3-10-75-15">
        <header className="grid place-items-center">
          <Search searchFilter />
        </header>
        <section className="grid content-center">
          <section className="grid grid-cols-1 px-10 pt-3 pb-2 gap-x-4 gap-y-7 sm:grid-cols-2 md:grid-cols-3">
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
              Courses.data.slice(startIndex, endIndex).map((course, i) => {
                return <Card3D key={i} header={course.ficha} title={course.name} subtitle={course.etapa} item1={course.seguimiento} item2={course.lider} item3={course.finLectiva} item4={course.inicioProductiva} onClick={handleStudents} />
              })
            )}
          </section>
          <div className="flex justify-center h-[13vh] relative bottom-0">
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
