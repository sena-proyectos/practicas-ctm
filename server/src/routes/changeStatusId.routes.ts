import { type IRouter, Router } from 'express'
import { changeStatusId } from '../controllers/changeStatusId.controllers.js'
import { checkIdReq } from '../middlewares/idCheck.middlewares.js'
import { checkStatusData } from '../middlewares/changeStatusId.middlewares.js'

const unableRoutes: IRouter = Router()

/**
 * Ruta encarga de cambiar el estado de un registro de una tabla
 * @route PATCH /v1/unable/:id
 * @param {id} req.params.id
 * @param {string} request.body.nombreTabla
 * @param {string} request.body.idNombreTabla
 * @param {string} request.body.estado
 * @returns {Promise<string>} 200 - Ok
 * @returns {Error} 500 - Error del servidor
 * @async
 */
unableRoutes.patch('/v1/unable/:id', checkIdReq, checkStatusData, changeStatusId)

export { unableRoutes }
