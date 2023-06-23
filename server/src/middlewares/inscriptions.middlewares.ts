import { type Request, type NextFunction, type RequestHandler, type Response } from 'express'
import { type inscriptionData } from '../interfaces/inscriptions.interfaces.js'
import { inscriptionSchema } from '../schemas/inscriptions.schemas.js'
import { type CustomError, DataNotValid, NumberIsNaN } from '../errors/customErrors.js'
import { handleHTTP } from '../errors/errorsHandler.js'

export const checkInscriptionData: RequestHandler<{}, Response, inscriptionData> = (req: Request, res: Response, next: NextFunction): void => {
  const {
    id_modalidad_inscripcion,
    nombres_inscripcion,
    apellidos_inscripcion,
    tipo_documento_inscripcion,
    numero_documento_inscripcion,
    correo_electronico_inscripcion,
    numero_celular_inscripcion,
    etapa_formacion_actual_inscripcion,
    nivel_formacion_actual_inscripcion,
    id_ficha_inscripcion,
    id_instructor_lider_inscripcion,
    apoyo_sostenimiento_inscripcion,
    id_empresa_inscripcion,
    nombre_completo_jefe_inmediato_inscripcion,
    cargo_jefe_inmediato_inscripcion,
    telefono_jefe_inmediato_inscripcion,
    correo_jefe_inmediato_inscripcion,
    asume_pago_arl_inscripcion,
    link_documentos_pdf_inscripcion,
    observaciones_inscripcion,
    fecha_creacion_inscripcion,
    id_usuario_responsable_inscripcion
  } = req.body
  // * Parseo de datos en forma int de los id para ver si son números
  const idModalidadNumber = parseInt(id_modalidad_inscripcion, 10)
  const idFichaNumber = parseInt(id_ficha_inscripcion, 10)
  const idInstructorLiderNumber = parseInt(id_instructor_lider_inscripcion, 10)
  const idEmpresaNumber = parseInt(id_empresa_inscripcion, 10)
  const idUsuarioResponsableNumber = parseInt(id_usuario_responsable_inscripcion, 10)

  // * Parseo de datos de forma Number para ver si los datos que vienen string son numeros
  const idNumberParsed = Number(numero_documento_inscripcion)
  const phoneStudentParsed = Number(numero_celular_inscripcion)
  const phoneBossParsed = Number(telefono_jefe_inmediato_inscripcion)

  try {
    if (isNaN(idModalidadNumber)) throw new NumberIsNaN('El id de la modalidad no es un número.')
    if (isNaN(idFichaNumber)) throw new NumberIsNaN('El id de la ficha no es un número.')
    if (isNaN(idInstructorLiderNumber)) throw new NumberIsNaN('El id del instructor líder no es un número.')
    if (isNaN(idEmpresaNumber)) throw new NumberIsNaN('El id de la empresa no es un número.')
    if (isNaN(idUsuarioResponsableNumber)) throw new NumberIsNaN('El id del usuario responsable no es un número.')

    if (isNaN(idNumberParsed)) throw new NumberIsNaN('El número de documento no es un número.')
    if (isNaN(phoneStudentParsed)) throw new NumberIsNaN('El número de celular del estudiante no es un número.')
    if (isNaN(phoneBossParsed)) throw new NumberIsNaN('El número de celular del jefe inmediato no es un número.')

    const { error } = inscriptionSchema.validate({
      id_modalidad_inscripcion,
      nombres_inscripcion,
      apellidos_inscripcion,
      tipo_documento_inscripcion,
      numero_documento_inscripcion,
      correo_electronico_inscripcion,
      numero_celular_inscripcion,
      etapa_formacion_actual_inscripcion,
      nivel_formacion_actual_inscripcion,
      id_ficha_inscripcion,
      id_instructor_lider_inscripcion,
      apoyo_sostenimiento_inscripcion,
      id_empresa_inscripcion,
      nombre_completo_jefe_inmediato_inscripcion,
      cargo_jefe_inmediato_inscripcion,
      telefono_jefe_inmediato_inscripcion,
      correo_jefe_inmediato_inscripcion,
      asume_pago_arl_inscripcion,
      link_documentos_pdf_inscripcion,
      observaciones_inscripcion,
      fecha_creacion_inscripcion,
      id_usuario_responsable_inscripcion
    })
    if (error !== undefined) throw new DataNotValid('Datos de inscripción no válidos.')
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}
