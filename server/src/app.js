import express from 'express'
import cors from 'cors'

import { indexRoutes, userRoutes } from './routes/routes.js'

const app = express()

app.use(express.json())
app.use(cors())

const APILINK = '/api'

app.use(indexRoutes)

const routes = [userRoutes]

for (const route of routes) {
  app.use(APILINK, route)
}

// No found route
app.use((_req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
})

export { app }
