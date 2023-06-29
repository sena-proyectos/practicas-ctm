import { type Request, type Response, type RequestHandler, type NextFunction } from 'express'
import { handleHTTP } from '../errors/errorsHandler.js'
import { type changeStatusData } from '../interfaces/changeStatusId.interfaces.js'
import { changeStatusIdSchema } from '../schemas/changeStatusId.schemas.js'
import { type CustomError, DataNotValid } from '../errors/customErrors.js'

export const checkStatusData: RequestHandler<{ id: string }, Response, changeStatusData> = (req: Request, res: Response, next: NextFunction) => {
  const { nombreTabla, idNombreTabla, estado } = req.body
  const { id } = req.params
  try {
    const { error } = changeStatusIdSchema.validate({ nombreTabla, idNombreTabla, id, estado })
    if (error !== undefined) throw new DataNotValid('Los datos no son válidos')
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}
