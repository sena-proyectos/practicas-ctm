import { useRef, useState } from 'react'
import Cookies from 'js-cookie'
import jwtdecoded from 'jwt-decode'
import { ToastContainer } from 'react-toastify'
import Swal from 'sweetalert2'

// icons
import { BsCheck2Circle } from 'react-icons/bs'
import { LuUpload, LuArrowRight, LuChevronDown, LuArrowLeft } from 'react-icons/lu'
import { AiOutlineCloudUpload } from 'react-icons/ai'

// Components
import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'
import { Button } from '../Utils/Button/Button'

import { idTypes, modalities, etapasFormacion, nivelFormacion, apoyoSostenimiento, pagoArl, dataInscription } from '../../import/staticData'
import { InscriptionApprentice, GetTeacherByName, GetClassByNumber } from '../../api/httpRequest'
import { ValidateEmail, ValidateIdentity, ValidateInputsTypeNumber } from '../../validation/RegularExpressions'
import { readExcelFile } from '../../readExcelFile/reactExcelFile'
import { inscriptionValidation } from '../../validation/inscriptionsValidation'

export const RegisterStudent = () => {
  const excelFileRef = useRef(null)
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

  // Validación de campos y capturación de los valores
  const handleSubmit = async (e) => {
    e.preventDefault()
    // capturar los valores de los inputs del formulario
    const formValues = Object.fromEntries(new FormData(e.target))

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
        text: 'Por favor, completa todos los campos',
      })
    }
    const { error } = inscriptionValidation.validate(formValues)
    if (error !== null) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
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
        text: 'El número de documento no es válido',
      })
    } else if (!isEmailValid) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El correo electrónico no es válido',
      })
    }

    // enviar los datos al backend
    sendDataInscription(formValues)

    // mostramos una alerta de exito
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: msg,
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
    setSelectedFile('')
  }

  // Leer archivo excel
  // TODO: Cambiar el lector de excel porque este NO FUNCIONA
  const handleExcelFile = () => {
    const currentFile = excelFileRef.current.files[0]

    const checkFile = excelFileRef.current.files[0].name.split('.')
    if (checkFile[1] !== 'xlsx' && checkFile[1] !== 'xls') {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Has ingresado un formato inválido. ¡Por favor escoga un formato válido de excel!',
        footer: '.xlsx, .xls',
      })
      excelFileRef.current.value = ''
      return
    }
    readExcelFile(currentFile)
  }
  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      <section className="flex flex-row min-h-screen">
        <Siderbar />
        <section className="relative grid flex-auto w-min grid-rows-3-10-75-15">
          <header className="flex-col mt-5 place-items-center">
            <h1 className="text-2xl font-bold text-center place-self-center">{showDataAprendiz === true ? 'Inscribe un aprendiz' : 'Datos de la empresa'}</h1>
            <h3 className="text-sm font-normal text-center">
              Los datos con (<span className="font-semibold text-red-600">*</span>) son obligatorios
            </h3>
          </header>
          <section>
            <form action="" ref={formRef} className="flex flex-col mt-3 gap-y-6" onSubmit={handleSubmit}>
              <div className={showDataAprendiz ? 'visible' : 'hidden'}>
                <section className="grid w-11/12 mx-auto gap-y-3 gap-x-6 sm:grid-cols-2 md:grid-cols-3">
                  {dataInscription.dataAprendiz.map((item, i) => {
                    return (
                      <div className="flex flex-col w-full m-auto text-gray-400" key={i}>
                        <label htmlFor="nombre" className="text-sm font-normal">
                          {item.label} {item.required && <span className="font-medium text-red-600">*</span>}
                        </label>
                        {item.type === 'number' ? (
                          <input type={item.type} name={item.name} className="border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-1 pl-2 text-sm text-black focus:bg-white focus:outline-none [appearance:textfield] [&::-webit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" autoComplete="on" placeholder={item.placeholder} />
                        ) : item.type === 'select' ? (
                          <div className="relative">
                            <span className="absolute inset-y-0 flex items-center text-xl font-bold pointer-events-none right-3">
                              <LuChevronDown />
                            </span>
                            <select name={item.name} className="border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-1.5 pl-2 text-sm text-black focus:bg-white focus:outline-none appearance-none">
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
                        ) : (
                          <input type={item.type} name={item.name} className="border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-1 pl-2 pr-3 text-sm text-black focus:bg-white focus:outline-none" autoComplete="on" placeholder={item.placeholder} />
                        )}
                      </div>
                    )
                  })}
                </section>
              </div>
              <div className={showDataEmpresa ? 'visible' : 'hidden'}>
                <section className="grid w-11/12 mx-auto gap-y-3 gap-x-6 sm:grid-cols-2 md:grid-cols-3">
                  {dataInscription.dataEmpresa.map((item, i) => {
                    return (
                      <div className="flex flex-col w-full m-auto text-gray-400" key={i}>
                        <label htmlFor="nombre" className="text-sm font-normal whitespace-nowrap">
                          {item.label} {item.required && <span className="font-medium text-red-600">*</span>}
                        </label>
                        {item.type === 'number' ? (
                          <div className="relative">
                            <input type={item.type} name={item.name} className="border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-1 pl-2 text-sm text-black focus:bg-white focus:outline-none [appearance:textfield] [&::-webit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" autoComplete="on" placeholder={item.placeholder} />
                          </div>
                        ) : item.type === 'file' ? (
                          <div className="relative">
                            <span className="absolute inset-y-0 flex items-center text-xl font-bold pointer-events-none right-3">
                              <AiOutlineCloudUpload />
                            </span>
                            <div className="border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-1 pl-2">
                              <input type={item.type} accept={item.accept} name={item.name} className="w-5/6 text-xs file:hidden whitespace-break-spaces" />
                            </div>
                          </div>
                        ) : item.type === 'select' ? (
                          <div className="relative">
                            <span className="absolute inset-y-0 flex items-center text-xl font-bold pointer-events-none right-3">
                              <LuChevronDown />
                            </span>
                            <select name={item.name} className="border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-1 pl-2 text-sm text-black focus:bg-white focus:outline-none appearance-none">
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
                            <textarea id="editor" rows="3" className="block absolute w-full px-0 max-h-[5.5rem] min-h-[2rem] md:max-h-[10rem] overflow-y-auto border-gray-400 focus:text-gray-900 rounded-md border-[1.2px] bg-white py-[0.9px] pl-3 text-base text-black focus:bg-white focus:outline-none" placeholder={item.placeholder} required></textarea>
                          </div>
                        ) : (
                          <div className="relative">
                            <input type={item.type} name={item.name} className="border-gray-400 focus:text-gray-900 w-full rounded-md border-[1.2px] bg-white py-1 pl-2 text-sm text-black focus:bg-white focus:outline-none" autoComplete="on" placeholder={item.placeholder} />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </section>
              </div>
              <section className={`flex h-10 flex-row w-fit gap-10 place-self-center ${showDataEmpresa && 'mt-20'}`}>
                {showDataAprendiz && (
                  <div className="flex px-3 py-1 mx-auto shadow-md w-fit rounded-xl bg-slate-600">
                    <label htmlFor="upload" className="flex items-center gap-2 text-white cursor-pointer">
                      <LuUpload />
                      <span className="font-medium text-white">Subir archivo</span>
                    </label>
                    <input id="upload" ref={excelFileRef} accept=".xlsx, .xls" onChange={handleExcelFile} type="file" className="hidden w-fit" />
                  </div>
                )}
                {showDataEmpresa && (
                  <div className="relative mx-auto">
                    <span className="absolute inset-y-0 flex items-center text-white left-3">
                      <BsCheck2Circle />
                    </span>
                    <Button value={'Guardar'} bg={'bg-lime-500'} px={'pl-10 pr-6'} font={'font-medium'} textSize={'text-md'} py={'py-2'} rounded={'rounded-xl'} shadow={'shadow-lg'} />
                  </div>
                )}
              </section>
            </form>
            <div className="flex flex-col gap-1 mx-auto mt-3 mb-2 md:flex-row w-fit md:gap-5">
              <Button value={'Eliminar datos'} bg={'bg-red-600'} px={'px-3'} font={'font-medium'} textSize="text-md" py={'py-2'} rounded={'rounded-xl'} shadow={'shadow-lg'} clickeame={deleteData} />
              {showDataEmpresa && (
                <div className="relative mx-auto w-fit">
                  <span className="absolute inset-y-0 flex items-center text-white pointer-events-none left-3">
                    <LuArrowLeft />
                  </span>
                  <Button value={'Regresar'} bg={'bg-sky-700'} px={'pr-6 pl-10'} font={'font-medium'} textSize={'text-md'} py={'py-2'} rounded={'rounded-xl'} shadow={'shadow-lg'} clickeame={() => handleChangeSection('aprendiz')} />
                </div>
              )}
              {showDataAprendiz && (
                <div className="relative mx-auto w-fit">
                  <span className="absolute inset-y-0 flex items-center text-white pointer-events-none right-2">
                    <LuArrowRight />
                  </span>
                  <Button value={'Continuar'} bg={'bg-primary'} px={'pr-8 pl-5'} font={'font-medium'} textSize={'text-md'} py={'py-2'} rounded={'rounded-xl'} shadow={'shadow-lg'} clickeame={() => handleChangeSection('empresa')} />
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
