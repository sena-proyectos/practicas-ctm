import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Modals } from '../Utils/Modals/Modals'
import { GetUsersById } from '../../api/httpRequest'
import Swal from 'sweetalert2'

const Card = ({ title, titleColor, description, buttonText, bgColor, link, scale, img = 'https://unavatar.io/iLestar', subtitle, shadow, lione, litwo, userID, cardUser = false, cardHome = false, cardVisits = false, alt = 'foto user', borderColor, roundedLink, info1, info2, icon, isButton = false, showModal }) => {
  const [mostrarModal, setMostrarModal] = useState(false)
  const [userInfo, setUserInfo] = useState()
  const [nombreCompleto, setNombreCompleto] = useState()

  const handleModal = () => {
    setMostrarModal(!mostrarModal)
  }

  const showInfoUser = async () => {
    try {
      const response = await GetUsersById(userID)
      const res = response.data.data[0]
      const nombre = response.data.data[0].nombre
      const apellido = response.data.data[0].apellido

      setNombreCompleto(`${nombre} ${apellido}`)
      setUserInfo(res)
    } catch (error) {
      Swal.fire({
        icon: 'info',
        title: 'ah ocurrido un error, por favor comuniquese con el administrador.'
      })
    }
    handleModal()
  }

  return (
    <>
      {mostrarModal && cardUser === true ? (
        <Modals
          closeModal={handleModal}
          bodyStudent
          title={nombreCompleto}
          emailStudent={userInfo.correo_electronico}
          documentStudent={userInfo.num_documento}
          celStudent={userInfo.num_celular}
          trainingProgram={'Análisis y Desarrollo de Software'}
          ficha={'2473196'}
          academicLevel={'Tecnología'}
          trainingStage={'Lectiva'}
          modalitie={'Contrato de Aprendizaje'}
          finLectiva={'05 Abril 2023'}
          inicioProductiva={'02 Mayo 2023'}
          company={'Servicio Nacional del Aprendizaje'}
          innmediateSuperior={'Richard Alexander Betancur Sierra'}
          workstation={'Instructor'}
          emailSuperior={'rbetancur@misena.edu.co'}
          celSuperior={'123456789'}
          arl={'Sura'}
        />
      ) : mostrarModal && cardVisits === true ? (
        <Modals closeModal={handleModal} bodyVisits title={'Visitas'} />
      ) : null}
      <div className={`${bgColor} bg-opacity-50 ${shadow} rounded-lg py-2 px-3 flex flex-col justify-center h-auto ${scale && 'scale-90'}`}>
        <header className={`${cardUser && 'flex flex-row'}`}>
          {cardUser && <img className="w-[4.5rem] h-[4.5rem] rounded-full" src={img} alt={alt} />}
          <div className={`${cardUser && 'flex flex-col flex-auto w-min py-3'}`}>
            <h2 className={`text-${titleColor} text-center font-semibold text-lg mb-1 break-words `}>{title}</h2>
            <h3 className="text-center font-medium text-xs break-all">{subtitle}</h3>
          </div>
        </header>
        <div className="w-4/5 mx-auto pt-2">
          {cardVisits && (
            <section className="flex flex-col">
              <span className="text-center text-sm py-1">
                {info1} - {info2}
              </span>
              <section className="font-medium flex items-center justify-center gap-2">
                <span>Estado</span>
                {icon}
              </section>
            </section>
          )}
          {(cardHome || cardVisits) && <p className="text-center text-sm">{description}</p>}
          {cardUser && (
            <>
              <section className="flex flex-row justify-between pb-1">
                <span className="font-semibold">Programa de Formación</span>
                <span>{lione}</span>
              </section>
              <section className="flex flex-row justify-between">
                <span className="font-semibold">Ficha</span>
                <span>{litwo}</span>
              </section>
            </>
          )}
        </div>
        {link && (
          <Link to={link} className={`${roundedLink} border-1 ${borderColor} p-1.5 w-fit justify-self-end mx-auto mt-4 font-semibold text-xs`}>
            {buttonText}
          </Link>
        )}
        {isButton && showModal && (
          <button className={`${roundedLink} border-1 ${borderColor} p-1.5 w-fit justify-self-end mx-auto mt-4 font-semibold text-xs`} onClick={showInfoUser}>
            {buttonText}
          </button>
        )}
      </div>
    </>
  )
}

export { Card }
