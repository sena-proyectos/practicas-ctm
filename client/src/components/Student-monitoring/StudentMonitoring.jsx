import { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// Components
import { Siderbar } from '../Siderbar/Sidebar'
import { Search } from '../Search/Search'
import { CardStudent } from '../Utils/Card/Card'
import { FilterModal, InfoStudentModal } from '../Utils/Modals/Modals'
import { Footer } from '../Footer/Footer'
// import { filter } from '../../import/staticData'
import { Pagination } from '../Utils/Pagination/Pagination'
import { GetUserByName, detailInfoStudents, GetStudentsDetailById } from '../../api/httpRequest'
import { Button } from '../Utils/Button/Button'
import { Select } from '../Utils/Select/Select'
import { modalities } from '../../import/staticData'

export const StudentMonitoring = () => {
  const [apprentices, setApprentices] = useState([])
  const [searchedApprentices, setSearchedApprentices] = useState([])
  const [error, setError] = useState(null)
  const [modalFilter, setModalFilter] = useState(false)
  const [infoStudent, setInfoStudent] = useState(false)
  const [userInfoById, setInfoUserById] = useState({})
  const [loading, setLoading] = useState(true)
  const [pageNumber, setPageNumber] = useState(0)
  const [dates, setDates] = useState({})

  const handleIconClick = () => {
    setModalFilter(!modalFilter)
  }

  const handleModal = () => {
    setModalFilter(!modalFilter)
  }

  const modalStudent = async (userID) => {
    setInfoStudent(true)
    getUser(userID)
  }

  const handleModalInfo = () => {
    setInfoStudent(!infoStudent)
  }

  const getUser = async (userID) => {
    try {
      const response = await GetStudentsDetailById(userID)
      const res = response.data.data[0]
      const { fecha_fin_lectiva, fecha_inicio_practica } = res
      setDates({ fin_lectiva: fecha_fin_lectiva.split('T')[0], inicio_practicas: fecha_inicio_practica.split('T')[0] })
      setInfoUserById(res)
    } catch (error) {
      console.error('Ha ocurrido un error al mostrar los datos del usuario')
    }
  }

  const searchApprentices = async (searchTerm) => {
    if (searchTerm.trim() === '') {
      setError(null)
      setSearchedApprentices([])
      return
    }
    try {
      const response = await GetUserByName(searchTerm)
      const { data } = response.data
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

  const getApprentices = async () => {
    try {
      const response = await detailInfoStudents()
      const { data } = response.data
      setApprentices(data)
      setLoading(false)
    } catch (error) {
      setError('Error al obtener los aprendices')
    }
  }

  useEffect(() => {
    getApprentices()
  }, [])

  // const filterStudents = filter.filterStudents

  const studentsPerPage = 6
  const pageCount = Math.ceil(apprentices.length / studentsPerPage)

  const startIndex = pageNumber * studentsPerPage
  const endIndex = startIndex + studentsPerPage

  const option = modalities.map((modality) => ({
    value: modality.name,
    key: modality.value
  }))

  return (
    <>
      {modalFilter && (
        <FilterModal title={'Filtrar Aprendices'} width='w-3/4 md:w-1/3' closeModal={handleModal}>
          <form className='flex flex-col gap-5'>
            <section className='flex flex-col gap-3'>
              <section className='grid grid-rows-2'>
                <label htmlFor='' className='text-sm text-cyan-700'>
                  Fichas
                </label>
                <input type='text' className='border-gray-400 focus:text-gray-900 rounded-lg w-full border-[1.2px] bg-white py-[1px] pl-3 text-sm text-black focus:bg-white focus:outline-none' placeholder='Ej: 2473196' />
              </section>
              <section className='grid grid-rows-2'>
                <label htmlFor='' className='text-sm text-cyan-700'>
                  Programa de Formación
                </label>
                <input type='text' className='border-gray-400 focus:text-gray-900 rounded-lg border-[1.2px] w-full bg-white py-[1px] pl-3 text-sm text-black focus:bg-white focus:outline-none' placeholder='Ej: Análisis y Desarrollo de Software' />
              </section>
              <section className='grid grid-rows-2'>
                <label htmlFor='' className='text-sm text-cyan-700'>
                  Modalidad
                </label>
                <Select placeholder={'Selecciona la modalidad'} options={option} hoverColor='hover:bg-slate-600' hoverTextColor='hover:text-white' placeholderSearch='Ingrese nombre instructor' selectedColor='bg-slate-600 text-white' rounded='rounded-lg' py='py-[2.6px]' borderColor='border-slate-500' textSize={'text-sm'} />
              </section>
            </section>
            <Button rounded='rounded-xl' px='px-8' py='py-1' textSize='text-base'>
              Filtrar
            </Button>
          </form>
        </FilterModal>
      )}
      {infoStudent && (
        <InfoStudentModal closeModal={handleModalInfo} bodyStudent title={userInfoById.nombre_completo} emailStudent={userInfoById.email_aprendiz} documentStudent={userInfoById.numero_documento_aprendiz} cellPhoneNumber={userInfoById.celular_aprendiz} program={userInfoById.nombre_programa_formacion} courseNumber={userInfoById.numero_ficha} academicLevel={userInfoById.nivel_formacion} formationStage={userInfoById.etapa_formacion} modalitie={userInfoById.nombre_modalidad} lectivaEnd={dates.fin_lectiva} productiveStart={dates.inicio_practicas} company={userInfoById.nombre_empresa} innmediateSuperior={userInfoById.nombre_jefe} positionSuperior={userInfoById.cargo_jefe} emailSuperior={userInfoById.email_jefe} celphoneSuperior={userInfoById.numero_contacto_jefe} arl={userInfoById.nombre_arl} />
      )}
      <main className='flex flex-row min-h-screen bg-whitesmoke'>
        <Siderbar />
        <section className='relative grid flex-auto w-min grid-rows-3-10-75-15 gap-y-2 '>
          <header className='grid place-items-center '>
            <Search searchFilter icon placeholder={'Busca un aprendiz'} iconClick={handleIconClick} searchStudent={searchApprentices} />
          </header>
          {searchedApprentices.length > 0 && !error ? (
            <div className='h-[80%] grid grid-cols-1 px-4 gap-4 st2:grid-cols-1 st1:grid-cols-2 md:grid-cols-3'>
              {searchedApprentices.slice(startIndex, endIndex).map((apprentice, i) => (
                <CardStudent key={i} userID={apprentice.id_aprendiz} modalClicked={modalStudent} nameStudent={apprentice.nombre_completo} emailStudent={apprentice.email_aprendiz} programStudent={apprentice.nombre_programa_formacion} courseStudent={apprentice.numero_ficha} height={'h-[11.5rem]'} />
              ))}
            </div>
          ) : (
            <div className='h-[80%] grid grid-cols-1 px-4 gap-4 st2:grid-cols-1 st1:grid-cols-2 md:grid-cols-3'>
              {loading ? (
                <>
                  <SkeletonLoading />
                </>
              ) : error ? (
                <h2 className='text-red-500'>{error}</h2>
              ) : (
                apprentices.slice(startIndex, endIndex).map((apprentice, i) => {
                  return <CardStudent key={i} userID={apprentice.id_aprendiz} modalClicked={modalStudent} nameStudent={apprentice.nombre_completo} emailStudent={apprentice.email_aprendiz} programStudent={apprentice.nombre_programa_formacion} courseStudent={apprentice.numero_ficha} height={'h-[11.5rem]'} />
                })
              )}
            </div>
          )}
          <div className='flex justify-center h-[13vh] relative st1:bottom-[5.5rem] st2:bottom-0 bottom-[-4rem] md:bottom-[5.5rem]'>
            <Pagination setPageNumber={setPageNumber} pageCount={pageCount} />
          </div>
          <Footer />
        </section>
      </main>
    </>
  )
}

const SkeletonLoading = ({ number = 6 }) =>
  [...Array(number)].map((_, i) => (
    <div key={i}>
      <Skeleton height={'14rem'} className='scale-90 rounded-2xl' />
    </div>
  ))
