import { type IRouter, Router } from 'express'
import { createPracticalStage, getPracticalStages } from '../controllers/practicalStages.controllers.js'

const roleRoutes: IRouter = Router()

// * GET
roleRoutes.get('/practical-stages', getPracticalStages)
roleRoutes.get('/practical-stages/:id', getPracticalStages)

// * POST
roleRoutes.post('/create-practical-stage', createPracticalStage)

export { roleRoutes }
