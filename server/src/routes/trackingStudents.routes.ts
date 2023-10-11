import { type IRouter, Router } from 'express'
import { checkIdReq } from '../middlewares/idCheck.middlewares.js'
import { getBitacorasByStudent, getLettersByStudent, modifyBitacoraById, modifyLetterByID } from '../controllers/trackingStudents.controllers.js'
import { checkBitacoraData, checkLetterData } from '../middlewares/trackingStudents.middlewares.js'

const trackingRoute: IRouter = Router()

trackingRoute.get('/getLetterByStudent/:id', checkIdReq, getLettersByStudent)

trackingRoute.get('/getBitacorasByStudent/:id', checkIdReq, getBitacorasByStudent)

trackingRoute.patch('/modifyLetter/:id', checkIdReq, checkLetterData, modifyLetterByID)

trackingRoute.patch('/modifyBitacora/:id', checkIdReq, checkBitacoraData, modifyBitacoraById)

export { trackingRoute }
