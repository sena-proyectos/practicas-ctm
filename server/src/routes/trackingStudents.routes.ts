import { type IRouter, Router } from 'express'
import { checkIdReq } from '../middlewares/idCheck.middlewares.js'
import { getBitacorasByStudent, getLettersByStudent, getVisitDataByID, getVisitID, modifyBitacoraById, modifyLetterByID, modifyVisitByID } from '../controllers/trackingStudents.controllers.js'
import { checkBitacoraData, checkLetterData, checkVisitData } from '../middlewares/trackingStudents.middlewares.js'

const trackingRoute: IRouter = Router()

trackingRoute.get('/getLetterByStudent/:id', checkIdReq, getLettersByStudent)

trackingRoute.get('/getBitacorasByStudent/:id', checkIdReq, getBitacorasByStudent)

trackingRoute.get('/getVisitsIDStudents/:id', checkIdReq, getVisitID)

trackingRoute.get('/getVisitData/:id', checkIdReq, getVisitDataByID)

trackingRoute.patch('/modifyLetter/:id', checkIdReq, checkLetterData, modifyLetterByID)

trackingRoute.patch('/modifyBitacora/:id', checkIdReq, checkBitacoraData, modifyBitacoraById)

trackingRoute.patch('/modifyVisit/:id', checkIdReq, checkVisitData, modifyVisitByID)

export { trackingRoute }
