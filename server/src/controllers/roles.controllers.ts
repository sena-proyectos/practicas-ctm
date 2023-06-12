import { type RequestHandler, type Request, type Response } from 'express'
import { handleHTTP } from '../errors/errorsHandler.js'
import { httpStatus } from '../models/httpStatus.enums.js'
import { connection } from '../config/db.js'
import { type CustomError, DbError, NumberIsNaN } from '../errors/customErrors.js'
import { type roleName } from '../interfaces/roles.interfaces.js'

export const createRole: RequestHandler<{ nombre_rol: string }, Response, roleName> = async (req: Request<{ nombre_rol: string }>, res: Response): Promise<Response> => {
  const { nombre_rol } = req.body
  try {
    await connection.query('INSERT INTO roles (nombre_rol) VALUE (?)', [nombre_rol])
    return res.status(httpStatus.OK).json({ message: 'Rol creado' })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const getRoles = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const [roles] = await connection.query('SELECT * FROM roles')
    return res.status(httpStatus.OK).json({ data: roles })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const editRole: RequestHandler<{ id: string, nombre_rol: string }, Response, roleName> = async (req: Request<{ id: string, nombre_rol: string }>, res: Response): Promise<Response> => {
  const { id } = req.params
  const { nombre_rol } = req.body
  try {
    const [role] = await connection.query('UPDATE roles SET nombre_rol = ? WHERE id_rol = ?', [nombre_rol, id])
    if (Array.isArray(role) && role.length === 0) throw new DbError('No se pudo actualizar el rol.')
    return res.status(httpStatus.OK).json({ message: 'Rol actualizado' })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}
