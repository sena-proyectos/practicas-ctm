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
  try {
    await connection.query(
      'INSERT INTO inscripciones (id_modalidad_inscripcion, nombres_inscripcion, apellidos_inscripcion, tipo_documento_inscripcion, numero_documento_inscripcion, correo_electronico_inscripcion, numero_celular_inscripcion, etapa_formacion_actual_inscripcion, nivel_formacion_actual_inscripcion, id_ficha_inscripcion, id_instructor_lider_inscripcion, apoyo_sostenimiento_inscripcion, id_empresa_inscripcion, nombre_completo_jefe_inmediato_inscripcion, cargo_jefe_inmediato_inscripcion, telefono_jefe_inmediato_inscripcion, correo_jefe_inmediato_inscripcion, asume_pago_arl_inscripcion, link_documentos_pdf_inscripcion, observaciones_inscripcion, id_usuario_responsable_inscripcion, fecha_creacion_inscripcion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, "Doc.pdf", ?, ?, CURDATE())',
      [
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
        observaciones_inscripcion,
        id_usuario_responsable_inscripcion
      ]
    )
    return res.status(httpStatus.CREATED).json({ message: 'Inscripción creada.' })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}
