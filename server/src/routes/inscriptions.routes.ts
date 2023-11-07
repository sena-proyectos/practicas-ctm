import { type IRouter, Router } from 'express'
import { createInscriptions, editInscription, editInscriptionDetail, getInscriptionById, getInscriptions, getInscriptionsDetailsById, getInscriptionsDetailsByInscription, getInscriptionsDetailsByUser, returnExcelData, getInscriptionsDetailsByName, getInscriptionsByTeacherOrCoordinatorId } from '../controllers/inscriptions.controllers.js'
import { checkIdReq } from '../middlewares/idCheck.middlewares.js'
import { checkInscriptionData, checkInscriptionDetailData, configureMulterExcel, readExcelFile } from '../middlewares/inscriptions.middlewares.js'
import { checkName } from '../middlewares/users.middlewares.js'

/**
 * Configurar el middleware para leer excels
 * @returns {RequestHandler}
 */
const multerFile = configureMulterExcel()
const inscriptionRoutes: IRouter = Router()

/**
 * Obtener todas las inscripciones.
 * @route GET /inscriptions
 * @returns {Promise<Array.<Inscriptions>>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
inscriptionRoutes.get('/v1/inscriptions', getInscriptions)

/**
 * Obtiene todas las incripciones relacionadas a un instructor de seguimiento o coordinador
 * @route GET /v1/inscriptions/teacher/:id
 * @param {string} request.param.id
 * @returns {Promise<Array.<Inscriptions>>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
inscriptionRoutes.get('/v1/inscriptions/teacher/:id', checkIdReq, getInscriptionsByTeacherOrCoordinatorId)

/**
 * Obtener una inscripción por su ID.
 * @route GET /inscription/:id
 * @param {string} request.param.id
 * @returns {Promise<Array>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
inscriptionRoutes.get('/v1/inscription/:id', checkIdReq, getInscriptionById)

/**
 * Obtener detalles de inscripción por su ID.
 * @route GET /inscriptionDetails/:id
 * @param {string} request.param.id
 * @returns {Promise<Array>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
inscriptionRoutes.get('/v1/inscriptionDetails/:id', checkIdReq, getInscriptionsDetailsByInscription)

/**
 * Obtener detalles de inscripción por el ID del usuario responsable
 * @route GET /inscriptionDetailsUser/:id
 * @param {string} request.param.id
 * @returns {Promise<Array>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
inscriptionRoutes.get('/v1/inscriptionDetailsUser/:id', checkIdReq, getInscriptionsDetailsByUser)

/**
 * Obtener detalles de inscripción por su ID.
 * @routeGET /v1/inscriptionDetail/:id
 * @param {string} request.param.id
 * @returns {Promise<Array>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
inscriptionRoutes.get('/v1/inscriptionDetail/:id', checkIdReq, getInscriptionsDetailsById)

/**
 * Obtener una inscripción mediante el nombre completo del aprendiz
 * @route GET /v1/inscriptionName
 * @param {string} req.query.nombreCompleto
 * @returns {Promise<Array>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
inscriptionRoutes.get('/v1/inscriptionName', checkName, getInscriptionsDetailsByName)

/**
 * Crear inscripciones mediante un array
 * @route POST /create-inscriptions
 * @param {inscriptionData[]} request.body.inscriptions
 * @returns {Promise<string>} 200 - OK
 * @returns {Error} HTTP Status - Error en el request
 */
inscriptionRoutes.post('/v1/create-inscriptions', checkInscriptionData, createInscriptions)

/**
 * Leer excel de inscripciones y devolverlos
 * @route POST /inscription-excel-file
 * @param {buffer} request.file
 * @returns {Promise<Array>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
inscriptionRoutes.post('/v1/inscription-excel-file', multerFile, readExcelFile, returnExcelData)

/**
 * Actualizar detalles de inscripción por el ID del usuario responsable.
 * @route PATCH /update-inscription-detail/:responsable_aval
 * @param {string} responsable_aval
 * @param {string} id_inscripcion
 * @param {string} estado_aval
 * @param {string} observaciones
 * @returns {Promise<Array>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
inscriptionRoutes.patch('/v1/update-inscription-detail/:id', checkInscriptionDetailData, editInscriptionDetail)

/**
 * Actualizar una inscripción por su ID.
 * @route PATCH /update-inscription/:id
 * @param {string} request.param.id
 * @param {inscriptionData[]} req.body.inscriptionData[]
 * @returns {Promise<string>} 200 - OK
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
inscriptionRoutes.patch('/v1/update-inscription/:id', checkIdReq, checkInscriptionData, editInscription)

export { inscriptionRoutes }
