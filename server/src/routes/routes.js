import { Router } from 'express'

const indexRoutes = Router()

indexRoutes.get('/ping', (req, res) => res.json('pong'))

export { indexRoutes }
