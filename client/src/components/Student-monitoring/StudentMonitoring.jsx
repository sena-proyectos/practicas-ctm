import { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

//Components
import { Siderbar } from '../Siderbar/Sidebar'
import { Search } from '../Search/Search'
import { Card } from '../Utils/Card/Card'
import { Modals } from '../Utils/Modals/Modals'
import { Footer } from '../Footer/Footer'
import { filter } from '../../import/staticData'
import { GetUserByName, detailInfoStudents, GetStudentsDetailById } from '../../api/httpRequest'

export const StudentMonitoring = () => {
  const [apprentices, setApprentices] = useState([])
  const [searchedApprentices, setSearchedApprentices] = useState([])
  const [error, setError] = useState(null)
  const [modalFilter, setModalFilter] = useState(false)
  const [infoStudent, setInfoStudent] = useState(false)
  const [nombreCompleto, setNombreCompleto] = useState(null)
  const [userInfoById, setInfoUserById] = useState({})
  const [loading, setLoading] = useState(true)

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
      console.log(response)
      const res = response.data.data[0]

      const nombre = res.nombre_aprendiz
      const apellido = res.apellido_aprendiz
      setNombreCompleto(`${nombre} ${apellido}`)
      setInfoUserById(res)
    } catch (error) {
      console.log('Ha ocurrido un error al mostrar los datos del usuario')
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
      const message = error.response.data.error.info.message

      setError(message)
      setSearchedApprentices([])
    }
  }

  useEffect(() => {
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
    getApprentices()
  }, [])

  const filterStudents = filter.filterStudents

  return (
    <>
      {modalFilter && <Modals bodyFilter title={'Filtrar'} view={filterStudents} closeModal={handleModal} />}
      {infoStudent && <Modals closeModal={handleModalInfo} bodyStudent title={userInfoById.nombre_completo} emailStudent={userInfoById.email_aprendiz} documentStudent={userInfoById.numero_documento_aprendiz} celStudent={userInfoById.celular_aprendiz} trainingProgram={userInfoById.nombre_programa_formacion} ficha={userInfoById.numero_ficha} academicLevel={userInfoById.nivel_formacion} trainingStage={userInfoById.etapa_formacion} modalitie={userInfoById.nombre_modalidad} finLectiva={userInfoById.fecha_fin_lectiva} inicioProductiva={userInfoById.fecha_inicio_practica} company={userInfoById.nombre_empresa} innmediateSuperior={userInfoById.nombre_jefe} workstation={userInfoById.cargo_jefe} emailSuperior={userInfoById.email_jefe} celSuperior={userInfoById.numero_contacto_jefe} arl={userInfoById.nombre_arl} />}
      <main className="flex flex-row min-h-screen bg-whitesmoke">
        <Siderbar />
        <section className="relative grid flex-auto w-min grid-rows-3-10-75-15 ">
          <header className="grid place-items-center ">
            <Search searchFilter iconClick={handleIconClick} searchStudent={searchApprentices} />
          </header>
          {searchedApprentices.length > 0 && !error ? (
            <div className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-2 md:grid-cols-3">
              {searchedApprentices.map((apprentice, i) => (
                <Card cardUser shadow={'shadow-2xl shadow-sky-600'} marginLink={'mx-auto'} scale={'scale-90'} title={`${apprentice.nombre_completo}`} subtitle={apprentice.email_aprendiz} lione={apprentice.nombre_programa_formacio} litwo={apprentice.numero_ficha} key={i} userID={apprentice.id_aprendiz} roundedLink={'rounded-xl'} borderColor={'border-primary'} buttonText={'Más información'} link={'/home'} modalClicked={modalStudent} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-1 px-4 st2:grid-cols-1 st1:grid-cols-2 md:grid-cols-3">
              {loading ? (
                <>
                  <SkeletonLoading />
                  <SkeletonLoading />
                  <SkeletonLoading />
                  <SkeletonLoading />
                  <SkeletonLoading />
                  <SkeletonLoading />
                </>
              ) : error ? (
                <h2 className="text-red-500">{error}</h2>
              ) : (
                apprentices.map((apprentice, i) => {
                  return <Card cardUser height={'h-[12.5rem] st2:h-[12.5rem] st1:h-[14rem] md:h-[14rem]'} shadow={'shadow-2xl shadow-purple-300'} marginLink={'mx-auto'} scale={'scale-90'} title={`${apprentice.nombre_completo}`} subtitle={apprentice.email_aprendiz} lione={apprentice.nombre_programa_formacion} litwo={apprentice.numero_ficha} key={i} userID={apprentice.id_aprendiz} roundedLink={'rounded-xl'} borderColor={'border-primary'} buttonText={'Más información'} isButton showModal modalClicked={modalStudent} />
                })
              )}
            </div>
          )}
          <Footer />
        </section>
      </main>
    </>
  )
}

const SkeletonLoading = () => (
  <div>
    <Skeleton height={'14rem'} className="scale-90 rounded-2xl" />
  </div>
)
