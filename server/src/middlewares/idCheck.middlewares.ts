import { type NextFunction, type Request, type Response } from 'express'
import { handleHTTP } from '../errors/errorsHandler.js'
import { IdIsNaN, type CustomError } from '../errors/customErrors.js'

export const checkIdReq = ({ params }: Request, res: Response, next: NextFunction): void => {
  const id = parseInt(params.id, 10)
  try {
    if (isNaN(id)) throw new IdIsNaN('El código no es un número.')
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}
