import { type RequestHandler, type Request, type Response } from 'express'
import { type inscripcionDetailData, type inscriptionData } from '../interfaces/inscriptions.interfaces.js'
import { connection } from '../config/db.js'
import { httpStatus } from '../models/httpStatus.enums.js'
import { handleHTTP } from '../errors/errorsHandler.js'
import { type CustomError, DbErrorNotFound, DbError, DataNotValid } from '../errors/customErrors.js'
import { type RowDataPacket } from 'mysql2'
import { errorCodes } from '../models/errorCodes.enums.js'

/**
 * @description Obtiene todas las inscripciones.
 * @param _req La solicitud HTTP (no se utiliza en esta función).
 * @param res La respuesta HTTP.
 * @returns Respuesta JSON con las inscripciones o un error.
 */
export const getInscriptions = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const [inscriptions] = await connection.query('SELECT i.*, COUNT(d.estado_aval) AS avales_aprobados FROM inscripciones i LEFT JOIN detalles_inscripciones d ON i.id_inscripcion = d.id_inscripcion AND d.estado_aval = "Aprobado" GROUP BY i.id_inscripcion ORDER BY CASE WHEN i.estado_general_inscripcion = "Pendiente" THEN 0 WHEN i.estado_general_inscripcion = "Aprobado" THEN 1 WHEN i.estado_general_inscripcion = "Rechazado" THEN 2 END')
    return res.status(httpStatus.OK).json({ data: inscriptions })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

/**
 * @description Obtiene detalles de inscripción por el ID del usuario responsable.
 * @param req La solicitud HTTP con el parámetro de ID y parámetros de consulta (limit y offset).
 * @param res La respuesta HTTP.
 * @returns Respuesta JSON con los detalles de inscripción correspondientes al usuario responsable o un error.
 */
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
    return handleHTTP(res, new DbErrorNotFound('No se encontraron datos'))
  }
}

/**
 * @description Obtiene detalles de inscripción por su ID.
 * @param req La solicitud HTTP con el parámetro de ID y parámetros de consulta (limit y offset).
 * @param res La respuesta HTTP.
 * @returns Respuesta JSON con los detalles de inscripción correspondientes o un error.
 */
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
    return handleHTTP(res, new DbErrorNotFound('No se encontraron datos'))
  }
}

export const getInscriptionsDetailsById: RequestHandler<{ id: string }, Response, unknown> = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  const { id: id_inscripcion } = req.params
  const idNumber = Number(id_inscripcion)

  try {
    const [inscriptions] = await connection.query('SELECT detalles_inscripciones.*, inscripciones.fecha_creacion FROM detalles_inscripciones LEFT JOIN inscripciones ON inscripciones.id_inscripcion = detalles_inscripciones.id_inscripcion WHERE detalles_inscripciones.id_detalle_inscripcion = ?', [idNumber])
    const formattedInscriptions = (inscriptions as Array<{ fecha_modificacion: Date, fecha_creacion: Date }>).map((inscription) => {
      const formattedDate = new Date(inscription.fecha_modificacion).toLocaleString()
      const formattedDateCreation = new Date(inscription.fecha_creacion).toLocaleDateString()
      return { ...inscription, fecha_modificacion: formattedDate, fecha_creacion: formattedDateCreation }
    })

    return res.status(httpStatus.OK).json({ data: formattedInscriptions })
  } catch (err) {
    return handleHTTP(res, new DbErrorNotFound('No se encontraron datos'))
  }
}

/**
 * @description Obtiene una inscripción por su ID.
 * @param req La solicitud HTTP con el parámetro de ID.
 * @param res La respuesta HTTP.
 * @returns Respuesta JSON con la inscripción correspondiente o un error.
 */
