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
    const [user] = await connection.query('UPDATE usuarios SET nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido), tipo_documento = IFNULL(?, tipo_documento), num_documento = IFNULL(?, num_documento), correo_electronico = IFNULL(?, correo_electronico), num_celular = IFNULL(?, num_celular), id_rol = IFNULL(?, id_rol), contrasena = IFNULL(?, contrasena) WHERE id_usuario = ?', [
      nombre,
      apellido,
      tipo_documento,
      num_documento,
      correo_electronico,
      num_celular,
      id_rol,
      contrasena,
      idNumber
    ])
    if (!Array.isArray(user) && user?.affectedRows === 0) throw new DbErrorNotFound('No se pudo actualizar el usuario.')
    return res.status(httpStatus.OK).json({ message: 'Usuario actualizado exitosamente.' })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const getTeachers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const page = !Number.isNaN(parseInt(req.query.page as string)) || 1
    const limit = !Number.isNaN(parseInt(req.query.limit as string)) || 10
    const offset = (Number(page) - 1) * Number(limit)

    const [teachers] = await connection.query('SELECT * FROM usuarios WHERE id_rol = 2 LIMIT ? OFFSET ?', [limit, offset])
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
    const [teacher] = await connection.query('SELECT * FROM usuarios WHERE id_rol = 2 AND id_usuario = ?', [idNumber])
    if (!Array.isArray(teacher) || teacher.length === 0) throw new DbErrorNotFound('No se encontró el profesor.', errorCodes.ERROR_GET_TEACHER)
    return res.status(httpStatus.OK).json({ data: teacher })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const getStudents = async (req: Request, res: Response): Promise<Response> => {
  try {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const page = parseInt(req.query.page as string) || 1
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const limit = parseInt(req.query.limit as string) || 10
    const offset = (Number(page) - 1) * Number(limit)

    const [students] = await connection.query('SELECT * FROM usuarios WHERE id_rol = 3 LIMIT ? OFFSET ?', [limit, offset])
    if (!Array.isArray(students) || students.length === 0) throw new DbErrorNotFound('No hay estudiantes registrados.', errorCodes.ERROR_GET_STUDENTS)

    const [total] = (await connection.query('SELECT COUNT(*) as count FROM usuarios WHERE id_rol = 3')) as unknown as Array<{ count: number }>
    const totalPages = Math.ceil(Number(Array.isArray(total) && total[0].count) / Number(limit))

    return res.status(httpStatus.OK).json({ data: students, page, totalPages })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const getStudentsById: RequestHandler<{ id: string }, Response, LoginData> = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
  const { id } = req.params
  const idNumber = Number(id)
  try {
    const [student] = await connection.query('SELECT * FROM usuarios WHERE id_rol = 3 AND id_usuario = ?', [idNumber])
    if (!Array.isArray(student) || student.length === 0) throw new DbErrorNotFound('No se encontró el estudiante.', errorCodes.ERROR_GET_STUDENT)
    return res.status(httpStatus.OK).json({ data: student })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const getStudentByName: RequestHandler<{ nombreCompleto: string }, Response, unknown> = async (req: Request<{ nombreCompleto: string }>, res: Response): Promise<Response> => {
  const { nombreCompleto } = req.query
  try {
    const [student] = await connection.query('SELECT * FROM usuarios WHERE id_rol = 3 AND CONCAT(nombre, " ", apellido) LIKE ?', [`%${nombreCompleto as string}%`])
    if (!Array.isArray(student) || student?.length === 0) throw new DbErrorNotFound('No se encontró el estudiante.', errorCodes.ERROR_GET_STUDENT)
    return res.status(httpStatus.OK).json({ data: student })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const getTeacherByName: RequestHandler<{ nombreCompleto: string }, Response, unknown> = async (req: Request<{ nombreCompleto: string }>, res: Response): Promise<Response> => {
  const { nombreCompleto } = req.query
  try {
    const [teacher] = await connection.query('SELECT * FROM usuarios WHERE id_rol = 2 AND CONCAT(nombre, " ", apellido) LIKE ?', [`%${nombreCompleto as string}%`])
    if (!Array.isArray(teacher) || teacher?.length === 0) throw new DbErrorNotFound('No se encontró el instructor.', errorCodes.ERROR_GET_TEACHER)
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

    return res.status(httpStatus.CREATED).json({ message: 'Usuario creado exitosamente.' })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const login: RequestHandler<{ num_documento: string, contrasena: string }, unknown, LoginData> = async (req: Request<{ num_documento: string, contrasena: string }>, res: Response, next: NextFunction): Promise<void> => {
  const { num_documento, contrasena } = req.body
  try {
    const [user] = await connection.query('SELECT * FROM usuarios WHERE num_documento = ?', [num_documento])
    if (!Array.isArray(user) || user?.length === 0) throw new DbErrorNotFound('No se encontró el usuario.', errorCodes.ERROR_LOGIN_USER)

    const dbPassword = (user as RowDataPacket)[0].contrasena

    const isMatch: boolean = await comparePassword({ contrasena, dbPassword })
    if (!isMatch) throw new DataNotValid('Contraseña incorrecta.', errorCodes.ERROR_LOGIN_USER)
    req.body = { user: user[0] }
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}
