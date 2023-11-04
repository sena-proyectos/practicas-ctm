import { type IRouter, Router } from 'express'
import { createRole, editRole, getRoles } from '../controllers/roles.controllers.js'
import { checkRoleName } from '../middlewares/roles.middlewares.js'
import { checkIdReq } from '../middlewares/idCheck.middlewares.js'

const roleRoutes: IRouter = Router()

/**
 * Obtiene todos los roles
 * @route GET /v1/roles
 * @returns {Promise<Array.<Role>>} 200 - Array de roles
 * @returns {Error} HTTP Status - Error interno del servidor
 * @async
 */
roleRoutes.get('/v1/roles', getRoles)

/**
 * Crear un rol
 * @route POST /v1/create-role
 * @param {string} request.body.nombre_rol - Nombre del nuevo rol
 * @returns {Promise<string>} 200 - Mensaje de éxito
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
roleRoutes.post('/v1/create-role', checkRoleName, createRole)

/**
 * Editar un rol
 * @route POST /v1/edit-role/:id
 * @param {string} request.params.id - ID del rol a editar
 * @param {string} request.body.nombre_rol - Nuevo nombre del rol
 * @returns {Promise<string>} 200 - Mensaje de éxito
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
roleRoutes.patch('/v1/edit-role/:id', checkIdReq, checkRoleName, editRole)

export { roleRoutes }
