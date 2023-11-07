import { type IRouter, Router } from 'express'
import { createPracticalStage, editPracticalStage, getPracticalStageById, getPracticalStages } from '../controllers/practicalStages.controllers.js'
import { checkIdReq } from '../middlewares/idCheck.middlewares.js'
import { checkPracticalStageData } from '../middlewares/practicalStages.middlewares.js'

const practicalStageRoutes: IRouter = Router()

/**
 * Obtener todas las modalidades para la etapa práctica
 * @route /v1/practical-stages
 * @returns {Promise<Array.<PracticalStages>>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
practicalStageRoutes.get('/v1/practical-stages', getPracticalStages)

/**
 * Obtener una modalidad para la etapa práctica por su ID
 * @route GET /v1/practical-stages/:id
 * @param {string} request.param.id
 * @returns {Promise<Array>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
practicalStageRoutes.get('/v1/practical-stages/:id', checkIdReq, getPracticalStageById)

/**
 * Crear una modalidad
 * @route POST /v1/create-practical-stage
 * @param {string} request.body.tipo_modalidad_practica
 * @returns {Promise<string>} 200 - OK
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
practicalStageRoutes.post('/v1/create-practical-stage', checkPracticalStageData, createPracticalStage)

/**
 * Modificar los datos de una modalidad
 * @route PATCH /v1/edit-practical-stage/:id
 * @param {string} request.param.id
 * @param {string} request.body.tipo_modalidad_practica
 * @returns {Promise<string>} 200 - OK
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
practicalStageRoutes.patch('/v1/edit-practical-stage/:id', checkIdReq, checkPracticalStageData, editPracticalStage)

export { practicalStageRoutes }
