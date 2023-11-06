import { type Response, type RequestHandler, type NextFunction, type Request } from 'express'
import { practicalStageSchema } from '../schemas/practicalStages.schema.js'
import { type CustomError, DataNotValid } from '../errors/customErrors.js'
import { handleHTTP } from '../errors/errorsHandler.js'
import { type PracticalStages } from '../interfaces/practicalStages.interfaces.js'

export const checkPracticalStageData: RequestHandler<{}, Response, PracticalStages> = (req: Request<{}>, res: Response, next: NextFunction): void => {
  const { tipo_modalidad_practica } = req.body
  try {
    const { error } = practicalStageSchema.validate({ tipo_modalidad_practica })
    if (error !== undefined) throw new DataNotValid('Los datos no son válidos')
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}
