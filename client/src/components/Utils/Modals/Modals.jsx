import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { IoSearchOutline } from 'react-icons/io5'
import { BsCheck2Circle } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'
import { modalities } from '../../../import/staticData'
import { Button } from '../Button/Button'
import { LuChevronDown } from 'react-icons/lu'

const Modals = ({ closeModal, title, bodyStudent = false, emailStudent, documentStudent, celStudent, trainingProgram, ficha, academicLevel, trainingStage, modalitie, finLectiva, inicioProductiva, company, innmediateSuperior, emailSuperior, workstation, celSuperior, arl, bodyFilter = false, bodyVisits = false, view, stylesFilterVisits = false, bodyPassword = false, detallesBitacoras = false, bodyAvales = false, subtitle = false, textSubtitle }) => {
  const [isOpen, setIsOpen] = useState(false)

  const passwordIcons = {
    openEye: <AiOutlineEye />,
    closeEye: <AiOutlineEyeInvisible />,
  }

  const passwordStatus = {
    shown: 'text',
    hidden: 'password',
  }

  const [showPassword, setShowPassword] = useState(passwordStatus.hidden)

  const handlePassword = (id) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [id]: prevState[id] === passwordStatus.shown ? passwordStatus.hidden : passwordStatus.shown,
    }))
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionSelect = () => {
    setIsOpen(false)
  }

  const handleModal = () => {
    closeModal()
  }

  return (
    <section className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black/50 backdrop-blur-sm backdrop-filter ">
      <section className={`relative flex h-auto ${bodyStudent ? 'w-1/2' : 'w-2/5'} flex-col rounded-2xl bg-white bounce`}>
        <IoMdClose className="absolute right-5 top-[20px] h-7 w-7 cursor-pointer " onClick={handleModal} />
        <header className="grid pt-5 place-items-center ">
          <h2 className={`text-xl font-medium text-center w-fit ${subtitle === true ? 'border-0' : 'border-b-1'} border-primary`}>{title}</h2>
          {subtitle && <span className="w-1/2 text-sm font-light text-center border-b-1 border-primary">{textSubtitle}</span>}
        </header>
        <section className={`${stylesFilterVisits === false ? 'mx-auto w-5/6 flex-auto' : 'mx-auto w-fit'}`}>
          {/* modalAprendices */}
          {bodyStudent && (
            <>
              <section className="pt-3 pb-2">
                <section className="grid grid-cols-2-45-55">
                  <span className="font-medium">Email:</span>
                  <span>{emailStudent}</span>
                </section>
                <section className="grid grid-cols-2-45-55">
                  <span className="font-medium">Documento de identidad:</span>
                  <span>{documentStudent}</span>
                </section>
                <section className="grid grid-cols-2-45-55">
                  <span className="font-medium">Contacto:</span>
                  <span>{celStudent}</span>
                </section>
              </section>
              <hr className="w-full text-primary" />
              <section className="py-2">
                <section className="grid grid-cols-2-45-55">
                  <span className="font-medium">Programa:</span>
                  <span>{trainingProgram}</span>
                </section>
                <section className="grid grid-cols-2-45-55">
                  <span className="font-medium">Ficha:</span>
                  <span>{ficha}</span>
                </section>
                <section className="grid grid-cols-2-45-55">
                  <span className="font-medium">Nivel académico:</span>
                  <span>{academicLevel}</span>
                </section>
                <section className="grid grid-cols-2-45-55">
                  <span className="font-medium">Etapa:</span>
                  <span>{trainingStage}</span>
                </section>
                <section className="grid grid-cols-2-45-55">
                  <span className="font-medium">Modalidad:</span>
                  <span>{modalitie}</span>
                </section>
                <section className="grid grid-cols-2-45-55">
                  <span className="font-medium">Fin lectiva:</span>
                  <span>{finLectiva}</span>
                </section>
                <section className="grid grid-cols-2-45-55">
                  <span className="font-medium">Inicio productiva:</span>
                  <span>{inicioProductiva}</span>
                </section>
              </section>
              <hr className="w-full text-primary" />
              <section className="py-3 pt-2">
                <section className="grid grid-cols-2-45-55">
                  <span className="font-medium">Empresa:</span>
                  <span>{company}</span>
                </section>
                <section className="grid grid-cols-2-45-55">
                  <span className="font-medium">Jefe Inmediato:</span>
                  <span>{innmediateSuperior}</span>
                </section>
                <section className="grid grid-cols-2-45-55">
                  <span className="font-medium">Cargo:</span>
                  <span>{workstation}</span>
                </section>
                <section className="grid grid-cols-2-45-55">
                  <span className="font-medium">Email:</span>
                  <span>{emailSuperior}</span>
                </section>
                <section className="grid grid-cols-2-45-55">
                  <span className="font-medium">Contacto:</span>
                  <span>{celSuperior}</span>
                </section>
                <section className="grid grid-cols-2-45-55">
                  <span className="font-medium">ARL:</span>
                  <span>{arl}</span>
                </section>
              </section>
            </>
          )}

          {/* modalFiltro */}
          {bodyFilter && (
            <>
              <form action="">
                <section className={`${stylesFilterVisits === false ? 'my-4 flex flex-col justify-center gap-3 pt-2' : 'grid grid-cols-2 grid-rows-2-50-50 gap-x-9 gap-y-3 pb-6 pt-4 '}`}>
                  {view.map((filtro, i) => {
                    return (
                      <section key={i}>
                        <div className={`${stylesFilterVisits === false ? 'grid grid-cols-1 md:grid-cols-2-45-55' : 'flex flex-col '}`}>
                          <label className="font-semibold " htmlFor="">
                            {filtro.label}
                          </label>
                          <div>
                            {filtro.type === 'date' ? (
                              <input type={filtro.type} name={filtro.name} placeholder={filtro.placeholder} className={`border-gray-400 focus:text-gray-900 rounded-md border-[1.2px] bg-white py-[0.9px] pl-3 text-base text-black focus:bg-white focus:outline-none ${stylesFilterVisits === false ? 'w-full' : 'w-full'}`} />
                            ) : filtro.type === 'text' ? (
                              <input type={filtro.type} name={filtro.name} placeholder={filtro.placeholder} className={`border-gray-400 focus:text-gray-900 rounded-md border-[1.2px] bg-white py-[0.9px] pl-3 text-base text-black focus:bg-white focus:outline-none ${stylesFilterVisits === false ? 'w-full' : 'w-full'}`} />
                            ) : filtro.type === 'select' ? (
                              <select name={filtro.name} className={`border-gray-400 focus:text-gray-900 rounded-md border-[1.2px] bg-white py-[2.5px] pl-3 text-base text-black focus:bg-white focus:outline-none ${stylesFilterVisits === false ? 'w-full' : 'w-full'}`} onFocus={toggleDropdown} onChange={handleOptionSelect}>
                                <option value={''}>Sin seleccionar</option>
                                {modalities.map((filtro, i) => {
                                  return (
                                    <option value={filtro.value} key={i}>
                                      {filtro.name}
                                    </option>
                                  )
                                })}
                              </select>
                            ) : null}
                          </div>
                        </div>
                      </section>
                    )
                  })}
                </section>
                <div className={`grid w-fit grid-cols-2 ${isOpen === true ? 'mx-4 my-12 gap-2' : 'mx-auto my-5 gap-5'} `}>
                  <Button value={'Limpiar'} bg={'bg-primary'} px={'px-[1rem]'} font={'font-normal'} textSize="text-md" py={'py-1'} rounded={'rounded-xl'} shadow={'shadow-lg'} />
                  <div className="relative mx-auto">
                    <span className="absolute inset-y-0 flex items-center text-white left-2">
                      <IoSearchOutline />
                    </span>
                    <Button value={'Buscar'} bg={'bg-primary'} px={'pl-7 pr-2'} font={'font-normal'} textSize="text-md" py={'py-1'} rounded={'rounded-xl'} shadow={'shadow-lg'} />
                  </div>
                </div>
              </form>
            </>
          )}
          {bodyVisits && <>Tampoco da xd</>}

          {/* ModalContraseña */}
          {bodyPassword && (
            <>
              <form action="" className="flex flex-col gap-3 pt-6">
                <section className="grid grid-cols-2">
                  <label className="font-semibold w-fit whitespace-nowrap" htmlFor="">
                    Contraseña Anterior
                  </label>
                  <div className="relative w-full mx-auto text-gray-400">
                    <span className="absolute inset-y-0 right-[1%] flex transform cursor-pointer select-none items-center pr-3" onClick={() => handlePassword('oldPassword')}>
                      {showPassword['oldPassword'] === passwordStatus.shown ? passwordIcons.closeEye : passwordIcons.openEye}
                    </span>
                    <input id="oldPassword" type={showPassword['oldPassword']} className="border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-[0.9px] pl-3 text-base text-black focus:bg-white focus:outline-none" />
                  </div>
                </section>
                <section className="grid grid-cols-2-50-50">
                  <label className="font-semibold w-fit whitespace-nowrap" htmlFor="">
                    Nueva Contraseña
                  </label>
                  <div className="relative w-full mx-auto text-gray-400">
                    <span className="absolute inset-y-0 right-[1%] flex transform cursor-pointer select-none items-center pr-3" onClick={() => handlePassword('newPassword')}>
                      {showPassword['newPassword'] === passwordStatus.shown ? passwordIcons.closeEye : passwordIcons.openEye}
                    </span>
                    <input id="newPassword" type={showPassword['newPassword']} className="border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-[0.9px] pl-3 text-base text-black focus:bg-white focus:outline-none" />
                  </div>
                </section>
                <section className="grid grid-cols-2">
                  <label className="font-semibold w-fit whitespace-nowrap" htmlFor="">
                    Confirmar Contraseña
                  </label>
                  <div className="relative w-full mx-auto text-gray-400">
                    <span className="absolute inset-y-0 right-[1%] flex transform cursor-pointer select-none items-center pr-3" onClick={() => handlePassword('confirmPassword')}>
                      {showPassword['confirmPassword'] === passwordStatus.shown ? passwordIcons.closeEye : passwordIcons.openEye}
                    </span>
                    <input id="confirmPassword" type={showPassword['confirmPassword']} className="border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-[0.9px] pl-3 text-base text-black focus:bg-white focus:outline-none" />
                  </div>
                </section>
                <div className="relative mx-auto my-5">
                  <span className="absolute inset-y-0 flex items-center text-white left-2">
                    <BsCheck2Circle />
                  </span>
                  <Button value={'Guardar'} bg={'bg-primary'} px={'pl-7 pr-2'} font={'font-normal'} textSize="text-md" py={'py-1'} rounded={'rounded-xl'} shadow={'shadow-lg'} />
                </div>
              </form>
            </>
          )}
          {detallesBitacoras && (
            <>
              <form action="" className="flex flex-col gap-3 pt-8">
                <section className="flex flex-col gap-2 md:flex-row">
                  <label className="font-medium">Responsable</label>
                  <input type="text" name="" id="" className="border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-[0.9px] pl-3 text-base text-black focus:bg-white focus:outline-none" />
                </section>
                <section className="flex flex-col gap-3 md:flex-row">
                  <label htmlFor="" className="font-medium whitespace-nowrap">
                    Fecha Creación
                  </label>
                  <input type="date" name="" id="" className="border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-[0.9px] pl-3 text-base text-black focus:bg-white focus:outline-none md:w-1/3" />
                </section>
                <section className="flex flex-col gap-3 md:flex-row">
                  <label htmlFor="" className="font-medium whitespace-nowrap">
                    Fecha Asignado
                  </label>
                  <input type="date" name="" id="" className="border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-[0.9px] pl-3 text-base text-black focus:bg-white focus:outline-none md:w-1/3" />
                </section>
                <section className="flex flex-col">
                  <label htmlFor="" className="font-medium">
                    Observaciones
                  </label>
                  <textarea name="" id="" rows="10" className="border-gray-400 focus:text-gray-900 max-h-[8rem] min-h-[2rem] w-full overflow-y-auto rounded-md border-[1.2px]  bg-white py-[0.9px] pl-3 text-base  text-black focus:bg-white focus:outline-none" placeholder="Digite alguna observación" />
                </section>

                <div className="flex flex-row my-5">
                  <div className="relative mr-auto">
                    <Button value={'Editar'} bg={'bg-coffee/75'} px={'px-[1rem]'} font={'font-normal'} textSize="text-md" py={'py-1'} rounded={'rounded-xl'} shadow={'shadow-lg'} />
                  </div>
                  <div className="relative ml-auto">
                    <span className="absolute inset-y-0 flex items-center text-white left-2">
                      <IoSearchOutline />
                    </span>
                    <Button value={'Buscar'} bg={'bg-primary'} px={'pl-7 pr-2'} font={'font-normal'} textSize="text-md" py={'py-1'} rounded={'rounded-xl'} shadow={'shadow-lg'} />
                  </div>
                </div>
              </form>
            </>
          )}
          {bodyAvales && (
            <>
              <form action="" className="flex flex-col gap-4 pt-6">
                <section className="grid gap-5 grid-cols-2-60-40">
                  <section className="grid items-center grid-rows-3 gap-5">
                    <div class="relative">
                      <span className="absolute inset-y-0 flex items-center text-xl font-bold text-purple-700 pointer-events-none right-3">
                        <LuChevronDown />
                      </span>
                      <select name="coordi" id="coordi" className="border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white pt-[3.5px] pl-2 text-sm font-light text-black focus:bg-white focus:outline-none appearance-none">
                        <option value="1">Coordinador 1</option>
                        <option value="2">Coordinador 2</option>
                        <option value="3">Coordinador 3</option>
                      </select>
                      <label for="coordi" class="absolute left-3 -top-[10.6px] px-1 bg-white text-gray-600 text-[12px] text-sm font-light">
                        Coordinador Asignado
                      </label>
                    </div>
                    <div class="relative">
                      <span className="absolute inset-y-0 flex items-center text-xl font-bold text-purple-700 pointer-events-none right-3">
                        <LuChevronDown />
                      </span>
                      <select name="inst" id="inst" className="border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white pt-[3.5px] pl-2 text-sm font-light text-black focus:bg-white focus:outline-none appearance-none">
                        <option value="1">Instructor 1</option>
                        <option value="2">Instructor 2</option>
                        <option value="3">Instructor 3</option>
                      </select>
                      <label for="inst" class="absolute left-3 -top-[10.6px] px-1 bg-white text-gray-600 text-[12px] text-sm font-light">
                        Instructor Responsable
                      </label>
                    </div>
                    <div class="relative">
                      <span className="absolute inset-y-0 flex items-center text-xl font-bold text-purple-700 pointer-events-none right-3">
                        <LuChevronDown />
                      </span>
                      <select name="inst" id="inst" className="border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white pt-[3.5px] pl-2 text-sm font-light text-black focus:bg-white focus:outline-none appearance-none">
                        <option value="1">Instructor Líder</option>
                      </select>
                      <label for="inst" class="absolute left-3 -top-[10.6px] px-1 bg-white text-gray-600 text-[12px] text-sm font-light">
                        Instructor Líder
                      </label>
                    </div>
                  </section>
                  <section className="grid items-center grid-rows-4 gap-5">
                    <div className="flex flex-row items-center gap-3 h-fit w-fit">
                      <input type="checkbox" id="avalcoor" name="avalcoor" className="w-5 h-5 accent-purple-700" />
                      <label htmlFor="avalcoor" className="text-sm font-light">
                        Aval Coordinador
                      </label>
                    </div>
                    <div className="flex flex-row items-center gap-3 h-fit w-fit">
                      <input type="checkbox" name="avalins" id="avalins" className="w-5 h-5 accent-purple-700" />
                      <label htmlFor="avalins" className="text-sm font-light">
                        Aval Instructor
                      </label>
                    </div>
                    <div className="flex flex-row items-center gap-3 h-fit w-fit">
                      <input type="checkbox" id="raps" name="raps" className="w-5 h-5 accent-purple-700" />
                      <label htmlFor="raps" className="text-sm font-light">
                        RAPS Aprobados
                      </label>
                    </div>
                    <div className="flex flex-row items-center gap-3 h-fit w-fit">
                      <input type="checkbox" id="next" name="next" className="w-5 h-5 accent-purple-700" />
                      <label htmlFor="next" className="text-sm font-light">
                        Continuar Registro
                      </label>
                    </div>
                  </section>
                </section>
                <section>
                  <h2 className="pb-2 font-normal text-center">Observaciones</h2>
                  <textarea name="" id="" rows="10" className="border-gray-400 focus:text-gray-900 max-h-[4rem] min-h-[2rem] w-full overflow-y-auto rounded-md border-[1.2px]  bg-white py-[0.9px] pl-3 text-sm font-light text-black focus:bg-white focus:outline-none" placeholder="Digite alguna observación" />
                </section>
                <div className="relative mx-auto mb-3">
                  <span className="absolute inset-y-0 flex items-center text-white left-2">
                    <BsCheck2Circle />
                  </span>
                  <Button value={'Guardar'} bg={'bg-primary'} px={'pl-7 pr-2'} font={'font-normal'} textSize="text-md" py={'py-1'} rounded={'rounded-xl'} shadow={'shadow-lg'} />
                </div>
              </form>
            </>
          )}
        </section>
      </section>
    </section>
  )
}

export { Modals }
