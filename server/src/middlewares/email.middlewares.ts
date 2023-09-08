import { type NextFunction, type Request, type Response } from 'express'

import { type CustomError, DataNotValid } from '../errors/customErrors.js'
import { emailSchema } from '../schemas/email.schemas.js'
import { handleHTTP } from '../errors/errorsHandler.js'

export const checkEmail = (req: Request, res: Response, next: NextFunction): void => {
  const { to, text, subject } = req.body
  try {
    const { error } = emailSchema.validate({ to, text, title: subject })
    if (error !== undefined) throw new DataNotValid('Debes llenar todos los campos')
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}
