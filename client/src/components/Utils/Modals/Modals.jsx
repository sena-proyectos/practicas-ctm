import { useState, useEffect, useRef } from 'react'

// icons
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { IoSearchOutline } from 'react-icons/io5'
import { BsCheck2Circle } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'

// componentes
import { Button } from '../Button/Button'
import { Select } from '../Select/Select'
import { modalOptionList } from '../../Register-list/RegisterList'
import { getTeachers, inscriptionDetailsUpdate, updateTeacherSeguimiento } from '../../../api/httpRequest'

const BitacoraModal = ({ closeModal, title }) => {
  /**
   * Función para manejar el cierre del modal.
   *
   * @function
   * @name handleModal
   * @returns {void}
   *
   * @example
   * handleModal();
   */
  const handleModal = () => {
    closeModal()
  }

  return (
    <section className='fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen'>
      <aside className='absolute inset-0 w-full h-full bg-black/50 backdrop-blur-sm backdrop-filter' onClick={handleModal} />
      <section className={`relative flex h-auto w-11/12 md:w-2/5 flex-col rounded-2xl bg-white bounce`}>
        <IoMdClose className='absolute right-5 top-[20px] h-7 w-7 cursor-pointer ' onClick={handleModal} />
        <header className='grid pt-5 place-items-center '>
          <h2 className='text-xl font-medium text-center w-fit border-b-1 border-primary'>{title}</h2>
        </header>
        <section className='flex-auto w-5/6 mx-auto'>
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
        </section>
      </section>
    </section>
  )
}

const FilterModal = ({ closeModal, width = 'w-2/5', title, children }) => {
  /**
   * Función para manejar el cierre del modal.
   *
   * @function
   * @name handleModal
   * @returns {void}
   *
   * @example
   * handleModal();
   */
  const handleModal = () => {
    closeModal()
  }

  return (
    <section className='fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen'>
      <aside className='absolute inset-0 w-full h-full bg-black/50 backdrop-blur-sm backdrop-filter' onClick={handleModal} />
      <section className={`relative flex h-auto ${width} flex-col rounded-2xl bg-white bounce`}>
        <IoMdClose className='absolute right-5 top-[20px] h-7 w-7 cursor-pointer ' onClick={handleModal} />
        <header className='grid pt-5 place-items-center '>
          <h2 className={`text-xl font-medium text-center w-fit border-b-1 border-primary`}>{title}</h2>
        </header>
        <section className='flex justify-center'>
          <section className='w-11/12 p-4'>{children}</section>
        </section>
      </section>
    </section>
  )
}

