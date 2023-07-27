import bycrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Joi from 'joi'

import { connection } from '../config/db.js'
import { type passwordCompare, type LoginData, type userForm } from '../interfaces/users.interfaces.js'
import { editDataSchema, loginDataSchema, registerDataSchema } from '../schemas/users.schemas.js'
import { type RequestHandler, type NextFunction, type Response, type Request } from 'express'
import { type CustomError, DataNotValid, UserExists, NumberIsNaN } from '../errors/customErrors.js'
import { httpStatus } from '../models/httpStatus.enums.js'
import { handleHTTP } from '../errors/errorsHandler.js'

export const checkExistingUser: RequestHandler<{}, Response, userForm> = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { num_documento, correo_electronico } = req.body as userForm
  const numberParsed = Number(num_documento)
  try {
    if (isNaN(numberParsed)) throw new NumberIsNaN('El número de documento no es un número válido.')
    const [user] = await connection.query('SELECT numero_documento_usuario, email_usuario FROM usuarios WHERE numero_documento_usuario = ? OR email_usuario = ?', [numberParsed, correo_electronico])
    if (Array.isArray(user) && user.length > 0) throw new UserExists('Este documento y/o correo ya está/n registrado/s en el sistema.')
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}

export const checkLoginData: RequestHandler<{ num_documento: string; contrasena: string }, Response, LoginData> = (req: Request<{ num_documento: string; contrasena: string }>, res: Response, next: NextFunction) => {
  const { num_documento, contrasena } = req.body as LoginData
  const numberParsed = Number(num_documento)
  try {
    if (isNaN(numberParsed)) throw new NumberIsNaN('El número de documento no es un número válido.')
    const { error } = loginDataSchema.validate({ num_documento, contrasena })
    if (error !== undefined) throw new DataNotValid('Los datos ingresados no son válidos, verifícalos.')
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}

export const checkRegisterData: RequestHandler<{}, Response, LoginData> = (req: Request, res: Response, next: NextFunction) => {
  const { nombre, apellido, tipo_documento, num_documento, correo_electronico, num_celular, id_rol, contrasena } = req.body as userForm
  const idNumberParsed = Number(num_documento)
  const phoneParsed = Number(num_celular)
  const roleParsed = Number(String(id_rol))
  try {
    if (isNaN(idNumberParsed)) throw new NumberIsNaN('El número de documento no es un número válido.')
    if (isNaN(phoneParsed)) throw new NumberIsNaN('El número de celular no es un número válido.')
    if (isNaN(roleParsed)) throw new NumberIsNaN('El rol no es un número válido.')
    const { error } = registerDataSchema.validate({ nombre, apellido, tipo_documento, num_documento, correo_electronico, num_celular, id_rol, contrasena })
    if (error !== undefined) throw new DataNotValid('Los datos ingresados no son válidos, verifícalos.')
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}

export const checkEditData: RequestHandler<{}, Response, LoginData> = (req: Request, res: Response, next: NextFunction) => {
  const { nombre, apellido, tipo_documento, num_documento, correo_electronico, num_celular, id_rol, contrasena } = req.body as userForm
  const idNumberParsed = Number(num_documento)
  const phoneParsed = Number(num_celular)
  const roleParsed = Number(String(id_rol))
  try {
    if (isNaN(idNumberParsed)) throw new NumberIsNaN('El número de documento no es un número válido.')
    if (isNaN(phoneParsed)) throw new NumberIsNaN('El número de celular no es un número válido.')
    if (isNaN(roleParsed)) throw new NumberIsNaN('El rol no es un número válido.')
    const { error } = editDataSchema.validate({ nombre, apellido, tipo_documento, num_documento, correo_electronico, num_celular, id_rol, contrasena })
    if (error !== undefined) throw new DataNotValid('Los datos ingresados no son válidos, verifícalos.')
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

export const checkName: RequestHandler<{ nombreCompleto: string }, Response, unknown> = (req: Request<{ nombreCompleto: string }>, res: Response, next: NextFunction): void => {
  const { nombreCompleto } = req.query
  const nameSchema = Joi.object({ nombreCompleto: Joi.string().required().max(100) })

  try {
    const { error } = nameSchema.validate({ nombreCompleto })
    if (error !== undefined) throw new DataNotValid('El nombre completo ingresado no es válido.')
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}
