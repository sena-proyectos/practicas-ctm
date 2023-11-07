import { type Request, type Response, Router, type IRouter } from 'express'

import { userRoutes } from './users.routes.js'
import { roleRoutes } from './roles.routes.js'
import { inscriptionRoutes } from './inscriptions.routes.js'
import { practicalStageRoutes } from './practicalStages.routes.js'
import { classRoutes } from './classes.routes.js'
import { unableRoutes } from './changeStatusId.routes.js'
import { studentRoutes } from './students.routes.js'
import { emailRoutes } from './email.routes.js'
import { trackingRoute } from './trackingStudents.routes.js'
import { documentRoutes } from './documents.routes.js'
import { connection } from '../config/db.js'
import { httpStatus } from '../models/httpStatus.enums.js'
import { type RowDataPacket } from 'mysql2'

const indexRoutes: IRouter = Router()

/**
 * Ruta básica para verificar si la API funciona
 * @param {string} '/ping'
 * @callback
 * @param {Request} _req
 * @param {Response<string>} res
 * @returns {Response<string>} => 'Pong'
 */
indexRoutes.get('/ping', (_req: Request, res: Response<string>): Response<string> => res.json('pong'))

/**
 * Ruta básica para verificar si la conexión con MySQL funciona
 * @param {string} '/test'
 * @param {unknown} _
 * @param {Response} res
 * @returns {Promise<Response<object>>}
 * @async
 */
indexRoutes.get('/test', async (_, res: Response): Promise<Response<object>> => {
  const [query] = await connection.query<RowDataPacket[]>('SELECT 1 + 1')
  return res.status(httpStatus.OK).json(query)
})

/**
 * Exportación de todas las rutas actuales que requieren el token público
 */
export { indexRoutes, userRoutes, roleRoutes, inscriptionRoutes, practicalStageRoutes, classRoutes, unableRoutes, studentRoutes, emailRoutes, trackingRoute, documentRoutes }