export const getInscriptionById: RequestHandler<{ id: string }, Response, inscriptionData> = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  const { id } = req.params
  const idNumber = Number(id)
  try {
    const [inscription] = await connection.query('SELECT id_inscripcion, nombre_inscripcion, apellido_inscripcion, tipo_documento_inscripcion, documento_inscripcion, email_inscripcion, inscripcion_celular, etapa_actual_inscripcion, modalidad_inscripcion, nombre_programa_inscripcion, nivel_formacion_inscripcion, numero_ficha_inscripcion, DATE_FORMAT(fecha_fin_lectiva_inscripcion, "%Y-%m-%d") as fecha_fin_lectiva_inscripcion, nombre_instructor_lider_inscripcion, email_instructor_lider_inscripcion, apoyo_sostenimiento_inscripcion, nit_empresa_inscripcion, nombre_empresa_inscripcion, direccion_empresa_inscripcion, nombre_jefe_empresa_inscripcion, cargo_jefe_empresa_inscripcion, telefono_jefe_empresa_inscripcion, email_jefe_empresa_inscripcion, arl, link_documentos, observaciones, estado_general_inscripcion, fecha_creacion, responsable_inscripcion FROM inscripciones WHERE id_inscripcion = ?', [idNumber])
    return res.status(httpStatus.OK).json({ data: inscription })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

/**
 * @description Crea inscripciones en la base de datos.
 * @param req La solicitud HTTP con los datos de inscripción en el cuerpo (inscriptions).
 * @param res La respuesta HTTP.
 * @returns Respuesta JSON con información sobre las inscripciones creadas o un error.
 */
export const createInscriptions: RequestHandler<{}, Response, inscriptionData> = async (req: Request, res: Response): Promise<Response> => {
  const inscriptions = req.body as inscriptionData[]
  try {
    let i = 0
    for (const inscription of inscriptions) {
      const { nombre_inscripcion, apellido_inscripcion, tipo_documento_inscripcion, documento_inscripcion, email_inscripcion, inscripcion_celular, etapa_actual_inscripcion, modalidad_inscripcion, nombre_programa_inscripcion, nivel_formacion_inscripcion, numero_ficha_inscripcion, fecha_fin_lectiva_inscripcion, nombre_instructor_lider_inscripcion, email_instructor_lider_inscripcion, apoyo_sostenimiento_inscripcion, nit_empresa_inscripcion, nombre_empresa_inscripcion, direccion_empresa_inscripcion, municipio_empresa, nombre_jefe_empresa_inscripcion, cargo_jefe_empresa_inscripcion, telefono_jefe_empresa_inscripcion, email_jefe_empresa_inscripcion, arl, link_documentos, observaciones, responsable_inscripcion } = inscription
      const [result] = await connection.query('INSERT INTO inscripciones (nombre_inscripcion, apellido_inscripcion, tipo_documento_inscripcion, documento_inscripcion, email_inscripcion, inscripcion_celular, etapa_actual_inscripcion, modalidad_inscripcion, nombre_programa_inscripcion, nivel_formacion_inscripcion, numero_ficha_inscripcion, fecha_fin_lectiva_inscripcion, nombre_instructor_lider_inscripcion, email_instructor_lider_inscripcion, apoyo_sostenimiento_inscripcion, nit_empresa_inscripcion, nombre_empresa_inscripcion, direccion_empresa_inscripcion, municipio_empresa, nombre_jefe_empresa_inscripcion, cargo_jefe_empresa_inscripcion, telefono_jefe_empresa_inscripcion, email_jefe_empresa_inscripcion, arl, link_documentos, observaciones, responsable_inscripcion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
        nombre_inscripcion,
        apellido_inscripcion,
        tipo_documento_inscripcion,
        documento_inscripcion,
        email_inscripcion,
        inscripcion_celular,
        etapa_actual_inscripcion,
        modalidad_inscripcion,
        nombre_programa_inscripcion,
        nivel_formacion_inscripcion,
        numero_ficha_inscripcion,
        fecha_fin_lectiva_inscripcion,
        nombre_instructor_lider_inscripcion,
        email_instructor_lider_inscripcion,
        apoyo_sostenimiento_inscripcion,
        nit_empresa_inscripcion,
        nombre_empresa_inscripcion,
        direccion_empresa_inscripcion,
        municipio_empresa,
        nombre_jefe_empresa_inscripcion,
        cargo_jefe_empresa_inscripcion,
        telefono_jefe_empresa_inscripcion,
        email_jefe_empresa_inscripcion,
        arl,
        link_documentos,
        observaciones,
        responsable_inscripcion
      ])
      if ((result as RowDataPacket[]).length === 0) throw new DbErrorNotFound(`No se pudo crear la inscripcion número ${i}.`, errorCodes.ERROR_CREATE_STUDENT)
      i += 1
    }
    return res.status(httpStatus.CREATED).json({ data: { infoInscription: `Added ${i}`, msg: 'Inscripciones creados', code: 'toEnd' } })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

/**
 * @description Actualiza detalles de inscripción por el ID del usuario responsable.
 * @param req La solicitud HTTP con los parámetros de ruta y datos de actualización en el cuerpo.
 * @param res La respuesta HTTP.
 * @returns Respuesta JSON con mensaje de éxito o un error.
 */
export const editInscriptionDetail: RequestHandler<{}, Response, inscripcionDetailData> = async (req: Request, res: Response) => {
  const { id } = req.params
  const { estado_aval, observaciones, responsable_aval } = req.body
  try {
    const [result] = await connection.query('UPDATE detalles_inscripciones SET estado_aval = IFNULL(?, estado_aval), observaciones = IFNULL(?, observaciones), responsable_aval = IFNULL(?, responsable_aval) WHERE id_detalle_inscripcion = ?', [estado_aval, observaciones, responsable_aval, id])
    if (!Array.isArray(result) && result?.affectedRows === 0) throw new DbError('No se pudo actualizar la modalidad de etapa práctica')
    return res.status(httpStatus.OK).json({ message: 'Aval de inscripción actualizada con éxito' })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

/**
 * @description Actualiza una inscripción por su ID.
 * @param req La solicitud HTTP con el ID de inscripción en los parámetros y los datos a actualizar en el cuerpo.
 * @param res La respuesta HTTP.
 * @returns Respuesta JSON con mensaje de éxito o un error.
 */
export const editInscription: RequestHandler<{ id: string }, Response, inscriptionData> = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  const { nombre_inscripcion, apellido_inscripcion, tipo_documento_inscripcion, documento_inscripcion, email_inscripcion, inscripcion_celular, etapa_actual_inscripcion, modalidad_inscripcion, nivel_formacion_inscripcion, numero_ficha_inscripcion, fecha_fin_lectiva_inscripcion, nombre_instructor_lider_inscripcion, email_instructor_lider_inscripcion, apoyo_sostenimiento_inscripcion, nit_empresa_inscripcion, nombre_empresa_inscripción, direccion_empresa_inscripcion, nombre_jefe_empresa_inscripcion, cargo_jefe_empresa_inscripcion, telefono_jefe_empresa_inscripcion, email_jefe_empresa_inscripcion, arl, link_documentos, observaciones } = req.body
  const { id } = req.params
  try {
    const [inscription] = await connection.query(
      'UPDATE inscripciones SET nombre_inscripcion = IFNULL(?, nombre_inscripcion), apellido_inscripcion = IFNULL(?,apellido_inscripcion), tipo_documento_inscripcion = IFNULL(?, tipo_documento_inscripcion), documento_inscripcion = IFNULL(?, documento_inscripcion), email_inscripcion = IFNULL(?, email_inscripcion), inscripcion_celular = IFNULL(?, inscripcion_celular), etapa_actual_inscripcion = IFNULL(?, etapa_actual_inscripcion), modalidad_inscripcion = IFNULL(?, modalidad_inscripcion), nivel_formacion_inscripcion = IFNULL(?, nivel_formacion_inscripcion), numero_ficha_inscripcion = IFNULL(?, numero_ficha_inscripcion), fecha_fin_lectiva_inscripcion = IFNULL(?, fecha_fin_lectiva_inscripcion), nombre_instructor_lider_inscripcion = IFNULL(?, nombre_instructor_lider_inscripcion), email_instructor_lider_inscripcion = IFNULL(?, email_instructor_lider_inscripcion), apoyo_sostenimiento_inscripcion = IFNULL(?, apoyo_sostenimiento_inscripcion), nit_empresa_inscripcion = IFNULL(?, nit_empresa_inscripcion), nombre_empresa_inscripción = IFNULL(?, nombre_empresa_inscripción), direccion_empresa_inscripcion = IFNULL(?, direccion_empresa_inscripcion), nombre_jefe_empresa_inscripcion = IFNULL(?, nombre_jefe_empresa_inscripcion), cargo_jefe_empresa_inscripcion = IFNULL(?, cargo_jefe_empresa_inscripcion), telefono_jefe_empresa_inscripcion = IFNULL(?, telefono_jefe_empresa_inscripcion), email_jefe_empresa_inscripcion = IFNULL(?, email_jefe_empresa_inscripcion), arl = IFNULL(?, arl), link_documentos = IFNULL(?, link_documentos), observaciones = IFNULL(?, observaciones) WHERE id_inscripcion = ? ',
      [nombre_inscripcion, apellido_inscripcion, tipo_documento_inscripcion, documento_inscripcion, email_inscripcion, inscripcion_celular, etapa_actual_inscripcion, modalidad_inscripcion, nivel_formacion_inscripcion, numero_ficha_inscripcion, fecha_fin_lectiva_inscripcion, nombre_instructor_lider_inscripcion, email_instructor_lider_inscripcion, apoyo_sostenimiento_inscripcion, nit_empresa_inscripcion, nombre_empresa_inscripción, direccion_empresa_inscripcion, nombre_jefe_empresa_inscripcion, cargo_jefe_empresa_inscripcion, telefono_jefe_empresa_inscripcion, email_jefe_empresa_inscripcion, arl, link_documentos, observaciones, id]
    )
    if (!Array.isArray(inscription) && inscription?.affectedRows === 0) throw new DbError('No se pudo modificar la inscripción.')
    return res.status(httpStatus.OK).json({ message: 'Inscripción modificada con éxito.' })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const returnExcelData = async (req: Request, res: Response): Promise<Response> => {
  const { excelData } = req.body
  try {
    const [rows] = await connection.query('SELECT documento_inscripcion FROM inscripciones WHERE estado_general_inscripcion <> "Rechazado"')

    if (Array.isArray(rows)) {
      const existingDocumentos = rows.map((row: any) => row.documento_inscripcion)

      const filteredDataArray = excelData.filter((item: any) => {
        const documentoAprendiz = item?.documento_inscripcion
        const shouldInclude = !existingDocumentos.includes(documentoAprendiz)
        return shouldInclude
      })

      return res.status(httpStatus.OK).json({ data: filteredDataArray, code: 'toUpload' })
    } else {
      throw new DataNotValid('Excel no válido')
    }
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}
