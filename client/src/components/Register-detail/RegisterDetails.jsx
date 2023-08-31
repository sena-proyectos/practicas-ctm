import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
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

import { getInscriptionById, getInscriptionDetails, getAvalById, getUserById } from '../../api/httpRequest'
import { DenyModal } from '../Utils/Modals/Modals'

export const RegisterDetails = () => {
  const { id } = useParams()
  const idRol = Number(localStorage.getItem('idRol'))
  const [selectedTab, setSelectedTab] = useState('infoAprendiz')
  const [inscriptionAprendiz, setInscriptionAprendiz] = useState([])
  const [details, setDetails] = useState({})

  useEffect(() => {
    getInscriptionAprendiz(id)
    getDetallesInscripcion(id)
  }, [id])

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
      <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} theme='colored' />
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
              <li className={`text-sm font-light cursor-pointer hover:text-purple-800 ${selectedTab === 'raps' ? 'font-medium text-purple-800' : ''}`} onClick={() => setSelectedTab('raps')}>
                RAPS
              </li>
            )}
            {(idRol === Number(keysRoles[0]) || idRol === Number(keysRoles[1])) && (
              <li className={`text-sm font-light cursor-pointer hover:text-purple-800 ${selectedTab === 'documentos' ? 'font-medium text-purple-800' : ''}`} onClick={() => setSelectedTab('documentos')}>
                Documentos
              </li>
            )}
            {(idRol === Number(keysRoles[0]) || idRol === Number(keysRoles[1])) && (
              <li className={`text-sm font-light cursor-pointer hover:text-purple-800 ${selectedTab === 'coordinador' ? 'font-medium text-purple-800' : ''} `} onClick={() => setSelectedTab('coordinador')}>
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
  const [avalInfo, setAvalInfo] = useState([])
  const fetchRaps = async () => {
    const res = await getAvalById(avalCoordinador)
    const { data } = res.data
    setAvalInfo(data)
  }

  useEffect(() => {
    if (avalCoordinador) fetchRaps()
  }, [avalCoordinador])

  const option = [
    { value: 'Sergio Soto Henao', key: 'Sergio Soto Henao' },
    { value: 'Marianela Henao Atehortúa', key: 'Marianela Henao Atehortúa' },
    { value: 'Jaime León Vergara Areiza', key: 'Jaime León Vergara Areiza' },
    { value: 'Mauro Isaías Arango Vanegas', key: 'Mauro Isaías Arango Vanegas' }
  ]
  return (
    <section className={`flex flex-col w-[95%] gap-2 p-2 mx-auto mt-2 h-auto`}>
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
                  <Button value={'Sí'} bg={'bg-primary'} px={'px-2'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} icon={<PiCheckCircleBold className='text-xl' />} />
                  <Button value={'No'} bg={'bg-red-500'} px={'px-2'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} icon={<PiXCircleBold className='text-xl' />} />
                </div>
              ) : (
                <h5 className={`text-sm font-medium text-center ${aval.estado_aval === 'Pendiente' ? 'text-slate-600' : aval.estado_aval === 'Rechazado' ? 'text-red-500' : aval.estado_aval === 'Aprobado' ? 'text-green-500' : null}`}>{aval.estado_aval === 'Pendiente' ? 'La solicitud esta siendo procesada por el coordinador' : aval.estado_aval === 'Rechazado' ? 'Rechazado' : aval.estado_aval === 'Aprobado' ? 'Aprobado' : null}</h5>
              )}
              <div>
                <label htmlFor='' className='text-sm font-light'>
                  Observaciones
                </label>
                <textarea id='editor' value={aval.observaciones} rows='3' className='block w-full h-[5rem] px-3 py-2 overflow-y-auto text-sm text-black bg-white shadow-md border-t-[0.5px] border-slate-200 resize-none focus:text-gray-900 rounded-xl shadow-slate-400 focus:bg-white focus:outline-none placeholder:text-slate-400 placeholder:font-light' placeholder='Deja una observación' disabled />
              </div>
              <Button value={'Guardar'} bg={'bg-primary'} px={'px-3'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'shadow-lg'} icon={<LuSave />} />
            </form>
          )
        })}
      </div>
    </section>
  )
}

