import express, { type IRouter, type Application, type Response } from 'express'
import cors, { type CorsOptions } from 'cors'

import { indexRoutes, roleRoutes, userRoutes, inscriptionRoutes, practicalStageRoutes } from './routes/routes.js'
import { httpStatus } from './models/httpStatus.enums.js'

const app: Application = express()

const options: CorsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(options))
app.use(express.json())

const APILINK = '/api'

app.use(indexRoutes)

const routes: IRouter[] = [userRoutes, roleRoutes, inscriptionRoutes, practicalStageRoutes]

for (const route of routes) {
  app.use(APILINK, route)
}

// No found route
app.use((_req, res: Response<object>): void => {
  const errorMessage = '¡Oops! Parece que este endpoint fue destruido por fuerzas fuera de nuestro conocimiento.'
  res.status(httpStatus.NOT_FOUND).json({ error: errorMessage })
})

export { app }
