import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'

// Icons
import { FaAngleRight } from 'react-icons/fa'

// Components
import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Pagination } from '../Utils/Pagination/Pagination'
import { colorsOddRow } from '../../import/staticData'
import { getTeachers } from '../../api/httpRequest'

export const Teachers = () => {
  const [pageNumber, setPageNumber] = useState(0)
  const [loading, setLoading] = useState(true)
  const [teacher, setTeacher] = useState([])

  const getInstructores = async () => {
    try {
      const response = await getTeachers()
      const { data } = response.data
      setTeacher(data)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    getInstructores()
  }, [])

  const instructoresPerPage = 8
  const pageCount = Math.ceil(teacher.length / instructoresPerPage)

  const allColors = teacher.map((_, index) => ({
    ...colorsOddRow[index % colorsOddRow.length]
  }))

  const startIndex = pageNumber * instructoresPerPage
  const endIndex = startIndex + instructoresPerPage

  const navigate = useNavigate()

  useEffect(() => {
    setLoading(false)
  }, [])

  const handleCourse = (id) => {
    return navigate(`fichas/${id}`)
  }

  return (
    <main className='flex flex-row min-h-screen bg-whitesmoke'>
      <Siderbar />
      <section className='relative grid flex-auto w-min grid-rows-3-10-75-15'>
        <header className='grid place-items-center'>
          <Search searchFilter />
        </header>
        <section className='flex flex-col h-full gap-3'>
          <section className='grid grid-cols-1 gap-x-3 gap-y-4 md:grid-cols-4 px-8 md:px-12 pt-6 md:gap-y-2 md:gap-x-8 h-fit md:h-[85%] st1:grid-cols-3 st1:gap-y-4 st2:gap-y-4 st2:grid-cols-2'>
            {loading ? (
              <>
                <SkeletonLoading />
              </>
            ) : (
              allColors.slice(startIndex, endIndex).map((color, index) =>
                teacher[startIndex + index] ? (
                  <div className='rounded-[2rem] grid grid-cols-2-90-10 shadow-2xl h-[9rem] bg-white' key={index} {...color}>
                    <div className='flex flex-col w-4/5 gap-2 mx-auto my-auto'>
                      <h6 className='font-medium text-center text-[0.9rem]'>{`${teacher[startIndex + index].nombres_usuario} ${teacher[startIndex + index].apellidos_usuario}`}</h6>
                      <hr className={`font-bold ${color.hrcolor} border-1`} />
                      <p className='text-[0.8rem] font-light text-center'>{teacher[startIndex + index].id_rol === 3 ? 'Instructor Seguimiento' : teacher[startIndex + index].id_rol === 4 ? 'Instructor Líder' : ''}</p>
                    </div>
                    <div className={`w-full h-full rounded-r-[2rem] ${color.sidecolor}`}>
                      <div className={`w-full h-[3rem] rounded-tr-[2rem] text-white text-xl ${color.linkcolor}`}>
                        <button className='w-full h-full' onClick={() => handleCourse(teacher[startIndex + index].id_usuario)}>
                          <FaAngleRight className='h-full py-3 mx-auto' />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null
              )
            )}
          </section>
          <div className='flex justify-center h-[13vh] relative st1:bottom-[-1.5rem] st2:bottom-[-3rem] bottom-[-4rem] md:bottom-0'>
            <Pagination setPageNumber={setPageNumber} pageCount={pageCount} />
          </div>
        </section>
        <Footer />
      </section>
    </main>
  )
}

const SkeletonLoading = () => {
  return colorsOddRow.map((color, index) => {
    return (
      <div className='rounded-[2rem] grid grid-cols-2-90-10 shadow-2xl h-[9rem]' key={index} {...color}>
        <div className='flex flex-col w-4/5 gap-2 mx-auto my-auto'>
          <h6 className='font-medium text-center text-[0.9rem]'>
            <Skeleton />
          </h6>
          <hr className={`font-bold ${color.hrcolor} border-1`} />
          <p className='text-[0.8rem] font-light text-center'>
            <Skeleton />
          </p>
        </div>
        <div className={`w-full h-full rounded-r-[2rem] ${color.sidecolor}`}>
          <div className={`w-full h-[3rem] rounded-tr-[2rem] text-white text-xl ${color.linkcolor}`}>
            <Link to='/fichas'>
              <FaAngleRight className='h-full py-3 mx-auto' />
            </Link>
          </div>
        </div>
      </div>
    )
  })
}
