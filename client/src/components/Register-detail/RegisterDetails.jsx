import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Slide, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// icons
import { LuSave } from 'react-icons/lu'
import { IoReturnDownBack } from 'react-icons/io5'
import { PiCheckCircleBold, PiXCircleBold } from 'react-icons/pi'

// Components
import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'
import { Button } from '../Utils/Button/Button'
import { Select } from '../Utils/Select/Select'
import { keysRoles } from '../../import/staticData'

import { getInscriptionById, getInscriptionDetails, getAvalById, getUserById, inscriptionDetailsUpdate, GetClassByNumber, getModalitiesById } from '../../api/httpRequest'
import { AiOutlineFullscreen } from 'react-icons/ai'
import { checkApprovementData } from '../../validation/approvementValidation'
import Cookies from 'js-cookie'
import decode from 'jwt-decode'
import { Card3D } from '../Utils/Card/Card'

export const RegisterDetails = () => {
  const { id } = useParams()
  const idRol = Number(localStorage.getItem('idRol'))
  const [inscriptionAprendiz, setInscriptionAprendiz] = useState([])
  const [details, setDetails] = useState({})

  useEffect(() => {
    getInscriptionAprendiz(id)
    getDetallesInscripcion(id)
  }, [id])

  const getSelectedTab = () => {
    const savedTab = JSON.parse(sessionStorage.getItem('currentDetailTab'))
    if (!savedTab) return 'infoAprendiz'
    if (savedTab.paramLink !== id) return 'infoAprendiz'
    return savedTab.lastTab
  }

  const [selectedTab, setSelectedTab] = useState(getSelectedTab)

  useEffect(() => {
    const payload = JSON.stringify({ lastTab: selectedTab, paramLink: id })
    sessionStorage.setItem('currentDetailTab', payload)
  }, [selectedTab])

  const getInscriptionAprendiz = async (id) => {
    try {
      const response = await getInscriptionById(id)
      const res = response.data.data
      setInscriptionAprendiz(res)
    } catch (error) {
      console.log('Ha ocurrido un error al mostrar los datos del usuario')
    }
  }

  const getDetallesInscripcion = async (id) => {
    try {
      const response = await getInscriptionDetails(id)
      const res = response.data.data
      setDetails({ documentosId: res[0].id_detalle_inscripcion, rapsId: res[1].id_detalle_inscripcion, funcionesId: res[2].id_detalle_inscripcion, avalId: res[3].id_detalle_inscripcion })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className='flex flex-row min-h-screen bg-whitesmoke'>
      <ToastContainer transition={Slide} />
      <Siderbar />
      <section className='relative grid flex-auto gap-2 w-min grid-rows-3-10-75-15'>
        <header className='border-b-1 w-[70%] mx-auto border-b-zinc-300 h-[9vh]'>
          <ul className='flex flex-row items-center justify-around h-full'>
            <li className={`text-sm font-light cursor-pointer hover:text-purple-800 ${selectedTab === 'infoAprendiz' ? 'font-medium text-purple-800' : ''}`} onClick={() => setSelectedTab('infoAprendiz')}>
              Info. Aprendiz
            </li>
            <li className={`text-sm font-light cursor-pointer hover:text-purple-800 ${selectedTab === 'infoEmpresa' ? 'font-medium text-purple-800' : ''}`} onClick={() => setSelectedTab('infoEmpresa')}>
              Info. Empresa
            </li>
            {(idRol === Number(keysRoles[0]) || idRol === Number(keysRoles[1]) || idRol === Number(keysRoles[3])) && (
              <li className={`text-sm font-light cursor-pointer ${selectedTab === 'raps' ? 'font-medium text-purple-800' : ''} hover:text-purple-800`} onClick={() => setSelectedTab('raps')}>
                RAPS
              </li>
            )}
            {(idRol === Number(keysRoles[0]) || idRol === Number(keysRoles[1])) && (
              <li className={`text-sm font-light cursor-pointer hover:text-purple-800 ${selectedTab === 'documentos' ? 'font-medium text-purple-800' : ''}`} onClick={() => setSelectedTab('documentos')}>
                Documentos
              </li>
            )}
            {(idRol === Number(keysRoles[0]) || idRol === Number(keysRoles[1])) && (
              <li className={`text-sm font-light cursor-pointer ${selectedTab === 'coordinador' ? 'font-medium text-purple-800' : ''} hover:text-purple-800`} onClick={() => setSelectedTab('coordinador')}>
                Coordinador
              </li>
            )}
          </ul>
        </header>
        <section>
          <div className={`${selectedTab === 'infoAprendiz' ? 'visible' : 'hidden'}`}>
            <InfoAprendiz inscriptionAprendiz={inscriptionAprendiz} />
          </div>
          <div className={`${selectedTab === 'infoEmpresa' ? 'visible' : 'hidden'}`}>
            <InfoEmpresa inscriptionAprendiz={inscriptionAprendiz} />
          </div>
          <div className={`${selectedTab === 'documentos' ? 'visible h-full' : 'hidden'}`}>
            <Docs idRol={idRol} avalDocumentos={details.documentosId} avalFunciones={details.funcionesId} />
          </div>
          <div className={`${selectedTab === 'raps' ? 'visible' : 'hidden'}`}>
            <RAPS idRol={idRol} avalRaps={details.rapsId} />
          </div>
          <div className={`${selectedTab === 'coordinador' ? 'visible' : 'hidden'}`}>
            <Coordinador idRol={idRol} avalCoordinador={details.avalId} />
          </div>

          <div className='absolute top-4 left-8'>
            <Link to='/registros' className='flex items-center gap-2 text-sm font-medium rounded-full text-white bg-slate-600 px-4 py-[2px] transition-colors'>
              <IoReturnDownBack />
              Salir
            </Link>
          </div>
        </section>
        <Footer />
      </section>
    </main>
  )
}

const InfoAprendiz = ({ inscriptionAprendiz }) => {
  return (
    <section className={`w-[85%] p-2 mx-auto`}>
      {inscriptionAprendiz.map((x) => {
        return (
          <section className='flex flex-col gap-4' key={x.id_inscripcion}>
            <div>
              <h2 className='text-lg font-semibold text-center uppercase'>{`${x.nombre_inscripcion} ${x.apellido_inscripcion}`}</h2>
              <h5 className='font-light text-center'>{x.email_inscripcion}</h5>
              <h5 className='font-light text-center'>{`${x.tipo_documento_inscripcion} ${x.documento_inscripcion}`}</h5>
              <p className='font-light text-center'>{x.inscripcion_celular}</p>
            </div>
            <hr className='border-[1px] border-slate-300' />
            <h2 className='text-lg font-medium text-center'>Información Acádemica</h2>
            <div className='grid grid-cols-2 gap-2'>
              <div className='flex flex-col gap-2'>
                <article className='flex flex-row gap-2'>
                  <h4 className='font-medium'>Tipo Modalidad:</h4>
                  <p>{x.modalidad_inscripcion === '1' ? 'Pasantías' : x.modalidad_inscripcion === '2' ? 'Contrato de aprendizaje' : x.modalidad_inscripcion === '3' ? 'Proyecto Productivo' : x.modalidad_inscripcion === '4' ? 'Monitoría' : x.modalidad_inscripcion === '5' ? 'Vinculación laboral' : null}</p>
                </article>
                <article className='flex flex-row gap-2'>
                  <h4 className='font-medium'>Fin Lectiva:</h4>
                  <p>{x.fecha_fin_lectiva_inscripcion}</p>
                </article>
                <article className='flex flex-row gap-2'>
                  <h4 className='font-medium'>Etapa Formación:</h4>
                  <p>{x.etapa_actual_inscripcion}</p>
                </article>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-right'>{x.numero_ficha_inscripcion}</p>
                <p className='text-right'>{x.nivel_formacion_inscripcion}</p>
                <p className='text-right'>{x.nombre_programa_inscripcion}</p>
              </div>
            </div>
            <hr className='border-[1px] border-slate-300' />
            <h2 className='text-lg font-medium text-center'>Responsable de la Inscripción</h2>
            <div className='flex flex-row justify-around gap-9'>
              <article className='flex flex-row gap-2'>
                <h4 className='font-medium'>Fecha Creación:</h4>
                <p>{x.fecha_creacion.split('T')[0]}</p>
              </article>
              <article className='flex flex-row gap-2'>
                <h4 className='font-medium'>Encargado:</h4>
                <p>{x.responsable_inscripcion}</p>
              </article>
            </div>
          </section>
        )
      })}
    </section>
  )
}

const InfoEmpresa = ({ inscriptionAprendiz }) => {
  return (
    <section className={`w-[85%] p-2 mx-auto`}>
      {inscriptionAprendiz.map((x) => {
        return (
          <section className='flex flex-col gap-3' key={x.id_inscripcion}>
            <div>
              <h2 className='text-lg font-semibold text-center uppercase'>{`${x.nombre_inscripcion} ${x.apellido_inscripcion}`}</h2>
              <h5 className='font-light text-center'>{x.email_inscripcion}</h5>
              <h5 className='font-light text-center'>{`${x.tipo_documento_inscripcion} ${x.documento_inscripcion}`}</h5>
              <p className='font-light text-center'>{x.inscripcion_celular}</p>
            </div>
            <hr className='border-[1px] border-slate-300' />
            <h2 className='text-lg font-medium text-center'>Información Empresa</h2>
            <div className={`${!x.nit_empresa_inscripcion ? 'flex flex-col' : 'grid grid-cols-2 gap-2'}`}>
              <div className={`flex ${!x.nit_empresa_inscripcion ? 'flex-row justify-between' : ' flex-col gap-3'}`}>
                <div className={`${!x.nit_empresa_inscripcion ? 'hidden' : 'flex flex-row justify-start gap-5'}`}>
                  <p className='text-left'>{x.nit_empresa_inscripcion}</p>
                  <p className='text-left'>{x.nombre_empresa_inscripcion}</p>
                </div>
                <article className='flex flex-row gap-2'>
                  <h4 className='font-medium'>¿Quién asume el ARL?</h4>
                  <p>{x.arl}</p>
                </article>
                <article className='flex flex-row gap-2'>
                  <h4 className='font-medium'>Observaciones</h4>
                  <p>{x.observaciones}</p>
                </article>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-right'>{x.nombre_jefe_empresa_inscripcion}</p>
                <p className='text-right'>{x.cargo_jefe_empresa_inscripcion}</p>
                <p className='text-right'>{x.telefono_jefe_empresa_inscripcion}</p>
                <p className='text-right'>{x.email_jefe_empresa_inscripcion}</p>
              </div>
            </div>
            <hr className='border-[1px] border-slate-300' />
            <h2 className='text-lg font-medium text-center'>Responsable de la Inscripción</h2>
            <div className='flex flex-row justify-around gap-9'>
              <article className='flex flex-row gap-2'>
                <h4 className='font-medium'>Fecha Creación:</h4>
                <p>{x.fecha_creacion.split('T')[0]}</p>
              </article>
              <article className='flex flex-row gap-2'>
                <h4 className='font-medium'>Encargado:</h4>
                <p>{x.responsable_inscripcion}</p>
              </article>
            </div>
          </section>
        )
      })}
    </section>
  )
}

const Coordinador = ({ idRol, avalCoordinador }) => {
  const { id } = useParams()
  const [avalInfo, setAvalInfo] = useState([])
  const [dataAprendiz, setDataAprendiz] = useState([])
  const [dataEmpresa, setDataEmpresa] = useState([])
  const [idUser, setIdUser] = useState(0)
  const [user, setUser] = useState(0)
  const prevUserIdRef = useRef()

  useEffect(() => {
    prevUserIdRef.current = idUser
  }, [idUser])
  useEffect(() => {
    if (prevUserIdRef.current !== 0) {
      // Realiza la lógica que necesitas cuando idUser cambia después de la primera vez.
      getUser(idUser)
    }
  }, [idUser])
  useEffect(() => {
    if (avalCoordinador) fetchRaps()
  }, [avalCoordinador])

  useEffect(() => {
    const fetchData = async () => {
      await getInscriptionAprendiz(id)
      await getDetallesInscripcion(id)
    }
    fetchData()
  }, [id],)

  const getInscriptionAprendiz = async (id) => {
    try {
      const response = await getInscriptionById(id)
      const res = response.data.data
      setDataAprendiz(res)
    } catch (error) {
      console.log('Ha ocurrido un error al mostrar los datos del usuario')
    }
  }
  const getDetallesInscripcion = async (id) => {
    try {
      const response = await getInscriptionDetails(id)
      const res = response.data.data
      const res2 = response.data.data[1].responsable_aval
      console.log(res)
      console.log(res2)
      setDataEmpresa(res)
      setIdUser(res2)
    } catch (error) {
      console.log(error)
    }
  }
  const getUser = async (id) => {
    const response = await getUserById(id)
    const res = response.data.data[0].nombres_usuario
    const res2 = response.data.data[0].apellidos_usuario
    console.log(res)
    setUser(res + ' ' + res2)
  }

  const fetchRaps = async () => {
    const res = await getAvalById(avalCoordinador)
    const { data } = res.data
    setAvalInfo(data)
  }

  const option = [
    { value: 'Sergio Soto Henao', key: 'Sergio Soto Henao' },
    { value: 'Marianela Henao Atehortúa', key: 'Marianela Henao Atehortúa' },
    { value: 'Jaime León Vergara Areiza', key: 'Jaime León Vergara Areiza' },
    { value: 'Mauro Isaías Arango Vanegas', key: 'Mauro Isaías Arango Vanegas' }
  ]
  return (
    <section className={`flex flex-col   w-[95%] gap-2 p-2 mx-auto mt-2 h-auto`}>
      <section className='text-md'>
        {dataAprendiz.map((item) => (
          <div key={item.id_inscripcion} className='grid grid-cols-2'>
            <div className='text-center'>
              <h1 className='text-center'>INFORMACION DEL APRENDIZ </h1>
              <div className='my-11'>
                <p className='my-3'>
                  {item.nombre_inscripcion} {item.apellido_inscripcion}
                </p>
                <p className='my-3'>{item.email_inscripcion}</p>
                <p className='my-3'>
                  {item.tipo_documento_inscripcion}: {item.documento_inscripcion}
                </p>
                <p className='my-3'>{item.modalidad_inscripcion === '1' ? 'Pasantías' : item.modalidad_inscripcion === '2' ? 'Contrato de aprendizaje' : item.modalidad_inscripcion === '3' ? 'Proyecto Productivo' : item.modalidad_inscripcion === '4' ? 'Monitoría' : item.modalidad_inscripcion === '5' ? 'Vinculación laboral' : null}</p>
              </div>
            </div>
            <div className='border-l-2 border-violet-800 px-4 '>
              <h1 className='text-center'>AVALES</h1>
              <div className='flex'>
                <div className='w-full p-4 overflow-y-auto h-60 justify-center justify-items-center flex'>
                  <div className='w-3/4 mx-10'>
                    {dataEmpresa.map((item) => (
                      <div className='my-4 justify-center justify-items-center' key={item.id_detalle_inscripcion}>
                        <Card3D title={item.descripcion_detalle} header={item.estado_aval} item1={item.observaciones} item2={user} item1text={'Observaciones'} item2text={'Responsable del aval'} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
      <section></section>
      <div className={` w-[95%] mx-auto`}>
        {avalInfo.map((aval) => {
          return (
            <form action='' className='flex flex-col gap-4 ' key={aval.id_detalle_inscripcion}>
              <div>
                <label htmlFor='' className='text-sm font-light'>
                  Coordinador Asignado
                </label>
                <Select placeholder='Coordinador' rounded='rounded-lg' py='py-1' hoverColor='hover:bg-gray' hoverTextColor='hover:text-black' textSize='text-sm' options={option} shadow={'shadow-md shadow-slate-400'} border='none' selectedColor={'bg-slate-500'} />
              </div>
              {idRol === Number(keysRoles[1]) ? (
                <div className='flex flex-row gap-2 place-self-center'>
                  <Button bg='bg-primary' px='px-2' font='font-medium' textSize='text-sm' py='py-1' rounded='rounded-xl' inline>
                    <PiCheckCircleBold className='text-xl' /> Sí
                  </Button>
                  <Button bg='bg-red-500' px='px-2' font='font-medium' textSize='text-sm' py='py-1' rounded='rounded-xl' inline>
                    <PiXCircleBold className='text-xl' /> No
                  </Button>
                </div>
              ) : (
                <h5 className={`text-sm font-medium text-center ${aval.estado_aval === 'Pendiente' ? 'text-slate-600' : aval.estado_aval === 'Rechazado' ? 'text-red-500' : aval.estado_aval === 'Aprobado' ? 'text-green-500' : null}`}>{aval.estado_aval === 'Pendiente' ? 'La solicitud esta siendo procesada por el coordinador' : aval.estado_aval === 'Rechazado' ? 'Rechazado' : aval.estado_aval === 'Aprobado' ? 'Aprobado' : null}</h5>
              )}
              <div>
                <label htmlFor='' className='text-sm font-light'>
                  Observaciones
                </label>
                <textarea id='editor' defaultValue={aval.observaciones} rows='3' className='block w-full h-[5rem] px-3 py-2 overflow-y-auto text-sm text-black bg-white shadow-md border-t-[0.5px] border-slate-200 resize-none focus:text-gray-900 rounded-xl shadow-slate-400 focus:bg-white focus:outline-none placeholder:text-slate-400 placeholder:font-light' placeholder='Deja una observación' disabled />
              </div>
              <Button bg={'bg-primary'} px={'px-3'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'shadow-lg'} inline>
                <LuSave /> Guardar
              </Button>
            </form>
          )
        })}
      </div>
    </section>
  )
}

const Docs = ({ idRol, avalDocumentos, avalFunciones }) => {
  const iFrameRef = useRef(null)
  const [avalInfoFunciones, setAvalInfoFunciones] = useState([])

  const [nameResponsableFunciones, setNameResponsableFunciones] = useState('')

  const [notify, setNotify] = useState(false)

  useEffect(() => {
    if (notify) {
      toast.success('Se ha rechazado correctamente', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        className: 'text-sm'
      })
    }
    setNotify(false)
  }, [notify])

  const fetchDataFunciones = async () => {
    const res = await getAvalById(avalFunciones)
    const { data } = res.data
    const response = await getUserById(data[0].responsable_aval)
    const { nombres_usuario, apellidos_usuario } = response.data.data[0]
    const fullName = `${nombres_usuario} ${apellidos_usuario}`
    setNameResponsableFunciones(fullName)
    setAvalInfoFunciones(data[0])
  }

  const handleFullScreenIFrame = () => {
    const iframe = iFrameRef.current
    if (!iframe) return
    if (iframe.requestFullscreen) return iframe.requestFullscreen()
    if (iframe.mozRequestFullScreen) return iframe.mozRequestFullScreen()
    if (iframe.webkitRequestFullscreen) return iframe.webkitRequestFullscreen()
    if (iframe.msRequestFullscreen) return iframe.msRequestFullscreen()
  }

  useEffect(() => {
    if (avalFunciones) fetchDataFunciones()
  }, [avalFunciones])

  return (
    <>
      <section className='grid grid-cols-2 w-[95%] h-full gap-3 mx-auto'>
        <section className='flex flex-col gap-3'>
          <header className='grid grid-cols-2'>
            <section className='flex items-center'>
              <h2>Documentación </h2>
            </section>
            <section className='grid items-center justify-end'>
              <Button textSize='text-base' bg='bg-gray-400' px='px-[2px]' py='py-[2px]' rounded='rounded-2xl' hover hoverConfig='bg-gray-600' type='button' onClick={handleFullScreenIFrame}>
                <AiOutlineFullscreen />
              </Button>
            </section>
          </header>
          <section className='flex flex-col justify-center gap-3 h-5/6'>
            <iframe src='/Acta_29_de_Agosto_2023.pdf' className='w-full h-full' loading='lazy' allowFullScreen ref={iFrameRef}></iframe>
          </section>
        </section>
        <section className='flex flex-col w-[95%] gap-6 mx-auto'>
          <FullDocsApproval idRol={idRol} avalDocumentos={avalDocumentos} />
          <hr className='w-3/4 mx-auto border-[1px] text-neutral-400' />
          <div className='w-[95%] mx-auto'>
            <form action='' className='flex flex-col gap-2'>
              <section className='grid items-center grid-cols-2 gap-2'>
                <section className='flex flex-col gap-1'>
                  <span className='text-sm font-semibold'>
                    Encargado <span className='text-red-800'>(Funciones)</span>
                  </span>
                  <span className='text-sm font-medium'>Fecha Registro: 31 Agosto 23</span>
                </section>
                <section>
                  <input type='text' defaultValue={nameResponsableFunciones} className='w-full py-1 pl-2 pr-3 text-sm text-black bg-white shadow-md border-t-[0.5px] border-slate-200 shadow-slate-400 focus:text-gray-900 rounded-lg focus:outline-none placeholder:text-slate-400' autoComplete='on' />
                </section>
              </section>
              <div>
                <label htmlFor='observations' className='text-sm font-light'>
                  Observaciones
                </label>
                <textarea name='observations' id='editor' defaultValue={avalInfoFunciones.observaciones} rows='3' className='block w-full h-[4.5rem] px-3 py-2 overflow-y-auto text-sm text-black bg-white shadow-md border-t-[0.5px] border-slate-200 resize-none focus:text-gray-900 rounded-xl shadow-slate-400 focus:bg-white focus:outline-none placeholder:text-slate-400 placeholder:font-light' placeholder='Deja una observación' />
              </div>
              <div className='grid grid-cols-2 gap-2 relative top-1.5 items-center'>
                {idRol === Number(keysRoles[2]) ? (
                  <div className='flex flex-row gap-2 place-self-center'>
                    <Button value={'Sí'} bg={'bg-primary'} px={'px-2'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} icon={<PiCheckCircleBold className='text-xl' />} />
                    <Button value={'No'} bg={'bg-red-500'} px={'px-2'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} icon={<PiXCircleBold className='text-xl' />} />
                  </div>
                ) : (
                  <h5 className={`text-sm font-medium text-center ${avalInfoFunciones.estado_aval === 'Pendiente' ? 'text-slate-600' : avalInfoFunciones.estado_aval === 'Rechazado' ? 'text-red-500' : avalInfoFunciones.estado_aval === 'Aprobado' ? 'text-green-500' : null}`}>{avalInfoFunciones.estado_aval}</h5>
                )}
                {(idRol === Number(keysRoles[2]) || idRol === Number(keysRoles[0])) && (
                  <Button px={'px-3'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'lg'} isDisabled inline>
                    <LuSave />
                    Guardar
                  </Button>
                )}
              </div>
            </form>
          </div>
        </section>
      </section>
    </>
  )
}

const FullDocsApproval = ({ idRol, avalDocumentos }) => {
  const fullDocsRef = useRef(null)
  const descriptionRef = useRef(null)

  const [selectedApproveButton, setSelectedApproveButton] = useState(null)
  const [disableSubmitButton, setDisableSubmitButton] = useState(true)
  const [avalInfoDocumentos, setAvalInfoDocumentos] = useState([])
  const [nameResponsableDocumentos, setNameResponsableDocumentos] = useState('')
  const { id } = useParams()
  const [modalidad, setModalidad] = useState([])
  const [idModalidad, setIdModalidad] = useState(0)

  const handleUseState = (setState, value) => setState(value)

  const fetchDataDocuments = async () => {
    const res  = await getAvalById(avalDocumentos)
    const { data } = res.data
    const response = await getUserById(data[0].responsable_aval)
    const { nombres_usuario, apellidos_usuario } = response.data.data[0]
    const fullName = `${nombres_usuario} ${apellidos_usuario}`
    setNameResponsableDocumentos(fullName)
    setAvalInfoDocumentos(data[0])
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInscriptionById(id)
        const res = response.data.data[0].modalidad_inscripcion
        setIdModalidad(res)
        // Llamar a getCourses con el valor actualizado de ficha
        await getModalities(res)
        if (avalDocumentos) fetchDataDocuments()
      } catch (error) {
        console.log('Ha ocurrido un error al mostrar los datos del usuario')
      }
    }

    fetchData() // Llamar a fetchData cuando el componente se monte o cuando id cambie
  }, [id, avalDocumentos])


  const getModalities = async () => {
    const res = await getModalitiesById(idModalidad)
    console.log(res.data.data)
    setModalidad(res.data.data)
  }
  const handleSubmitButton = () => {
    if (!selectedApproveButton) return
    if (descriptionRef.current.value.length === 0) {
      setDisableSubmitButton(true)
      return
    }
    handleUseState(setDisableSubmitButton, false)
  }

  const selectButtonToSubmit = (value) => {
    setSelectedApproveButton(value)
    if (descriptionRef.current.value.length === 0 || !value) {
      setDisableSubmitButton(true)
      return
    }
    handleUseState(setDisableSubmitButton, false)
  }

  const handleFullDocsForm = async (e) => {
    e.preventDefault()
    const approveOptions = { Si: 'Si', No: 'No' }

    const formData = new FormData(fullDocsRef.current)
    formData.append('approveOption', approveOptions[selectedApproveButton])
    const observations = formData.get('fullDocsObservations')
    const approveOption = formData.get('approveOption')
    try {
      await checkApprovementData({ observations, approveOption })
      const loadingToast = toast.loading('Enviando...')
      if (selectedApproveButton === approveOptions.Si) return acceptFullDocsApprove({ observations, approveOption, avalDocumentos }, loadingToast)
      if (selectedApproveButton === approveOptions.No) return denyFullDocsApprove({ observations, approveOption, avalDocumentos })
    } catch (err) {
      console.log(err)
      if (toast.isActive('error-full-docs')) return
      toast.error('Los campos son incorrectos, corríjalos.', {
        toastId: 'error-full-docs',
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'colored'
      })
    }
  }

  const acceptFullDocsApprove = async (payload, toastId) => {
    const estado_aval = { Si: 'Aprobado', No: 'Rechazado' }
    const id = payload.avalDocumentos
    const cookie = Cookies.get('token')
    const { id_usuario: responsable } = decode(cookie).data.user

    const data = { estado_aval: estado_aval[payload.approveOption], observaciones: payload.observations, responsable_aval: responsable }
    try {
      await inscriptionDetailsUpdate(id, data)
      toast.update(toastId, { render: '¡Aval aceptado correctamente!', isLoading: false, type: 'success', position: 'top-right', autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, theme: 'colored', closeButton: true, className: 'text-base' })
      selectButtonToSubmit(null)
    } catch (error) {
      throw new Error(error)
    }
  }

  const denyFullDocsApprove = (payload) => {
    console.log(payload)
  }

  return (
    <div className='w-[95%] mx-auto'>
      <form className='flex flex-col gap-2' ref={fullDocsRef} onSubmit={handleFullDocsForm}>
        <section className='grid items-center grid-cols-2 gap-2'>
          <section className='flex flex-col'>
            <span className='text-sm font-semibold'>
              Líder Prácticas <span className='text-red-800'>(Documentos)</span>
            </span>
            <span className='text-sm font-medium'>Fecha Registro: 31 Agosto 23</span>
            {modalidad.map((item) => (
              <div key={item.id_modalidad}>
                <span className='text-sm font-medium'>Modalidad: {item.nombre_modalidad}</span>
              </div>
            ))}
          </section>
          <div className='flex py-1 rounded-lg cursor-default w-fit bg-gray place-self-center'>
            <h3 className='px-2 text-sm whitespace-nowrap'>{nameResponsableDocumentos}</h3>
          </div>
        </section>
        <div>
          <label htmlFor='fullDocsObservations' className='text-sm font-light'>
            Observaciones <span className='font-bold text-red-500'>*</span>
          </label>
          <textarea name='fullDocsObservations' id='editor' defaultValue={avalInfoDocumentos.observaciones} rows='3' className='block w-full h-[4.5rem] px-3 py-2 overflow-y-auto text-sm text-black bg-white shadow-md border-t-[0.5px] border-slate-200 resize-none focus:text-gray-900 rounded-xl shadow-slate-400 focus:bg-white focus:outline-none placeholder:text-slate-400 placeholder:font-light' placeholder='Deja una observación' onInput={handleSubmitButton} ref={descriptionRef} />
        </div>
        <div className='grid grid-cols-2 gap-2 relative top-1.5 items-center'>
          {idRol === Number(keysRoles[0]) ? (
            <div className='flex flex-row gap-2 place-self-center'>
              {!selectedApproveButton ? (
                <>
                  <Button name='confirm' type='button' bg={'bg-primary'} px={'px-2'} hover hoverConfig='bg-[#287500]' font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} inline onClick={() => selectButtonToSubmit('Si')}>
                    <PiCheckCircleBold className='text-xl' /> Sí
                  </Button>
                  <Button name='deny' type='button' bg={'bg-red-500'} px={'px-2'} hover hoverConfig='bg-red-700' font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow='2xl' inline onClick={() => selectButtonToSubmit('No')}>
                    <PiXCircleBold className='text-xl' /> No
                  </Button>
                </>
              ) : selectedApproveButton === 'No' ? (
                <>
                  <Button name='confirm' type='button' bg='bg-slate-500' px={'px-2'} hover font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow='2xl' onClick={() => selectButtonToSubmit('Si')} inline>
                    <PiCheckCircleBold className='text-xl' /> Sí
                  </Button>
                  <Button name='deny' type='button' bg={'bg-red-500'} hover hoverConfig='bg-red-700' px={'px-2'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow='2xl' inline onClick={() => selectButtonToSubmit(null)}>
                    <PiXCircleBold className='text-xl' /> No
                  </Button>
                </>
              ) : (
                <>
                  <Button name='confirm' type='button' bg={'bg-primary'} px={'px-2'} hover hoverConfig='bg-[#287500]' font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} inline onClick={() => selectButtonToSubmit(null)}>
                    <PiCheckCircleBold className='text-xl' /> Sí
                  </Button>
                  <Button name='deny' type='button' bg='bg-slate-500' px={'px-2'} hover font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow='2xl' inline onClick={() => selectButtonToSubmit('No')}>
                    <PiXCircleBold className='text-xl' /> No
                  </Button>
                </>
              )}
            </div>
          ) : (
            <h5 className={`text-sm font-medium text-center ${avalInfoDocumentos.estado_aval === 'Pendiente' ? 'text-slate-600' : avalInfoDocumentos.estado_aval === 'Rechazado' ? 'text-red-500' : avalInfoDocumentos.estado_aval === 'Aprobado' ? 'text-green-500' : null}`}>{avalInfoDocumentos.estado_aval}</h5>
          )}
          {idRol === Number(keysRoles[0]) &&
            (disableSubmitButton ? (
              <Button px={'px-3'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'lg'} isDisabled inline>
                <LuSave />
                Guardar
              </Button>
            ) : (
              <Button bg={'bg-primary'} px={'px-3'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'lg'} inline>
                <LuSave />
                Guardar
              </Button>
            ))}
        </div>
      </form>
    </div>
  )
}

const RAPS = ({ idRol, avalRaps }) => {
  const [avalInfo, setAvalInfo] = useState({})
  const descriptionRef = useRef(null)
  const [nameResponsable, setNameResponsable] = useState('')
  const [selectedApproveButton, setSelectedApproveButton] = useState(null)
  const [disableSubmitButton, setDisableSubmitButton] = useState(true)

  const handleUseState = (setState, value) => setState(value)

  const handleSubmitButton = () => {
    if (!selectedApproveButton) return
    if (descriptionRef.current.value.length === 0) {
      setDisableSubmitButton(true)
      return
    }
    handleUseState(setDisableSubmitButton, false)
  }

  const selectButtonToSubmit = (value) => {
    setSelectedApproveButton(value)
    if (descriptionRef.current.value.length === 0 || !value) {
      setDisableSubmitButton(true)
      return
    }
    handleUseState(setDisableSubmitButton, false)
  }

  const fetchRaps = async () => {
    const res = await getAvalById(avalRaps)
    const { data } = res.data
    const response = await getUserById(data[0].responsable_aval)
    const { nombres_usuario, apellidos_usuario } = response.data.data[0]
    const fullName = `${nombres_usuario} ${apellidos_usuario}`
    setNameResponsable(fullName)
    setAvalInfo(data[0])
  }
  const { id } = useParams()
  const [courses, setCourses] = useState([])
  const [ficha, setFicha] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInscriptionById(id)
        const res = response.data.data[0].numero_ficha_inscripcion
        setFicha(res)
        // Llamar a getCourses con el valor actualizado de ficha
        if(ficha !== 0) {
          await getCourses(res)
        }
        if (avalRaps) fetchRaps()
      } catch (error) {
        console.log('Ha ocurrido un error al mostrar los datos del usuario')
      }
    }

    fetchData() // Llamar a fetchData cuando el componente se monte o cuando id cambie
  }, [id, avalRaps])

  const getCourses = async () => {
    try {
      const response = await GetClassByNumber(ficha)
      const { data } = response.data
      setCourses(data)
    } catch (error) {
      throw new Error(error)
    }
  }
  return (
    <section className='grid grid-cols-2 w-[95%] h-[70vh] gap-3 mx-auto'>
      <section className='h-'>
        <h2>RAPS</h2>
        <section>
          {courses.map((item) => (
            <div key={item.id_ficha}>
              <h1 className='text-center my-2'>Fichas</h1>
              <div className='text-center'>
                <p className='my-2'>{item.numero_ficha}</p>
                <p className='my-2'>{item.id_nivel_formacion}</p>
                <p className='my-2'>{item.nombre_programa_formacion}</p>
                <p className='my-2'>Lider de ficha: {item.id_instructor_lider}</p>
                <p className='my-2'>Lider de seguimiento: {item.id_instructor_seguimiento}</p>
                <div className='grid grid-cols-2'>
                  <p>Fecha fin lectiva: {new Date(item.fecha_inicio_lectiva).toLocaleDateString()}</p>
                  <p>Fecha inicio practica: {new Date(item.fecha_fin_lectiva).toLocaleDateString()}</p>
                </div>
                <p className='my-3'>Fecha fin lectiva: {new Date(item.fecha_fin_lectiva).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </section>
      </section>
      <section className='flex flex-col w-[95%] gap-2 mx-auto'>
        <div className='w-[95%] mx-auto h-full'>
          <form action='' className='flex flex-col gap-2'>
            <section className='grid items-center grid-cols-2 gap-2'>
              <section className='flex flex-col'>
                <span className='text-sm font-semibold'>Líder Prácticas</span>
                <span className='text-sm font-medium'>Fecha Registro: 31 Agosto 23</span>
              </section>
              <div className='flex py-1 rounded-lg cursor-default w-fit bg-gray place-self-center'>
                <h3 className='px-2 text-sm whitespace-nowrap'>{nameResponsable}</h3>
              </div>
            </section>
            <div>
              <label htmlFor='' className='text-sm font-light'>
                Observaciones
              </label>
              <textarea id='editor' defaultValue={avalInfo.observaciones} rows='3' className='block w-full h-[4.5rem] px-3 py-2 overflow-y-auto text-sm text-black bg-white shadow-md border-t-[0.5px] border-slate-200 resize-none focus:text-gray-900 rounded-xl shadow-slate-400 focus:bg-white focus:outline-none placeholder:text-slate-400 placeholder:font-light' placeholder='Deja una observación' ref={descriptionRef} onInput={handleSubmitButton} />
            </div>
            <div className='grid grid-cols-2 gap-2 relative top-1.5 items-center'>
              {idRol === Number(keysRoles[0]) ? (
                <div className='flex flex-row gap-2 place-self-center'>
                  {!selectedApproveButton ? (
                    <>
                      <Button name='confirm' type='button' bg={'bg-primary'} px={'px-2'} hover hoverConfig='bg-[#287500]' font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} inline onClick={() => selectButtonToSubmit('Si')}>
                        <PiCheckCircleBold className='text-xl' /> Sí
                      </Button>
                      <Button name='deny' type='button' bg={'bg-red-500'} px={'px-2'} hover hoverConfig='bg-red-700' font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow='2xl' inline onClick={() => selectButtonToSubmit('No')}>
                        <PiXCircleBold className='text-xl' /> No
                      </Button>
                    </>
                  ) : selectedApproveButton === 'No' ? (
                    <>
                      <Button name='confirm' type='button' bg='bg-slate-500' px={'px-2'} hover font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow='2xl' onClick={() => selectButtonToSubmit('Si')} inline>
                        <PiCheckCircleBold className='text-xl' /> Sí
                      </Button>
                      <Button name='deny' type='button' bg={'bg-red-500'} hover hoverConfig='bg-red-700' px={'px-2'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow='2xl' inline onClick={() => selectButtonToSubmit(null)}>
                        <PiXCircleBold className='text-xl' /> No
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button name='confirm' type='button' bg={'bg-primary'} px={'px-2'} hover hoverConfig='bg-[#287500]' font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} inline onClick={() => selectButtonToSubmit(null)}>
                        <PiCheckCircleBold className='text-xl' /> Sí
                      </Button>
                      <Button name='deny' type='button' bg='bg-slate-500' px={'px-2'} hover font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow='2xl' inline onClick={() => selectButtonToSubmit('No')}>
                        <PiXCircleBold className='text-xl' /> No
                      </Button>
                    </>
                  )}
                </div>
              ) : (
                <h5 className={`text-sm font-medium text-center ${avalInfo.estado_aval === 'Pendiente' ? 'text-slate-600' : avalInfo.estado_aval === 'Rechazado' ? 'text-red-500' : avalInfo.estado_aval === 'Aprobado' ? 'text-green-500' : null}`}>{avalInfo.estado_aval}</h5>
              )}
              {idRol === Number(keysRoles[0]) &&
                (disableSubmitButton ? (
                  <Button px={'px-3'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'lg'} isDisabled inline>
                    <LuSave />
                    Guardar
                  </Button>
                ) : (
                  <Button bg={'bg-primary'} px={'px-3'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'lg'} inline>
                    <LuSave />
                    Guardar
                  </Button>
                ))}
            </div>
          </form>
        </div>
      </section>
    </section>
  )
}