const Docs = ({ idRol, avalDocumentos, avalFunciones }) => {
  const [avalInfoDocumentos, setAvalInfoDocumentos] = useState([])
  const [avalInfoFunciones, setAvalInfoFunciones] = useState([])
  const [nameResponsableDocumentos, setNameResponsableDocumentos] = useState('')
  const [nameResponsableFunciones, setNameResponsableFunciones] = useState('')

  const [showModal, setShowModal] = useState(false)
  const [notify, setNotify] = useState(false)

  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

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

  const fetchDataDocuments = async () => {
    const res = await getAvalById(avalDocumentos)
    const { data } = res.data
    const response = await getUserById(data[0].responsable_aval)
    const { nombres_usuario, apellidos_usuario } = response.data.data[0]
    const fullName = `${nombres_usuario} ${apellidos_usuario}`
    setNameResponsableDocumentos(fullName)
    setAvalInfoDocumentos(data)
  }

  const fetchDataFunciones = async () => {
    const res = await getAvalById(avalFunciones)
    const { data } = res.data
    const response = await getUserById(data[0].responsable_aval)
    const { nombres_usuario, apellidos_usuario } = response.data.data[0]
    const fullName = `${nombres_usuario} ${apellidos_usuario}`
    setNameResponsableFunciones(fullName)
    setAvalInfoFunciones(data)
  }

  useEffect(() => {
    if (avalDocumentos) fetchDataDocuments()
    if (avalFunciones) fetchDataFunciones()
  }, [avalDocumentos, avalFunciones])

  return (
    <>
      {showModal && <DenyModal setNotify={setNotify} id={avalDocumentos} closeModal={handleCloseModal} title={'Escribe la razón del rechazo'} />}
      <section className='grid grid-cols-2 w-[95%] h-full gap-3 mx-auto'>
        <section>Documentación</section>
        <section className='flex flex-col w-[95%] gap-6 mx-auto'>
          <div className='w-[95%] mx-auto'>
            {avalInfoDocumentos.map((aval) => {
              return (
                <form action='' className='flex flex-col gap-2' key={aval.id_detalle_inscripcion}>
                  <section className='grid items-center grid-cols-2 gap-2'>
                    <section className='flex flex-col'>
                      <span className='text-sm font-semibold'>
                        Líder Prácticas <span className='text-red-800'>(Documentos)</span>
                      </span>
                      <span className='text-sm font-medium'>Fecha Registro: 31 Agosto 23</span>
                    </section>
                    <div className='flex py-1 rounded-lg cursor-default w-fit bg-gray place-self-center'>
                      <h3 className='px-2 text-sm whitespace-nowrap'>{nameResponsableDocumentos}</h3>
                    </div>
                  </section>
                  <div>
                    <label htmlFor='' className='text-sm font-light'>
                      Observaciones
                    </label>
                    <textarea id='editor' value={aval.observaciones} rows='3' className='block w-full h-[4.5rem] px-3 py-2 overflow-y-auto text-sm text-black bg-white shadow-md border-t-[0.5px] border-slate-200 resize-none focus:text-gray-900 rounded-xl shadow-slate-400 focus:bg-white focus:outline-none placeholder:text-slate-400 placeholder:font-light' placeholder='Deja una observación' />
                  </div>
                  <div className='grid grid-cols-2 gap-2 relative top-1.5 items-center'>
                    {idRol === Number(keysRoles[0]) ? (
                      <div className='flex flex-row gap-2 place-self-center'>
                        <Button value={'Sí'} type='button' bg={'bg-primary'} px={'px-2'} hover hoverConfig='bg-green-800' font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} icon={<PiCheckCircleBold className='text-xl' />} />
                        <Button value={'No'} type='button' bg={'bg-red-500'} px={'px-2'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow='2xl' icon={<PiXCircleBold className='text-xl' />} onClick={handleShowModal} />
                      </div>
                    ) : (
                      <h5 className={`text-sm font-medium text-center ${aval.estado_aval === 'Pendiente' ? 'text-slate-600' : aval.estado_aval === 'Rechazado' ? 'text-red-500' : aval.estado_aval === 'Aprobado' ? 'text-green-500' : null}`}>{aval.estado_aval}</h5>
                    )}
                    {idRol === Number(keysRoles[0]) && <Button value={'Guardar'} bg={'bg-primary'} px={'px-3'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'lg'} icon={<LuSave />} isDisabled />}
                  </div>
                </form>
              )
            })}
          </div>
          <hr className='w-3/4 mx-auto border-[1px] text-neutral-400' />
          <div className='w-[95%] mx-auto'>
            {avalInfoFunciones.map((aval) => {
              return (
                <form action='' className='flex flex-col gap-2' key={aval.id_detalle_inscripcion}>
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
                    <textarea name='observations' id='editor' value={aval.observaciones} rows='3' className='block w-full h-[4.5rem] px-3 py-2 overflow-y-auto text-sm text-black bg-white shadow-md border-t-[0.5px] border-slate-200 resize-none focus:text-gray-900 rounded-xl shadow-slate-400 focus:bg-white focus:outline-none placeholder:text-slate-400 placeholder:font-light' placeholder='Deja una observación' />
                  </div>
                  <div className='grid grid-cols-2 gap-2 relative top-1.5 items-center'>
                    {idRol === Number(keysRoles[2]) ? (
                      <div className='flex flex-row gap-2 place-self-center'>
                        <Button value={'Sí'} bg={'bg-primary'} px={'px-2'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} icon={<PiCheckCircleBold className='text-xl' />} />
                        <Button value={'No'} bg={'bg-red-500'} px={'px-2'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} icon={<PiXCircleBold className='text-xl' />} clickeame={handleShowModal} />
                      </div>
                    ) : (
                      <h5 className={`text-sm font-medium text-center ${aval.estado_aval === 'Pendiente' ? 'text-slate-600' : aval.estado_aval === 'Rechazado' ? 'text-red-500' : aval.estado_aval === 'Aprobado' ? 'text-green-500' : null}`}>{aval.estado_aval}</h5>
                    )}
                    {(idRol === Number(keysRoles[2]) || idRol === Number(keysRoles[0])) && <Button value={'Guardar'} bg={'bg-slate-600'} px={'px-3'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'shadow-lg'} icon={<LuSave />} isDisabled />}
                  </div>
                </form>
              )
            })}
          </div>
        </section>
      </section>
    </>
  )
}

