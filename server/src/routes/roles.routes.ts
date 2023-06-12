import { type IRouter, Router } from 'express'
import { createRole, editRole, getRoles } from '../controllers/roles.controllers.js'

const roleRoutes: IRouter = Router()

// * GET
roleRoutes.get('/roles', getRoles)

// * POST
roleRoutes.post('/create-role', createRole)

// * PATCH
roleRoutes.patch('/edit-role/:id', editRole)

export { roleRoutes }
