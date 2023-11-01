import { type NextFunction, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { httpStatus } from '../models/httpStatus.enums.js'
import { handleHTTP } from '../errors/errorsHandler.js'
import { APIError, DataNotValid } from '../errors/customErrors.js'
import { type ITokenPayload } from '../interfaces/publicAccess.interfaces.js'

export const generatePublicToken = (_req: Request, res: Response): Response => {
  try {
    const token = jwt.sign({
      user: 'public'
    }, String(process.env.PRIVATE), { expiresIn: '48h' })
    return res.status(httpStatus.OK).json(token)
  } catch (error) {
    return handleHTTP(res, new APIError('Error al generar el token'))
  }
}

export const checkPublicToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization
  if (token !== undefined) {
    try {
      const payload: ITokenPayload = jwt.verify(token, String(process.env.PRIVATE)) as ITokenPayload

      if (payload.user !== 'public') {
        throw new Error('La carga útil del token no es válida.')
      }

      next()
    } catch (error) {
      handleHTTP(res, new DataNotValid('El token no es válido.'))
    }
  } else {
    handleHTTP(res, new DataNotValid('El token no ha sido enviado.'))
  }
}
