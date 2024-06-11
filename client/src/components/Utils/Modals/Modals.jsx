import { useState, useEffect, useRef } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import Swal from 'sweetalert2'

// icons
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { BsCheck2Circle } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'
import { LuSave } from 'react-icons/lu'
import { PiTrashBold } from 'react-icons/pi'

// componentes
import { Button } from '../Button/Button'
import { Select } from '../Select/Select'
import { modalOptionList } from '../../Register-list/RegisterList'
import { GetTeacherByName, createCourse, createStudent, getTeachers, inscriptionDetailsUpdate, updateTeacherSeguimiento, registerUser, createVisit } from '../../../api/httpRequest'
import { studentsValidation } from '../../../validation/studentsValidation'
import { coursesValidation } from '../../../validation/coursesValidation'
import { addTeacherValidation } from '../../../validation/addTeacherValidation'
import { visitValidation } from '../../../validation/visitValidation'
import { getUserID } from '../../../import/getIDActualUser'

const RegisterStudentModal = ({ closedModal, title }) => {
  const handleModal = () => {
    closedModal()
  }

  /**
   * @constant initialState
   *
   * @description
   * Este objeto representa los datos iniciales para un aprendiz en una aplicación. Contiene varias propiedades que almacenan información sobre el aprendiz, como su nombre, tipo de documento, correo electrónico, estado, empresa, modalidad, apellido, número de documento, teléfono celular, fecha de finalización de prácticas, ARL y jefe.
   *
   * @type {Object}
   * @property {string} nombre_aprendiz - El nombre del aprendiz.
   * @property {string} tipo_documento_aprendiz - El tipo de documento del aprendiz.
   * @property {string} email_aprendiz - El correo electrónico del aprendiz.
   * @property {string} estado_aprendiz - El estado del aprendiz.
   * @property {string} id_empresa - El ID de la empresa a la que pertenece el aprendiz.
   * @property {string} id_modalidad - El ID de la modalidad de formación del aprendiz.
   * @property {string} apellido_aprendiz - El apellido del aprendiz.
   * @property {string} numero_documento_aprendiz - El número de documento del aprendiz.
   * @property {string} celular_aprendiz - El número de teléfono celular del aprendiz.
   * @property {string} fecha_fin_practica_aprendiz - La fecha de finalización de las prácticas del aprendiz.
   * @property {string} id_arl - El ID de la ARL (Administradora de Riesgos Laborales) del aprendiz.
   * @property {string} id_jefe - El ID del jefe del aprendiz.
   */
  const initialState = {
    nombre_aprendiz: '',
    tipo_documento_aprendiz: '',
    email_aprendiz: '',
    estado_aprendiz: '',
    id_empresa: '',
    id_modalidad: '',
    apellido_aprendiz: '',
    numero_documento_aprendiz: '',
    celular_aprendiz: '',
    fecha_fin_practica_aprendiz: '',
    id_arl: '',
    id_jefe: ''
  }
  const [formData, setFormData] = useState(initialState)

  /**
   * @function
   * @name handleInputChange
   *
   * @description
   * Esta función maneja el cambio en los valores de los campos de un formulario. Toma un evento de cambio como argumento y actualiza los datos del formulario con los nuevos valores.
   *
   * @param {Event} e - El evento de cambio que contiene los datos del campo modificado.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const resetForm = () => {
    setFormData(initialState)
  }

  /**
   * @function
   * @name handleSubmit
   * @async
   *
   * @description
   * Esta función se encarga de procesar los datos del formulario del estudiante. Realiza ciertas transformaciones en los campos como asignar valores predeterminados para ciertas selecciones y valida los datos del formulario. Luego, utiliza la función 'createStudent' para crear un estudiante con los datos proporcionados y muestra una notificación de éxito o error.
   *
   * @param {Event} e - El evento de formulario que desencadena el envío del formulario.
   * @throws {Error} Si la solicitud no se procesa con éxito, se registra un mensaje de error en la consola.
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const empresa = formData.id_empresa
      const arl = formData.id_arl
      const modalidad = formData.id_modalidad
      const jefe = formData.id_jefe

      if (empresa !== '') {
        formData.id_empresa = 1
      }
      if (arl !== '') {
        formData.id_arl = 1
      }
      if (modalidad === '1') {
        formData.id_modalidad = 1
      } else if (modalidad === '2') {
        formData.id_modalidad = 2
      } else if (modalidad === '3') {
        formData.id_modalidad = 3
      } else if (modalidad === '4') {
        formData.id_modalidad = 4
      } else {
        formData.id_modalidad = 5
      }
      if (jefe !== '') {
        formData.id_jefe = 1
      }
    } catch (error) {
      throw new Error(error)
    }
    const { error } = studentsValidation.validate(formData)

    if (error !== undefined) {
      return Swal.fire({
        icon: 'error',
        title: 'Complete los campos requeridos'
      })
    }

    const form = { ...formData }
    const dataToSend = Array(form)
    const data = await createStudent(dataToSend)

    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: data.statusText
    })
    resetForm()
  }

  return (
    <section className='fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen'>
      <aside className='absolute inset-0 w-full h-full bg-black/50 backdrop-blur-sm backdrop-filter'>
        <div className='flex items-center justify-center h-full'>
          <section className='relative flex flex-col w-11/12 h-auto bg-white md:w-2/5 rounded-2xl bounce'>
            <IoMdClose className='absolute right-5 top-[20px] h-7 w-7 cursor-pointer ' onClick={handleModal} />
            <header className='grid pt-5 place-items-center '>
              <h3 className='text-2xl font-semibold'>
                <i className='px-3 text-green-600 fi fi-rr-smile-plus'></i>
                {title}
              </h3>
            </header>
            <section className='flex-auto w-5/6 mx-auto'>
              <form action='' className='flex flex-col gap-6 pt-4'>
                <div className='grid grid-cols-2 gap-2'>
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-col'>
                      <label htmlFor='name' className='text-sm font-light'>
                        Nombres
                      </label>
                      <input id='name' type='text' name='nombre_aprendiz' value={formData.nombre_aprendiz} className='px-2 py-1 text-sm text-black bg-gray-300 rounded-lg focus:outline-none placeholder:text-gray-500' placeholder='Nombres' onChange={handleInputChange} />
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor='tipo_documento' className='text-sm font-light'>
                        Tipo de Documento
                      </label>
                      <select id='tipo_documento' name='tipo_documento_aprendiz' value={formData.tipo_documento_aprendiz} className='px-2 py-[5px] text-sm text-black bg-gray-300 rounded-lg focus:outline-none placeholder:text-gray-500' onChange={handleInputChange}>
                        <option value='' disabled defaultValue>
                          Tipo de documento
                        </option>
                        <option value='T.I'>T.I</option>
                        <option value='C.C'>C.C</option>
                        <option value='C.E'>C.E</option>
                      </select>
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor='email' className='text-sm font-light'>
                        Correo Electronico
                      </label>
                      <input id='email' type='text' name='email_aprendiz' value={formData.email_aprendiz} onChange={handleInputChange} className='px-2 py-1 text-sm text-black bg-gray-300 rounded-lg focus:outline-none placeholder:text-gray-500' placeholder='Email' />
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor='estado' className='text-sm font-light'>
                        Estado Formación
                      </label>
                      <input id='estado' type='text' name='estado_aprendiz' value={formData.estado_aprendiz} onChange={handleInputChange} className='px-2 py-1 text-sm text-black bg-gray-300 rounded-lg focus:outline-none placeholder:text-gray-500' placeholder='Estado del aprendiz' />
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor='empresa' className='text-sm font-light'>
                        Empresa
                      </label>
                      <input id='empresa' type='text' name='id_empresa' value={formData.id_empresa} className='px-2 py-1 text-sm text-black bg-gray-300 rounded-lg focus:outline-none placeholder:text-gray-500' placeholder='Empresa' onChange={handleInputChange} />
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor='modalidad' className='text-sm font-light'>
                        Modalidad
                      </label>
                      <select id='modalidad' name='id_modalidad' value={formData.id_modalidad} onChange={handleInputChange} className='px-2 py-[5px] text-sm text-black bg-gray-300 rounded-lg focus:outline-none placeholder:text-gray-500'>
                        <option value='' disabled defaultValue>
                          Modalidad
                        </option>
                        <option value='1'>Pasantias</option>
                        <option value='2'>Contrato De aprendizaje</option>
                        <option value='3'>Proyecto productivo</option>
                        <option value='4'>Monitoria</option>
                        <option value='5'>Vinculacion Laboral</option>
                      </select>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-col'>
                      <label htmlFor='lastname' className='text-sm font-light'>
                        Apellidos
                      </label>
                      <input id='lastname' type='text' name='apellido_aprendiz' value={formData.apellido_aprendiz} onChange={handleInputChange} className='px-2 py-1 text-sm text-black bg-gray-300 rounded-lg focus:outline-none placeholder:text-gray-500' placeholder='Apellidos' />
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor='num_documento' className='text-sm font-light'>
                        No. Documento
                      </label>
                      <input id='num_documento' type='text' name='numero_documento_aprendiz' value={formData.numero_documento_aprendiz} onChange={handleInputChange} className='px-2 py-1 text-sm text-black bg-gray-300 rounded-lg focus:outline-none placeholder:text-gray-500' placeholder='Documento' />
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor='cellphone' className='text-sm font-light'>
                        No. Celular
                      </label>
                      <input id='cellphone' type='number' name='celular_aprendiz' value={formData.celular_aprendiz} onChange={handleInputChange} className='px-2 py-1 text-sm text-black bg-gray-300 rounded-lg focus:outline-none placeholder:text-gray-500' placeholder='Celular' />
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor='fin_productiva' className='text-sm font-light'>
                        Fin de prácticas
                      </label>
                      <input id='fin_productiva' type='date' name='fecha_fin_practica_aprendiz' value={formData.fecha_fin_practica_aprendiz} onChange={handleInputChange} className='px-2 py-1 text-sm text-black bg-gray-300 rounded-lg focus:outline-none placeholder:text-gray-500' />
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor='arl' className='text-sm font-light'>
                        ARL
                      </label>
                      <input id='arl' type='text' name='id_arl' value={formData.id_arl} className='px-2 py-1 text-sm text-black bg-gray-300 rounded-lg focus:outline-none placeholder:text-gray-500' placeholder='Arl' onChange={handleInputChange} />
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor='jefe' className='text-sm font-light'>
                        Jefe Inmediato
                      </label>
                      <input id='jefe' type='text' name='id_jefe' value={formData.id_jefe} className='px-2 py-1 text-sm text-black bg-gray-300 rounded-lg focus:outline-none placeholder:text-gray-500' placeholder='Nombre Jefe' onChange={handleInputChange} />
                    </div>
                  </div>
                </div>
                <div className='grid grid-cols-2 mb-5'>
                  <Button bg={'bg-red-600'} px={'px-3'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'lg'} inline onClick={resetForm}>
                    <PiTrashBold />
                    Limpiar
                  </Button>
                  <Button bg={'bg-green-600'} px={'px-3'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'lg'} inline onClick={handleSubmit}>
                    <LuSave />
                    Guardar
                  </Button>
                </div>
              </form>
            </section>
          </section>
        </div>
      </aside>
    </section>
  )
}

const RegisterCourses = ({ closedModal, title, setGetCourses }) => {
  const handleModal = () => {
    closedModal()
  }

  /**
   * @constant initialState
   *
   * @description
   * Este objeto representa los datos iniciales para un cursos. Contiene varias propiedades que almacenan información sobre el aprendiz, como su nombre, tipo de documento, correo electrónico, estado, empresa, modalidad, apellido, número de documento, teléfono celular, fecha de finalización de prácticas, ARL y jefe.
   *
   * @type {Object}
   * @property {string} numero_ficha - El numero de ficha del cursos.
   * @property {string} nombre_programa_formacion - El nombre de programa de formacion del cursos.
   * @property {string} fecha_inicio_lectiva - La fecha de inicio de lectiva del curso.
   * @property {string} fecha_inicio_practica - La fecha de inciio de practica del curso.
   * @property {string} nivel_formacion - El nivel de formacion del curso.
   * @property {string} id_nivel_formacion - El ID de nivel de formacion del curso.
   * @property {string} seguimiento_nombre_completo - El nombre completo del instructor de seguimiento.
   * @property {string} id_instructor_seguimiento - El id del instructor de seguimiento.
   */
  const initialState = {
    numero_ficha: '',
    nombre_programa_formacion: '',
    fecha_inicio_lectiva: '',
    fecha_inicio_practica: '',
    nivel_formacion: '',
    id_nivel_formacion: '',
    seguimiento_nombre_completo: '',
    id_instructor_seguimiento: ''
  }
  const [formData, setFormData] = useState(initialState)

  /**
   * @function
   * @name handleInputChange
   *
   * @description
   * Esta función maneja el cambio en los valores de los campos de un formulario. Toma un evento de cambio como argumento y actualiza los datos del formulario con los nuevos valores.
   *
   * @param {Event} e - El evento de cambio que contiene los datos del campo modificado.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const resetForm = (e) => {
    setFormData(initialState)
  }

  /**
   * @function
   * @name handleSubmit
   * @async
   *
   * @description
   * Esta función se encarga de procesar los datos del formulario del curso. Realiza ciertas transformaciones en los campos como asignar valores predeterminados para ciertas selecciones y valida los datos del formulario. Luego, utiliza la función 'createCourse' para crear un curso con los datos proporcionados y muestra una notificación de éxito o error.
   *
   * @param {Event} e - El evento de formulario que desencadena el envío del formulario.
   * @throws {Error} Si la solicitud no se procesa con éxito, se registra un mensaje de error en la consola.
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    const instructorSeguimiento = formData.seguimiento_nombre_completo
    const nivelDeFormacion = formData.nivel_formacion

    try {
      if (instructorSeguimiento) {
        const res = await GetTeacherByName(instructorSeguimiento)
        const response = res.data.data[0].id_usuario
        formData.id_instructor_seguimiento = response
      }

      if (nivelDeFormacion === 'Tecnólogo') {
        formData.id_nivel_formacion = 2
      } else if (nivelDeFormacion === 'Técnico') {
        formData.id_nivel_formacion = 1
      } else {
        formData.id_nivel_formacion = 3
      }
    } catch (error) {
      throw new Error(error)
    }

    const { error } = coursesValidation.validate(formData)
    if (error !== undefined) {
      return Swal.fire({
        icon: 'error',
        title: 'Complete los campos requeridos'
      })
    }

    const form = { ...formData }
    const data = await createCourse(form)
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: data.statusText
    })
    setGetCourses(true)
    closedModal()
    resetForm()
  }

  return (
    <section className='fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen'>
      <aside className='absolute inset-0 w-full h-full bg-black/50 backdrop-blur-sm backdrop-filter'>
        <div className='flex items-center justify-center h-full'>
          <section className='relative flex flex-col w-11/12 h-auto bg-white md:w-2/5 rounded-2xl bounce'>
            <IoMdClose className='absolute right-5 top-[20px] h-7 w-7 cursor-pointer ' onClick={handleModal} />
            <header className='grid pt-5 place-items-center '>
              <h3 className='text-2xl font-semibold'>
                <i className='px-3 text-green-600 fi fi-rr-smile-plus'></i>
                {title}
              </h3>
            </header>
            <section className='flex-auto w-5/6 mx-auto'>
              <form action='' className='flex flex-col gap-6 pt-4'>
                <div className='grid grid-cols-2 gap-2'>
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-col'>
                      <label htmlFor='num_ficha' className='text-sm font-light'>
                        Número de ficha
                      </label>
                      <input id='num_ficha' type='number' name='numero_ficha' value={formData.numero_ficha} onChange={handleInputChange} className='px-2 py-1 text-sm text-black bg-gray-300 rounded-lg focus:outline-none placeholder:text-gray-500' placeholder='Numero de ficha' />
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor='programa' className='text-sm font-light'>
                        Programa de formación
                      </label>
                      <input id='programa' type='text' name='nombre_programa_formacion' value={formData.nombre_programa_formacion} onChange={handleInputChange} className='px-2 py-1 text-sm text-black bg-gray-300 rounded-lg focus:outline-none placeholder:text-gray-500' placeholder='Nombre del programa' />
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor='instructor_seguimiento' className='text-sm font-light'>
                        Instructor de Seguimiento
                      </label>
                      <input id='instructor_seguimiento' type='text' name='seguimiento_nombre_completo' value={formData.seguimiento_nombre_completo} onChange={handleInputChange} className='px-2 py-1 text-sm text-black bg-gray-300 rounded-lg focus:outline-none placeholder:text-gray-500' placeholder='Instructor seguimiento' />
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-col'>
                      <label htmlFor='nivel_formacion' className='text-sm font-light'>
                        Nivel de formación
                      </label>
                      <select id='nivel_formacion' name='nivel_formacion' value={formData.nivel_formacion} onChange={handleInputChange} className='px-2 py-[5px] text-sm text-black bg-gray-300 rounded-lg focus:outline-none placeholder:text-gray-500'>
                        <option value='' disabled defaultValue>
                          Nivel de formacion
                        </option>
                        <option value='Tecnologo'>Tecnólogo</option>
                        <option value='Tecnico'>Técnico</option>
                        <option value='Auxiliar'>Auxiliar</option>
                      </select>
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor='inicio_lectiva' className='text-sm font-light'>
                        Fecha Inicio lectiva
                      </label>
                      <input id='inicio_lectiva' type='date' name='fecha_inicio_lectiva' value={formData.fecha_inicio_lectiva} onChange={handleInputChange} className='px-2 py-1 text-sm text-black bg-gray-300 rounded-lg focus:outline-none placeholder:text-gray-500' />
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor='inicio_productiva' className='text-sm font-light'>
                        Inicio prácticas
                      </label>
                      <input id='inicio_productiva' type='date' name='fecha_inicio_practica' value={formData.fecha_inicio_practica} onChange={handleInputChange} className='px-2 py-1 text-sm text-black bg-gray-300 rounded-lg focus:outline-none placeholder:text-gray-500' />
                    </div>
                  </div>
                </div>
                <div className='grid grid-cols-2 mb-5'>
                  <Button bg={'bg-red-600'} px={'px-3'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'lg'} inline onClick={resetForm}>
                    <PiTrashBold />
                    Limpiar
                  </Button>
                  <Button bg={'bg-green-600'} px={'px-3'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'lg'} inline onClick={handleSubmit}>
                    <LuSave />
                    Guardar
                  </Button>
                </div>
              </form>
            </section>
          </section>
        </div>
      </aside>
    </section>
  )
}

const ModalWithChildren = ({ closeModal, width = 'w-2/5', title, children }) => {
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
          <h2 className='text-xl font-medium text-center w-fit border-b-1 border-primary'>{title}</h2>
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

  const [showNewPassword, setShowNewPassword] = useState(passwordStatus.hidden)
  const [showConfirmPassword, setShowConfirmPassword] = useState(passwordStatus.hidden)

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

  /**
   * @function
   * @name handleSavePassword
   * @async
   *
   * @param {Event} e - Evento de formulario.
   * @returns {void}
   *
   * @description
   * Esta función se encarga de gestionar el proceso de guardar una contraseña. Obtiene los datos del formulario,
   * llama a la función onSavePassword para guardar la contraseña y luego cierra el modal.
   *
   */
  const handleSavePassword = async (e) => {
    e.preventDefault()

    const formPassword = Object.fromEntries(new FormData(e.target))

    if (formPassword.newPassword !== formPassword.confirmPassword) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Las contraseñas no coinciden' })
    } else {
      onSavePassword(formPassword)
      closeModal()
    }
  }

  return (
    <section className='fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen'>
      <aside className='absolute inset-0 w-full h-full bg-black/50 backdrop-blur-sm backdrop-filter' onClick={handleModal} />
      <section className='relative flex flex-col h-auto bg-white rounded-2xl bounce'>
        <IoMdClose className='absolute right-5 top-[20px] h-7 w-7 cursor-pointer ' onClick={handleModal} />
        <header className='grid pt-5 place-items-center '>
          <h2 className='text-xl font-medium text-center w-fit border-b-1 border-primary'>{title}</h2>
        </header>
        <section className='flex justify-center'>
          <section className='w-11/12 p-4'>
            <form onSubmit={handleSavePassword} className='flex flex-col gap-3 pt-6'>
              <section className='grid grid-cols-2-50-50'>
                <label className='font-semibold w-fit whitespace-nowrap' htmlFor=''>
                  Nueva Contraseña
                </label>
                <div className='relative w-full mx-auto text-gray-400'>
                  <div className='relative w-full mx-auto text-gray-400'>
                    <span onClick={handleNewPassword} className='absolute inset-y-0 right-0 flex items-center pr-3 transition cursor-pointer select-none text-slate-600 hover:text-slate-800'>
                      {showNewPassword === passwordStatus.shown ? passwordIcons.closeEye : passwordIcons.openEye}
                    </span>
                    <input name='newPassword' minLength={8} type={showNewPassword} className='border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-[0.9px] pl-3 text-base text-black focus:bg-white focus:outline-none' autoComplete='on' />
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
                    <input name='confirmPassword' minLength={8} type={showConfirmPassword} className='border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-[0.9px] pl-3 text-base text-black focus:bg-white focus:outline-none' autoComplete='on' />
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
      <section className='relative flex flex-col w-11/12 h-auto bg-white md:w-2/5 rounded-2xl bounce'>
        <IoMdClose className='absolute right-5 top-[20px] h-7 w-7 cursor-pointer' onClick={handleModal} />
        <header className='grid pt-5 place-items-center '>
          <h2 className='text-xl font-medium text-center w-fit border-primary'>{title}</h2>
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
      <section className='relative flex flex-col h-auto bg-white rounded-2xl bounce'>
        <IoMdClose className='absolute right-5 top-[20px] h-7 w-7 cursor-pointer ' onClick={handleModal} />
        <header className='grid pt-5 place-items-center '>
          <h2 className='text-xl font-medium text-center w-fit border-b-1 border-primary'>{title}</h2>
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
      <section className='relative flex flex-col w-11/12 h-auto bg-white md:w-2/5 rounded-2xl bounce'>
        <IoMdClose className='absolute right-5 top-[20px] h-7 w-7 cursor-pointer ' onClick={handleModal} />
        <header className='grid pt-5 place-items-center '>
          <h2 className='text-xl font-medium text-center w-fit border-b-1 border-primary'>{title ?? 'Confirmar'}</h2>
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

const AddTeacherModal = ({ closeModal, title, setNotify }) => {
  const formRef = useRef(null)
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
   * @function
   * @name handleAddedTeacher
   * @async
   *
   * @description
   * Este función maneja el evento de registro de un nuevo profesor. Realiza la validación de los datos del formulario, muestra mensajes de error en caso de datos inválidos y, en caso de éxito, registra al profesor en el sistema.
   *
   * @param {Event} e - El evento del formulario.
   * @throws {Error} Error - Se produce un error si ocurre algún problema durante el proceso de registro del instructor.
   * @returns {void}
   */
  const handleAddedTeacher = async (e) => {
    e.preventDefault()

    const id_rol = 3
    const contrasena = 'InstructorCtm2023'
    const formData = new FormData(formRef.current)
    formData.append('id_rol', id_rol)
    formData.append('contrasena', contrasena)
    const data = Object.fromEntries(formData)

    try {
      const { error } = addTeacherValidation.validate(data)
      if (error !== undefined) {
        let errorMessage
        const customErrorMessages = {
          nombre: 'El nombre debe tener al menos 3 caracteres.',
          apellido: 'El apellido debe tener al menos 3 caracteres.',
          num_documento: 'El número de documento debe tener entre 8 y 10 caracteres',
          num_celular: 'El número de celular debe tener entre 8 y 10 caracteres'
        }

        const path = error.details[0].path[0]
        if (customErrorMessages[path]) {
          errorMessage = customErrorMessages[path]
        }

        toast.error(errorMessage, {
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
      await registerUser(data)
      setNotify(true)
      closeModal()
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <>
      <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='colored' />
      <section className='fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen'>
        <aside className='absolute inset-0 w-full h-full bg-black/50 backdrop-blur-sm backdrop-filter' onClick={handleModal} />
        <section className='relative flex flex-col w-11/12 h-auto bg-white md:w-2/5 rounded-2xl bounce'>
          <IoMdClose className='absolute right-5 top-[20px] h-7 w-7 cursor-pointer ' onClick={handleModal} />
          <header className='grid pt-5 place-items-center '>
            <h2 className='text-xl font-medium text-center w-fit border-b-1 border-primary'>{title}</h2>
          </header>
          <section className='flex justify-center'>
            <section className='w-11/12 p-4'>
              <form ref={formRef} onSubmit={handleAddedTeacher} className='flex flex-col gap-6'>
                <section className='grid grid-cols-2 gap-x-4 gap-y-3'>
                  <div className='flex flex-col'>
                    <label htmlFor='name' className='text-sm font-light'>
                      Nombre
                    </label>
                    <input id='name' name='nombre' type='text' className='px-2 py-1 text-sm text-black bg-gray-300 rounded-lg focus:outline-none placeholder:text-gray-500' placeholder='Juanito' required />
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor='lastname' className='text-sm font-light'>
                      Apellido
                    </label>
                    <input id='lastname' name='apellido' type='text' className='px-2 py-1 text-sm text-black bg-gray-300 rounded-lg focus:outline-none placeholder:text-gray-500' placeholder='Perez' required />
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor='document' className='text-sm font-light'>
                      No. Documento
                    </label>
                    <input id='document' name='num_documento' type='text' className='px-2 py-1 text-sm text-black bg-gray-300 rounded-lg focus:outline-none placeholder:text-gray-500' placeholder='1234567890' required />
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor='email' className='text-sm font-light'>
                      Correo electrónico
                    </label>
                    <input id='email' name='correo_electronico' type='email' className='px-2 py-1 text-sm text-black bg-gray-300 rounded-lg focus:outline-none placeholder:text-gray-500' placeholder='jperez27@sena.edu.co' required />
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor='cellphone' className='text-sm font-light'>
                      No. Celular
                    </label>
                    <input id='cellphone' name='num_celular' type='text' className='px-2 py-1 text-sm text-black bg-gray-300 rounded-lg focus:outline-none placeholder:text-gray-500' placeholder='3012345678' required />
                  </div>
                </section>

                <Button bg={'bg-green-600'} px={'px-3'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'lg'} inline>
                  <LuSave />
                  Guardar
                </Button>
              </form>
            </section>
          </section>
        </section>
      </section>
    </>
  )
}

const AddVisitModal = ({ closeModal, title, id }) => {
  const formRef = useRef(null)
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
   * @function
   * @name handleVisit
   * @async
   *
   * @description
   * Esta función se encarga de gestionar el proceso de registro de una visita. Realiza la validación de los datos del formulario y muestra mensajes de error en caso de datos inválidos. Si la validación es exitosa, registra la visita en el sistema.
   *
   * @param {Event} e - Evento de formulario.
   * @throws {Error} Error si ocurre alguna excepción durante el proceso.
   * @returns {void}
   */
  const handleVisit = async (e) => {
    e.preventDefault()

    const id_aprendiz = id
    const { id_usuario: usuario_responsable } = getUserID().user
    const formData = new FormData(formRef.current)
    formData.append('usuario_responsable', usuario_responsable)
    formData.append('id_aprendiz', id_aprendiz)
    const data = Object.fromEntries(formData)
    console.log(data)
    const { error } = visitValidation.validate(data)
    if (error !== undefined) {
      let errorMessage
      const customErrorMessages = {
        numero_visita: 'El número de visita debe ser un número.',
        estado_visita: 'El estado de visita debe ser seleccionado.',
        observaciones_visita: 'Las observaciones no pueden exceder los 200 caracteres'
      }

      const path = error.details[0].path[0]
      if (customErrorMessages[path]) {
        errorMessage = customErrorMessages[path]
      }

      toast.error(errorMessage, {
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
    try {
      await createVisit(data)
      closeModal()
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <>
      <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='colored' />
      <section className='fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen'>
        <aside className='absolute inset-0 w-full h-full bg-black/50 backdrop-blur-sm backdrop-filter' onClick={handleModal} />
        <section className='relative flex flex-col w-11/12 h-auto bg-white md:w-2/5 rounded-2xl bounce'>
          <IoMdClose className='absolute right-5 top-[20px] h-7 w-7 cursor-pointer ' onClick={handleModal} />
          <header className='grid pt-5 place-items-center '>
            <h2 className='text-xl font-medium text-center w-fit border-b-1 border-primary'>{title}</h2>
          </header>
          <section className='flex justify-center'>
            <section className='w-11/12 p-4'>
              <form ref={formRef} onSubmit={handleVisit} className='flex flex-col gap-6'>
                <section className='flex flex-col gap-3'>
                  <div className='flex flex-col w-3/5'>
                    <label htmlFor='estado_visita' className='text-sm font-light'>
                      Estado visita
                    </label>
                    <select id='estado_visita' name='estado_visita' type='text' className='px-2 py-1 text-sm text-black bg-gray-300 rounded-lg focus:outline-none placeholder:text-gray-500' placeholder='' required>
                      <option value=''>Sin seleccionar</option>
                      <option value='Realizado'>Realizado</option>
                      <option value='Pendiente'>Pendiente</option>
                    </select>
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor='observaciones_visita' className='text-sm font-light'>
                      Observaciones
                    </label>
                    <textarea id='observaciones_visita' name='observaciones_visita' type='text' className='px-2 py-1 text-sm text-black bg-gray-300 rounded-lg resize-none focus:outline-none h-[5rem] placeholder:text-gray-500' placeholder='Observaciones...' />
                  </div>
                </section>

                <Button bg={'bg-green-600'} px={'px-3'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'lg'} inline>
                  <LuSave />
                  Guardar
                </Button>
              </form>
            </section>
          </section>
        </section>
      </section>
    </>
  )
}

export { ModalWithChildren, PasswordModal, AsignTeacherModal, ModalConfirm, DenyModal, LoadingModal, AddTeacherModal, RegisterCourses, RegisterStudentModal, AddVisitModal }
