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
