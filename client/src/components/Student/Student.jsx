import { useState, useEffect } from 'react'
import { GetUserByName, detailInfoStudents, GetStudentsDetailyId } from '../../api/httpRequest'
import { Siderbar } from '../Siderbar/Sidebar'
import { Search } from '../Search/Search'
import { Card } from '../Utils/Card/Card'
import { Footer } from '../Footer/Footer'
import Cookies from 'js-cookie'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Modals } from '../Utils/Modals/Modals'
import { filter } from '../../import/staticData'

const Student = () => {
  const [apprentices, setApprentices] = useState([])
  const [searchedApprentices, setSearchedApprentices] = useState([])
  const [error, setError] = useState(null)
  const [modalFilter, setModalFilter] = useState(false)
  const [infoStudent, setInfoStudent] = useState(false)
  const [nombreCompleto, setNombreCompleto] = useState(null)
  const [userInfoById, setInfoUserById] = useState({})

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
      const response = await GetStudentsDetailyId(userID)
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
    //const token = Cookies.get('token')
    //if (!token) window.location.href = '/'

    const getApprentices = async () => {
      try {
        const response = await detailInfoStudents()
        const { data } = response.data
        setApprentices(data)
      } catch (error) {
        setError('Error al obtener los aprendices')
      }
    }
    setTimeout(getApprentices, 1000)
    // getApprentices()
  }, [])

  const filterStudents = filter.filterStudents


  return (
    <>
      {modalFilter && <Modals bodyFilter title={'Filtrar'} view={filterStudents} closeModal={handleModal} />}
      {infoStudent && <Modals closeModal={handleModalInfo} bodyStudent title={userInfoById.nombre_completo} emailStudent={userInfoById.email_aprendiz} documentStudent={userInfoById.numero_documento_aprendiz} celStudent={userInfoById.celular_aprendiz} trainingProgram={userInfoById.nombre_programa_formacion} ficha={userInfoById.numero_ficha} academicLevel={userInfoById.nivel_formacion} trainingStage={userInfoById.etapa_formacion} modalitie={userInfoById.nombre_modalidad} finLectiva={userInfoById.fecha_fin_lectiva} inicioProductiva={userInfoById.fecha_inicio_practica} company={userInfoById.nombre_empresa} innmediateSuperior={userInfoById.nombre_jefe} workstation={userInfoById.cargo_jefe} emailSuperior={userInfoById.email_jefe} celSuperior={userInfoById.numero_contacto_jefe} arl={userInfoById.nombre_arl} />}
      <main className="flex flex-row min-h-screen">
        <Siderbar />
        <section className="relative grid flex-auto w-min grid-rows-3-10-75-15 ">
          <header className="grid place-items-center ">
            <Search searchFilter iconClick={handleIconClick} searchStudent={searchApprentices} />
          </header>
          {searchedApprentices.length > 0 && !error ? (
            <div className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-2 md:grid-cols-3">
              {searchedApprentices.map((apprentice, i) => (
                <Card cardUser shadow={'shadow-2xl'} marginLink={'mx-auto'} scale={'scale-90'} title={`${apprentice.nombre_completo}`} subtitle={apprentice.email_aprendiz} lione={apprentice.nombre_programa_formacio} litwo={apprentice.numero_ficha} key={i} userID={apprentice.id_aprendiz} roundedLink={'rounded-xl'} borderColor={'border-primary'} buttonText={'Más información'} link={'/home'} modalClicked={modalStudent} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-1 p-4 st2:grid-cols-1 st1:grid-cols-2 md:grid-cols-3">
              {error ? <h2 className="text-red-500">{error}</h2> : apprentices.map((apprentice, i) => <Card cardUser height={'h-[12.5rem] st2:h-[12.5rem] st1:h-[14rem] md:h-[14rem]'} shadow={'shadow-2xl'} marginLink={'mx-auto'} scale={'scale-90'} title={`${apprentice.nombre_completo}`} subtitle={apprentice.email_aprendiz} lione={apprentice.programa_formacion_inscripcion} litwo={apprentice.numero_ficha_inscripcion} key={i} userID={apprentice.id_aprendiz} roundedLink={'rounded-xl'} borderColor={'border-primary'} buttonText={'Más información'} isButton showModal modalClicked={modalStudent} />)}
              {apprentices.length === 0 && !error && searchedApprentices.length === 0 && (
                <>
                  <Skeleton width={300} height={200} style={{ marginBottom: '1rem', margin: '1.2em' }} />
                  <Skeleton width={300} height={200} style={{ marginBottom: '1rem', margin: '1.2em' }} />
                  <Skeleton width={300} height={200} style={{ marginBottom: '1rem', margin: '1.2em' }} />
                  <Skeleton width={300} height={200} style={{ marginBottom: '1rem', margin: '1.2em' }} />
                  <Skeleton width={300} height={200} style={{ marginBottom: '1rem', margin: '1.2em' }} />
                  <Skeleton width={300} height={200} style={{ marginBottom: '1rem', margin: '1.2em' }} />
                </>
              )}
            </div>
          )}
          <Footer />
        </section>
      </main>
    </>
  )
}

export { Student }
