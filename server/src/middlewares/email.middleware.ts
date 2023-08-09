import { type NextFunction, type Request, type Response } from 'express'
import { emailSchema } from '../schemas/email.schemas.js'
import { DataNotValid } from '../errors/customErrors.js'

export const checkEmail = (req:Request, _res: Response, next: NextFunction) => {
    const {from, to, subject, text} = req.body
    const { error } = emailSchema.validate({from, to, subject, text})
    if(error !== undefined) throw new DataNotValid('Debes llenar todos los campos')
    next()
}