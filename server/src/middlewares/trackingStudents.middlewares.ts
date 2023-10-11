import { type NextFunction, type Request, type Response } from 'express'
import { handleHTTP } from '../errors/errorsHandler.js'
import { type CustomError, DataNotValid } from '../errors/customErrors.js'
import { bitacoraSchema, letterSchema, visitSchema } from '../schemas/trackingStundets.schemas.js'

export const checkLetterData = (req: Request, res: Response, next: NextFunction): void => {
  const { tipo_carta_aprendiz, estado_carta_aprendiz, usuario_responsable } = req.body
  try {
    const { error } = letterSchema.validate({ tipo_carta_aprendiz, estado_carta_aprendiz, usuario_responsable })
    if (error !== undefined) throw new DataNotValid('Los datos ingresados no son válidos, verifícalos')
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}

export const checkBitacoraData = (req: Request, res: Response, next: NextFunction): void => {
  const { calificacion_bitacora, observaciones_bitacora, usuario_responsable } = req.body
  try {
    const { error } = bitacoraSchema.validate({ calificacion_bitacora, observaciones_bitacora, usuario_responsable })
    if (error !== undefined) throw new DataNotValid('Los datos ingresados no son válidos, verifícalos')
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}

export const checkVisitData = (req: Request, res: Response, next: NextFunction): void => {
  const { estado_visita, fecha_visita, numero_visita, observaciones_visita, usuario_responsable } = req.body
  try {
    const { error } = visitSchema.validate({ estado_visita, fecha_visita, numero_visita, observaciones_visita, usuario_responsable })
    if (error !== undefined) throw new DataNotValid('Los datos ingresados no son válidos, verifícalos')
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}