const PasswordModal = ({ closeModal, title, onSavePassword }) => {
  /**
   * Función para manejar el cierre del modal.
   *
   * @function
   * @name handleModal
   * @returns {void}
   *
   * @example
   * handleModal();
   */
  const handleModal = () => {
    closeModal()
  }

  /**
   * Iconos para mostrar y ocultar la contraseña.
   *
   * @constant
   * @name passwordIcons
   * @type {object}
   *
   * @example
   * const iconosContraseña = passwordIcons;
   */
  const passwordIcons = {
    openEye: <AiOutlineEye />,
    closeEye: <AiOutlineEyeInvisible />
  }

  /**
   * Estados para mostrar u ocultar contraseñas.
   *
   * @constant
   * @name passwordStatus
   * @type {object}
   *
   * @example
   * const estadosContraseña = passwordStatus;
   */
  const passwordStatus = {
    shown: 'text',
    hidden: 'password'
  }

  const [showOldPassword, setShowOldPassword] = useState(passwordStatus.hidden)
  const [showNewPassword, setShowNewPassword] = useState(passwordStatus.hidden)
  const [showConfirmPassword, setShowConfirmPassword] = useState(passwordStatus.hidden)

  /**
   * Función para manejar el cambio de visibilidad de la antigua contraseña.
   *
   * @function
   * @name handleOldPassword
   * @returns {void}
   *
   * @example
   * handleOldPassword();
   */
  const handleOldPassword = () => (showOldPassword === passwordStatus.shown ? setShowOldPassword(passwordStatus.hidden) : setShowOldPassword(passwordStatus.shown))
  /**
   * Función para manejar el cambio de visibilidad de la nueva contraseña.
   *
   * @function
   * @name handleNewPassword
   * @returns {void}
   *
   * @example
   * handleNewPassword();
   */
  const handleNewPassword = () => (showNewPassword === passwordStatus.shown ? setShowNewPassword(passwordStatus.hidden) : setShowNewPassword(passwordStatus.shown))
  /**
   * Función para manejar el cambio de visibilidad de la confirmación de contraseña.
   *
   * @function
   * @name handleConfirmPassword
   * @returns {void}
   *
   * @example
   * handleConfirmPassword();
   */
  const handleConfirmPassword = () => (showConfirmPassword === passwordStatus.shown ? setShowConfirmPassword(passwordStatus.hidden) : setShowConfirmPassword(passwordStatus.shown))

  const handleSavePassword = async (e) => {
    e.preventDefault()

    const formPassword = Object.fromEntries(new FormData(e.target))
    onSavePassword(formPassword)

    closeModal()
  }

  return (
    <section className='fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen'>
      <aside className='absolute inset-0 w-full h-full bg-black/50 backdrop-blur-sm backdrop-filter' onClick={handleModal} />
      <section className={`relative flex h-auto flex-col rounded-2xl bg-white bounce`}>
        <IoMdClose className='absolute right-5 top-[20px] h-7 w-7 cursor-pointer ' onClick={handleModal} />
        <header className='grid pt-5 place-items-center '>
          <h2 className={`text-xl font-medium text-center w-fit border-b-1 border-primary`}>{title}</h2>
        </header>
        <section className='flex justify-center'>
          <section className='w-11/12 p-4'>
            <form onSubmit={handleSavePassword} className='flex flex-col gap-3 pt-6'>
              <section className='grid grid-cols-2'>
                <label className='font-semibold w-fit whitespace-nowrap' htmlFor=''>
                  Contraseña Anterior
                </label>
                <div className='relative w-full mx-auto text-gray-400'>
                  <span onClick={handleOldPassword} className='absolute inset-y-0 right-0 flex items-center pr-3 transition cursor-pointer select-none text-slate-600 hover:text-slate-800'>
                    {showOldPassword === passwordStatus.shown ? passwordIcons.closeEye : passwordIcons.openEye}
                  </span>
                  <input name='oldPassword' type={showOldPassword} className='border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-[0.9px] pl-3 text-base text-black focus:bg-white focus:outline-none' autoComplete='on' />
                </div>
              </section>
              <section className='grid grid-cols-2-50-50'>
                <label className='font-semibold w-fit whitespace-nowrap' htmlFor=''>
                  Nueva Contraseña
                </label>
                <div className='relative w-full mx-auto text-gray-400'>
                  <div className='relative w-full mx-auto text-gray-400'>
                    <span onClick={handleNewPassword} className='absolute inset-y-0 right-0 flex items-center pr-3 transition cursor-pointer select-none text-slate-600 hover:text-slate-800'>
                      {showNewPassword === passwordStatus.shown ? passwordIcons.closeEye : passwordIcons.openEye}
                    </span>
                    <input name='newPassword' type={showNewPassword} className='border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-[0.9px] pl-3 text-base text-black focus:bg-white focus:outline-none' autoComplete='on' />
                  </div>
                </div>
              </section>
              <section className='grid grid-cols-2'>
                <label className='font-semibold w-fit whitespace-nowrap' htmlFor=''>
                  Confirmar Contraseña
                </label>
                <div className='relative w-full mx-auto text-gray-400'>
                  <div className='relative w-full mx-auto text-gray-400'>
                    <span onClick={handleConfirmPassword} className='absolute inset-y-0 right-0 flex items-center pr-3 transition cursor-pointer select-none text-slate-600 hover:text-slate-800'>
                      {showConfirmPassword === passwordStatus.shown ? passwordIcons.closeEye : passwordIcons.openEye}
                    </span>
                    <input name='confirmPassword' type={showConfirmPassword} className='border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-[0.9px] pl-3 text-base text-black focus:bg-white focus:outline-none' autoComplete='on' />
                  </div>
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
          </section>
        </section>
      </section>
    </section>
  )
}

