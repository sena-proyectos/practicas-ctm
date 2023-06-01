import { type Request, type Response, Router } from 'express'

import { userRoutes } from './users.routes.js'

const indexRoutes = Router()

indexRoutes.get('/ping', (_req: Request, res: Response<string>): Response<string> => res.json('pong'))

export { indexRoutes, userRoutes }
