import { type Request, type NextFunction, type RequestHandler, type Response } from 'express'
import { type inscripcionDetailData, type inscriptionData } from '../interfaces/inscriptions.interfaces.js'
import { inscriptionDetailSchema, inscriptionSchema } from '../schemas/inscriptions.schemas.js'
import { type CustomError, DataNotValid, NumberIsNaN } from '../errors/customErrors.js'
import { handleHTTP } from '../errors/errorsHandler.js'

/**
 * @description Middleware para verificar y validar los datos de inscripción.
 * @param req La solicitud HTTP con los datos de inscripción en el cuerpo (inscriptions).
 * @param res La respuesta HTTP.
 * @param next Función para pasar al siguiente middleware.
 */
export const checkInscriptionData: RequestHandler<{}, Response, inscriptionData> = (req: Request, res: Response, next: NextFunction): void => {
  const inscriptions = req.body as inscriptionData[]

  try {
    let inscriptionLength = 0
    for (const inscription of inscriptions) {
      const { nombre_inscripcion, apellido_inscripcion, tipo_documento_inscripcion, documento_inscripcion, email_inscripcion, inscripcion_celular, etapa_actual_inscripcion, modalidad_inscripcion, nombre_programa_inscripcion, nivel_formacion_inscripcion, numero_ficha_inscripcion, fecha_fin_lectiva_inscripcion, nombre_instructor_lider_inscripcion, email_instructor_lider_inscripcion, apoyo_sostenimiento_inscripcion, nit_empresa_inscripcion, nombre_empresa_inscripcion, direccion_empresa_inscripcion, nombre_jefe_empresa_inscripcion, cargo_jefe_empresa_inscripcion, telefono_jefe_empresa_inscripcion, email_jefe_empresa_inscripcion, arl, link_documentos, observaciones, responsable_inscripcion } = inscription

      // * Parseo de datos de forma Number para ver si los datos que vienen string son numeros
      const numberParsed = Number(documento_inscripcion)
      const phoneStudentParsed = Number(inscripcion_celular)
      const fichaNumber = Number(numero_ficha_inscripcion)
      const nitEmpresaNumber = Number(nit_empresa_inscripcion)
      const phoneBossParsed = Number(telefono_jefe_empresa_inscripcion)
      if (isNaN(numberParsed)) throw new NumberIsNaN('El número de documento no es un número.')
      if (isNaN(phoneStudentParsed)) throw new NumberIsNaN('El número de celular del estudiante no es un número.')
      if (isNaN(fichaNumber)) throw new NumberIsNaN('El número de la ficha no es un número.')
      if (isNaN(nitEmpresaNumber)) throw new NumberIsNaN('El nit de la empresa no es un número.')
      if (isNaN(phoneBossParsed)) throw new NumberIsNaN('El número de celular del jefe inmediato no es un número.')

      const { error } = inscriptionSchema.validate({
        nombre_inscripcion, apellido_inscripcion, tipo_documento_inscripcion, documento_inscripcion: numberParsed, email_inscripcion, inscripcion_celular: phoneStudentParsed, etapa_actual_inscripcion, modalidad_inscripcion, nombre_programa_inscripcion, nivel_formacion_inscripcion, numero_ficha_inscripcion: fichaNumber, fecha_fin_lectiva_inscripcion, nombre_instructor_lider_inscripcion, email_instructor_lider_inscripcion, apoyo_sostenimiento_inscripcion, nit_empresa_inscripcion: nitEmpresaNumber, nombre_empresa_inscripcion, direccion_empresa_inscripcion, nombre_jefe_empresa_inscripcion, cargo_jefe_empresa_inscripcion, telefono_jefe_empresa_inscripcion: phoneBossParsed, email_jefe_empresa_inscripcion, arl, link_documentos, observaciones, responsable_inscripcion
      })
      if (error !== undefined) throw new DataNotValid(`Los datos ingresados del id ${inscriptionLength} no son válidos, verifícalos.`)
      inscriptionLength += 1
    }
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}

/**
 * @description Middleware para verificar y validar los datos de detalle de inscripción a actualizar.
 * @param req La solicitud HTTP con los parámetros de ruta y datos de actualización en el cuerpo.
 * @param res La respuesta HTTP.
 * @param next Función para pasar al siguiente middleware.
 */
export const checkInscriptionDetailData: RequestHandler<{ }, Response, inscripcionDetailData> = (req: Request, res: Response, next: NextFunction): void => {
  const { responsable_aval } = req.params
  const { estado_aval, observaciones, id_inscripcion } = req.body
  try {
    const idUserNumber = Number(responsable_aval)
    const idInscriptionNumber = Number(id_inscripcion)
    if (isNaN(idInscriptionNumber)) throw new NumberIsNaN('El id del usuario no es un nÃ®mero.')
    if (isNaN(idUserNumber)) throw new NumberIsNaN('El id del usuario no es un número.')
    const { error } = inscriptionDetailSchema.validate({ id_inscripcion, responsable_aval, estado_aval, observaciones })
    if (error !== undefined) throw new DataNotValid('Los datos ingresados no son válidos, verifícalos.')
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}
