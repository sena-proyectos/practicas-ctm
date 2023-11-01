import express, { type IRouter, type Application, type Response, type Request } from 'express'
import cors, { type CorsOptions } from 'cors'
import * as routes from './routes/routes.js'
import { httpStatus } from './models/httpStatus.enums.js'
import bodyParser from 'body-parser'
import { connection } from './config/db.js'
import colors from 'colors/safe.js'
import { schedulerTasks } from './utils/scheduler.js'
import { checkPublicToken } from './controllers/publicAccess.controllers.js'
import { publicAccess } from './routes/publicAccess.routes.js'

const app: Application = express()

schedulerTasks.invoke()

const options: CorsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PATCH'],
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(options))
app.use(bodyParser.json({ limit: '10mb' }))

const APILINK = '/api'

const appRoutes: IRouter[] = Object.values(routes)

app.use(APILINK, publicAccess)

for (const route of appRoutes) {
  app.use(APILINK, checkPublicToken, route)
}

// No found route
app.use((_req: Request, res: Response<object>): Response<object> => {
  const errorMessage = '¡Oops! Parece que este endpoint fue destruido por fuerzas fuera de nuestro conocimiento.'
  return res.status(httpStatus.NOT_FOUND).json({ error: errorMessage })
})

app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err)
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Error interno del servidor' })
})

process.on('uncaughtException', (error) => {
  console.log(colors.bgRed('Ha ocurrido un error, por favor verifique el servicio MYSQL o el error del catch.'))
  console.error(error)
})

process.on('SIGINT', async () => {
  console.log(colors.rainbow('Cerrando el pool de conexiones...'))
  await connection.end()
    .then(() => {
      console.log(colors.green('Pool de conexiones cerrado.'))
      process.exit()
    })
    .catch((err) => {
      console.log(colors.red('Error al cerrar el pool:'), err)
    })
})

export { app }
