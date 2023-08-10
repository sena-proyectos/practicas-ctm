import { useEffect, useState } from 'react'
//Componentes
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Siderbar } from '../Siderbar/Sidebar'
import { Card3D } from '../Utils/Card/Card'
import { Pagination } from '../Utils/Pagination/Pagination'
import Skeleton from 'react-loading-skeleton'
import { GetFichasHttp } from '../../api/httpRequest'
import { date } from 'joi'


export const Courses = () => {
  const [pageNumber, setPageNumber] = useState(0)
  const [loading, setLoading] = useState(true)
  const [ficha, setFicha] = useState([])
  useEffect(() => {
    const getFichas = async () => {
      const fichasData = await GetFichasHttp();
      setFicha(fichasData)
    }
    getFichas()
  }, [])
  const Courses = {
    data: [
      ...ficha.map(item => ({
        ficha: item.numero_ficha,
        name: item.nombre_programa_formacion,
        lider: item.id_instructor_lider,
        seguimiento: item.id_instructor_seguimiento,
        finLectiva: item.fecha_fin_lectiva,
        inicioProductiva: item.fecha_inicio_practica

      }))
    ],
  }

  const coursesPerPage = 6
  const pageCount = Math.ceil(Courses.data.length / coursesPerPage)
  const startIndex = pageNumber * coursesPerPage
  const endIndex = startIndex + coursesPerPage

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }, [])

  return (
    <main className="flex flex-row min-h-screen">
      <Siderbar />
      <section className="relative grid flex-auto grid-rows-3-10-75-15">
        <header className="grid place-items-center">
          <Search searchFilter />
        </header>
        <section>
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
                return <Card3D key={i} header={course.ficha} title={course.name} subtitle={course.etapa} item1={course.seguimiento} item2={course.lider} item3={course.finLectiva} item4={course.inicioProductiva} />
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
