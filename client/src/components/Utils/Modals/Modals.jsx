import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { modalities } from '../../../import/staticData'
import { Button } from '../../Button/Button'

const Modals = ({ closeModal, title, bodyStudent = false, emailStudent, documentStudent, celStudent, trainingProgram, ficha, academicLevel, trainingStage, modalitie, finLectiva, inicioProductiva, company, innmediateSuperior, emailSuperior, workstation, celSuperior, arl, bodyFilter = false, bodyVisits = false, view }) => {
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
    <section className=" fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/70">
      <section className="relative flex h-auto w-1/2 flex-col rounded-2xl bg-white shadow-md">
        <IoMdClose className="absolute right-5 top-[20px] h-7 w-7 cursor-pointer" onClick={handleModal} />
        <header className="grid place-items-center pt-5">
          <h2 className="w-fit border-b-1 border-primary text-center text-xl font-medium">{title}</h2>
        </header>
        <section className="mx-auto w-5/6 flex-auto">
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
          {bodyFilter && (
            <>
              <form action="" className="my-4 flex flex-col justify-center gap-3 pt-2">
                {view.map((filtro, i) => {
                  return (
                    <section key={i}>
                      <div className="grid grid-cols-1 md:grid-cols-2-45-55">
                        <label className="font-semibold" htmlFor="">
                          {filtro.label}
                        </label>
                        {filtro.type === 'number' ? (
                          <input type={filtro.type} name={filtro.name} placeholder={filtro.placeholder} className="border-gray-400 focus:text-gray-900 w-72 rounded-lg border-1 bg-white py-[0.9px] pl-3 text-base text-black focus:bg-white focus:outline-none" />
                        ) : filtro.type === 'date' ? (
                          <input type={filtro.type} name={filtro.name} placeholder={filtro.placeholder} className="border-gray-400 focus:text-gray-900 w-72 rounded-lg border-1 bg-white py-[0.9px] pl-3 text-base text-black focus:bg-white focus:outline-none" />
                        ) : filtro.type === 'text' ? (
                          <input type={filtro.type} name={filtro.name} placeholder={filtro.placeholder} className="border-gray-400 focus:text-gray-900 w-72 rounded-lg border-1 bg-white py-[0.9px] pl-3 text-base text-black focus:bg-white focus:outline-none" />
                        ) : filtro.type === 'select' ? (
                          <select name={filtro.name} className="border-gray-400 focus:text-gray-900 w-72 rounded-lg border-1 bg-white py-[2.5px] pl-3 text-base text-black focus:bg-white focus:outline-none" onFocus={toggleDropdown} onChange={handleOptionSelect}>
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
                    </section>
                  )
                })}

                <div className={`grid w-fit grid-cols-2 ${isOpen === true ? 'mx-4 my-10 gap-2' : 'mx-auto my-5 gap-5'} `}>
                  <Button value={'Limpiar'} bg={'bg-primary'} px={'px-[1rem]'} font={'font-normal'} textSize="text-md" py={'py-1'} rounded={'rounded-xl'} shadow={'shadow-lg'} />
                  <Button value={'Buscar'} bg={'bg-primary'} px={'px-[1rem]'} font={'font-normal'} textSize="text-md" py={'py-1'} rounded={'rounded-xl'} shadow={'shadow-lg'} />
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
