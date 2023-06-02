import { type Request, type Response } from 'express'
import { handleHTTP } from '../utils/errorsHandler.js'
import { httpStatus } from '../models/httpStatus.js'
import { connection } from '../config/db.js'

export const createRole = async ({ body }: Request<{ nombre_rol: string }>, res: Response): Promise<Response> => {
  const { nombre_rol: name } = body
  try {
    await connection.query('INSERT INTO roles (nombre_rol) VALUE (?)', [name])
    return res.status(httpStatus.OK).json(true)
  } catch (error) {
    return handleHTTP(res, 'ERROR_CREATE_ROLE')
  }
}