const RAPS = ({ idRol, avalRaps }) => {
  const [avalInfo, setAvalInfo] = useState([])
  const [nameResponsable, setNameResponsable] = useState('')

  const fetchRaps = async () => {
    const res = await getAvalById(avalRaps)
    const { data } = res.data
    const response = await getUserById(data[0].responsable_aval)
    const { nombres_usuario, apellidos_usuario } = response.data.data[0]
    const fullName = `${nombres_usuario} ${apellidos_usuario}`
    setNameResponsable(fullName)
    setAvalInfo(data)
  }

  useEffect(() => {
    if (avalRaps) fetchRaps()
  }, [avalRaps])

  return (
    <section className='grid grid-cols-2 w-[95%] h-full gap-3 mx-auto'>
      <section>RAPS</section>
      <section className='flex flex-col w-[95%] gap-2 mx-auto'>
        <div className='w-[95%] mx-auto h-full'>
          {avalInfo.map((aval) => {
            return (
              <form action='' className='flex flex-col gap-2' key={aval.id_detalle_inscripcion}>
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
                  <textarea id='editor' value={aval.observaciones} rows='3' className='block w-full h-[4.5rem] px-3 py-2 overflow-y-auto text-sm text-black bg-white shadow-md border-t-[0.5px] border-slate-200 resize-none focus:text-gray-900 rounded-xl shadow-slate-400 focus:bg-white focus:outline-none placeholder:text-slate-400 placeholder:font-light' placeholder='Deja una observación' />
                </div>
                <div className='grid grid-cols-2 gap-2 relative top-1.5 items-center'>
                  {idRol === Number(keysRoles[0]) ? (
                    <div className='flex flex-row gap-2 place-self-center'>
                      <Button value={'Sí'} type='button' bg={'bg-primary'} px={'px-2'} hover hoverConfig='bg-green-800' font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} icon={<PiCheckCircleBold className='text-xl' />} />
                      <Button value={'No'} type='button' bg={'bg-red-500'} px={'px-2'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow='2xl' icon={<PiXCircleBold className='text-xl' />} />
                    </div>
                  ) : (
                    <h5 className={`text-sm font-medium text-center ${aval.estado_aval === 'Pendiente' ? 'text-slate-600' : aval.estado_aval === 'Rechazado' ? 'text-red-500' : aval.estado_aval === 'Aprobado' ? 'text-green-500' : null}`}>{aval.estado_aval}</h5>
                  )}
                  {idRol === Number(keysRoles[0]) && <Button value={'Guardar'} bg={'bg-primary'} px={'px-3'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'lg'} icon={<LuSave />} isDisabled />}
                </div>
              </form>
            )
          })}
        </div>
      </section>
    </section>
  )
}
