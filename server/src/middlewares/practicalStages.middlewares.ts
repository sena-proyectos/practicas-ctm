import { type Response, type RequestHandler, type NextFunction, type Request } from 'express'
import { practicalStageSchema } from '../schemas/practicalStages.schema.js'
import { type CustomError, DataNotValid, NumberIsNaN } from '../errors/customErrors.js'
import { handleHTTP } from '../errors/errorsHandler.js'
import { type PracticalStages } from '../interfaces/practicalStages.interfaces.js'
// Este import da errores con el case

export const checkPracticalStageData: RequestHandler<{}, Response, PracticalStages> = (req: Request<{}>, res: Response, next: NextFunction): void => {
  const { tipo_modalidad_practica, num_horas_maximas_modalidad_practica, num_horas_minimas_modalidad_practica } = req.body
  const minHours = Number(num_horas_minimas_modalidad_practica)
  const maxHours = Number(num_horas_maximas_modalidad_practica)
  try {
    if (isNaN(minHours)) throw new NumberIsNaN('Las horas mínimas no son un número')
    if (isNaN(maxHours)) throw new NumberIsNaN('Las horas máximas no son un número')
    const { error } = practicalStageSchema.validate({ tipo_modalidad_practica, num_horas_maximas_modalidad_practica, num_horas_minimas_modalidad_practica })
    if (error !== undefined) throw new DataNotValid('Los datos no son válidos')
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}
