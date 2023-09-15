import { useRef, useState } from 'react'
import Cookies from 'js-cookie'
import jwtdecoded from 'jwt-decode'
import { ToastContainer } from 'react-toastify'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

// icons
import { BsCheck2Circle } from 'react-icons/bs'
import { LuArrowRight, LuArrowLeft } from 'react-icons/lu'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { IoReturnDownBack } from 'react-icons/io5'

// Components
import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'
import { Button } from '../Utils/Button/Button'
import { Select } from '../Utils/Select/Select'
import { idTypes, modalities, etapasFormacion, nivelFormacion, apoyoSostenimiento, pagoArl, dataInscription } from '../../import/staticData'
import { InscriptionApprentice, GetTeacherByName, GetClassByNumber } from '../../api/httpRequest'
import { ValidateEmail, ValidateIdentity, ValidateInputsTypeNumber } from '../../validation/RegularExpressions'
import { inscriptionValidation } from '../../validation/inscriptionsValidation'

export const RegisterStudent = () => {
  const [msg, setMessage] = useState({})
  const [showDataEmpresa, setShowDataEmpresa] = useState(false)
  const [showDataAprendiz, setShowDataAprendiz] = useState(true)
  const formRef = useRef(null)
  const fileInputRef = useRef(null)

  const token = Cookies.get('token')
  const decoded = jwtdecoded(token)

  const id = decoded.data.user.id_usuario

  const handleChangeSection = (section) => {
    setShowDataEmpresa(section === 'empresa')
    setShowDataAprendiz(section === 'aprendiz')
  }

  const [selectedValues, setSelectedValues] = useState({
    tipo_documento_inscripcion: '',
    modalidad_inscripcion: '',
    etapa_actual_inscripcion: '',
    nivel_formacion_inscripcion: '',
    apoyo_sostenimiento_inscripcion: '',
    arl: ''
  })

  // ...

  // Define una función para actualizar los valores seleccionados
  const handleSelectChange = (name, value) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }))
  }

  // Validación de campos y capturación de los valores
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

    console.log(formValues)

    try {
      const teacher = formValues.nombre_instructor_lider_inscripcion
      const classNumber = formValues.id_ficha_inscripcion

      if (teacher) {
        const res = await GetTeacherByName(teacher)
        const response = res.data.data[0].id_usuario
        formValues.nombre_instructor_lider_inscripcion = `${response}`
      }

      if (classNumber) {
        const res = await GetClassByNumber(classNumber)
        const response = res.data.data[0].id_ficha
        formValues.id_ficha_inscripcion = `${response}`
      }
    } catch (error) {
      // const message = error.response.data.error.info.message
    }
    formValues.id_usuario_responsable_inscripcion = `${id}`
    // validar que los campos no esten vacios
    const emptyFields = Object.keys(formValues).filter((key) => !formValues[key])

    // si hay campos vacios, mostrar alerta
    if (emptyFields.length > 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, completa todos los campos'
      })
    }
    const { error } = inscriptionValidation.validate(formValues)
    if (error !== null) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error
      })
    }

    // validar que los campos de tipo number sean numeros
    ValidateInputsTypeNumber(formValues.numero_documento_inscripcion, formValues.numero_telefono_inscripcion, formValues.numero_ficha_inscripcion)

    // validar que el numero de documento sea valido
    const { numero_documento_inscripcion, correo_electronico_inscripcion } = formValues
    const isIdentityValid = ValidateIdentity(numero_documento_inscripcion)
    const isEmailValid = ValidateEmail(correo_electronico_inscripcion)

    if (!isIdentityValid) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El número de documento no es válido'
      })
    } else if (!isEmailValid) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El correo electrónico no es válido'
      })
    }

    // enviar los datos al backend
    sendDataInscription(formValues)

    // mostramos una alerta de exito
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: msg
    })
  }

  // enviar los datos al backend
  const sendDataInscription = async (data) => {
    const response = await InscriptionApprentice(data)
    const { message } = response.data
    setMessage(message)
  }

  // vaciar los inputs
  const deleteData = () => {
    formRef.current.reset()
    fileInputRef.current.value = ''
  }

  return (
    <>
      <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='colored' />
      <section className='flex flex-row min-h-screen bg-whitesmoke'>
        <Siderbar />
        <section className='relative grid flex-auto w-min grid-rows-3-10-75-15'>
          <header className='flex-col mt-5 place-items-center'>
            <h1 className='text-2xl font-bold text-center place-self-center'>{showDataAprendiz === true ? 'Inscribe un aprendiz' : 'Datos de la empresa'}</h1>
            <h3 className='text-sm font-normal text-center'>
              Los datos con (<span className='font-semibold text-red-600'>*</span>) son obligatorios
            </h3>
          </header>
          <section>
            <form action='' ref={formRef} className='flex flex-col mt-3 gap-y-6' onSubmit={handleSubmit}>
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
                              <AiOutlineCloudUpload />
                            </span>
                            <div className='w-full py-1 pl-2 bg-white shadow-md focus:text-gray-900 rounded-xl'>
                              <input type={item.type} accept={item.accept} name={item.name} className='w-5/6 text-xs file:hidden whitespace-break-spaces' />
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
                            <textarea id='editor' rows='3' className='block absolute w-full max-h-[5.5rem] resize-none overflow-y-auto border-gray-400 focus:text-gray-900 rounded-xl shadow-md bg-white py-[0.9px] px-3 text-sm text-black focus:bg-white focus:outline-none placeholder:text-slate-400' placeholder={item.placeholder} required></textarea>
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
