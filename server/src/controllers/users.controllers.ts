import { type Response, type Request } from 'express'
import bycrypt from 'bcrypt'

import { connection } from '../config/db.js'
import { handleHTTP } from '../errors/errorsHandler.js'
import { httpStatus } from '../models/httpStatus.enums.js'
import { type LoginData, type id, type userForm } from '../interfaces/user.interfaces.js'
import { checkExistingUser, checkLoginData, comparePassword, generateToken } from '../middlewares/users.middlewares.js'
import { type RowDataPacket } from 'mysql2/promise'
import { type CustomError, DbErrorNotFound } from '../errors/customErrors.js'
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

export const getUserById = async ({ params }: Request<id>, res: Response): Promise<Response> => {
  const { id } = params
  try {
    const [user] = await connection.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id])
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

export const getTeachersById = async ({ params }: Request<id>, res: Response): Promise<Response> => {
  const { id } = params
  try {
    const [teacher] = await connection.query('SELECT * FROM usuarios WHERE id_rol = 2 AND id_usuario = ?', [id])
    if (!Array.isArray(teacher) || teacher.length === 0) throw new DbErrorNotFound('No se encontró el profesor.', errorCodes.ERROR_GET_TEACHER)
    return res.status(httpStatus.OK).json({ data: teacher })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const createUser = async ({ body }: Request<userForm>, res: Response): Promise<Response> => {
  const { nombre, apellido, tipo_documento, num_documento, correo_electronico, num_celular, id_rol, contrasena } = body
  try {
    const existingUser: boolean = await checkExistingUser({ num_documento })
    if (existingUser) throw Error('EXISTING_USER')

    const hashPassword: string = await bycrypt.hash(contrasena, 10)

    await connection.query('INSERT INTO usuarios (nombre, apellido, tipo_documento, num_documento, correo_electronico, num_celular, id_rol, contrasena) VALUE (?, ?, IFNULL(?, "cc"), ?, ?, ?, IFNULL(?, 2), ?)', [nombre, apellido, tipo_documento, num_documento, correo_electronico, num_celular, id_rol, hashPassword])

    return res.status(httpStatus.OK).json(true)
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const login = async ({ body }: Request<LoginData>, res: Response): Promise<Response> => {
  const { num_documento, contrasena } = body
  try {
    const checkData: boolean = checkLoginData({ num_documento, contrasena })
    if (!checkData) throw Error()

    const [user] = await connection.query('SELECT * FROM usuarios WHERE num_documento = ?', [num_documento])
    if (!Array.isArray(user)) throw Error()

    const dbPassword = (user as RowDataPacket)[0].contrasena

    const isMatch: boolean = await comparePassword({ contrasena, dbPassword })
    if (!isMatch) throw Error()

    const token: string = generateToken(user)
    return res.status(httpStatus.OK).json({ key: `Bearer ${token}` })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}
