import { type Request, type Response } from 'express'
import { connection } from '../config/db.js'
import { type RowDataPacket } from 'mysql2'
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
