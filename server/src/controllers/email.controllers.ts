import nodemailer from 'nodemailer'
import { type Request, type Response } from 'express'
import { emailConfig } from "../config/config.js";

export const sendEmail = (req:Request, res:Response) => {
    const {from, to, subject, text} = req.body
    const mensaje = {from, to, subject, text}
    const transporte = nodemailer.createTransport(emailConfig)
    transporte.sendMail(mensaje, (error) => {
        if (error) {
            res.status(500).send(error.message)
        } else {
            res.status(200).json({ message: "Envio de correo exitoso" })
        }
    })
}

