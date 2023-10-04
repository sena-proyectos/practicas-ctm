import { type Request, type Response, Router } from 'express'

import { userRoutes } from './users.routes.js'
import { roleRoutes } from './roles.routes.js'
import { inscriptionRoutes } from './inscriptions.routes.js'
import { practicalStageRoutes } from './practicalStages.routes.js'
import { classRoutes } from './classes.routes.js'
import { unableRoutes } from './changeStatusId.routes.js'
import { studentRoutes } from './students.routes.js'
import { emailRoutes } from './email.routes.js'

const indexRoutes = Router()

indexRoutes.get('/ping', (_req: Request, res: Response<string>): Response<string> => res.json('pong'))

export { indexRoutes, userRoutes, roleRoutes, inscriptionRoutes, practicalStageRoutes, classRoutes, unableRoutes, studentRoutes, emailRoutes }
