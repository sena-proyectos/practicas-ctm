import { type Response, type Request, type NextFunction, type RequestHandler } from 'express'
import bycrypt from 'bcrypt'

import { connection } from '../config/db.js'
import { handleHTTP } from '../errors/errorsHandler.js'
import { httpStatus } from '../models/httpStatus.enums.js'
import { type LoginData, type userForm } from '../interfaces/user.interfaces.js'
import { comparePassword } from '../middlewares/users.middlewares.js'
import { type RowDataPacket } from 'mysql2/promise'
import { type CustomError, DbErrorNotFound, DataNotValid } from '../errors/customErrors.js'
import { errorCodes } from '../models/errorCodes.enums.js'

export const getUsers = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const [users] = await connection.query('SELECT * FROM usuarios')
    if (!Array.isArray(users) || users.length === 0) throw new DbErrorNotFound('No hay usuarios registrados.', errorCodes.ERROR_GET_USERS)
    return res.status(httpStatus.OK).json({ data: users })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const getUserById: RequestHandler<{ id: string }, Response, LoginData> = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  const { id } = req.params
  const idNumber = Number(id)
  try {
    const [user] = await connection.query('SELECT * FROM usuarios WHERE id_usuario = ?', [idNumber])
    if (!Array.isArray(user) || user.length === 0) throw new DbErrorNotFound('No se encontró el usuario.', errorCodes.ERROR_GET_USER)
    return res.status(httpStatus.OK).json({ data: user })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const getTeachers = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const [teachers] = await connection.query('SELECT * FROM usuarios WHERE id_rol = 2')
    if (!Array.isArray(teachers) || teachers.length === 0) throw new DbErrorNotFound('No hay profesores registrados.', errorCodes.ERROR_GET_TEACHERS)
    return res.status(httpStatus.OK).json({ data: teachers })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const getTeachersById: RequestHandler<{ id: string }, Response, LoginData> = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  const { id } = req.params
  const idNumber = Number(id)
  try {
    const [teacher] = await connection.query('SELECT * FROM usuarios WHERE id_rol = 2 AND id_usuario = ?', [idNumber])
    if (!Array.isArray(teacher) || teacher.length === 0) throw new DbErrorNotFound('No se encontró el profesor.', errorCodes.ERROR_GET_TEACHER)
    return res.status(httpStatus.OK).json({ data: teacher })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const createUser: RequestHandler<{}, Response, userForm> = async (req: Request, res: Response): Promise<Response> => {
  const { nombre, apellido, tipo_documento, num_documento, correo_electronico, num_celular, id_rol, contrasena } = req.body as userForm
  try {
    const hashPassword: string = await bycrypt.hash(contrasena, 10)

    await connection.query('INSERT INTO usuarios (nombre, apellido, tipo_documento, num_documento, correo_electronico, num_celular, id_rol, contrasena) VALUE (?, ?, IFNULL(?, "cc"), ?, ?, ?, IFNULL(?, 1), ?)', [nombre, apellido, tipo_documento, num_documento, correo_electronico, num_celular, id_rol, hashPassword])

    return res.status(httpStatus.OK).json({ message: 'Usuario creado exitosamente.' })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const login: RequestHandler<{ num_documento: string, contrasena: string }, unknown, LoginData> = async (req: Request<{ num_documento: string, contrasena: string }>, res: Response, next: NextFunction): Promise<void> => {
  const { num_documento, contrasena } = req.body
  try {
    const [user] = await connection.query('SELECT * FROM usuarios WHERE num_documento = ?', [num_documento])
    if (!Array.isArray(user)) throw new DbErrorNotFound('No se encontró el usuario.', errorCodes.ERROR_LOGIN_USER)

    const dbPassword = (user as RowDataPacket)[0].contrasena

    const isMatch: boolean = await comparePassword({ contrasena, dbPassword })
    if (!isMatch) throw new DataNotValid('Contraseña incorrecta.', errorCodes.ERROR_LOGIN_USER)
    req.body = { user: user[0] }
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}
