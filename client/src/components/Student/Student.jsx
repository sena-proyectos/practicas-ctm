import { useState, useEffect } from 'react'
import { GetUsersHttp, GetUserByName, GetUsersById } from '../../api/httpRequest'
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
      const response = await GetUsersById(userID)
      const res = response.data.data[0]

      const nombre = res.nombre
      const apellido = res.apellido
      setNombreCompleto(`${nombre} ${apellido}`)
      setInfoUserById(res)
    } catch (error) {
      console.log('ah ocurrido un error al mostrar los datos del usuario')
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
    const token = Cookies.get('token')
    if (!token) window.location.href = '/'

    const getApprentices = async () => {
      try {
        const response = await GetUsersHttp()
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
      {infoStudent && <Modals closeModal={handleModalInfo} bodyStudent title={nombreCompleto} emailStudent={userInfoById.correo_electronico} documentStudent={userInfoById.num_documento} celStudent={userInfoById.num_celular} trainingProgram={'Análisis y Desarrollo de Software'} ficha={'2473196'} academicLevel={'Tecnología'} trainingStage={'Lectiva'} modalitie={'Contrato de Aprendizaje'} finLectiva={'05 Abril 2023'} inicioProductiva={'02 Mayo 2023'} company={'Servicio Nacional del Aprendizaje'} innmediateSuperior={'Richard Alexander Betancur Sierra'} workstation={'Instructor'} emailSuperior={'rbetancur@misena.edu.co'} celSuperior={'123456789'} arl={'Sura'} />}
      <main className="flex min-h-screen flex-row">
        <Siderbar />
        <section className="relative grid w-min flex-auto grid-rows-3-10-75-15">
          <header className="grid place-items-center">
            <Search searchFilter iconClick={handleIconClick} searchStudent={searchApprentices} />
          </header>
          {searchedApprentices.length > 0 && !error ? (
            <div className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-2 md:grid-cols-3">
              {searchedApprentices.map((apprentice, i) => (
                <Card cardUser shadow={'shadow-2xl'} marginLink={'mx-auto'} scale={'scale-90'} title={`${apprentice.nombre} ${apprentice.apellido}`} subtitle={apprentice.correo_electronico} lione={apprentice.programa_formacion_inscripcion} litwo={apprentice.numero_ficha_inscripcion} key={i} userID={apprentice.id_usuario} roundedLink={'rounded-xl'} borderColor={'border-primary'} buttonText={'Más información'} link={'/home'} modalClicked={modalStudent} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-2 md:grid-cols-3">
              {error ? <h2 className="text-red-500">{error}</h2> : apprentices.map((apprentice, i) => <Card cardUser shadow={'shadow-2xl'} marginLink={'mx-auto'} scale={'scale-90'} title={`${apprentice.nombre} ${apprentice.apellido}`} subtitle={apprentice.correo_electron} lione={apprentice.programa_formacion_inscripcion} litwo={apprentice.numero_ficha_inscripcion} key={i} userID={apprentice.id_usuario} roundedLink={'rounded-xl'} borderColor={'border-primary'} buttonText={'Más información'} isButton showModal modalClicked={modalStudent} />)}
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
