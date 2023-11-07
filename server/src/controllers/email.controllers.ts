import { type Request, type Response } from 'express'
import { emailConfig } from '../config/config.js'
import { type CustomError } from '../errors/customErrors.js'
import { handleHTTP } from '../errors/errorsHandler.js'

export const sendEmail = async (req: Request, res: Response): Promise<Response> => {
  const { to, subject, htmlData } = req.body

  const [htmlContent, textContent] = htmlData
  const { nombre_inscripcion, apellido_inscripcion, observations } = textContent

  try {
    const emailBody = `<html><head><style>body{font-family:Arial, sans-sefif;}.container{background-color: #A6E29B;border-radius: 15px;max-width:600px;margin:0 auto;padding: 20px;color:black;}.title{text-align:center;margin:0;}.name-student{font-weight:bold;text-transform:uppercase;}.divider{width:50%;border-color: black;}.info-content{font-size:15px;margin:26px 0px;}.span{text-align:center;font-size:12.5px;font-weight:bold;margin:18px 0px;color:black;}.info-footer{width: fit-content;margin: auto;padding: 0;text-align:center;margin-top:15px;color:black;}.title-footer{margin:0px;}.content-observation{margin-bottom:20px;}.html-content{overflow-x:auto}.text{color:black;}</style></head><body><section class="container"><h3 class="title">Querido <span class="name-student">${nombre_inscripcion as string} ${
      apellido_inscripcion as string
    }.</span></h3><hr class='divider'><section class="info-content"><p class="text">Su registro de alternativa de modalidad para etapa práctica ha sido modificada por la/s siguiente/s <strong>observación/es</strong>:</p><p>${observations as string}.</p><div class="html-content">${(htmlContent as string) ?? ''}</div></section><hr class="divider"><p class="span">***Correo generado automáticamente - No responder***</p><hr class="divider"><section class="info-footer"><h4 class="title-footer">Revisado por Juan Esteban</h4><h4 class="title-footer">Servicio Nacional de Aprendizaje</h4><span>Centro Tecnológico del Mobiliario</span></section></section></body></html>`

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

export const sendEmailAnyBody = async (payload: { body: string; subject: string; to: string; file: Buffer }): Promise<void> => {
  try {
    await emailConfig.sendMail({
      from: process.env.MAIL_USER,
      to: payload.to,
      subject: payload.subject,
      html: payload.body,
      attachments: [
        {
          filename: 'aprendices.xlsx',
          content: payload.file,
          contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          contentDisposition: 'attachment'
        }
      ]
    })
  } catch (error: any) {
    throw new Error(error)
  }
}

export const sendEmailAnyBodyNotfile = async (payload: { body: string; subject: string; to: string }): Promise<void> => {
  try {
    await emailConfig.sendMail({
      from: process.env.MAIL_USER,
      to: payload.to,
      subject: payload.subject,
      html: payload.body
    })
  } catch (error: any) {
    console.log(error)
    throw new Error(error)
  }
}
