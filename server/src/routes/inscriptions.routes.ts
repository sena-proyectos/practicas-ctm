import { type IRouter, Router } from 'express'
import { createInscriptions, editInscription, editInscriptionDetail, getInscriptionById, getInscriptions, getInscriptionsDetailsById, getInscriptionsDetailsByInscription, getInscriptionsDetailsByUser, returnExcelData, getInscriptionsDetailsByName } from '../controllers/inscriptions.controllers.js'
import { checkIdReq } from '../middlewares/idCheck.middlewares.js'
import { checkInscriptionData, checkInscriptionDetailData, configureMulterExcel, readExcelFile } from '../middlewares/inscriptions.middlewares.js'
import { checkName } from '../middlewares/users.middlewares.js'

const multerFile = configureMulterExcel()
const inscriptionRoutes: IRouter = Router()

// * GET

/**
 * @description Ruta para obtener todas las inscripciones.
 * @route GET /inscriptions
 */
inscriptionRoutes.get('/inscriptions', getInscriptions)

/**
 * @description Ruta para obtener una inscripción por su ID.
 * @route GET /inscription/:id
 * @param id El ID de la inscripción.
 */
inscriptionRoutes.get('/inscription/:id', checkIdReq, getInscriptionById)

/**
 * @description Ruta para obtener detalles de inscripción por su ID.
 * @route GET /inscriptionDetails/:id
 * @param id El ID de la inscripción.
 */
inscriptionRoutes.get('/inscriptionDetails/:id', checkIdReq, getInscriptionsDetailsByInscription)

/**
 * @description Ruta para obtener detalles de inscripción por el ID del usuario responsable.
 * @route GET /inscriptionDetailsUser/:id
 * @param id El ID del usuario responsable.
 */
inscriptionRoutes.get('/inscriptionDetailsUser/:id', checkIdReq, getInscriptionsDetailsByUser)

inscriptionRoutes.get('/inscriptionDetail/:id', checkIdReq, getInscriptionsDetailsById)

inscriptionRoutes.get('/inscriptionName', checkName, getInscriptionsDetailsByName)

// * POST
/**
 * @description Ruta para crear inscripciones.
 * @route POST /create-inscriptions
 * @bodyparam inscriptions Datos de las inscripciones a crear.
 */
inscriptionRoutes.post('/create-inscriptions', checkInscriptionData, createInscriptions)

/**
 * @description Ruta para leer excel de inscripciones.
 * @route POST /inscription-excel-file
 * @fileparam Archivo excel.
 */
inscriptionRoutes.post('/inscription-excel-file', multerFile, readExcelFile, returnExcelData)

// * PATCH
/**
 * @description Ruta para actualizar detalles de inscripción por el ID del usuario responsable.
 * @route PATCH /update-inscription-detail/:responsable_aval
 * @param responsable_aval El ID del usuario responsable.
 * @bodyparam id_inscripcion El ID de la inscripción.
 * @bodyparam estado_aval El estado de aval a actualizar.
 * @bodyparam observaciones Las observaciones a actualizar.
 */
inscriptionRoutes.patch('/update-inscription-detail/:id', checkInscriptionDetailData, editInscriptionDetail)

/**
 * @description Ruta para actualizar una inscripción por su ID.
 * @route PATCH /update-inscription/:id
 * @param id El ID de la inscripción a actualizar.
 * @bodyparam Todos los datos de la inscripción a actualizar.
 */
inscriptionRoutes.patch('/update-inscription/:id', checkIdReq, checkInscriptionData, editInscription)

export { inscriptionRoutes }
