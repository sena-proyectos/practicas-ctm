import { type RequestHandler, type NextFunction, type Request, type Response } from 'express'
import { handleHTTP } from '../errors/errorsHandler.js'
import { IdIsNaN, type CustomError } from '../errors/customErrors.js'

export const checkIdReq: RequestHandler<{ id: string }, Response, unknown> = (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  const { id } = req.params
  const idParse = parseInt(id, 10)
  try {
    if (isNaN(idParse)) throw new IdIsNaN('El id no es un número.')
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}
