import { type NextFunction, type Request, type Response } from 'express'
import { handleHTTP } from '../errors/errorsHandler.js'
import { DataNotValid, type CustomError } from '../errors/customErrors.js'
import { instructorFullNameSchema, modalitySchema } from '../schemas/documents.schemas.js'

export const checkModality = (req: Request, res: Response, next: NextFunction): void => {
  const { modality } = req.query
  try {
    const { error } = modalitySchema.validate({ modality })
    if (error !== undefined) throw new DataNotValid('El query enviado contiene un error o no existe, verifiquelo')
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}

export const checkInstructor = (req: Request, res: Response, next: NextFunction): void => {
  const { instructor } = req.query;
  try {
    const { error } = instructorFullNameSchema.validate({ instructor });
    if (error !== undefined) throw new DataNotValid('El query enviado contiene un error o no existe, verifiquelo');
    next();
  } catch (error) {
    handleHTTP(res, error as CustomError);
  }
};