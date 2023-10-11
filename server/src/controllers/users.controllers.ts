import { type Response, type Request, type NextFunction, type RequestHandler } from 'express'
import bycrypt from 'bcrypt'

import { connection } from '../config/db.js'
import { handleHTTP } from '../errors/errorsHandler.js'
import { httpStatus } from '../models/httpStatus.enums.js'
import { type LoginData, type userForm } from '../interfaces/users.interfaces.js'
import { comparePassword } from '../middlewares/users.middlewares.js'
import { type RowDataPacket } from 'mysql2/promise'
import { type CustomError, DbErrorNotFound, DataNotValid } from '../errors/customErrors.js'
import { errorCodes } from '../models/errorCodes.enums.js'
import { type ResultSetHeader } from 'mysql2'

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

export const editUser: RequestHandler<{}, Response, userForm> = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  const { nombre, apellido, tipo_documento, num_documento, correo_electronico, num_celular, id_rol, contrasena } = req.body as userForm
  const idNumber = Number(id)
  try {
    const [user] = await connection.query('UPDATE usuarios SET nombres_usuario = IFNULL(?, nombres_usuario), apellidos_usuario = IFNULL(?, apellidos_usuario), tipo_documento_usuario = IFNULL(?, tipo_documento_usuario), numero_documento_usuario = IFNULL(?, numero_documento_usuario), email_usuario = IFNULL(?, email_usuario), numero_celular_usuario = IFNULL(?, numero_celular_usuario), id_rol = IFNULL(?, id_rol), contrasena_usuario = IFNULL(?, contrasena_usuario) WHERE id_usuario = ?', [nombre, apellido, tipo_documento, num_documento, correo_electronico, num_celular, id_rol, contrasena, idNumber])
    if (!Array.isArray(user) && user?.affectedRows === 0) throw new DbErrorNotFound('No se pudo actualizar el usuario.')
    return res.status(httpStatus.OK).json({ message: 'Usuario actualizado exitosamente.' })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const getTeachers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const offset: number = (page - 1) * limit

    const [teachers] = await connection.query('SELECT * FROM usuarios WHERE id_rol = 3 LIMIT ? OFFSET ?', [limit, offset])
    if (!Array.isArray(teachers) || teachers.length === 0) throw new DbErrorNotFound('No hay instructores registrados.', errorCodes.ERROR_GET_TEACHER)

    const [total] = (await connection.query('SELECT COUNT(*) as count FROM usuarios WHERE id_rol = 3')) as unknown as Array<{ count: number }>
    const totalPages = Math.ceil(Number(Array.isArray(total) && total[0].count) / Number(limit))

    return res.status(httpStatus.OK).json({ data: teachers, page, totalPages })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const getTeachersById: RequestHandler<{ id: string }, Response, LoginData> = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  const { id } = req.params
  const idNumber = Number(id)
  try {
    const [teacher] = await connection.query('SELECT * FROM usuarios WHERE id_usuario = ?', [idNumber])
    if (!Array.isArray(teacher) || teacher.length === 0) throw new DbErrorNotFound('No se encontró el profesor.', errorCodes.ERROR_GET_TEACHER)
    return res.status(httpStatus.OK).json({ data: teacher })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const getTeacherByName: RequestHandler<{ nombreCompleto: string }, Response, unknown> = async (req: Request<{ nombreCompleto: string }>, res: Response): Promise<Response> => {
  const { nombreCompleto } = req.query
  try {
    const [teacher] = await connection.query('SELECT CONCAT(nombres_usuario, " ", apellidos_usuario) AS nombre_completo, id_usuario, nombres_usuario, apellidos_usuario, tipo_documento_usuario, numero_documento_usuario, email_usuario, numero_celular_usuario, id_rol FROM usuarios WHERE id_rol = 3 OR id_rol = 4 AND CONCAT(nombres_usuario, " ", apellidos_usuario) LIKE ?', [`%${nombreCompleto as string}%`])
    if (!Array.isArray(teacher) || teacher?.length === 0) throw new DbErrorNotFound('No se encontró el instructor.', errorCodes.ERROR_GET_TEACHER)
    return res.status(httpStatus.OK).json({ data: teacher })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const getCoordinators = async (_req: Request, res: Response): Promise<Response<object>> => {
  try {
    const [query] = await connection.query<RowDataPacket[]>('SELECT id_usuario, CONCAT(nombres_usuario, " ", apellidos_usuario) AS nombre_completo FROM usuarios WHERE id_rol = 2')
    if (Array.isArray(query) && query.length === 0) throw new DbErrorNotFound('No se encontró el coordinador.', errorCodes.ERROR_GET_USERS)
    return res.status(200).json(query)
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const getCoordinatorById = async (req: Request, res: Response): Promise<Response<object>> => {
  const { id } = req.params
  try {
    const [query] = await connection.query<RowDataPacket[]>('SELECT CONCAT(nombres_usuario, " ", apellidos_usuario) AS nombre_completo FROM usuarios WHERE id_usuario = ? AND id_rol = 2', [id])
    if (Array.isArray(query) && query.length === 0) throw new DbErrorNotFound('No se encontró el coordinador.', errorCodes.ERROR_GET_USER)
    return res.status(200).json(query[0])
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const createUser: RequestHandler<{}, Response, userForm> = async (req: Request, res: Response): Promise<Response> => {
  const { nombre, apellido, tipo_documento, num_documento, correo_electronico, num_celular, id_rol, contrasena } = req.body as userForm
  try {
    const hashPassword: string = await bycrypt.hash(contrasena, 10)

    const [query] = await connection.query<ResultSetHeader>('INSERT INTO usuarios (nombres_usuario, apellidos_usuario, tipo_documento_usuario, numero_documento_usuario, email_usuario, numero_celular_usuario, id_rol, contrasena_usuario) VALUE (?, ?, IFNULL(?, "CC"), ?, ?, ?, IFNULL(?, 3), ?)', [nombre, apellido, tipo_documento, num_documento, correo_electronico, num_celular, id_rol, hashPassword])

    return res.status(httpStatus.CREATED).json({ message: 'Usuario creado exitosamente.', id: query.insertId })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const login: RequestHandler<{ num_documento: string, contrasena: string }, unknown, LoginData> = async (req: Request<{ num_documento: string, contrasena: string }>, res: Response, next: NextFunction): Promise<void> => {
  const { num_documento, contrasena } = req.body
  try {
    const [user] = await connection.query('SELECT * FROM usuarios WHERE numero_documento_usuario = ?', [num_documento])
    if (!Array.isArray(user) || user?.length === 0) throw new DbErrorNotFound('No se encontró el usuario.', errorCodes.ERROR_LOGIN_USER)

    const dbPassword = (user as RowDataPacket)[0].contrasena_usuario

    const isMatch: boolean = await comparePassword({ contrasena, dbPassword })
    if (!isMatch) throw new DataNotValid('Contraseña incorrecta.', errorCodes.ERROR_LOGIN_USER)
    req.body = { user: user[0] }
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}
