import { type NextFunction, type Request, type Response } from 'express'
import { handleHTTP } from '../errors/errorsHandler.js'
import { type CustomError, DataNotValid } from '../errors/customErrors.js'
import { bitacoraSchema, letterSchema, visitSchema, visitCreateSchema} from '../schemas/trackingStundets.schemas.js'
import {checkPendingVisits} from '../controllers/trackingStudents.controllers.js'
export const checkLetterData = (req: Request, res: Response, next: NextFunction): void => {
  const { tipo_carta_aprendiz, estado_carta_aprendiz, observaciones, usuario_responsable } = req.body
  try {
    const { error } = letterSchema.validate({ tipo_carta_aprendiz, estado_carta_aprendiz, observaciones, usuario_responsable })
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
  const { numero_visita, estado_visita, observaciones_visita, usuario_responsable } = req.body
  try {
    const { error } = visitSchema.validate({ numero_visita, estado_visita, observaciones_visita, usuario_responsable })
    if (error !== undefined) throw new DataNotValid('Los datos ingresados no son válidos, verifícalos')
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}



export const checkCreateVisita = (req: Request, res: Response, next: NextFunction): void => {
  const { id_aprendiz, estado_visita, observaciones_visita, usuario_responsable } = req.body
  try {
    const { error } = visitCreateSchema.validate({ id_aprendiz, estado_visita, observaciones_visita, usuario_responsable })
    if (error !== undefined) throw new DataNotValid('Los datos ingresados no son válidos, verifícalos')
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}




