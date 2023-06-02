import { type IRouter, Router } from 'express'
import { createInscription, getInscriptionById, getInscriptions } from '../controllers/inscriptions.controllers.js'

const inscriptionRoutes: IRouter = Router()

// * GET
inscriptionRoutes.get('/inscriptions', getInscriptions)
inscriptionRoutes.get('/inscription/:id', getInscriptionById)

// * POST
inscriptionRoutes.post('/create-inscription', createInscription)

export { inscriptionRoutes }
