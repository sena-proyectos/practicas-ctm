import { type Request, type Response } from 'express'
import { emailConfig } from '../config/config.js'
import { type CustomError } from '../errors/customErrors.js'
import { handleHTTP } from '../errors/errorsHandler.js'

export const sendEmail = async (req: Request, res: Response): Promise<Response> => {
  const { to, subject, htmlData } = req.body

    const [htmlContent, textContent] = htmlData
    const { nombre_inscripcion, apellido_inscripcion, observations } = textContent
  
  try {
    const emailBody = `<p>Querido ${nombre_inscripcion} ${apellido_inscripcion}, su solicitud de inscripción de etapa práctica ha sido rechazada por la siguiente/s <strong>observación/es</strong>: <br/> ${observations}.</p> ${htmlContent ?? ''} <br/> <h5>Revisado por Juan Esteban</h5>`

    const sendData = await emailConfig.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject,
      html: emailBody
    })
    console.log(sendData)
    return res.status(200).json({ msg: 'Correo enviado correctamente' })
  } catch (error) {
    console.log(error)
    return handleHTTP(res, error as CustomError)
  }
}
