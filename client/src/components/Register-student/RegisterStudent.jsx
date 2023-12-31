import { useRef, useState } from 'react'
// import { useHistory, Prompt } from 'react-router-dom'
import Cookies from 'js-cookie'
import jwtdecoded from 'jwt-decode'
import { ToastContainer } from 'react-toastify'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

// icons
import { BsCheck2Circle } from 'react-icons/bs'
import { LuUpload, LuArrowRight, LuArrowLeft } from 'react-icons/lu'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { IoReturnDownBack } from 'react-icons/io5'

// Components
import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'
import { Button } from '../Utils/Button/Button'
import { Select } from '../Utils/Select/Select'
import { idTypes, modalities, etapasFormacion, nivelFormacion, apoyoSostenimiento, pagoArl, dataInscription } from '../../import/staticData'
import { InscriptionApprentice, GetTeacherByName, GetClassByNumber } from '../../api/httpRequest'
import { ValidateInputsTypeNumber } from '../../validation/RegularExpressions'
import { inscriptionValidation } from '../../validation/inscriptionsValidation'

export const RegisterStudent = () => {
  const excelFileRef = useRef(null)
  // eslint-disable-next-line no-unused-vars
  const [selectedFiles, setSelectedFiles] = useState(null)
  const [showDataEmpresa, setShowDataEmpresa] = useState(false)
  const [showDataAprendiz, setShowDataAprendiz] = useState(true)
  const formRef = useRef(null)
  const fileInputRef = useRef(null)

  const token = Cookies.get('token')
  const decoded = jwtdecoded(token)

  const id = decoded.data.user.id_usuario

  /**
   * Función para manejar el cambio de archivo.
   *
   * @function
   * @name handleFileChange
   * @param {Object} e - Evento de cambio de archivo.
   * @returns {void}
   *
   * @example
   * const eventoCambioArchivo = e;
   * handleFileChange(eventoCambioArchivo);
   */
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setSelectedFiles(file)
  }

  /**
   * Función para cambiar la sección visible entre empresa y aprendiz.
   *
   * @function
   * @name handleChangeSection
   * @param {string} section - Sección a mostrar.
   * @returns {void}
   *
   * @example
   * handleChangeSection('empresa');
   */
  const handleChangeSection = (section) => {
    setShowDataEmpresa(section === 'empresa')
    setShowDataAprendiz(section === 'aprendiz')
  }

  /**
   * Estado local para almacenar los valores seleccionados en los select del formulario.
   *
   * @constant
   * @name selectedValues
   * @type {Object}
   *
   * @example
   * const valoresSeleccionados = selectedValues;
   */
  const [selectedValues, setSelectedValues] = useState({
    tipo_documento_inscripcion: '',
    modalidad_inscripcion: '',
    etapa_actual_inscripcion: '',
    nivel_formacion_inscripcion: '',
    apoyo_sostenimiento_inscripcion: '',
    arl: ''
  })

  /**
   * Función para actualizar los valores seleccionados.
   *
   * @function
   * @name handleSelectChange
   * @param {string} name - Nombre del valor seleccionado.
   * @param {string} value - Valor seleccionado.
   * @returns {void}
   *
   * @example
   * handleSelectChange('modalidad_inscripcion', 'Presencial');
   */
  const handleSelectChange = (name, value) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }))
  }

  /**
   * Función para manejar el envío del formulario.
   *
   * @async
   * @function
   * @name handleSubmit
   * @param {Object} e - Evento de envío del formulario.
   * @returns {void}
   *
   * @example
   * const eventoEnvioFormulario = e;
   * handleSubmit(eventoEnvioFormulario);
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    // capturar los valores de los inputs del formulario
    const formValues = Object.fromEntries(new FormData(e.target))
    formValues.modalidad_inscripcion = selectedValues.modalidad_inscripcion
    formValues.tipo_documento_inscripcion = selectedValues.tipo_documento_inscripcion
    formValues.etapa_actual_inscripcion = selectedValues.etapa_actual_inscripcion
    formValues.nivel_formacion_inscripcion = selectedValues.nivel_formacion_inscripcion
    formValues.apoyo_sostenimiento_inscripcion = selectedValues.apoyo_sostenimiento_inscripcion
    formValues.arl = selectedValues.arl

    try {
      const observation = formValues.observaciones
      const teacher = formValues.nombre_instructor_lider_inscripcion
      const classNumber = formValues.id_ficha_inscripcion
      const archivo = formValues.link_documentos.name

      formValues.fecha_creacion = Date.now()
      formValues.observaciones = observation
      formValues.link_documentos = archivo
      // const fileInput = document.getElementById('file-input');

      if (teacher) {
        const res = await GetTeacherByName(teacher)
        const response = res.data.data[0].id_usuario
        formValues.id_instructor_lider_inscripcion = response
      }

      if (classNumber) {
        const res = await GetClassByNumber(classNumber)
        const response = res.data.data[0].id_ficha
        formValues.id_ficha_inscripcion = `${response}`
      }
    } catch (error) {
      throw new Error(error)
      // const message = error.response.data.error.info.message
    }
    formValues.id_usuario_responsable_inscripcion = `${id}`
    // validar que los campos no esten vacios
    const { error } = inscriptionValidation.validate(formValues)
    if (error !== undefined) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...'
      })
    }

    // validar que los campos de tipo number sean numeros
    ValidateInputsTypeNumber(formValues.numero_documento_inscripcion, formValues.numero_telefono_inscripcion, formValues.numero_ficha_inscripcion)

    // validar que el numero de documento sea valido
    // enviar los datos al backend
    const responsable_inscripcion = `${decoded.data.user.nombres_usuario} ${decoded.data.user.apellidos_usuario}`
    const estado_general_inscripcion = 'Pendiente'

    const form = { ...formValues, responsable_inscripcion, estado_general_inscripcion }
    const dataToSend = Array(form)
    const data = await sendDataInscription(dataToSend)
    // mostramos una alerta de exito
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: data
    })
    deleteData()
  }

  /**
   * Función para enviar los datos de inscripción al backend.
   *
   * @async
   * @function
   * @name sendDataInscription
   * @param {Object[]} data - Datos de inscripción a enviar.
   * @returns {Promise<string>} - Mensaje de respuesta del backend.
   *
   * @example
   * const datosInscripcion = [{ /* ... *\/ }];
   * const respuesta = await sendDataInscription(datosInscripcion);
   */
  const sendDataInscription = async (data) => {
    const response = await InscriptionApprentice(data)
    const { message } = response.data
    return message
  }

  /**
   * Función para vaciar los campos del formulario.
   *
   * @function
   * @name deleteData
   * @returns {void}
   *
   * @example
   * deleteData();
   */
  const deleteData = () => {
    if (formRef.current) {
      // Resetear el formulario, lo que eliminará los valores de todos los campos
      formRef.current.reset()
      // Eliminar también los valores de los campos "select" específicos
      const selectFields = ['tipo_documento_inscripcion', 'modalidad_inscripcion', 'etapa_actual_inscripcion', 'nivel_formacion_inscripcion', 'apoyo_sostenimiento_inscripcion', 'arl']
      selectFields.forEach((fieldName) => {
        const selectInput = formRef.current.querySelector(`[name="${fieldName}"]`)
        if (selectInput) {
          selectInput.value = ''
        }
      })
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  /**
   * Función para manejar el cambio de archivo Excel.
   *
   * @function
   * @name handleExcelFile
   * @returns {void}
   *
   * @example
   * handleExcelFile();
   */
  const handleExcelFile = () => {
    const currentFile = excelFileRef.current.files[0]

    const checkFile = excelFileRef.current.files[0].name.split('.')
    if (checkFile[1] !== 'xlsx' && checkFile[1] !== 'xls') {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Has ingresado un formato inválido. ¡Por favor escoga un formato válido de excel!',
        footer: '.xlsx, .xls'
      })
      excelFileRef.current.value = ''
      return
    }
    setSelectedFiles([currentFile])
  }
  return (
    <>
      <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='colored' />
      <section className='flex flex-row min-h-screen'>
        <Siderbar />
        <section className='relative grid flex-auto w-min grid-rows-3-10-75-15'>
          <header className='flex-col mt-5 place-items-center'>
            <h1 className='text-2xl font-bold text-center place-self-center'>{showDataAprendiz === true ? 'Inscribe un aprendiz' : 'Datos de la empresa'}</h1>
            <h3 className='text-sm font-normal text-center'>
              Los datos con (<span className='font-semibold text-red-600'>*</span>) son obligatorios
            </h3>
          </header>
          <section>
            <form action='' ref={formRef} className='flex flex-col mt-3 gap-y-6' onSubmit={handleSubmit} encType='multipart/form-data'>
              <div className={showDataAprendiz ? 'visible' : 'hidden'}>
                <section className='grid w-11/12 mx-auto gap-y-3 gap-x-6 sm:grid-cols-2 md:grid-cols-3'>
                  {dataInscription.dataAprendiz.map((item, i) => {
                    let option = []
                    item.name === 'tipo_documento_inscripcion' &&
                      (option = idTypes.map((item, i) => ({
                        value: item.name,
                        key: item.value
                      })))
                    item.name === 'modalidad_inscripcion' &&
                      (option = modalities.map((item, i) => ({
                        value: item.name,
                        key: item.value
                      })))
                    item.name === 'etapa_actual_inscripcion' &&
                      (option = etapasFormacion.map((item, i) => ({
                        value: item.name,
                        key: item.value
                      })))
                    item.name === 'nivel_formacion_inscripcion' &&
                      (option = nivelFormacion.map((item, i) => ({
                        value: item.name,
                        key: item.value
                      })))
                    item.name === 'apoyo_sostenimiento_inscripcion' &&
                      (option = apoyoSostenimiento.map((item, i) => ({
                        value: item.name,
                        key: item.value
                      })))
                    return (
                      <div className='flex flex-col w-full m-auto text-gray-400' key={i}>
                        <label htmlFor='nombre' className='text-sm font-normal'>
                          {item.label} {item.required && <span className='font-medium text-red-600'>*</span>}
                        </label>
                        {item.type === 'number' ? (
                          <input type={item.type} name={item.name} className='focus:text-gray-900 w-full rounded-xl shadow-md py-1 pl-2 text-sm text-black focus:bg-white focus:outline-none [appearance:textfield] [&::-webit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder:text-slate-400' autoComplete='on' placeholder={item.placeholder} />
                        ) : item.type === 'select' ? (
                          <Select
                            name={item.name}
                            placeholder={item.placeholder}
                            rounded='rounded-xl'
                            py='py-1'
                            hoverColor='hover:bg-slate-300'
                            hoverTextColor='hover:text-black'
                            selectedColor='bg-slate-300 text-black'
                            textSize='text-sm'
                            border='none'
                            shadow='shadow-md'
                            options={option}
                            onChange={(value) => handleSelectChange(item.name, value)} // Actualiza los valores seleccionados
                          />
                        ) : (
                          <input type={item.type} name={item.name} className='w-full py-1 pl-2 pr-3 text-sm text-black bg-white shadow-md focus:text-gray-900 rounded-xl focus:bg-white focus:outline-none placeholder:text-slate-400' autoComplete='on' placeholder={item.placeholder} />
                        )}
                      </div>
                    )
                  })}
                </section>
              </div>
              <div className={showDataEmpresa ? 'visible' : 'hidden'}>
                <section className='grid w-11/12 mx-auto gap-y-3 gap-x-6 sm:grid-cols-2 md:grid-cols-3'>
                  {dataInscription.dataEmpresa.map((item, i) => {
                    let option = []
                    item.name === 'arl' &&
                      (option = pagoArl.map((item, i) => ({
                        value: item.name,
                        key: item.value
                      })))
                    return (
                      <div className='flex flex-col w-full m-auto text-gray-400' key={i}>
                        <label htmlFor='nombre' className='text-sm font-normal whitespace-nowrap'>
                          {item.label} {item.required && <span className='font-medium text-red-600'>*</span>}
                        </label>
                        {item.type === 'number' ? (
                          <input type={item.type} name={item.name} className='focus:text-gray-900 w-full rounded-xl shadow-md py-1 pl-2 text-sm text-black focus:bg-white focus:outline-none [appearance:textfield] [&::-webit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder:text-slate-400' autoComplete='on' placeholder={item.placeholder} />
                        ) : item.type === 'file' ? (
                          <div className='relative'>
                            <span className='absolute inset-y-0 flex items-center text-xl font-bold pointer-events-none right-3'>
                              <AiOutlineCloudUpload id='file-input' />
                            </span>
                            <div className='w-full py-1 pl-2 bg-white shadow-md focus:text-gray-900 rounded-xl'>
                              <input type={item.type} accept={item.accept} name={item.name} className='w-5/6 text-xs file:hidden whitespace-break-spaces' onChange={handleFileChange} />
                            </div>
                          </div>
                        ) : item.type === 'select' ? (
                          <Select
                            name={item.name}
                            placeholder={item.placeholder}
                            rounded='rounded-xl'
                            py='py-1'
                            hoverColor='hover:bg-slate-300'
                            hoverTextColor='hover:text-black'
                            selectedColor='bg-slate-300 text-black'
                            textSize='text-sm'
                            border='none'
                            shadow='shadow-md'
                            options={option}
                            onChange={(value) => handleSelectChange(item.name, value)} // Actualiza los valores seleccionados
                          />
                        ) : item.type === 'textarea' ? (
                          <div className='relative'>
                            <textarea id='editor' rows='3' className='block absolute w-full max-h-[5.5rem] resize-none overflow-y-auto border-gray-400 focus:text-gray-900 rounded-xl shadow-md bg-white py-[0.9px] px-3 text-sm text-black focus:bg-white focus:outline-none placeholder:text-slate-400' placeholder={item.placeholder} name={item.name}></textarea>
                          </div>
                        ) : (
                          <input type={item.type} name={item.name} className='w-full py-1 pl-2 pr-3 text-sm text-black bg-white shadow-md focus:text-gray-900 rounded-xl focus:bg-white focus:outline-none placeholder:text-slate-400' autoComplete='on' placeholder={item.placeholder} />
                        )}
                      </div>
                    )
                  })}
                </section>
              </div>
              <section className={`flex h-10 flex-row w-fit gap-10 place-self-center ${showDataEmpresa && 'mt-20'}`}>
                {showDataAprendiz && (
                  <div className='flex px-3 py-1 mx-auto shadow-md w-fit rounded-xl bg-slate-600'>
                    <label htmlFor='upload' className='flex items-center gap-2 text-white cursor-pointer'>
                      <LuUpload />
                      <span className='font-medium text-white'>Subir archivo</span>
                    </label>
                    <input id='upload' ref={excelFileRef} accept='.xlsx, .xls' onChange={handleExcelFile} type='file' className='hidden w-fit' />
                  </div>
                )}
                {showDataEmpresa && (
                  <div className='relative mx-auto'>
                    <span className='absolute inset-y-0 flex items-center text-white left-3'>
                      <BsCheck2Circle />
                    </span>
                    <Button bg={'bg-lime-500'} px={'pl-10 pr-6'} font={'font-medium'} textSize={'text-md'} py={'py-2'} rounded={'rounded-xl'} shadow={'shadow-lg'}>
                      Guardar
                    </Button>
                  </div>
                )}
              </section>
            </form>
            <div className='absolute top-7 left-11'>
              <Link to='/registros' className='flex items-center gap-2 text-sm font-medium rounded-full text-white bg-slate-600 px-4 py-[2px] transition-colors'>
                <IoReturnDownBack />
                Salir
              </Link>
            </div>
            <div className='flex flex-col gap-1 mx-auto mt-3 mb-2 md:flex-row w-fit md:gap-5'>
              <Button bg={'bg-red-600'} px={'px-3'} font={'font-medium'} textSize='text-md' py={'py-2'} rounded={'rounded-xl'} shadow={'shadow-lg'} onClick={deleteData}>
                Eliminar datos
              </Button>
              {showDataEmpresa && (
                <div className='relative mx-auto w-fit'>
                  <span className='absolute inset-y-0 flex items-center text-white pointer-events-none left-3'>
                    <LuArrowLeft />
                  </span>
                  <Button bg={'bg-sky-700'} px={'pr-6 pl-10'} font={'font-medium'} textSize={'text-md'} py={'py-2'} rounded={'rounded-xl'} shadow={'shadow-lg'} onClick={() => handleChangeSection('aprendiz')}>
                    Regresar
                  </Button>
                </div>
              )}
              {showDataAprendiz && (
                <div className='relative mx-auto w-fit'>
                  <span className='absolute inset-y-0 flex items-center text-white pointer-events-none right-2'>
                    <LuArrowRight />
                  </span>
                  <Button bg={'bg-primary'} px={'pr-8 pl-5'} font={'font-medium'} textSize={'text-md'} py={'py-2'} rounded={'rounded-xl'} shadow={'shadow-lg'} onClick={() => handleChangeSection('empresa')}>
                    Continuar
                  </Button>
                </div>
              )}
            </div>
          </section>
          <Footer />
        </section>
      </section>
    </>
  )
}
