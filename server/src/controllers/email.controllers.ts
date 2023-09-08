import nodemailer from 'nodemailer'
import { type Request, type Response } from 'express'
import { emailConfig } from '../config/config.js'
import { type CustomError } from '../errors/customErrors.js'
import { handleHTTP } from '../errors/errorsHandler.js'

export const sendEmail = async (req: Request, res: Response): Promise<Response> => {
  const { from, to, subject, text } = req.body
  try {
    const mensaje = { from, to, subject, text }
    const transporte = nodemailer.createTransport(emailConfig)
    const sendData = await transporte.sendMail(mensaje)
    return res.status(200).json({ msg: 'Correo enviado correctamente' })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}
