import { type Response } from 'express'
import { type CustomError } from './customErrors.js'

export const handleHTTP = (res: Response<string | object>, error: CustomError): Response<object> => {
  const { statusCode, errorCode, message, header } = error
  return res.status(statusCode).json({ error: { header, info: { statusCode, errorCode, message } } })
}
