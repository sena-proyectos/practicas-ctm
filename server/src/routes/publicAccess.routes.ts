import { type IRouter, Router } from 'express'
import { checkPublicToken, generatePublicToken } from '../controllers/publicAccess.controllers.js'

const publicAccess: IRouter = Router()

/**
 * Generador de token público para acceder a recursos de la API
 * @route GET /v1/public/token/generate
 * @returns {string} Token
 * @returns {string} 200 - Mensaje de éxito
 * @returns {Error} HTTP Status - Error en el request
 */
publicAccess.get('/v1/public/token/generate', generatePublicToken)

/**
 * Verifica que el token enviado sea válido
 * @route GET /v1/public/token/check
 * @param {string} request.headers.authorization.token
 * @returns {NextFunction}
 * @returns {Error} HTTP Status - Token inválido
 */
publicAccess.get('/v1/public/token/check', checkPublicToken)

export { publicAccess }
