import { type Request, type Response, Router } from 'express'

import { userRoutes } from './users.routes.js'
import { roleRoutes } from './roles.routes.js'
import { inscriptionRoutes } from './inscriptions.routes.js'
import { practicalStageRoutes } from './practicalStages.routes.js'
import { classRoutes } from './classes.routes.js'
import { unableRoutes } from './changeStatusId.routes.js'
import { studentRoutes } from './students.routes.js'
import { emailRoutes } from './email.routes.js'
import { trackingRoute } from './trackingStudents.routes.js'
import { connection } from '../config/db.js'
import { httpStatus } from '../models/httpStatus.enums.js'
import { type RowDataPacket } from 'mysql2'

const indexRoutes = Router()

indexRoutes.get('/ping', (_req: Request, res: Response<string>): Response<string> => res.json('pong'))

indexRoutes.get('/test', async (_, res: Response): Promise<Response<object>> => {
  const [query] = await connection.query<RowDataPacket[]>('SELECT 1 + 1')
  return res.status(httpStatus.OK).json(query)
})

export { indexRoutes, userRoutes, roleRoutes, inscriptionRoutes, practicalStageRoutes, classRoutes, unableRoutes, studentRoutes, emailRoutes, trackingRoute }
