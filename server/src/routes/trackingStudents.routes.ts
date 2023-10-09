import { type IRouter, Router } from 'express'
import { checkIdReq } from '../middlewares/idCheck.middlewares.js'
import { getBitacorasByStudent, getLettersByStudent } from '../controllers/trackingStudents.controllers.js'

const trackingRoute: IRouter = Router()

trackingRoute.get('/getLetterByStudent/:id', checkIdReq, getLettersByStudent)

trackingRoute.get('/getBitacorasByStudent/:id', checkIdReq, getBitacorasByStudent)

export { trackingRoute }
