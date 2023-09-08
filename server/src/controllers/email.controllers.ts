import { type Request, type Response } from 'express'
import { emailConfig } from '../config/config.js'
import { type CustomError } from '../errors/customErrors.js'
import { handleHTTP } from '../errors/errorsHandler.js'

export const sendEmail = async (req: Request, res: Response): Promise<Response> => {
  const { to, subject, text } = req.body
  try {
    const sendData = await emailConfig.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject,
      text
    })
    console.log(sendData)
    return res.status(200).json({ msg: 'Correo enviado correctamente' })
  } catch (error) {
    console.log(error)
    return handleHTTP(res, error as CustomError)
  }
}
