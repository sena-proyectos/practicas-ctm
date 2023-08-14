import { useEffect, useState, useRef } from 'react'

//Components
import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'
import { Button } from '../Utils/Button/Button'

// icons
import { BsCheck2Circle } from 'react-icons/bs'
import { LuUpload, LuArrowRight, LuChevronDown, LuArrowLeft } from 'react-icons/lu'
import { AiOutlineCloudUpload } from 'react-icons/ai'

import { idTypes, modalities, etapasFormacion, nivelFormacion, apoyoSostenimiento, pagoArl, dataInscription, keysRoles } from '../../import/staticData'
import { getInscriptionById } from '../../api/httpRequest'
import { useLocation } from 'react-router-dom'

export const RegisterDetails = () => {
  const [showDataEmpresa, setShowDataEmpresa] = useState(false)
  const [showDataAprendiz, setShowDataAprendiz] = useState(true)
  const [showDataAvales, setShowDataAvales] = useState(false)
  const [inscriptionById, setInscriptionById] = useState()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const inscriptionId = searchParams.get('id')

  const idRol = Number(localStorage.getItem('idRol'))

  useEffect(() => {
    if (inscriptionId) {
      getInscriptionAprendiz(inscriptionId)
    }
  }, [inscriptionId])

  const handleChangeSection = (section) => {
    setShowDataEmpresa(section === 'empresa')
    setShowDataAprendiz(section === 'aprendiz')
    setShowDataAvales(section === 'avales')
  }

  const inputRefs = {
    apellido_inscripcion: useRef(null),
    nombre_inscripcion: useRef(null),
    documento_inscripcion: useRef(null),
    email_inscripcion: useRef(null),
    inscripcion_celular: useRef(null),
    numero_ficha_inscripcion: useRef(null),
    nombre_programa_inscripcion: useRef(null),
    nombre_instructor_lider_inscripcion: useRef(null),
    email_instructor_lider_inscripcion: useRef(null),
    tipo_documento_inscripcion: useRef(null),
    modalidad_inscripcion: useRef(null),
    fecha_fin_lectiva_inscripcion: useRef(null),
    apoyo_sostenimiento_inscripcion: useRef(null),
    etapa_actual_inscripcion: useRef(null),
    nivel_formacion_inscripcion: useRef(null),
    nit_empresa_inscripcion: useRef(null),
    telefono_jefe_empresa_inscripcion: useRef(null),
    email_jefe_empresa_inscripcion: useRef(null),
    nombre_empresa_inscripción: useRef(null),
    direccion_empresa_inscripcion: useRef(null),
    nombre_jefe_empresa_inscripcion: useRef(null),
    cargo_jefe_empresa_inscripcion: useRef(null),
    arl: useRef(null),
    observaciones: useRef(null),
  }

  const getInscriptionAprendiz = async (id) => {
    try {
      const response = await getInscriptionById(id)
      console.log(response)
      const res = response.data.data[0]
      setInscriptionById(res)

      Object.keys(res).forEach((fieldName) => {
        if (inputRefs[fieldName] && inputRefs[fieldName].current) {
          inputRefs[fieldName].current.value = res[fieldName]
        }
      })
    } catch (error) {
      console.log('Ha ocurrido un error al mostrar los datos del usuario')
    }
  }

  return (
    <main className="flex flex-row min-h-screen">
      <Siderbar />
      <section className="relative grid flex-auto w-min grid-rows-3-10-75-15">
        <header className="grid place-items-center">
          <h1 className="text-2xl font-bold text-center place-self-center">{showDataAprendiz === true ? 'Datos del aprendiz' : showDataEmpresa === true ? 'Datos de la empresa' : 'Avales'}</h1>
        </header>
        <section>
          <form action="" className="flex flex-col mt-3 gap-y-6">
            <div className={showDataAprendiz ? 'visible' : 'hidden'}>
              <section className="grid w-11/12 mx-auto gap-y-3 gap-x-6 sm:grid-cols-2 md:grid-cols-3">
                {dataInscription.dataAprendiz.map((item, i) => {
                  const inputRef = inputRefs[item.name]
                  const isDisabled = idRol === Number(keysRoles[2]) || idRol === Number(keysRoles[3])
                  return (
                    <div className="flex flex-col w-full m-auto text-gray-400" key={i}>
                      <label htmlFor="nombre" className="text-sm font-normal">
                        {item.label} {item.required && <span className="font-medium text-red-600">*</span>}
                      </label>
                      {item.type === 'number' ? (
                        <input type={item.type} name={item.name} ref={inputRef} className={`w-full rounded-md border-[1.2px]  py-1 pl-2 text-sm focus:outline-none [appearance:textfield] [&::-webit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${isDisabled ? 'bg-[#ececee] border-[#e0e0e3] text-[#9b9ba2]' : 'bg-white border-gray-400 focus:text-gray-900 text-black focus:bg-white focus:outline-none'}`} autoComplete="on" placeholder={item.placeholder} disabled={isDisabled} />
                      ) : item.type === 'select' ? (
                        <div className="relative">
                          <span className="absolute inset-y-0 flex items-center text-xl font-bold pointer-events-none right-3">
                            <LuChevronDown />
                          </span>
                          <select name={item.name} ref={inputRef} className={`border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-1.5 pl-2 text-sm text-black focus:bg-white focus:outline-none appearance-none ${isDisabled && 'bg-zinc-200 border-zinc-300 text-zinc-500'}`} disabled={isDisabled}>
                            <option value={''}>Sin seleccionar</option>
                            {item.name === 'tipo_documento_inscripcion'
                              ? idTypes.map((item, i) => {
                                  return (
                                    <option value={item.value} key={i}>
                                      {item.name}
                                    </option>
                                  )
                                })
                              : item.name === 'modalidad_inscripcion'
                              ? modalities.map((item, i) => {
                                  return (
                                    <option value={item.value} key={i}>
                                      {item.name}
                                    </option>
                                  )
                                })
                              : item.name === 'etapa_actual_inscripcion'
                              ? etapasFormacion.map((item, i) => {
                                  return (
                                    <option value={item.value} key={i}>
                                      {item.name}
                                    </option>
                                  )
                                })
                              : item.name === 'nivel_formacion_inscripcion'
                              ? nivelFormacion.map((item, i) => {
                                  return (
                                    <option value={item.value} key={i}>
                                      {item.name}
                                    </option>
                                  )
                                })
                              : item.name === 'apoyo_sostenimiento_inscripcion'
                              ? apoyoSostenimiento.map((item, i) => {
                                  return (
                                    <option value={item.value} key={i}>
                                      {item.name}
                                    </option>
                                  )
                                })
                              : null}
                          </select>
                        </div>
                      ) : item.type === 'date' ? (
                        <input type={item.type} name={item.name} ref={inputRef} className={`w-full rounded-md border-[1.2px]  py-1 pl-2 text-sm focus:outline-none [appearance:textfield] [&::-webit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${isDisabled ? 'bg-[#ececee] border-[#e0e0e3] text-[#9b9ba2]' : 'bg-white border-gray-400 focus:text-gray-900 text-black focus:bg-white focus:outline-none'}`} autoComplete="on" placeholder={item.placeholder} disabled={isDisabled} />
                      ) : (
                        <input type={item.type} name={item.name} ref={inputRef} className={`w-full rounded-md border-[1.2px]  py-1 pl-2 text-sm focus:outline-none [appearance:textfield] [&::-webit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${isDisabled ? 'bg-[#ececee] border-[#e0e0e3] text-[#9b9ba2]' : 'bg-white border-gray-400 focus:text-gray-900 text-black focus:bg-white focus:outline-none'}`} autoComplete="on" placeholder={item.placeholder} disabled={isDisabled} />
                      )}
                    </div>
                  )
                })}
              </section>
            </div>
            <div className={showDataEmpresa ? 'visible' : 'hidden'}>
              <section className="grid w-11/12 mx-auto gap-y-3 gap-x-6 sm:grid-cols-2 md:grid-cols-3">
                {dataInscription.dataEmpresa.map((item, i) => {
                  const inputRef = inputRefs[item.name]
                  const isDisabled = idRol === Number(keysRoles[2]) || idRol === Number(keysRoles[3])
                  return (
                    <div className="flex flex-col w-full m-auto text-gray-400" key={i}>
                      <label htmlFor="nombre" className="text-sm font-normal whitespace-nowrap">
                        {item.label} {item.required && <span className="font-medium text-red-600">*</span>}
                      </label>
                      {item.type === 'number' ? (
                        <div className="relative">
                          <input type={item.type} name={item.name} ref={inputRef} className={`w-full rounded-md border-[1.2px]  py-1 pl-2 text-sm focus:outline-none [appearance:textfield] [&::-webit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${isDisabled ? 'bg-[#ececee] border-[#e0e0e3] text-[#9b9ba2]' : 'bg-white border-gray-400 focus:text-gray-900 text-black focus:bg-white focus:outline-none'}`} autoComplete="on" placeholder={item.placeholder} disabled={isDisabled} />
                        </div>
                      ) : item.type === 'file' ? (
                        <div className="relative">
                          <span className="absolute inset-y-0 flex items-center text-xl font-bold pointer-events-none right-3">
                            <AiOutlineCloudUpload />
                          </span>
                          <div className="border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-1 pl-2">
                            <input type={item.type} accept={item.accept} name={item.name} className="w-5/6 text-xs cursor-pointer file:hidden whitespace-break-spaces" disabled={isDisabled} />
                          </div>
                        </div>
                      ) : item.type === 'select' ? (
                        <div className="relative">
                          <span className="absolute inset-y-0 flex items-center text-xl font-bold pointer-events-none right-3">
                            <LuChevronDown />
                          </span>
                          <select name={item.name} ref={inputRef} className={`border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-1.5 pl-2 text-sm text-black focus:bg-white focus:outline-none appearance-none ${isDisabled && 'bg-zinc-200 border-zinc-300 text-zinc-500'}`} disabled={isDisabled}>
                            <option value={''}>Sin seleccionar</option>
                            {item.name === 'arl'
                              ? pagoArl.map((item, i) => {
                                  return (
                                    <option value={item.value} key={i}>
                                      {item.name}
                                    </option>
                                  )
                                })
                              : null}
                          </select>
                        </div>
                      ) : item.type === 'textarea' ? (
                        <div className="relative">
                          <textarea id="editor" rows="3" ref={inputRef} className={`block w-full px-0 max-h-[5.5rem] overflow-y-auto resize-none rounded-md border-[1.2px]  py-[0.9px] pl-3 text-sm focus:outline-none ${isDisabled ? 'bg-[#ececee] border-[#e0e0e3] text-[#9b9ba2]' : 'bg-white border-gray-400 focus:text-gray-900 text-black focus:bg-white focus:outline-none'}`} placeholder={item.placeholder} required disabled={isDisabled} />
                        </div>
                      ) : (
                        <div className="relative">
                          <input type={item.type} name={item.name} ref={inputRef} className={`w-full rounded-md border-[1.2px]  py-1 pl-2 text-sm focus:outline-none [appearance:textfield] [&::-webit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${isDisabled ? 'bg-[#ececee] border-[#e0e0e3] text-[#9b9ba2]' : 'bg-white border-gray-400 focus:text-gray-900 text-black focus:bg-white focus:outline-none'}`} autoComplete="on" placeholder={item.placeholder} disabled={isDisabled} />
                        </div>
                      )}
                    </div>
                  )
                })}
              </section>
            </div>
            <div className={`w-11/12 mx-auto flex flex-col gap-5 ${showDataAvales ? 'visible' : 'hidden'}`}>
              <section className="grid gap-y-3 gap-x-6 sm:grid-cols-2 md:grid-cols-3">
                {(idRol === Number(keysRoles[0]) || idRol === Number(keysRoles[1])) && (
                  <>
                    <div className="flex flex-col w-full m-auto text-gray-400">
                      <label htmlFor="nombre" className="text-sm font-normal whitespace-nowrap">
                        Coordinador Responsable
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 flex items-center text-xl font-bold pointer-events-none right-3">
                          <LuChevronDown />
                        </span>
                        <select className="border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-1 pl-2 text-sm text-black focus:bg-white focus:outline-none appearance-none">
                          <option value={''}>Sin seleccionar</option>
                          <option value="" selected>
                            Marianela Henao Atehortúa
                          </option>
                          <option value="">Coordinador 2</option>
                          <option value="">Coordinador 3</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-col w-full m-auto text-gray-400">
                      <label htmlFor="nombre" className="text-sm font-normal whitespace-nowrap">
                        Instructor de Seguimiento
                      </label>
                      <div className="relative">
                        <input type="text" className="w-full rounded-md border-[1.2px] bg-[#ececee] border-[#e0e0e3] text-[#9b9ba2] py-1 pl-2 text-sm  focus:outline-none" autoComplete="on" disabled />
                      </div>
                    </div>
                    <div className="flex flex-col w-full m-auto text-gray-400">
                      <label htmlFor="nombre" className="text-sm font-normal whitespace-nowrap">
                        Instructor Líder
                      </label>
                      <div className="relative">
                        <input type="text" className="w-full rounded-md border-[1.2px] bg-[#ececee] border-[#e0e0e3] text-[#9b9ba2] py-1 pl-2 text-sm  focus:outline-none" autoComplete="on" disabled />
                      </div>
                    </div>
                  </>
                )}
                {(idRol === Number(keysRoles[0]) || idRol === Number(keysRoles[1])) && (
                  <div className="flex flex-col w-full m-auto text-gray-400">
                    <label htmlFor="nombre" className="text-sm font-normal whitespace-nowrap">
                      Aval Coordinador
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 flex items-center text-xl font-bold pointer-events-none right-3">
                        <LuChevronDown />
                      </span>
                      <select className="border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-1 pl-2 text-sm text-black focus:bg-white focus:outline-none appearance-none">
                        <option value={''}>Sin seleccionar</option>
                        <option value="">Si</option>
                        <option value="">No</option>
                      </select>
                    </div>
                  </div>
                )}
                {(idRol === Number(keysRoles[0]) || idRol === Number(keysRoles[1]) || idRol === Number(keysRoles[2])) && (
                  <div className="flex flex-col w-full m-auto text-gray-400">
                    <label htmlFor="nombre" className="text-sm font-normal whitespace-nowrap">
                      Aval Instructor Seguimiento
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 flex items-center text-xl font-bold pointer-events-none right-3">
                        <LuChevronDown />
                      </span>
                      <select className="border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-1 pl-2 text-sm text-black focus:bg-white focus:outline-none appearance-none">
                        <option value={''}>Sin seleccionar</option>
                        <option value="">Si</option>
                        <option value="">No</option>
                      </select>
                    </div>
                  </div>
                )}
                {(idRol === Number(keysRoles[0]) || idRol === Number(keysRoles[1]) || idRol === Number(keysRoles[3])) && (
                  <div className="flex flex-col w-full m-auto text-gray-400">
                    <label htmlFor="nombre" className="text-sm font-normal whitespace-nowrap">
                      Aval Instructor Líder
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 flex items-center text-xl font-bold pointer-events-none right-3">
                        <LuChevronDown />
                      </span>
                      <select className="border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-1 pl-2 text-sm text-black focus:bg-white focus:outline-none appearance-none">
                        <option value={''}>Sin seleccionar</option>
                        <option value="">Si</option>
                        <option value="">No</option>
                      </select>
                    </div>
                  </div>
                )}
              </section>
              <div className="flex flex-col text-gray-400">
                <label htmlFor="nombre" className="text-sm font-normal whitespace-nowrap">
                  Observaciones
                </label>
                <div className="relative">
                  <textarea className="w-full h-16 border-gray-400 min-h-[6rem] resize-none focus:text-gray-900 rounded-md border-[1.2px] bg-white py-1 px-3 text-sm text-black focus:bg-white focus:outline-none" placeholder="Deja aquí cualquier observación..." />
                </div>
              </div>
            </div>
          </form>
          <div className="flex flex-row gap-1 mx-auto mt-3 mb-2 md:flex-row w-fit md:gap-5">
            {showDataEmpresa && (
              <>
                <div className="relative mx-auto w-fit">
                  <span className="absolute inset-y-0 flex items-center text-white pointer-events-none left-3">
                    <LuArrowLeft />
                  </span>
                  <Button value={'Regresar'} bg={'bg-sky-700'} px={'pr-6 pl-10'} font={'font-medium'} textSize={'text-md'} py={'py-2'} rounded={'rounded-xl'} shadow={'shadow-lg'} clickeame={() => handleChangeSection('aprendiz')} />
                </div>
                <div className="relative ml-auto w-fit">
                  <span className="absolute inset-y-0 flex items-center text-white pointer-events-none right-2">
                    <LuArrowRight />
                  </span>
                  <Button value={'Continuar'} bg={'bg-primary'} px={'pr-8 pl-5'} font={'font-medium'} textSize={'text-md'} py={'py-2'} rounded={'rounded-xl'} shadow={'shadow-lg'} clickeame={() => handleChangeSection('avales')} />
                </div>
              </>
            )}
            {showDataAprendiz && (
              <div className="relative mx-auto w-fit">
                <span className="absolute inset-y-0 flex items-center text-white pointer-events-none right-2">
                  <LuArrowRight />
                </span>
                <Button value={'Continuar'} bg={'bg-primary'} px={'pr-8 pl-5'} font={'font-medium'} textSize={'text-md'} py={'py-2'} rounded={'rounded-xl'} shadow={'shadow-lg'} clickeame={() => handleChangeSection('empresa')} />
              </div>
            )}
            {showDataAvales && (
              <div className="relative mx-auto w-fit">
                <span className="absolute inset-y-0 flex items-center text-white pointer-events-none left-3">
                  <LuArrowLeft />
                </span>
                <Button value={'Regresar'} bg={'bg-sky-700'} px={'pr-6 pl-10'} font={'font-medium'} textSize={'text-md'} py={'py-2'} rounded={'rounded-xl'} shadow={'shadow-lg'} clickeame={() => handleChangeSection('empresa')} />
              </div>
            )}
          </div>
        </section>
        <Footer />
      </section>
    </main>
  )
}
