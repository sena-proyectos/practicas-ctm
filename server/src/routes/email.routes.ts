import { type IRouter, Router } from 'express'
import { checkEmail } from '../middlewares/email.middlewares.js'
import { sendEmail, sendEmailFunctions } from '../controllers/email.controllers.js'

const emailRoutes: IRouter = Router()

emailRoutes.post('/sendEmail', checkEmail, sendEmail)
emailRoutes.post('/sendEmail/functions', checkEmail, sendEmailFunctions)

export { emailRoutes }
