import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useNavigate } from 'react-router-dom'

// Icons
import { LuBookPlus } from 'react-icons/lu'
import { PiCaretRightBold } from 'react-icons/pi'
import { TiDelete } from 'react-icons/ti'
import { BiSad } from 'react-icons/bi'

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
  const [coursesOriginal, setCoursesOriginal] = useState([])
  const [showFiltros, setShowFiltros] = useState(false)
  const [filtersButtons, setFiltersButtons] = useState({ etapa: false, nivel: false, finLectiva: false, inicioPractica: false })
  const [activeFilter, setActiveFilter] = useState(false)

  const handleFilter = () => {
    setShowFiltros(!showFiltros)
  }

  const getCursos = async () => {
    try {
      const response = await getClass()
      const { data } = response.data
      setCourses(data)
      setCoursesOriginal(data)
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

  const disableShowFiltros = () => {
    setTimeout(() => {
      setShowFiltros(false)
      setFiltersButtons({ etapa: false, nivel: false, finLectiva: false, inicioPractica: false })
    }, 100)
  }

  const ShowFilter = (filterType) => {
    if (filterType === 'etapa') setFiltersButtons({ etapa: !filtersButtons.etapa, nivel: false, fecha: false, inicioPractica: false })
    if (filterType === 'nivel') setFiltersButtons({ nivel: !filtersButtons.nivel, modalidad: false, fecha: false, inicioPractica: false })
    if (filterType === 'finLectiva') setFiltersButtons({ finLectiva: !filtersButtons.finLectiva, etapa: false, nivel: false, inicioPractica: false })
    if (filterType === 'inicioPractica') setFiltersButtons({ inicioPractica: !filtersButtons.inicioPractica, etapa: false, nivel: false, finLectiva: false })
  }

  const handleFilterType = (filterType, filter) => {
    if (filterType === 'etapa') {
      const filterMap = coursesOriginal.filter((course) => course.estado === filter)
      setCourses(filterMap)
    }
    if (filterType === 'nivel') {
      const filterMap = coursesOriginal.filter((course) => course.nivel_formacion === filter)
      setCourses(filterMap)
    }
    disableShowFiltros()
    setActiveFilter(true)
  }

  const handleResetFilter = () => {
    setCourses(coursesOriginal)
    disableShowFiltros()
    setActiveFilter(false)
  }

  return (
    <main className='flex flex-row min-h-screen bg-whitesmoke'>
      <Siderbar />
      <section className='relative grid flex-auto grid-rows-3-10-75-15'>
        <header className='grid place-items-center'>
          <Search searchFilter placeholder={'Busca una ficha'} icon iconClick={handleFilter} />
          <ul className={`absolute right-48  mt-1 top-4 w-40 flex flex-col gap-y-1 py-2 text-sm border border-gray rounded-lg bg-white ${showFiltros ? 'visible' : 'hidden'} z-10 transition-all duration-200`} onMouseLeave={disableShowFiltros}>
            <li>
              <button type='button' className='relative flex items-center justify-between w-full h-full px-3 py-1 hover:bg-whitesmoke text-slate-800' onClick={() => ShowFilter('etapa')}>
                Etapa Formación
                <PiCaretRightBold className={`text-md mt-[1px] ${filtersButtons.etapa ? 'rotate-90' : 'rotate-0'} transition-all duration-200`} />
                {filtersButtons.etapa && (
                  <section className='absolute left-full ml-[2px] bg-white top-0 border border-gray rounded-lg'>
                    <ul className='flex flex-col w-40 gap-1 py-2'>
                      <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleFilterType('etapa', 'Lectiva')}>
                        Lectiva
                      </li>
                      <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleFilterType('etapa', 'Práctica')}>
                        Práctica
                      </li>
                    </ul>
                  </section>
                )}
              </button>
            </li>
            <li>
              <button type='button' className='relative flex items-center justify-between w-full h-full px-3 py-1 hover:bg-whitesmoke text-slate-800' onClick={() => ShowFilter('nivel')}>
                Nivel Formación
                <PiCaretRightBold className={`text-md mt-[1px] ${filtersButtons.nivel ? 'rotate-90' : 'rotate-0'} transition-all duration-200`} />
                {filtersButtons.nivel && (
                  <section className='absolute left-full ml-[2px] bg-white top-0 border border-gray rounded-lg'>
                    <ul className='flex flex-col w-40 gap-1 py-2'>
                      <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleFilterType('nivel', 'Técnico')}>
                        Técnica
                      </li>
                      <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleFilterType('nivel', 'Tecnólogo')}>
                        Tecnólogo
                      </li>
                    </ul>
                  </section>
                )}
              </button>
            </li>
            <li>
              <button type='button' className='relative flex items-center justify-between w-full h-full px-3 py-1 hover:bg-whitesmoke text-slate-800' onClick={() => ShowFilter('finLectiva')}>
                Fin Lectiva
                <PiCaretRightBold className={`text-md mt-[1px] ${filtersButtons.finLectiva ? 'rotate-90' : 'rotate-0'} transition-all duration-200`} />
                {filtersButtons.finLectiva && (
                  <section className='absolute left-full ml-[2px] bg-white top-0 border border-gray rounded-lg h-10 flex items-center'>
                    <form action=''>
                      <input type='date' className='w-full py-1 pl-2 pr-3 text-sm text-black focus:text-gray-900 rounded-xl focus:bg-white focus:outline-none placeholder:text-slate-400' />
                    </form>
                  </section>
                )}
              </button>
            </li>
            <li>
              <button type='button' className='relative flex items-center justify-between w-full h-full px-3 py-1 hover:bg-whitesmoke text-slate-800' onClick={() => ShowFilter('inicioPractica')}>
                Inicio Práctica
                <PiCaretRightBold className={`text-md mt-[1px] ${filtersButtons.inicioPractica ? 'rotate-90' : 'rotate-0'} transition-all duration-200`} />
                {filtersButtons.inicioPractica && (
                  <section className='absolute left-full ml-[2px] bg-white top-0 border border-gray rounded-lg h-10 flex items-center'>
                    <form action=''>
                      <input type='date' className='w-full py-1 pl-2 pr-3 text-sm text-black focus:text-gray-900 rounded-xl focus:bg-white focus:outline-none placeholder:text-slate-400' />
                    </form>
                  </section>
                )}
              </button>
            </li>
          </ul>
          {activeFilter && (
            <section className='absolute right-3'>
              <button type='button' className='text-sm font-light flex items-center gap-[2px] hover:text-red-500 transition-colors' onClick={handleResetFilter}>
                <TiDelete className='text-xl text-red-500' /> Borrar Filtro
              </button>
            </section>
          )}
        </header>
        <section className='flex flex-col h-full gap-3'>
          <section className='grid grid-cols-1 px-10 pt-3 pb-2 gap-x-4 gap-y-7 md:h-[85%] sm:grid-cols-2 md:grid-cols-3'>
            {courses.length > 0 ? (
              courses.slice(startIndex, endIndex).map((course, i) => {
                return <Card3D key={i} header={course.numero_ficha} title={course.nombre_programa_formacion} subtitle={course.estado} item1={course.seguimiento_nombre_completo} item2={course.lider_nombre_completo} item3={course.fecha_fin_lectiva.split('T')[0]} item4={course.fecha_inicio_practica.split('T')[0]} onClick={() => handleStudents(course.numero_ficha)} item1text={'Instructor de seguimiento'} item2text={'Instructor Lider'} item3text={'Final Lectiva'} item4text={'Inicio Practica'} />
              })
            ) : loading ? (
              <SkeletonLoading number={6} />
            ) : (
              <section className='absolute flex justify-center w-full top-32'>
                <section className='flex items-center gap-1 mx-auto text-xl text-red-500'>
                  <p>¡Oops! No hay ninguna inscripción con este filtro.</p>
                  <BiSad className='text-2xl' />
                </section>
              </section>
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
