import Swal from 'sweetalert2'

export const ValidateIdentity = (numero_documento_aprendiz_inscripcion) => {
  const identityRegex = /^\d{8,10}$/
  const esIdentidadValida = identityRegex.test(numero_documento_aprendiz_inscripcion)

  return esIdentidadValida
}

export const ValidateEmail = (correo_electronico_aprendiz_inscripcion) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const esEmailValido = emailRegex.test(correo_electronico_aprendiz_inscripcion)

  return esEmailValido
}

export const ValidateInputsTypeNumber = (numero_documento_aprendiz_inscripcion, numero_telefono_aprendiz_inscripcion, numero_ficha_aprendiz_inscripcion) => {
  // validamos que los campos sean de tipo number
  // isNaN() devuelve true si el argumento no es un número; de lo contrario, es false.
  if (isNaN(numero_documento_aprendiz_inscripcion) || isNaN(numero_telefono_aprendiz_inscripcion) || isNaN(numero_ficha_aprendiz_inscripcion)) {
    return Swal.fire({
      title: '¡Error!',
      text: 'Por favor, ingrese solo números',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    })
  }

  if (numero_telefono_aprendiz_inscripcion.length < 10) {
    return Swal.fire({
      title: '¡Error!',
      text: 'Por favor, ingrese un número de teléfono válido',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    })
  }
}
