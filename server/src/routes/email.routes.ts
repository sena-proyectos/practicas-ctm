import { type IRouter, Router } from 'express'
import { checkEmail } from '../middlewares/email.middlewares.js'
import { sendEmail } from '../controllers/email.controllers.js'

const emailRoutes: IRouter = Router()

emailRoutes.post('/sendEmail', checkEmail, sendEmail)

export { emailRoutes }
