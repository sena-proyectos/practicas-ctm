import { type IRouter, Router } from 'express'
import { checkEmail } from '../middlewares/email.middlewares.js'
import { sendEmail, sendEmailFunctions } from '../controllers/email.controllers.js'

const emailRoutes: IRouter = Router()

/**
 * Manda un correo electronico
 * @route POST /v1/sendEmail
 * @param {string} request.body.to
 * @param {string} request.body.subject
 * @param {string} request.body.htmlData
 * @returns {Promise<string>} 200 - OK
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
emailRoutes.post('/v1/sendEmail', checkEmail, sendEmail)

/**
 * Manda un correo a un instructor para un aval especificado
 * @route POST /v1/sendEmail/functions
 * @param {string} request.body.to
 * @param {string} request.body.subject
 * @param {string} request.body.nombre
 * @param {string} request.body.apellido
 * @param {string} request.body.apprentice
 * @returns {Promise<string>} 200 - OK
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
emailRoutes.post('/v1/sendEmail/functions', checkEmail, sendEmailFunctions)

export { emailRoutes }
