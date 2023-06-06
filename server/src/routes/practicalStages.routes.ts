import { type IRouter, Router } from 'express'
import { createPracticalStage, getPracticalStages } from '../controllers/practicalStages.controllers.js'

const practicalStageRoutes: IRouter = Router()

// * GET
practicalStageRoutes.get('/practical-stages', getPracticalStages)
practicalStageRoutes.get('/practical-stages/:id', getPracticalStages)

// * POST
practicalStageRoutes.post('/create-practical-stage', createPracticalStage)

export { practicalStageRoutes }
