import { type NextFunction, type Request, type RequestHandler, type Response } from 'express'
import { type roleName } from '../interfaces/roles.interfaces.js'
import { handleHTTP } from '../errors/errorsHandler.js'
import { DataNotValid, type CustomError } from '../errors/customErrors.js'
import { createRoleSchema } from '../schemas/roles.schemas.js'
import { errorCodes } from '../models/errorCodes.enums.js'

export const checkRoleName: RequestHandler<{ id: string; nombre_rol: string }, Response, roleName> = (req: Request<{ id: string; nombre_rol: string }>, res: Response, next: NextFunction): void => {
  const { nombre_rol } = req.body
  try {
    const { error } = createRoleSchema.validate({ nombre_rol })
    if (error !== undefined) throw new DataNotValid('Los datos ingresados no son válidos, verifícalos.', errorCodes.ERROR_CREATE_ROLE)
    next()
  } catch (error) {
    handleHTTP(res, error as CustomError)
  }
}
