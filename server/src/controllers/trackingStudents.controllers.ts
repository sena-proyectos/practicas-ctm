import { type Request, type Response } from 'express'
import { connection } from '../config/db.js'
import { type ResultSetHeader, type RowDataPacket } from 'mysql2'
import { type CustomError, DbError } from '../errors/customErrors.js'
import { handleHTTP } from '../errors/errorsHandler.js'
import { httpStatus } from '../models/httpStatus.enums.js'

export const getLettersByStudent = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  try {
    const [query] = await connection.query<RowDataPacket[]>('SELECT aprendices_cartas_detalles.id_carta_aprendiz, aprendices_cartas.tipo_carta_aprendiz as tipo_carta, aprendices_cartas.estado_carta_aprendiz as estado_carta, fecha_modificacion FROM aprendices_cartas_detalles INNER JOIN aprendices_cartas ON aprendices_cartas.id_carta_aprendiz = aprendices_cartas_detalles.id_carta_aprendiz WHERE aprendices_cartas_detalles.id_aprendiz = ?', [id])
    if (query.length === 0) throw new DbError('No existe cartas para este aprendiz')
    return res.status(httpStatus.OK).json(query)
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const getBitacorasByStudent = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  try {
    const [query] = await connection.query<RowDataPacket[]>('SELECT aprendices_bitacoras_detalles.id_aprendiz, aprendices_bitacoras.id_bitacora, aprendices_bitacoras.fecha_bitacora, aprendices_bitacoras.calificacion_bitacora, aprendices_bitacoras.observaciones_bitacora, aprendices_bitacoras.numero_bitacora, DATE_FORMAT(aprendices_bitacoras.fecha_modificacion, "%Y-%m-%d") as fecha_modificacion FROM aprendices_bitacoras_detalles INNER JOIN aprendices_bitacoras ON aprendices_bitacoras.id_bitacora = aprendices_bitacoras_detalles.id_aprendiz_bitacora_detalle WHERE aprendices_bitacoras_detalles.id_aprendiz = ?', [id])
    if (query.length === 0) throw new DbError('No existen bitácoras para este aprendiz')
    return res.status(httpStatus.OK).json(query)
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const getVisitID = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  try {
    const [query] = await connection.query<RowDataPacket[]>('SELECT aprendices_visitas.id_visita FROM aprendices_visitas LEFT JOIN aprendices_visitas_detalles ON id_aprendiz = ? GROUP BY id_visita', [id])
    if (query.length === 0) throw new DbError('Hubo un error al traer los datos')
    return res.status(httpStatus.OK).json(query)
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const getVisitDataByID = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  try {
    const [query] = await connection.query<RowDataPacket[]>('SELECT IFNULL(fecha_visita, "Sin fecha") as fecha_visita, numero_visita, estado_visita, IFNULL(observaciones_visita, "Sin observaciones") as observaciones_visita, fecha_modificacion FROM aprendices_visitas WHERE id_visita = ?', [id])
    if (query.length === 0) throw new DbError('Hubo un error al traer los datos')
    return res.status(httpStatus.OK).json(query)
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const modifyLetterByID = async (req: Request, res: Response): Promise<Response> => {
  const { tipo_carta_aprendiz, estado_carta_aprendiz, usuario_responsable } = req.body
  const { id } = req.params
  try {
    const [query] = await connection.query<ResultSetHeader>('UPDATE aprendices_cartas SET tipo_carta_aprendiz = IFNULL(?, tipo_carta_aprendiz), estado_carta_aprendiz = IFNULL(?, estado_carta_aprendiz), usuario_responsable = IFNULL(?, usuario_responsable) WHERE id_carta_aprendiz = ?', [tipo_carta_aprendiz, estado_carta_aprendiz, usuario_responsable, id])
    if (query.affectedRows === 0) throw new DbError('Error al modificar los datos de la carta')
    return res.status(httpStatus.OK).json(query)
  } catch (error) {
    console.log(error)
    return handleHTTP(res, error as CustomError)
  }
}

export const modifyBitacoraById = async (req: Request, res: Response): Promise<Response> => {
  const { calificacion_bitacora, observaciones_bitacora, usuario_responsable } = req.body
  const { id } = req.params
  try {
    const [query] = await connection.query<ResultSetHeader>('UPDATE aprendices_bitacoras SET calificacion_bitacora = IFNULL(?, calificacion_bitacora), observaciones_bitacora = IFNULL(?, observaciones_bitacora), usuario_responsable = IFNULL(?, usuario_responsable) WHERE id_bitacora = ?', [calificacion_bitacora, observaciones_bitacora, usuario_responsable, id])
    if (query.affectedRows === 0) throw new DbError('Error al modificar los datos de la bitácora')
    return res.status(httpStatus.OK).json(query)
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const modifyVisitByID = async (req: Request, res: Response): Promise<Response> => {
  const { estado_visita, fecha_visita, numero_visita, observaciones_visita, usuario_responsable } = req.body
  const { id } = req.params
  try {
    const [query] = await connection.query<ResultSetHeader>('UPDATE aprendices_visitas SET estado_visita = IFNULL(?, estado_visita), fecha_visita = IFNULL(?, fecha_visita), numero_visita = IFNULL(?, numero_visita), observaciones_visita = IFNULL(?, observaciones_visita), usuario_responsable = IFNULL(?, usuario_responsable) WHERE id_visita = ?', [estado_visita, fecha_visita, numero_visita, observaciones_visita, usuario_responsable, id])
    if (query.affectedRows === 0) throw new DbError('Error al modificar los datos de la visita')
    return res.status(httpStatus.OK).json(query)
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}
