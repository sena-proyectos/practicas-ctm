import { type IRouter, Router } from 'express'
import { createRole, editRole, getRoles } from '../controllers/roles.controllers.js'
import { checkRoleName } from '../middlewares/roles.middlewares.js'
import { checkIdReq } from '../middlewares/idCheck.middlewares.js'

const roleRoutes: IRouter = Router()

// * GET
roleRoutes.get('/v1/roles', getRoles)

// * POST
roleRoutes.post('/v1/create-role', checkRoleName, createRole)

// * PATCH
roleRoutes.patch('/v1/edit-role/:id', checkIdReq, checkRoleName, editRole)

export { roleRoutes }
