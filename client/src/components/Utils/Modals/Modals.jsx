import { useState, useEffect, useRef } from 'react'

// icons
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { IoSearchOutline } from 'react-icons/io5'
import { BsCheck2Circle } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'

// componentes
import { modalities } from '../../../import/staticData'
import { Button } from '../Button/Button'
import { Select } from '../Select/Select'
import { modalOptionList } from '../../Register-list/RegisterList'
import { getTeachers, inscriptionDetailsUpdate, updateTeacherSeguimiento } from '../../../api/httpRequest'

const Modals = ({ closeModal, title, bodyStudent = false, emailStudent, documentStudent, celStudent, trainingProgram, ficha, academicLevel, trainingStage, modalitie, finLectiva, inicioProductiva, company, innmediateSuperior, emailSuperior, workstation, celSuperior, arl, bodyFilter = false, bodyVisits = false, view, stylesFilterVisits = false, bodyPassword = false, detallesBitacoras = false, subtitle = false, textSubtitle, bodyConfirm = false, bodyAccept = false, loadingFile, setModalOption, denyRegister = false, handleForm }) => {
  const [isOpen, setIsOpen] = useState(true)

  const passwordIcons = {
    openEye: <AiOutlineEye />,
    closeEye: <AiOutlineEyeInvisible />
  }

  const passwordStatus = {
    shown: 'text',
    hidden: 'password'
  }

  const [showPassword, setShowPassword] = useState(passwordStatus.hidden)

  const handlePassword = (id) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [id]: prevState[id] === passwordStatus.shown ? passwordStatus.hidden : passwordStatus.shown
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

  const continueLoadFile = () => {
    setModalOption(modalOptionList.loadingExcelModal)
  }

  return (
    <section className='fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen'>
      <aside className='absolute inset-0 w-full h-full bg-black/50 backdrop-blur-sm backdrop-filter' onClick={handleModal} />
      <section className={`relative flex h-auto w-11/12 ${bodyStudent ? 'md:w-1/2' : ' md:w-2/5'} flex-col rounded-2xl bg-white bounce`}>
        <IoMdClose className='absolute right-5 top-[20px] h-7 w-7 cursor-pointer ' onClick={handleModal} />
        <header className='grid pt-5 place-items-center '>
          <h2 className={`text-xl font-medium text-center w-fit ${subtitle === true ? 'border-0' : 'border-b-1'} border-primary`}>{title}</h2>
          {subtitle && <span className='w-1/2 text-sm font-light text-center border-b-1 border-primary'>{textSubtitle}</span>}
        </header>
        <section className={`${stylesFilterVisits === false ? 'mx-auto w-5/6 flex-auto' : 'mx-auto w-fit'}`}>
          {/* modalAprendices */}
          {bodyStudent && (
            <>
              <section className='pt-3 pb-2'>
                <section className='grid grid-cols-2-45-55'>
                  <span className='font-medium'>Email:</span>
                  <span>{emailStudent}</span>
                </section>
                <section className='grid grid-cols-2-45-55'>
                  <span className='font-medium'>Documento de identidad:</span>
                  <span>{documentStudent}</span>
                </section>
                <section className='grid grid-cols-2-45-55'>
                  <span className='font-medium'>Contacto:</span>
                  <span>{celStudent}</span>
                </section>
              </section>
              <hr className='w-full text-primary' />
              <section className='py-2'>
                <section className='grid grid-cols-2-45-55'>
                  <span className='font-medium'>Programa:</span>
                  <span>{trainingProgram}</span>
                </section>
                <section className='grid grid-cols-2-45-55'>
                  <span className='font-medium'>Ficha:</span>
                  <span>{ficha}</span>
                </section>
                <section className='grid grid-cols-2-45-55'>
                  <span className='font-medium'>Nivel académico:</span>
                  <span>{academicLevel}</span>
                </section>
                <section className='grid grid-cols-2-45-55'>
                  <span className='font-medium'>Etapa:</span>
                  <span>{trainingStage}</span>
                </section>
                <section className='grid grid-cols-2-45-55'>
                  <span className='font-medium'>Modalidad:</span>
                  <span>{modalitie}</span>
                </section>
                <section className='grid grid-cols-2-45-55'>
                  <span className='font-medium'>Fin lectiva:</span>
                  <span>{finLectiva}</span>
                </section>
                <section className='grid grid-cols-2-45-55'>
                  <span className='font-medium'>Inicio productiva:</span>
                  <span>{inicioProductiva}</span>
                </section>
              </section>
              <hr className='w-full text-primary' />
              <section className='py-3 pt-2'>
                <section className='grid grid-cols-2-45-55'>
                  <span className='font-medium'>Empresa:</span>
                  <span>{company}</span>
                </section>
                <section className='grid grid-cols-2-45-55'>
                  <span className='font-medium'>Jefe Inmediato:</span>
                  <span>{innmediateSuperior}</span>
                </section>
                <section className='grid grid-cols-2-45-55'>
                  <span className='font-medium'>Cargo:</span>
                  <span>{workstation}</span>
                </section>
                <section className='grid grid-cols-2-45-55'>
                  <span className='font-medium'>Email:</span>
                  <span>{emailSuperior}</span>
                </section>
                <section className='grid grid-cols-2-45-55'>
                  <span className='font-medium'>Contacto:</span>
                  <span>{celSuperior}</span>
                </section>
                <section className='grid grid-cols-2-45-55'>
                  <span className='font-medium'>ARL:</span>
                  <span>{arl}</span>
                </section>
              </section>
            </>
          )}
          {/* modalFiltro */}
          {bodyFilter && (
            <>
              <form action=''>
                <section className={`${stylesFilterVisits === false ? 'my-4 flex flex-col justify-center gap-3 pt-2' : 'grid grid-cols-2 grid-rows-2-50-50 gap-x-9 gap-y-3 pb-6 pt-4 '}`}>
                  {view.map((filtro, i) => {
                    return (
                      <section key={i}>
                        <div className={`${stylesFilterVisits === false ? 'grid grid-cols-1 md:grid-cols-2-45-55' : 'flex flex-col '}`}>
                          <label className='font-semibold ' htmlFor=''>
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
                  <Button bg={'bg-primary'} px={'px-[1rem]'} font={'font-normal'} textSize='text-md' py={'py-1'} rounded={'rounded-xl'} shadow={'shadow-lg'}>
                    Limpiar
                  </Button>
                  <div className='relative mx-auto'>
                    <span className='absolute inset-y-0 flex items-center text-white left-2'>
                      <IoSearchOutline />
                    </span>
                    <Button bg={'bg-primary'} px={'pl-7 pr-2'} font={'font-normal'} textSize='text-md' py={'py-1'} rounded={'rounded-xl'} shadow={'shadow-lg'}>
                      Buscar
                    </Button>
                  </div>
                </div>
              </form>
            </>
          )}
          {bodyVisits && <>Tampoco da xd</>}

          {/* ModalContraseña */}
          {bodyPassword && (
            <>
              <form action='' className='flex flex-col gap-3 pt-6'>
                <section className='grid grid-cols-2'>
                  <label className='font-semibold w-fit whitespace-nowrap' htmlFor=''>
                    Contraseña Anterior
                  </label>
                  <div className='relative w-full mx-auto text-gray-400'>
                    <span className='absolute inset-y-0 right-[1%] flex transform cursor-pointer select-none items-center pr-3' onClick={() => handlePassword('oldPassword')}>
                      {showPassword.oldPassword === passwordStatus.shown ? passwordIcons.closeEye : passwordIcons.openEye}
                    </span>
                    <input id='oldPassword' type={showPassword.oldPassword} className='border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-[0.9px] pl-3 text-base text-black focus:bg-white focus:outline-none' />
                  </div>
                </section>
                <section className='grid grid-cols-2-50-50'>
                  <label className='font-semibold w-fit whitespace-nowrap' htmlFor=''>
                    Nueva Contraseña
                  </label>
                  <div className='relative w-full mx-auto text-gray-400'>
                    <span className='absolute inset-y-0 right-[1%] flex transform cursor-pointer select-none items-center pr-3' onClick={() => handlePassword('newPassword')}>
                      {showPassword.newPassword === passwordStatus.shown ? passwordIcons.closeEye : passwordIcons.openEye}
                    </span>
                    <input id='newPassword' type={showPassword.newPassword} className='border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-[0.9px] pl-3 text-base text-black focus:bg-white focus:outline-none' />
                  </div>
                </section>
                <section className='grid grid-cols-2'>
                  <label className='font-semibold w-fit whitespace-nowrap' htmlFor=''>
                    Confirmar Contraseña
                  </label>
                  <div className='relative w-full mx-auto text-gray-400'>
                    <span className='absolute inset-y-0 right-[1%] flex transform cursor-pointer select-none items-center pr-3' onClick={() => handlePassword('confirmPassword')}>
                      {showPassword.confirmPassword === passwordStatus.shown ? passwordIcons.closeEye : passwordIcons.openEye}
                    </span>
                    <input id='confirmPassword' type={showPassword.confirmPassword} className='border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-[0.9px] pl-3 text-base text-black focus:bg-white focus:outline-none' />
                  </div>
                </section>
                <div className='relative mx-auto my-5'>
                  <span className='absolute inset-y-0 flex items-center text-white left-2'>
                    <BsCheck2Circle />
                  </span>
                  <Button bg={'bg-primary'} px={'pl-7 pr-2'} font={'font-normal'} textSize='text-md' py={'py-1'} rounded={'rounded-xl'} shadow={'shadow-lg'}>
                    Guardar
                  </Button>
                </div>
              </form>
            </>
          )}
          {detallesBitacoras && (
            <>
              <form action='' className='flex flex-col gap-3 pt-8'>
                <section className='flex flex-col gap-2 md:flex-row'>
                  <label className='font-medium'>Responsable</label>
                  <input type='text' name='' id='' className='border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-[0.9px] pl-3 text-base text-black focus:bg-white focus:outline-none' />
                </section>
                <section className='flex flex-col gap-3 md:flex-row'>
                  <label htmlFor='' className='font-medium whitespace-nowrap'>
                    Fecha Creación
                  </label>
                  <input type='date' name='' id='' className='border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-[0.9px] pl-3 text-base text-black focus:bg-white focus:outline-none md:w-1/3' />
                </section>
                <section className='flex flex-col gap-3 md:flex-row'>
                  <label htmlFor='' className='font-medium whitespace-nowrap'>
                    Fecha Asignado
                  </label>
                  <input type='date' name='' id='' className='border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-[0.9px] pl-3 text-base text-black focus:bg-white focus:outline-none md:w-1/3' />
                </section>
                <section className='flex flex-col'>
                  <label htmlFor='' className='font-medium'>
                    Observaciones
                  </label>
                  <textarea name='' id='' rows='10' className='border-gray-400 focus:text-gray-900 max-h-[8rem] min-h-[2rem] w-full overflow-y-auto rounded-md border-[1.2px]  bg-white py-[0.9px] pl-3 text-base  text-black focus:bg-white focus:outline-none' placeholder='Digite alguna observación' />
                </section>

                <div className='flex flex-row my-5'>
                  <div className='relative mr-auto'>
                    <Button bg={'bg-coffee/75'} px={'px-[1rem]'} font={'font-normal'} textSize='text-md' py={'py-1'} rounded={'rounded-xl'} shadow={'shadow-lg'}>
                      Editar
                    </Button>
                  </div>
                  <div className='relative ml-auto'>
                    <span className='absolute inset-y-0 flex items-center text-white left-2'>
                      <IoSearchOutline />
                    </span>
                    <Button bg={'bg-primary'} px={'pl-7 pr-2'} font={'font-normal'} textSize='text-md' py={'py-1'} rounded={'rounded-xl'} shadow={'shadow-lg'}>
                      Buscar
                    </Button>
                  </div>
                </div>
              </form>
            </>
          )}
          {bodyConfirm && (
            <>
              <section className='my-3'>
                <p className='text-center text-slate-400/90'>
                  Archivo a cargar: <span className='text-blue-500'>{loadingFile}</span>
                </p>
                <p className='text-lg font-bold text-center text-red-500 underline'>¡No podrás deshacer está acción!</p>
                <section className='mt-3'>
                  <div className='flex items-center justify-between gap-3'>
                    <Button bg='bg-green-500' hover='bg-green-800' textSize='text-base' px='px-10' onClick={continueLoadFile}>
                      Continuar
                    </Button>
                    <Button bg='bg-red-500' hover='bg-red-800' textSize='text-base' px='px-10' onClick={handleModal}>
                      Deshacer
                    </Button>
                  </div>
                </section>
              </section>
            </>
          )}
          {bodyAccept && (
            <>
              <section className='mx-8 my-6'>
                <h2 className='text-lg font-bold text-center text-green-500'>¡Archivo cargado correctamente!</h2>
                <section className='mt-3'>
                  <div className='flex items-center justify-between gap-3'>
                    <Button bg='bg-slate-500' hover='bg-slate-700' textSize='text-base' px='px-10' onClick={handleModal}>
                      Aceptar
                    </Button>
                  </div>
                </section>
              </section>
            </>
          )}
          {denyRegister && (
            <>
              <section className='p-4'>
                <form className='flex flex-col justify-center gap-4' onSubmit={handleForm}>
                  <div>
                    <label htmlFor='observations' className='text-sm font-light'>
                      Observaciones
                    </label>
                    <textarea name='observations' id='editor' rows='3' className='block w-full h-[5rem] px-3 py-2 overflow-y-auto text-sm text-black bg-white shadow-md border-t-[0.5px] border-slate-200 resize-none focus:text-gray-900 rounded-xl shadow-slate-400 focus:bg-white focus:outline-none placeholder:text-slate-400 placeholder:font-light' placeholder='Deja una observación' />
                  </div>
                  <Button bg='bg-primary' hover='bg-green-800' textSize='text-base' px='px-10' type={'submit'}>
                    Enviar
                  </Button>
                </form>
              </section>
            </>
          )}
        </section>
      </section>
    </section>
  )
}

export const AsignTeacherModal = ({ closeModal, title, numero_ficha, programa_formacion, setNotify }) => {
  const handleModal = () => {
    closeModal()
  }

  const [teachers, setTeacher] = useState([])

  const getInstructores = async () => {
    try {
      const response = await getTeachers()
      const { data } = response.data
      setTeacher(data)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    getInstructores()
  }, [])

  const option = teachers.map((teacher) => ({
    value: teacher.nombres_usuario + ' ' + teacher.apellidos_usuario,
    key: teacher.id_usuario
  }))

  const [valor, setValor] = useState()

  const updateTeacher = async (e) => {
    e.preventDefault()
    const instructor_seguimiento = valor
    const num_ficha = numero_ficha
    try {
      await updateTeacherSeguimiento(num_ficha, instructor_seguimiento)
      setNotify(true)
      closeModal()
    } catch (error) {
      closeModal()
      throw new Error(error)
    }
  }
  return (
    <section className='fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen'>
      <aside className='absolute inset-0 w-full h-full bg-black/50 backdrop-blur-sm backdrop-filter' onClick={handleModal} />
      <section className={`relative flex h-auto w-11/12 md:w-2/5 flex-col rounded-2xl bg-white bounce`}>
        <IoMdClose className='absolute right-5 top-[20px] h-7 w-7 cursor-pointer' onClick={handleModal} />
        <header className='grid pt-5 place-items-center '>
          <h2 className={`text-xl font-medium text-center w-fit border-primary`}>{title}</h2>
        </header>
        <section className='flex justify-center'>
          <section className='flex flex-col w-11/12 gap-3 my-5'>
            <header>
              <h3 className='text-[16px] font-medium text-right'>{numero_ficha}</h3>
              <h3 className='text-[16px] font-light text-right'>{programa_formacion}</h3>
            </header>
            <form action='' onSubmit={updateTeacher} className='flex flex-col gap-6'>
              <div>
                <label htmlFor='asig' className='text-[16px] font-normal'>
                  Instructor Seguimiento
                </label>
                <Select
                  placeholder='Nombre instructor'
                  isSearch
                  hoverColor='hover:bg-teal-200'
                  hoverTextColor='hover:text-teal-800'
                  placeholderSearch='Ingrese nombre instructor'
                  selectedColor='bg-teal-600 text-white'
                  rounded='rounded-xl'
                  borderColor='border-slate-500'
                  options={option}
                  onSelect={(selectedValue) => {
                    setValor(selectedValue)
                  }}
                />
              </div>
              <Button type='submit' rounded='rounded-full' bg='bg-green-600' px='px-3' py='py-[4px]' textSize='text-ms' font='font-medium' textColor='text-white' inline>
                <BsCheck2Circle className='text-xl' /> Asignar
              </Button>
            </form>
          </section>
        </section>
      </section>
    </section>
  )
}

const DenyModal = ({ closeModal, title, id, setNotify }) => {
  const formRef = useRef()

  const handleModal = () => {
    closeModal()
  }

  const handleForm = async (e) => {
    e.preventDefault()
    const formData = new FormData(formRef.current)
    const dataTextArea = formData.get('observaciones')
    const estado_aval = 'Rechazado'
    try {
      await inscriptionDetailsUpdate(id, { observaciones: dataTextArea, estado_aval })
      setNotify(true)
      closeModal()
    } catch (error) {
      closeModal()
    }
  }

  return (
    <section className='fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen'>
      <aside className='absolute inset-0 w-full h-full bg-black/50 backdrop-blur-sm backdrop-filter' onClick={handleModal} />
      <section className={`relative flex h-auto w-11/12 md:w-2/5 flex-col rounded-2xl bg-white bounce`}>
        <IoMdClose className='absolute right-5 top-[20px] h-7 w-7 cursor-pointer ' onClick={handleModal} />
        <header className='grid pt-5 place-items-center '>
          <h2 className={`text-xl font-medium text-center w-fit 'border-b-1' border-primary`}>{title ?? 'Confirmar'}</h2>
        </header>
        <section className='flex justify-center'>
          <section className='w-11/12 p-4'>
            <form className='flex flex-col justify-center gap-4' ref={formRef} onSubmit={handleForm}>
              <section>
                <label htmlFor='observaciones' className='text-sm font-light'>
                  Observaciones
                </label>
                <textarea name='observaciones' id='editor' rows='3' className='block w-full h-[5rem] px-3 py-2 overflow-y-auto text-sm text-black bg-white shadow-md border-t-[0.5px] border-slate-200 resize-none focus:text-gray-900 rounded-xl shadow-slate-400 focus:bg-white focus:outline-none placeholder:text-slate-400 placeholder:font-light' placeholder='Deja una observación' />
              </section>
              <Button bg='bg-primary' hover='bg-green-800' textSize='text-base' px='px-10' type={'submit'}>
                Enviar
              </Button>
            </form>
          </section>
        </section>
      </section>
    </section>
  )
}

const LoadingModal = ({ children, title = 'Cargando' }) => {
  return (
    <section className='fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black/50 backdrop-blur-sm backdrop-filter'>
      <section className='relative flex flex-col w-11/12 h-auto bg-white md:w-2/5 rounded-2xl bounce'>
        <header className='grid pt-5 place-items-center'>
          <h2 className='text-xl font-medium text-center w-fit border-b-1 border-primary'>{title}</h2>
        </header>
        <section className='mx-auto w-fit'>{children}</section>
      </section>
    </section>
  )
}

export { Modals, DenyModal, LoadingModal }
