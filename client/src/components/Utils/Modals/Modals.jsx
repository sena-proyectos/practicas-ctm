import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { IoSearchOutline } from 'react-icons/io5'
import { BsCheck2Circle } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'
import { modalities } from '../../../import/staticData'
import { Button } from '../Button/Button'
import 'tailwindcss/tailwind.css';

const Modals = ({ closeModal, title, bodyStudent = false, emailStudent, documentStudent, celStudent, trainingProgram, ficha, academicLevel, trainingStage, modalitie, finLectiva, inicioProductiva, company, innmediateSuperior, emailSuperior, workstation, celSuperior, arl, bodyFilter = false, bodyVisits = false, view, stylesFilterVisits = false, bodyPassword = false, detallesBitacoras = false }) => {
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
    <section className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50 backdrop-filter backdrop-blur-sm ">
      <section className={`relative flex h-auto ${bodyStudent ? 'w-1/2' : 'w-2/5'} flex-col rounded-2xl bg-white animate-bounce`}>
        <IoMdClose className="absolute right-5 top-[20px] h-7 w-7 cursor-pointer " onClick={handleModal} />
        <header className="grid place-items-center pt-5 ">
          <h2 className="w-fit border-b-1 border-primary text-center text-xl font-medium">{title}</h2>
        </header>
        <section className={`${stylesFilterVisits === false ? 'mx-auto w-5/6 flex-auto' : 'mx-auto w-fit'}`}>
          {/* modalAprendices */}
          {bodyStudent && (
            <>
              <section className="pb-2 pt-3">
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
                    <span className="absolute inset-y-0 left-2 flex items-center text-white">
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
                  <label className="w-fit whitespace-nowrap font-semibold" htmlFor="">
                    Contraseña Anterior
                  </label>
                  <div className="text-gray-400 relative mx-auto w-full">
                    <span className="absolute inset-y-0 right-[1%] flex transform cursor-pointer select-none items-center pr-3" onClick={() => handlePassword('oldPassword')}>
                      {showPassword['oldPassword'] === passwordStatus.shown ? passwordIcons.closeEye : passwordIcons.openEye}
                    </span>
                    <input id="oldPassword" type={showPassword['oldPassword']} className="border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-[0.9px] pl-3 text-base text-black focus:bg-white focus:outline-none" />
                  </div>
                </section>
                <section className="grid grid-cols-2-50-50">
                  <label className="w-fit whitespace-nowrap font-semibold" htmlFor="">
                    Nueva Contraseña
                  </label>
                  <div className="text-gray-400 relative mx-auto w-full">
                    <span className="absolute inset-y-0 right-[1%] flex transform cursor-pointer select-none items-center pr-3" onClick={() => handlePassword('newPassword')}>
                      {showPassword['newPassword'] === passwordStatus.shown ? passwordIcons.closeEye : passwordIcons.openEye}
                    </span>
                    <input id="newPassword" type={showPassword['newPassword']} className="border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-[0.9px] pl-3 text-base text-black focus:bg-white focus:outline-none" />
                  </div>
                </section>
                <section className="grid grid-cols-2">
                  <label className="w-fit whitespace-nowrap font-semibold" htmlFor="">
                    Confirmar Contraseña
                  </label>
                  <div className="text-gray-400 relative mx-auto w-full">
                    <span className="absolute inset-y-0 right-[1%] flex transform cursor-pointer select-none items-center pr-3" onClick={() => handlePassword('confirmPassword')}>
                      {showPassword['confirmPassword'] === passwordStatus.shown ? passwordIcons.closeEye : passwordIcons.openEye}
                    </span>
                    <input id="confirmPassword" type={showPassword['confirmPassword']} className="border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-[0.9px] pl-3 text-base text-black focus:bg-white focus:outline-none" />
                  </div>
                </section>
                <div className="relative mx-auto my-5">
                  <span className="absolute inset-y-0 left-2 flex items-center text-white">
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
                <section className="flex md:flex-row flex-col gap-2">
                  <label className="font-medium">Responsable</label>
                  <input type="text" name="" id="" className="border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-[0.9px] pl-3 text-base text-black focus:bg-white focus:outline-none" />
                </section>
                <section className="flex flex-col md:flex-row gap-3">
                  <label htmlFor="" className="whitespace-nowrap font-medium">
                    Fecha Creación
                  </label>
                  <input type="date" name="" id="" className="border-gray-400 focus:text-gray-900 w-full md:w-1/3 rounded-md border-[1.2px] bg-white py-[0.9px] pl-3 text-base text-black focus:bg-white focus:outline-none" />
                </section>
                <section className="flex flex-col md:flex-row gap-3">
                  <label htmlFor="" className="whitespace-nowrap font-medium">
                    Fecha Asignado
                  </label>
                  <input type="date" name="" id="" className="border-gray-400 focus:text-gray-900 w-full md:w-1/3 rounded-md border-[1.2px] bg-white py-[0.9px] pl-3 text-base text-black focus:bg-white focus:outline-none" />
                </section>
                <section className="flex flex-col">
                  <label htmlFor="" className="font-medium">
                    Observaciones
                  </label>
                  <textarea name="" id="" rows="10" className="border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] max-h-[8rem] min-h-[2rem] overflow-y-auto  bg-white py-[0.9px] pl-3 text-base  text-black focus:bg-white focus:outline-none" placeholder="Digite alguna observación" />
                </section>

                <div className="flex flex-row my-5">
                  <div className="relative mr-auto">
                    <Button value={'Editar'} bg={'bg-coffee/75'} px={'px-[1rem]'} font={'font-normal'} textSize="text-md" py={'py-1'} rounded={'rounded-xl'} shadow={'shadow-lg'} />
                  </div>
                  <div className="relative ml-auto">
                    <span className="absolute inset-y-0 left-2 flex items-center text-white">
                      <IoSearchOutline />
                    </span>
                    <Button value={'Buscar'} bg={'bg-primary'} px={'pl-7 pr-2'} font={'font-normal'} textSize="text-md" py={'py-1'} rounded={'rounded-xl'} shadow={'shadow-lg'} />
                  </div>
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
