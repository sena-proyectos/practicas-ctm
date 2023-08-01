import { type RequestHandler, type Request, type Response } from 'express'
import { type inscripcionDetailData, type inscriptionData } from '../interfaces/inscriptions.interfaces.js'
import { connection } from '../config/db.js'
import { httpStatus } from '../models/httpStatus.enums.js'
import { handleHTTP } from '../errors/errorsHandler.js'
import { type CustomError, DbErrorNotFound, DbError } from '../errors/customErrors.js'
import { type RowDataPacket } from 'mysql2'
import { errorCodes } from '../models/errorCodes.enums.js'

export const getInscriptions = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const [inscriptions] = await connection.query('SELECT * FROM inscripciones')
    return res.status(httpStatus.OK).json({ data: inscriptions })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const getInscriptionsDetailsByUser: RequestHandler<{ id: string }, Response, unknown> = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  const { id: id_responsable } = req.params
  const { limit, offset } = req.query
  const idNumber = Number(id_responsable)
  const limitNumber = Number(limit)
  const offsetNumber = Number(offset)
  try {
    // ! El limit y el offset son obligatorios, de esta forma evitar tantos datos en una busqueda grande.
    const [inscriptions] = await connection.query('SELECT * FROM detalles_inscripciones WHERE responsable_aval = ? LIMIT ? OFFSET ?', [idNumber, limitNumber, offsetNumber])
    return res.status(httpStatus.OK).json({ data: inscriptions })
  } catch (err) {
    console.log(err)
    return handleHTTP(res, new DbErrorNotFound('No se encontraron datos'))
  }
}

