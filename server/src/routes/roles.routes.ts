import { type IRouter, Router } from 'express'
import { createRole } from '../controllers/roles.controllers.js'

const roleRoutes: IRouter = Router()

// * GET

// * POST
roleRoutes.post('/create-role', createRole)

export { roleRoutes }
