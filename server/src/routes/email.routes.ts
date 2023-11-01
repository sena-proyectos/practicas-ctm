import { type IRouter, Router } from 'express'
import { checkEmail } from '../middlewares/email.middlewares.js'
import { sendEmail, sendEmailFunctions } from '../controllers/email.controllers.js'

const emailRoutes: IRouter = Router()

emailRoutes.post('/v1/sendEmail', checkEmail, sendEmail)
emailRoutes.post('/v1/sendEmail/functions', checkEmail, sendEmailFunctions)

export { emailRoutes }