export const getInscriptionsDetailsByInscription: RequestHandler<{ id: string }, Response, unknown> = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  const { id: id_inscripcion } = req.params
  const { limit, offset } = req.query
  const idNumber = Number(id_inscripcion)
  const limitNumber = Number(limit)
  const offsetNumber = Number(offset)
  try {
    // ! El limit y el offset son obligatorios, de esta forma evitar tantos datos en una busqueda grande.
    const [inscriptions] = await connection.query('SELECT * FROM detalles_inscripciones WHERE id_inscripcion = ? LIMIT ? OFFSET ?', [idNumber, limitNumber, offsetNumber])
    return res.status(httpStatus.OK).json({ data: inscriptions })
  } catch (err) {
    console.log(err)
    return handleHTTP(res, new DbErrorNotFound('No se encontraron datos'))
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

export const createInscriptions: RequestHandler<{}, Response, inscriptionData> = async (req: Request, res: Response): Promise<Response> => {
  const inscriptions = req.body as inscriptionData[]
  try {
    let i = 0
    for (const inscription of inscriptions) {
      const {
        nombre_inscripcion, apellido_inscripcion, tipo_documento_inscripcion, documento_inscripción, email_inscripcion, inscripción_celular, etapa_actual_inscripcion, modalidad_inscripción, nombre_programa_inscripción, nivel_formacion_inscripcion, numero_ficha_inscripcion, fecha_fin_lectiva_inscripcion, nombre_instructor_lider_inscripcion, email_instructor_lider_inscripcion, apoyo_sostenimiento_inscripcion, nit_empresa_inscripcion, nombre_empresa_inscripción, direccion_empresa_inscripcion, nombre_jefe_empresa_inscripcion, cargo_jefe_empresa_inscripcion, telefono_jefe_empresa_inscripcion, email_jefe_empresa_inscripcion, arl, link_documentos, observaciones, responsable_inscripcion
      } = inscription
      const [result] = await connection.query(
        'INSERT INTO inscripciones (nombre_inscripcion, apellido_inscripcion, tipo_documento_inscripcion, documento_inscripción, email_inscripcion, inscripción_celular, etapa_actual_inscripcion, modalidad_inscripción, nombre_programa_inscripción, nivel_formacion_inscripcion, numero_ficha_inscripcion, fecha_fin_lectiva_inscripcion, nombre_instructor_lider_inscripcion, email_instructor_lider_inscripcion, apoyo_sostenimiento_inscripcion, nit_empresa_inscripcion, nombre_empresa_inscripción, direccion_empresa_inscripcion, nombre_jefe_empresa_inscripcion, cargo_jefe_empresa_inscripcion, telefono_jefe_empresa_inscripcion, email_jefe_empresa_inscripcion, arl, link_documentos, observaciones, responsable_inscripcion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [nombre_inscripcion, apellido_inscripcion, tipo_documento_inscripcion, documento_inscripción, email_inscripcion, inscripción_celular, etapa_actual_inscripcion, modalidad_inscripción, nombre_programa_inscripción, nivel_formacion_inscripcion, numero_ficha_inscripcion, fecha_fin_lectiva_inscripcion, nombre_instructor_lider_inscripcion, email_instructor_lider_inscripcion, apoyo_sostenimiento_inscripcion, nit_empresa_inscripcion, nombre_empresa_inscripción, direccion_empresa_inscripcion, nombre_jefe_empresa_inscripcion, cargo_jefe_empresa_inscripcion, telefono_jefe_empresa_inscripcion, email_jefe_empresa_inscripcion, arl, link_documentos, observaciones, responsable_inscripcion
        ]
      )
      if ((result as RowDataPacket[]).length === 0) throw new DbErrorNotFound(`No se pudo crear la inscripcion número ${i}.`, errorCodes.ERROR_CREATE_STUDENT)
      i += 1
    }
    return res.status(httpStatus.CREATED).json({ data: { infoInscription: `Added ${i}`, msg: 'Inscripciones creados' } })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const editInscriptionDetail: RequestHandler<{ }, Response, inscripcionDetailData> = async (req: Request, res: Response) => {
  const { responsable_aval } = req.params
  const { estado_aval, observaciones, id_inscripcion } = req.body
  try {
    const [result] = await connection.query('UPDATE detalles_inscripciones SET estado_aval = ?, observaciones = ? WHERE id_inscripcion = ? AND responsable_aval = ?', [estado_aval, observaciones, id_inscripcion, responsable_aval])
    if (!Array.isArray(result) && result?.affectedRows === 0) throw new DbError('No se pudo actualizar la modalidad de etapa práctica')
    return res.status(httpStatus.OK).json({ message: 'Modalidad de etapa práctica actualizada con éxito' })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

// ! NOT BEING USED ----------------------------------------------
/* export const editInscription: RequestHandler<{ id: string }, Response, inscriptionData> = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
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
  const { id } = req.params
  try {
    const [inscription] = await connection.query(
      'UPDATE inscripciones SET id_modalidad_inscripcion = IFNULL(?, id_modalidad_inscripcion), nombres_inscripcion = IFNULL(?,nombres_inscripcion), apellidos_inscripcion = IFNULL(?, apellidos_inscripcion), tipo_documento_inscripcion = IFNULL(?, tipo_documento_inscripcion), numero_documento_inscripcion = IFNULL(?, numero_documento_inscripcion), correo_electronico_inscripcion = IFNULL(?, correo_electronico_inscripcion), numero_celular_inscripcion = IFNULL(?, numero_celular_inscripcion), etapa_formacion_actual_inscripcion = IFNULL(?, etapa_formacion_actual_inscripcion), nivel_formacion_actual_inscripcion = IFNULL(?, nivel_formacion_actual_inscripcion), id_ficha_inscripcion = IFNULL(?, id_ficha_inscripcion), id_instructor_lider_inscripcion = IFNULL(?, id_instructor_lider_inscripcion), apoyo_sostenimiento_inscripcion = IFNULL(?, apoyo_sostenimiento_inscripcion), id_empresa_inscripcion = IFNULL(?, id_empresa_inscripcion), nombre_completo_jefe_inmediato_inscripcion = IFNULL(?, nombre_completo_jefe_inmediato_inscripcion), cargo_jefe_inmediato_inscripcion = IFNULL(?, cargo_jefe_inmediato_inscripcion), telefono_jefe_inmediato_inscripcion = IFNULL(?, telefono_jefe_inmediato_inscripcion), correo_jefe_inmediato_inscripcion = IFNULL(?, correo_jefe_inmediato_inscripcion), asume_pago_arl_inscripcion = IFNULL(?, asume_pago_arl_inscripcion), link_documentos_pdf_inscripcion = IFNULL(?, link_documentos_pdf_inscripcion), observaciones_inscripcion = IFNULL(?, observaciones_inscripcion), fecha_creacion_inscripcion = IFNULL(?, fecha_creacion_inscripcion), id_usuario_responsable_inscripcion = IFNULL(?, id_usuario_responsable_inscripcion) WHERE id_inscripcion = ? ',
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
        link_documentos_pdf_inscripcion,
        observaciones_inscripcion,
        fecha_creacion_inscripcion,
        id_usuario_responsable_inscripcion,
        id
      ]
    )
    if (!Array.isArray(inscription) && inscription?.affectedRows === 0) throw new DbError('No se pudo modificar la inscripción.')
    return res.status(httpStatus.OK).json({ message: 'Inscripción modificada con éxito.' })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
} */
