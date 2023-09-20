import { type RequestHandler, type NextFunction, type Request, type Response } from 'express'
import { handleHTTP } from '../errors/errorsHandler.js'
import { IdIsNaN, type CustomError } from '../errors/customErrors.js'

/**
 * @description Middleware para verificar si el ID proporcionado es válido.
 * @param req La solicitud HTTP con el parámetro de ID.
 * @param res La respuesta HTTP.
 * @param next Función para pasar al siguiente middleware.
 */
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
