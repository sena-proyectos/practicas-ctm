import { type IRouter, Router } from 'express'
import { createRole } from '../controllers/roles.controllers.js'

const roleRoutes: IRouter = Router()

// * GET

// * POST
roleRoutes.post('/createRole', createRole)

export { roleRoutes }
