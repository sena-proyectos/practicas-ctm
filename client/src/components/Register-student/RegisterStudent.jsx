import { useRef, useState } from 'react'
import Cookies from 'js-cookie'
import jwtdecoded from 'jwt-decode'
import { ToastContainer } from 'react-toastify'
import Swal from 'sweetalert2'

import { Button } from '../Utils/Button/Button'
import { Siderbar } from '../Siderbar/Sidebar'

import { idTypes, modalities, etapasFormacion, nivelFormacion, apoyoSostenimiento, pagoArl, dataInscription } from '../../import/staticData'
import { InscriptionApprentice } from '../../api/httpRequest'
import { ValidateEmail, ValidateIdentity, ValidateInputsTypeNumber } from '../../validation/RegularExpressions'
import { readExcelFile } from '../../readExcelFile/reactExcelFile'
import { inscriptionValidation } from '../../validation/inscriptionsValidation'

const RegisterStudent = () => {
  const excelFileRef = useRef(null)
  const [msg, setMessage] = useState({})

  const token = Cookies.get('token')
  const decoded = jwtdecoded(token)

  const id = decoded.data.user.id_usuario

  // Validación de campos
  // Capturación de valores
  const handleSubmit = (e) => {
    e.preventDefault()

    // capturar los valores de los inputs del formulario
    const formValues = Object.fromEntries(new FormData(e.target))

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
  const deleteData = () => {}

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
      <section className="flex min-h-screen flex-row">
        <Siderbar />
        <section className="relative grid w-min flex-auto grid-rows-3-10-75-15">
          <header className="grid place-items-center">
            <h1 className="place-self-center text-center text-3xl font-bold">Inscribe a un Aprendiz</h1>
          </header>
          <section>
            <form action="" className="grid-col-2 grid gap-y-10" onSubmit={handleSubmit}>
              <section className="mx-auto grid w-4/5 gap-y-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {dataInscription.map((item, i) => {
                  return (
                    <div className="text-gray-400 m-auto" key={i}>
                      <label htmlFor="nombre" className="font-semibold ">
                        {item.label} {item.required && <span className="text-red-500">*</span>}
                      </label>
                      {item.type === 'number' ? (
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">{item.icon}</span>
                          <input
                            type={item.type}
                            name={item.name}
                            className="border-gray-400 focus:text-gray-900 w-72 rounded-md border-1 bg-white py-1.5 pl-10 text-base text-black focus:bg-white focus:outline-none"
                            style={{
                              WebkitAppearance: 'none',
                              MozAppearance: 'textfield',
                            }}
                            autoComplete="on"
                            placeholder={item.placeholder}
                          />
                        </div>
                      ) : item.type === 'select' ? (
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">{item.icon}</span>
                          <select name={item.name} className="border-gray-400 focus:text-gray-900 w-72 rounded-md border-1 bg-white py-2 pl-10 text-base text-black focus:bg-white focus:outline-none">
                            <option value={''}>Sin seleccionar</option>
                            {item.name === 'tipo_documento_inscripcion'
                              ? idTypes.map((item, i) => {
                                  return (
                                    <option value={item.value} key={i}>
                                      {item.name}
                                    </option>
                                  )
                                })
                              : item.name === 'id_modalidad_inscripcion'
                              ? modalities.map((item, i) => {
                                  return (
                                    <option value={item.value} key={i}>
                                      {item.name}
                                    </option>
                                  )
                                })
                              : item.name === 'etapa_formacion_actual_inscripcion'
                              ? etapasFormacion.map((item, i) => {
                                  return (
                                    <option value={item.value} key={i}>
                                      {item.name}
                                    </option>
                                  )
                                })
                              : item.name === 'nivel_formacion_actual_inscripcion'
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
                              : item.name === 'asume_pago_arl_inscripcion'
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
                      ) : (
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">{item.icon}</span>
                          <input type={item.type} name={item.name} className="border-gray-400 focus:text-gray-900 w-72 rounded-md border-1 bg-white py-1.5 pl-10 text-base text-black focus:bg-white focus:outline-none" autoComplete="on" placeholder={item.placeholder} />
                        </div>
                      )}
                    </div>
                  )
                })}
              </section>
              <section className="flex h-10 flex-col justify-between gap-y-4 lg:flex-row">
                <Button value={'Eliminar datos'} bg="bg-red-500" px="px-[3rem]" onclick={deleteData} />
                <div className="mx-auto flex w-fit rounded-md border border-gray bg-white px-3 py-1 shadow-md">
                  <label htmlFor="upload" className="flex cursor-pointer items-center gap-2 ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 fill-white stroke-indigo-500" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-gray-600 font-medium">Subir archivo</span>
                  </label>
                  <input id="upload" ref={excelFileRef} accept=".xlsx, .xls" onChange={handleExcelFile} type="file" className="hidden w-fit" />
                </div>
                <Button value={'Enviar'} px="px-[4rem]" />
              </section>
            </form>
          </section>
        </section>
      </section>
    </>
  )
}

export { RegisterStudent }
