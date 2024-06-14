import { config } from 'dotenv'
import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'

/**
 * Configura y obtiene las variables de entorno de la aplicación
 * @example process.env.PORT
 */
config()


const PORT = process.env.PORT ?? 3000
const DB_USER = process.env.DB_USER ?? 'root'
const DB_PASSWORD = process.env.DB_PASSWORD ?? '1234'
const DB_HOST = process.env.DB_HOST ?? 'localhost'
const DB_DATABASE = process.env.DB_DATABASE ?? 'sena_practicas2'
const DB_PORT = process.env.DB_PORT ?? 3306
const MAIL_USER = process.env.MAIL_USER ?? 'practicasctm739@gmail.com'
const MAIL_PASSWORD = process.env.MAIL_PASSWORD ?? 'z u z j e t m e t k n r cm h p'



/**
 * Configura el transporte de correos con el SMTP de outlook (office) junto con las credenciales del .env
 * @callback smtpTransport
 * @property {string} host - Host del servidor SMTP
 * @property {number} port - Puerto del servidor SMTP
 * @property {boolean} secure - Si el servidor SMTP es seguro
 * @property {object} auth - Objeto con las credenciales del usuario
 * @property {string} auth.user - Correo electrónico del usuario alojado en 'process.env.MAIL_USER'
 * @property {string} auth.pass - Contraseña del usuario alojado en 'process.env.MAIL_PASSWORD'
 */
const emailConfig = nodemailer.createTransport(
  smtpTransport({
    host: 'smtp.gmail.com',
    port:465,
    secure: true,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASSWORD
    }
  }))

export { PORT, DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT, emailConfig }
