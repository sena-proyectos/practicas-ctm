import { type IRouter, Router } from 'express'
import { createInscriptions, editInscriptionDetail, getInscriptionById, getInscriptions } from '../controllers/inscriptions.controllers.js'
import { checkIdReq } from '../middlewares/idCheck.middlewares.js'
import { checkInscriptionData, checkInscriptionDetailData } from '../middlewares/inscriptions.middlewares.js'

const inscriptionRoutes: IRouter = Router()

// * GET
inscriptionRoutes.get('/inscriptions', getInscriptions)
inscriptionRoutes.get('/inscription/:id', checkIdReq, getInscriptionById)

// * POST
inscriptionRoutes.post('/create-inscriptions', checkInscriptionData, createInscriptions)

// * PATCH
inscriptionRoutes.patch('/update-inscription-detail/:responsable_aval', checkInscriptionDetailData, editInscriptionDetail)

export { inscriptionRoutes }