const InfoStudentModal = ({ closeModal, title, emailStudent, documentStudent, cellPhoneNumber, program, courseNumber, academicLevel, formationStage, modalitie, lectivaEnd, productiveStart, company, innmediateSuperior, positionSuperior, emailSuperior, celphoneSuperior, arl }) => {
  /**
   * Función para manejar el cierre del modal.
   *
   * @function
   * @name handleModal
   * @returns {void}
   *
   * @example
   * handleModal();
   */
  const handleModal = () => {
    closeModal()
  }

  return (
    <section className='fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen'>
      <aside className='absolute inset-0 w-full h-full bg-black/50 backdrop-blur-sm backdrop-filter' onClick={handleModal} />
      <section className={`relative flex h-auto w-11/12 md:w-1/2 flex-col rounded-2xl bg-white bounce`}>
        <IoMdClose className='absolute right-5 top-[20px] h-7 w-7 cursor-pointer ' onClick={handleModal} />
        <header className='grid pt-5 place-items-center '>
          <h2 className={`text-xl font-medium text-center w-fit border-b-1 border-primary`}>{title}</h2>
        </header>
        <section className='flex justify-center'>
          <section className='w-11/12 p-4'>
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
                <span>{cellPhoneNumber}</span>
              </section>
            </section>
            <hr className='w-full text-primary' />
            <section className='py-2'>
              <section className='grid grid-cols-2-45-55'>
                <span className='font-medium'>Programa:</span>
                <span>{program}</span>
              </section>
              <section className='grid grid-cols-2-45-55'>
                <span className='font-medium'>Ficha:</span>
                <span>{courseNumber}</span>
              </section>
              <section className='grid grid-cols-2-45-55'>
                <span className='font-medium'>Nivel académico:</span>
                <span>{academicLevel}</span>
              </section>
              <section className='grid grid-cols-2-45-55'>
                <span className='font-medium'>Etapa:</span>
                <span>{formationStage}</span>
              </section>
              <section className='grid grid-cols-2-45-55'>
                <span className='font-medium'>Modalidad:</span>
                <span>{modalitie}</span>
              </section>
              <section className='grid grid-cols-2-45-55'>
                <span className='font-medium'>Fin lectiva:</span>
                <span>{lectivaEnd}</span>
              </section>
              <section className='grid grid-cols-2-45-55'>
                <span className='font-medium'>Inicio productiva:</span>
                <span>{productiveStart}</span>
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
                <span>{positionSuperior}</span>
              </section>
              <section className='grid grid-cols-2-45-55'>
                <span className='font-medium'>Email:</span>
                <span>{emailSuperior}</span>
              </section>
              <section className='grid grid-cols-2-45-55'>
                <span className='font-medium'>Contacto:</span>
                <span>{celphoneSuperior}</span>
              </section>
              <section className='grid grid-cols-2-45-55'>
                <span className='font-medium'>ARL:</span>
                <span>{arl}</span>
              </section>
            </section>
          </section>
        </section>
      </section>
    </section>
  )
}

