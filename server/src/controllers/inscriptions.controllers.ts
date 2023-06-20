import { type RequestHandler, type Request, type Response } from 'express'
import { type inscriptionData } from '../interfaces/inscriptions.interfaces.js'
import { connection } from '../config/db.js'
import { httpStatus } from '../models/httpStatus.enums.js'
import { handleHTTP } from '../errors/errorsHandler.js'
import { DbError, type CustomError } from '../errors/customErrors.js'

export const getInscriptions = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const [inscriptions] = await connection.query('SELECT * FROM inscripciones')
    return res.status(httpStatus.OK).json({ data: inscriptions })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const getInscriptionById: RequestHandler<{ id: string }, Response, inscriptionData> = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  const { id } = req.params
  const idNumber = Number(id)
  try {
    const [inscription] = await connection.query('SELECT * FROM inscripciones WHERE id_inscripcion = ?', [idNumber])
    return res.status(httpStatus.OK).json({ data: inscription })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const createInscription: RequestHandler<{}, Response, inscriptionData> = async (req: Request, res: Response): Promise<Response> => {
  const { id_modalidad_inscripcion, nombres_inscripcion, apellidos_inscripcion, tipo_documento_inscripcion, numero_documento_inscripcion, correo_electronico_inscripcion, numero_celular_inscripcion, etapa_formacion_actual_inscripcion, nivel_formacion_actual_inscripcion, id_ficha_inscripcion, id_instructor_lider_inscripcion, apoyo_sostenimiento_inscripcion, id_empresa_inscripcion, nombre_completo_jefe_inmediato_inscripcion, cargo_jefe_inmediato_inscripcion, telefono_jefe_inmediato_inscripcion, correo_jefe_inmediato_inscripcion, asume_pago_arl_inscripcion, link_documentos_pdf_inscripcion, observaciones_inscripcion, fecha_creacion_inscripcion, id_usuario_responsable_inscripcion } = req.body
  try {
    await connection.query('INSERT INTO inscripciones (id_modalidad_inscripcion, nombres_inscripcion, apellidos_inscripcion, tipo_documento_inscripcion, numero_documento_inscripcion, correo_electronico_inscripcion, numero_celular_inscripcion, etapa_formacion_actual_inscripcion, nivel_formacion_actual_inscripcion, id_ficha_inscripcion, id_instructor_lider_inscripcion, apoyo_sostenimiento_inscripcion, id_empresa_inscripcion, nombre_completo_jefe_inmediato_inscripcion, cargo_jefe_inmediato_inscripcion, telefono_jefe_inmediato_inscripcion, correo_jefe_inmediato_inscripcion, asume_pago_arl_inscripcion, link_documentos_pdf_inscripcion, observaciones_inscripcion, fecha_creacion_inscripcion, id_usuario_responsable_inscripcion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
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
      id_usuario_responsable_inscripcion,
    ])
    return res.status(httpStatus.CREATED).json({ message: 'Inscripción creada.' })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const editInscription: RequestHandler<{ id: string }, Response, inscriptionData> = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  const { id_modalidad_inscripcion, nombres_inscripcion, apellidos_inscripcion, tipo_documento_inscripcion, numero_documento_inscripcion, correo_electronico_inscripcion, numero_celular_inscripcion, etapa_formacion_actual_inscripcion, nivel_formacion_actual_inscripcion, id_ficha_inscripcion, id_instructor_lider_inscripcion, apoyo_sostenimiento_inscripcion, id_empresa_inscripcion, nombre_completo_jefe_inmediato_inscripcion, cargo_jefe_inmediato_inscripcion, telefono_jefe_inmediato_inscripcion, correo_jefe_inmediato_inscripcion, asume_pago_arl_inscripcion, link_documentos_pdf_inscripcion, observaciones_inscripcion, fecha_creacion_inscripcion, id_usuario_responsable_inscripcion } = req.body
  const { id } = req.params
  try {
    const [inscription] = await connection.query(
      'UPDATE inscripciones SET id_modalidad_inscripcion = IFNULL(?, id_modalidad_inscripcion), nombres_inscripcion = IFNULL(?,nombres_inscripcion), apellidos_inscripcion = IFNULL(?, apellidos_inscripcion), tipo_documento_inscripcion = IFNULL(?, tipo_documento_inscripcion), numero_documento_inscripcion = IFNULL(?, numero_documento_inscripcion), correo_electronico_inscripcion = IFNULL(?, correo_electronico_inscripcion), numero_celular_inscripcion = IFNULL(?, numero_celular_inscripcion), etapa_formacion_actual_inscripcion = IFNULL(?, etapa_formacion_actual_inscripcion), nivel_formacion_actual_inscripcion = IFNULL(?, nivel_formacion_actual_inscripcion), id_ficha_inscripcion = IFNULL(?, id_ficha_inscripcion), id_instructor_lider_inscripcion = IFNULL(?, id_instructor_lider_inscripcion), apoyo_sostenimiento_inscripcion = IFNULL(?, apoyo_sostenimiento_inscripcion), id_empresa_inscripcion = IFNULL(?, id_empresa_inscripcion), nombre_completo_jefe_inmediato_inscripcion = IFNULL(?, nombre_completo_jefe_inmediato_inscripcion), cargo_jefe_inmediato_inscripcion = IFNULL(?, cargo_jefe_inmediato_inscripcion), telefono_jefe_inmediato_inscripcion = IFNULL(?, telefono_jefe_inmediato_inscripcion), correo_jefe_inmediato_inscripcion = IFNULL(?, correo_jefe_inmediato_inscripcion), asume_pago_arl_inscripcion = IFNULL(?, asume_pago_arl_inscripcion), link_documentos_pdf_inscripcion = IFNULL(?, link_documentos_pdf_inscripcion), observaciones_inscripcion = IFNULL(?, observaciones_inscripcion), fecha_creacion_inscripcion = IFNULL(?, fecha_creacion_inscripcion), id_usuario_responsable_inscripcion = IFNULL(?, id_usuario_responsable_inscripcion) WHERE id_inscripcion = ? ',
      [id_modalidad_inscripcion, nombres_inscripcion, apellidos_inscripcion, tipo_documento_inscripcion, numero_documento_inscripcion, correo_electronico_inscripcion, numero_celular_inscripcion, etapa_formacion_actual_inscripcion, nivel_formacion_actual_inscripcion, id_ficha_inscripcion, id_instructor_lider_inscripcion, apoyo_sostenimiento_inscripcion, id_empresa_inscripcion, nombre_completo_jefe_inmediato_inscripcion, cargo_jefe_inmediato_inscripcion, telefono_jefe_inmediato_inscripcion, correo_jefe_inmediato_inscripcion, asume_pago_arl_inscripcion, link_documentos_pdf_inscripcion, observaciones_inscripcion, fecha_creacion_inscripcion, id_usuario_responsable_inscripcion, id]
    )
    if (!Array.isArray(inscription) && inscription?.affectedRows === 0) throw new DbError('No se pudo modificar la inscripción.')
    return res.status(httpStatus.OK).json({ message: 'Inscripción modificada con éxito.' })
  } catch (error) {
    console.log(error)
    return handleHTTP(res, error as CustomError)
  }
}
