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
    transporte.verify(function (error, success) {
      if (error != null) {
        console.log(error)
      } else {
        console.log(success)
      }
    })
    console.log(emailConfig.auth)
    const sendData = await transporte.sendMail(mensaje)
    console.log(sendData)
    return res.status(200).json({ msg: 'Correo enviado correctamente' })
  } catch (error) {
    // console.log(error)
    return handleHTTP(res, error as CustomError)
  }
}