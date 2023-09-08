import { config } from 'dotenv'
import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'

config()

const PORT = process.env.PORT ?? 3000
const DB_USER = process.env.DB_USER ?? 'Stiven'
const DB_PASSWORD = process.env.DB_PASSWORD ?? 'Stigmata14/'
const DB_HOST = process.env.DB_HOST ?? 'localhost'
const DB_DATABASE = process.env.DB_DATABASE ?? 'practicas_sena'
const DB_PORT = process.env.DB_PORT ?? 3306
const MAIL_USER = process.env.MAIL_USER ?? 'null'
const MAIL_PASSWORD = process.env.MAIL_PASSWORD ?? 'null'

const emailConfig = nodemailer.createTransport(
  smtpTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASSWORD
    }
  }))

export { PORT, DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT, emailConfig }
