import { useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { IoMdClose } from 'react-icons/io'
import { modalities } from '../../../import/staticData'
import { Button } from '../../Button/Button'

const Modals = ({ closeModal, title, bodyStudent = false, emailStudent, documentStudent, celStudent, trainingProgram, ficha, academicLevel, trainingStage, modalitie, finLectiva, inicioProductiva, company, innmediateSuperior, emailSuperior, workstation, celSuperior, arl, bodyFilter = false, bodyVisits = false, view, stylesFilterVisits = false }) => {
  const [isOpen, setIsOpen] = useState(false)

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
    <section className=" w-screen h-screen fixed top-0 left-0 bg-black/70 items-center justify-center flex z-50">
      <section className="w-1/2 bg-white relative rounded-2xl shadow-md h-auto flex flex-col">
        <IoMdClose className="w-7 h-7 absolute top-[20px] right-5 cursor-pointer" onClick={handleModal} />
        <header className="grid place-items-center pt-5">
          <h2 className="text-xl w-fit text-center font-medium border-b-1 border-primary">{title}</h2>
        </header>
        <section className={`${stylesFilterVisits === false ? 'flex-auto w-5/6 mx-auto' : 'w-fit mx-auto'}`}>
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
              <section className="pt-2 py-3">
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
          {bodyFilter && (
            <>
              <form action="">
                <section className={`${stylesFilterVisits === false ? 'flex flex-col justify-center my-4 gap-3 pt-2' : 'grid grid-cols-2 grid-rows-2-50-50 gap-x-9 gap-y-3 pt-4 pb-6'}`}>
                  {view.map((filtro, i) => {
                    return (
                      <section key={i}>
                        <div className={`${stylesFilterVisits === false ? 'grid grid-cols-1 md:grid-cols-2-45-55' : 'flex flex-col'}`}>
                          <label className="font-semibold" htmlFor="">
                            {filtro.label}
                          </label>
                          <div>
                            {filtro.type === 'date' ? (
                              <input type={filtro.type} name={filtro.name} placeholder={filtro.placeholder} className={`py-[0.9px] text-base text-black bg-white border-[1.2px] border-gray-400 rounded-md pl-3 focus:outline-none focus:bg-white focus:text-gray-900 ${stylesFilterVisits === false ? 'w-full' : 'w-full'}`} />
                            ) : filtro.type === 'text' ? (
                              <input type={filtro.type} name={filtro.name} placeholder={filtro.placeholder} className={`py-[0.9px] text-base text-black bg-white border-[1.2px] border-gray-400 rounded-md pl-3 focus:outline-none focus:bg-white focus:text-gray-900 ${stylesFilterVisits === false ? 'w-full' : 'w-full'}`} />
                            ) : filtro.type === 'select' ? (
                              <select name={filtro.name} className={`py-[2.5px] text-base text-black bg-white border-[1.2px] border-gray-400 rounded-md pl-3 focus:outline-none focus:bg-white focus:text-gray-900 ${stylesFilterVisits === false ? 'w-full' : 'w-full'}`} onFocus={toggleDropdown} onChange={handleOptionSelect}>
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
                <div className={`w-fit grid grid-cols-2 ${isOpen === true ? 'my-12 mx-4 gap-2' : 'mx-auto my-5 gap-5'} `}>
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
        </section>
      </section>
    </section>
  )
}

export { Modals }