const AsignTeacherModal = ({ closeModal, title, numero_ficha, programa_formacion, setNotify }) => {
  /**
   * Función para manejar el cierre del modal.
   *
   * @function
   * @name handleModal
   * @returns {void}
   *
   * @example
   * handleModal();
   */
  const handleModal = () => {
    closeModal()
  }

  const [teachers, setTeacher] = useState([])
  const [selectedOptionKey, setSelectedOptionKey] = useState('')

  /**
   * Función para obtener la lista de instructores.
   *
   * @function
   * @name getInstructores
   * @returns {void}
   *
   * @example
   * getInstructores();
   */
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

  /**
   * Opciones de instructores para un select.
   *
   * @constant
   * @name option
   * @type {array}
   *
   * @example
   * const opcionesInstructores = option;
   */
  const option = teachers.map((teacher) => ({
    value: teacher.nombres_usuario + ' ' + teacher.apellidos_usuario + ' - ' + teacher.email_usuario,
    key: teacher.id_usuario
  }))

  /**
   * Función para manejar el cambio de opción seleccionada en el select.
   *
   * @function
   * @name handleSelectChange
   * @param {string} optionKey - Clave de la opción seleccionada.
   * @returns {void}
   *
   * @example
   * handleSelectChange('claveOpcion');
   */
  const handleSelectChange = (optionKey) => {
    setSelectedOptionKey(optionKey)
  }

  /**
   * Función para actualizar el instructor asignado.
   *
   * @function
   * @name updateTeacher
   * @param {Event} e - Evento de envío del formulario.
   * @returns {void}
   *
   * @example
   * updateTeacher(event);
   */
  const updateTeacher = async (e) => {
    e.preventDefault()

    const id_instructor = selectedOptionKey
    const num_ficha = numero_ficha

    try {
      await updateTeacherSeguimiento(num_ficha, id_instructor)
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
            <form onSubmit={updateTeacher} className='flex flex-col gap-6'>
              <div>
                <label htmlFor='asig' className='text-[16px] font-normal'>
                  Instructor Seguimiento
                </label>
                <Select
                  name='name_instructor'
                  placeholder='Nombre instructor'
                  isSearch
                  hoverColor='hover:bg-teal-200'
                  hoverTextColor='hover:text-teal-800'
                  placeholderSearch='Ingrese nombre instructor'
                  selectedColor='bg-teal-600 text-white'
                  rounded='rounded-xl'
                  characters='45'
                  borderColor='border-slate-500'
                  options={option}
                  selectedKey={selectedOptionKey}
                  onChange={handleSelectChange} // Pasar el manejador de cambio
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

const ModalConfirm = ({ closeModal, title, loadingFile, setModalOption }) => {
  /**
   * Función para manejar el cierre del modal.
   *
   * @function
   * @name handleModal
   * @returns {void}
   *
   * @example
   * handleModal();
   */
  const handleModal = () => {
    closeModal()
  }

  /**
   * Función para continuar con la carga de un archivo.
   *
   * @function
   * @name continueLoadFile
   * @returns {void}
   *
   * @example
   * continueLoadFile();
   */
  const continueLoadFile = () => {
    setModalOption(modalOptionList.loadingExcelModal)
  }

  return (
    <section className='fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen'>
      <aside className='absolute inset-0 w-full h-full bg-black/50 backdrop-blur-sm backdrop-filter' onClick={handleModal} />
      <section className={`relative flex h-auto  flex-col rounded-2xl bg-white bounce`}>
        <IoMdClose className='absolute right-5 top-[20px] h-7 w-7 cursor-pointer ' onClick={handleModal} />
        <header className='grid pt-5 place-items-center '>
          <h2 className={`text-xl font-medium text-center w-fit border-b-1 border-primary`}>{title}</h2>
        </header>
        <section className='flex justify-center'>
          <section className='w-11/12 p-4'>
            <section className='my-3'>
              <p className='text-center text-slate-400/90'>
                Archivo a cargar: <span className='text-blue-500'>{loadingFile}</span>
              </p>
              <p className='text-lg font-bold text-center text-red-500 underline'>¡No podrás deshacer está acción!</p>
              <section className='mt-3'>
                <div className='flex items-center justify-between gap-3'>
                  <Button bg='bg-green-500' rounded='rounded-md' py='py-1.5' hover='bg-green-800' textSize='text-base' px='px-10' onClick={continueLoadFile}>
                    Continuar
                  </Button>
                  <Button bg='bg-red-500' rounded='rounded-md' py='py-1.5' hover='bg-red-800' textSize='text-base' px='px-10' onClick={handleModal}>
                    Deshacer
                  </Button>
                </div>
              </section>
            </section>
          </section>
        </section>
      </section>
    </section>
  )
}

const DenyModal = ({ closeModal, title, id, setNotify }) => {
  const formRef = useRef()

  /**
   * Función para manejar el cierre del modal.
   *
   * @function
   * @name handleModal
   * @returns {void}
   *
   * @example
   * handleModal();
   */
  const handleModal = () => {
    closeModal()
  }

  /**
   * Función para manejar el envío del formulario.
   *
   * @function
   * @name handleForm
   * @param {Event} e - Evento de envío del formulario.
   * @returns {void}
   *
   * @example
   * handleForm(event);
   */
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

export { BitacoraModal, FilterModal, PasswordModal, InfoStudentModal, AsignTeacherModal, ModalConfirm, DenyModal, LoadingModal }
