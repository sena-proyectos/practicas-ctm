import { type IRouter, Router } from 'express'
import { checkIdReq } from '../middlewares/idCheck.middlewares.js'
import { createVisit, getBitacorasByStudent, getLettersByStudent, getVisitsByStudent, modifyBitacoraById, modifyLetterByID, modifyVisitByID } from '../controllers/trackingStudents.controllers.js'
import { checkBitacoraData, checkLetterData, checkVisitData } from '../middlewares/trackingStudents.middlewares.js'

const trackingRoute: IRouter = Router()

trackingRoute.get('/getLetterByStudent/:id', checkIdReq, getLettersByStudent)

trackingRoute.get('/getBitacorasByStudent/:id', checkIdReq, getBitacorasByStudent)

trackingRoute.get('/getVisitsByStudent/:id', checkIdReq, getVisitsByStudent)

trackingRoute.patch('/modifyLetter/:id', checkIdReq, checkLetterData, modifyLetterByID)

trackingRoute.patch('/modifyBitacora/:id', checkIdReq, checkBitacoraData, modifyBitacoraById)

trackingRoute.patch('/modifyVisit/:id', checkIdReq, checkVisitData, modifyVisitByID)

trackingRoute.post('/create-visit', checkVisitData, createVisit)

export { trackingRoute }
