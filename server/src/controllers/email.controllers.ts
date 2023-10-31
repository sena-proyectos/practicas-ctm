import { type Request, type Response } from 'express'
import { emailConfig } from '../config/config.js'
import { type CustomError } from '../errors/customErrors.js'
import { handleHTTP } from '../errors/errorsHandler.js'

export const sendEmail = async (req: Request, res: Response): Promise<Response> => {
  const { to, subject, htmlData } = req.body

  const [htmlContent, textContent] = htmlData
  const { nombre_inscripcion, apellido_inscripcion, observations } = textContent

  try {
    const emailBody = `<p>Querido ${nombre_inscripcion as string} ${apellido_inscripcion as string}, su solicitud de inscripción de etapa práctica ha sido modificada por la siguiente/s <strong>observación/es</strong>: <br/> ${observations as string}.</p> ${htmlContent as string ?? ''} <br/> <h5>Revisado por Juan Esteban</h5>`

    await emailConfig.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject,
      html: emailBody
    })
    return res.status(200).json({ msg: 'Correo enviado correctamente' })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const sendEmailFunctions = async (req: Request, res: Response): Promise<Response> => {
  const { to, subject, nombre, apellido, apprentice } = req.body

  try {
    const emailBody = `<p>Querido ${nombre as string} ${apellido as string}, se te ha asignado la revisión de la carta de funciones para el estudiante ${apprentice}</p> <br/> <h5>Revisado por Juan Esteban</h5>`

    await emailConfig.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject,
      html: emailBody
    })
    return res.status(200).json({ msg: 'Correo enviado correctamente' })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const sendEmailAnyBody = async (payload: { body: string, subject: string, to: string, file: Buffer }): Promise<void> => {
  try {
    await emailConfig.sendMail({
      from: process.env.MAIL_USER,
      to: payload.to,
      subject: payload.subject,
      html: payload.body,
      attachments: [{
        filename: 'aprendices.xlsx',
        content: payload.file,
        contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        contentDisposition: 'attachment'
      }]
    })
  } catch (error: any) {
    throw new Error(error)
  }
}
