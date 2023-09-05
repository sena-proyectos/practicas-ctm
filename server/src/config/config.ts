import { config } from 'dotenv'

config()

const PORT = process.env.PORT ?? 3000
const DB_USER = process.env.DB_USER ?? 'Stiven'
const DB_PASSWORD = process.env.DB_PASSWORD ?? 'Stigmata14/'
const DB_HOST = process.env.DB_HOST ?? 'localhost'
const DB_DATABASE = process.env.DB_DATABASE ?? 'practicas_sena'
const DB_PORT = process.env.DB_PORT ?? 3306
const MAIL_USER = process.env.MAIL_USER ?? 'null'
const MAIL_PASSWORD = process.env.MAIL_PASSWORD ?? 'null'

const emailConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
}

export { PORT, DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT, emailConfig }
