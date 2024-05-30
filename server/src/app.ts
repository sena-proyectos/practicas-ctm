import * as routes from './routes/routes.js'
import express, { type IRouter, type Application, type Response, type Request } from 'express'
import cors, { type CorsOptions } from 'cors'
import { httpStatus } from './models/httpStatus.enums.js'
import bodyParser from 'body-parser'
import { connection } from './config/db.js'
import colors from 'colors/safe.js'
import { schedulerTasks } from './utils/scheduler.js'
import { checkPublicToken } from './controllers/publicAccess.controllers.js'
import { publicAccess } from './routes/publicAccess.routes.js'

/**
 * Inicio de la aplicación de express para el uso de la REST API
 * @see {@link https://www.npmjs.com/package/express}
 * @returns {Application}
 */
const app: Application = express()

/**
 * Es el invocador del planificador de notificaciones semanales
 * @see {@link ./utils/scheduler.ts}
 * @returns {void}
 */
schedulerTasks.invoke()

/**
 * Opciones de configuración para el manejo de CORS.
 * @property {string} origin - La URL de origen permitida.
 * @property {string[]} methods - Los métodos HTTP permitidos.
 * @property {number} optionsSuccessStatus - El código de estado de éxito para las opciones pre-vuelo.
 * @property {string[]} allowedHeaders - Los encabezados permitidos en las solicitudes CORS.
 */
const options: CorsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PATCH'],
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(options))
app.use(bodyParser.json({ limit: '10mb' }))

const APILINK = '/api'

/**
 * Contiene las rutas actuales de la API
 * @param {any} routes - Las rutas actuales de la API
 * @see {@link ./routes/routes.ts}
 */
const appRoutes: IRouter[] = Object.values(routes)

/**
 * Uso de las rutas públicas para poder acceder al token obligatorio para la interacción de la aplicación
 * @param {string} APILINK - Prefijo estandarizado de la rutas
 * @param {IRouter} publicAccess - Las rutas definidas sin necesidad de public-token
 */
app.use(APILINK, publicAccess)

/**
 * Ciclo para asignar el resto de rutas de la aplicación junto con el verificador de token público
 * @param {string} APILINK - Prefijo estandarizado de la rutas
 * @param {IRouter} route - Las rutas definidas
 */
for (const route of appRoutes) {
  app.use(APILINK, checkPublicToken, route)
}

/**
 * Función encarga de mandar mensajes de error en caso de la ruta no exista en la aplicación actual
 * @param {Request} req - Petición del servidor (No usado)
 * @constant {string} errorMessage - Mensaje de error personalizado que se envía
 * @param {Response} res - Respuesta del servidor
 * @returns {Response<object>}
 */
app.use((_req: Request, res: Response<object>): Response<object> => {
  const errorMessage = '¡Oops! Parece que este endpoint fue destruido por fuerzas fuera de nuestro conocimiento.'
  return res.status(httpStatus.NOT_FOUND).json({ error: errorMessage })
})

/**
 * Aplicación de respuesta negativa al cliente si existe algún error en el servidor
 * @param {Error} err - Mensaje de error
 * @param {Request} _req - Petición no usada
 * @param {Response} res - Respuesta del servidor
 * @returns {Response}
 */
app.use((err: Error, _req: Request, res: Response): Response => {
  console.error(err)
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Error interno del servidor' })
})

/**
 * Escucha el evento 'uncaughtException' del objeto process que el error manejado por Node.
 * @param {string} uncaughtException - El nombre del evento a escuchar. En este caso, 'uncaughtException'.
 * @callback uncaughtExceptionCallback
 * @param {Error} error - Un objeto Error que representa el error no capturado.
 */
process.on('uncaughtException', (error) => {
  console.log(colors.bgRed('Ha ocurrido un error, por favor verifique el servicio MYSQL o el error del catch.'))
  console.error(error)
})

/**
 * Escucha el evento 'SIGNIT' que se referencia cuando se cierra el servidor de Node mediante 'Ctrl + C'
 * @param {string} SIGINT - Nombre del evento de cierre del servidor. En este caso, 'SIGINT'.
 * @callback SIGNITCallback
 * @async
 * @returns {any}
 */
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
