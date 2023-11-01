import { type IRouter, Router } from 'express'
import { createPracticalStage, editPracticalStage, getPracticalStageById, getPracticalStages } from '../controllers/practicalStages.controllers.js'
import { checkIdReq } from '../middlewares/idCheck.middlewares.js'
import { checkPracticalStageData } from '../middlewares/practicalStages.middlewares.js'

const practicalStageRoutes: IRouter = Router()

// * GET
practicalStageRoutes.get('/v1/practical-stages', getPracticalStages)

practicalStageRoutes.get('/v1/practical-stages/:id', checkIdReq, getPracticalStageById
)
practicalStageRoutes.get('/v1/practical-stages/:id', checkIdReq, getPracticalStageById)

// * POST
practicalStageRoutes.post('/v1/create-practical-stage', checkPracticalStageData, createPracticalStage)

// * PATCH
practicalStageRoutes.patch('/v1/edit-practical-stage/:id', checkIdReq, checkPracticalStageData, editPracticalStage)

export { practicalStageRoutes }
