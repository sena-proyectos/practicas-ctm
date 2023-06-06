import { type Request, type Response } from 'express'
import { handleHTTP } from '../utils/errorsHandler.js'
import { httpStatus } from '../models/httpStatus.enums.js'
import { connection } from '../config/db.js'

export const createRole = async ({ body }: Request<{ nombre_rol: string }>, res: Response): Promise<Response> => {
  const { nombre_rol } = body
  try {
    await connection.query('INSERT INTO roles (nombre_rol) VALUE (?)', [nombre_rol])
    return res.status(httpStatus.OK).json(true)
  } catch (error) {
    return handleHTTP(res, 'ERROR_CREATE_ROLE')
  }
}
