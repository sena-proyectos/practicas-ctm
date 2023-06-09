import bycrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { connection } from '../config/db.js'
import { type passwordCompare, type LoginData, type userForm, type idNumber } from '../interfaces/user.interfaces.js'
import { loginDataSchema } from '../schemas/user.schemas.js'
import { type RequestHandler, type NextFunction, type Response, type Request } from 'express'
import { type CustomError, DataNotValid, UserExists } from '../errors/customErrors.js'
import { httpStatus } from '../models/httpStatus.enums.js'
import { handleHTTP } from '../errors/errorsHandler.js'

export const checkExistingUser: RequestHandler<{}, Response, userForm > = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { num_documento } = req.body as idNumber
  try {
    const [user] = await connection.query('SELECT * FROM usuarios WHERE num_documento = ?', [num_documento])
    if (Array.isArray(user) && user.length > 0) throw new UserExists('Este documento ya está registrado')
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}

export const checkLoginData: RequestHandler<{ num_documento: string, contrasena: string }, Response, LoginData> = (req: Request<{ num_documento: string, contrasena: string }>, res: Response, next: NextFunction) => {
  const { num_documento, contrasena } = req.body as LoginData
  try {
    const { error } = loginDataSchema.validate({ num_documento, contrasena })
    console.log(error)
    if (error !== undefined) {
      throw new DataNotValid('Los datos ingresados no son válidos, verifícalos.')
    }
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}

export const checkRegisterData: RequestHandler<{}, Response, LoginData> = (req: Request, res: Response, next: NextFunction) => {
  const { nombre, apellido, tipo_documento, num_documento, correo_electronico, num_celular, id_rol, contrasena } = req.body as userForm
  try {
    const { error } = loginDataSchema.validate({ nombre, apellido, tipo_documento, num_documento, correo_electronico, num_celular, id_rol, contrasena })
    if (error !== null) {
      throw new DataNotValid('Los datos ingresados no son válidos, verifícalos.')
    }
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}

export const comparePassword = async ({ contrasena, dbPassword }: passwordCompare): Promise<boolean> => await bycrypt.compare(contrasena, dbPassword)

export const generateToken: RequestHandler<{}, unknown, LoginData> = (req: Request, res: Response): Response => {
  const payload = req.body
  const token = jwt.sign({ data: payload }, 'secret', { expiresIn: '3h', algorithm: 'HS256' })
  return res.status(httpStatus.OK).json({ token })
}
