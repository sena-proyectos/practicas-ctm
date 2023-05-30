import { Router } from 'express'

import { userRoutes } from './users.routes.js'

const indexRoutes = Router()

indexRoutes.get('/ping', (req, res) => res.json('pong'))

export { indexRoutes, userRoutes }
