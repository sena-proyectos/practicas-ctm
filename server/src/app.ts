import express, { type IRouter, type Application, type Response, type Request } from 'express'
import cors, { type CorsOptions } from 'cors'
import { indexRoutes, roleRoutes, userRoutes, inscriptionRoutes, practicalStageRoutes, classRoutes, unableRoutes, studentRoutes, emailRoutes } from './routes/routes.js'
import { httpStatus } from './models/httpStatus.enums.js'
import bodyParser from 'body-parser'

const app: Application = express()

const options: CorsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(options))
app.use(bodyParser.json({ limit: '10mb' }))

const APILINK = '/api'

app.use(indexRoutes)

const routes: IRouter[] = [userRoutes, roleRoutes, inscriptionRoutes, practicalStageRoutes, classRoutes, unableRoutes, studentRoutes, emailRoutes]

for (const route of routes) {
  app.use(APILINK, route)
}

// No found route
app.use((_req: Request, res: Response<object>): Response<object> => {
  const errorMessage = '¡Oops! Parece que este endpoint fue destruido por fuerzas fuera de nuestro conocimiento.'
  return res.status(httpStatus.NOT_FOUND).json({ error: errorMessage })
})

export { app }
