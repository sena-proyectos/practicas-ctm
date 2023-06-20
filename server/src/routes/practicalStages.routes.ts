import { type IRouter, Router } from 'express'
import { createPracticalStage, editPracticalStage, getPracticalStages } from '../controllers/practicalStages.controllers.js'
import { checkIdReq } from '../middlewares/idCheck.middlewares.js'
import { checkPracticalStageData } from '../middlewares/practicalStages.middlewares.js'

const practicalStageRoutes: IRouter = Router()

// * GET
practicalStageRoutes.get('/practical-stages', getPracticalStages)
practicalStageRoutes.get('/practical-stages/:id', checkIdReq, getPracticalStages)

// * POST
practicalStageRoutes.post('/create-practical-stage', checkPracticalStageData, createPracticalStage)

// * PATCH
practicalStageRoutes.patch('/edit-practical-stage/:id', checkIdReq, checkPracticalStageData, editPracticalStage)

export { practicalStageRoutes }
