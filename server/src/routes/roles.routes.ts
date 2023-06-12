import { type IRouter, Router } from 'express'
import { createRole, editRole, getRoles } from '../controllers/roles.controllers.js'
import { checkRoleName } from '../middlewares/roles.middlewares.js'
import { checkIdReq } from '../middlewares/idCheck.middlewares.js'

const roleRoutes: IRouter = Router()

// * GET
roleRoutes.get('/roles', getRoles)

// * POST
roleRoutes.post('/create-role', checkRoleName, createRole)

// * PATCH
roleRoutes.patch('/edit-role/:id', checkIdReq, checkRoleName, editRole)

export { roleRoutes }
