import { type Response, type Request } from 'express'
import bycrypt from 'bcrypt'

import { connection } from '../config/db.js'
import { handleHTTP } from '../utils/errorsHandler.js'
import { httpStatus } from '../models/httpStatus.enums.js'
import { type LoginData, type id, type userForm } from '../models/user.interfaces.js'
import { checkExistingUser, checkLoginData, comparePassword, generateToken } from '../middlewares/users.middlewares.js'
import { type RowDataPacket } from 'mysql2/promise'
import { dbNotExists } from '../errors/customErrors.js'

export const getUsers = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const [users] = await connection.query('SELECT * FROM usuarios')
    throw new dbNotExists()
    return res.status(httpStatus.OK).json({ data: users })
  } catch (error) {
    return handleHTTP(res, 'ERROR_GET_USERS')
  }
}

export const getUserById = async ({ params }: Request<id>, res: Response): Promise<Response> => {
  const { id } = params
  try {
    const [user] = await connection.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id])
    return res.status(httpStatus.OK).json({ data: user })
  } catch (error) {
    return handleHTTP(res, 'ERROR_GET_USER')
  }
}

export const getTeachers = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const [teachers] = await connection.query('SELECT * FROM usuarios WHERE id_rol = 2')
    return res.status(httpStatus.OK).json({ data: teachers })
  } catch (error) {
    return handleHTTP(res, 'ERROR_GET_TEACHERS')
  }
}

export const getTeachersById = async ({ params }: Request<id>, res: Response): Promise<Response> => {
  const { id } = params
  try {
    const [teacher] = await connection.query('SELECT * FROM usuarios WHERE id_rol = 2 AND id_usuario = ?', [id])
    return res.status(httpStatus.OK).json({ data: teacher })
  } catch (error) {
    return handleHTTP(res, 'ERROR_GET_TEACHER')
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
    return handleHTTP(res, 'ERROR_CREATE_USER')
  }
}

export const login = async ({ body }: Request<LoginData>, res: Response): Promise<Response> => {
  const { num_documento, contrasena } = body
  try {
    const checkData: boolean = checkLoginData({ num_documento, contrasena })
    if (!checkData) throw Error

    const [user] = await connection.query('SELECT * FROM usuarios WHERE num_documento = ?', [num_documento])
    if (!user) throw Error

    const dbPassword = (user as RowDataPacket)[0].contrasena

    const isMatch: boolean = await comparePassword({ contrasena, dbPassword })
    if (!isMatch) throw Error

    const token: string = generateToken(user)
    return res.status(httpStatus.OK).json({ key: `Bearer ${token}` })
  } catch (error) {
    return handleHTTP(res, 'ERROR_LOGIN_USER')
  }
}
