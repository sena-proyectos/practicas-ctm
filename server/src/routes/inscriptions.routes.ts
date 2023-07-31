import { type IRouter, Router } from 'express'
import { createInscriptions, editInscriptionDetail, getInscriptionById, getInscriptions, getInscriptionsDetailsByInscription, getInscriptionsDetailsByUser } from '../controllers/inscriptions.controllers.js'
import { checkIdReq } from '../middlewares/idCheck.middlewares.js'
import { checkInscriptionData, checkInscriptionDetailData } from '../middlewares/inscriptions.middlewares.js'

const inscriptionRoutes: IRouter = Router()

// * GET
inscriptionRoutes.get('/inscriptions', getInscriptions)
inscriptionRoutes.get('/inscription/:id', checkIdReq, getInscriptionById)
inscriptionRoutes.get('/inscriptionDetails/:id', checkIdReq, getInscriptionsDetailsByInscription)
inscriptionRoutes.get('/inscriptionDetailsUser/:id', checkIdReq, getInscriptionsDetailsByUser)

// * POST
inscriptionRoutes.post('/create-inscriptions', checkInscriptionData, createInscriptions)

// * PATCH
inscriptionRoutes.patch('/update-inscription-detail/:responsable_aval', checkInscriptionDetailData, editInscriptionDetail)

export { inscriptionRoutes }
