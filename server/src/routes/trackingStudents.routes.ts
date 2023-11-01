import { type IRouter, Router } from 'express'
import { checkIdReq } from '../middlewares/idCheck.middlewares.js'
import { createVisit, getBitacorasByStudent, getLettersByStudent, getVisitsByStudent, modifyBitacoraById, modifyLetterByID, modifyVisitByID } from '../controllers/trackingStudents.controllers.js'
import { checkBitacoraData, checkLetterData, checkVisitData } from '../middlewares/trackingStudents.middlewares.js'

const trackingRoute: IRouter = Router()

trackingRoute.get('/v1/getLetterByStudent/:id', checkIdReq, getLettersByStudent)

trackingRoute.get('/v1/getBitacorasByStudent/:id', checkIdReq, getBitacorasByStudent)

trackingRoute.get('/v1/getVisitsByStudent/:id', checkIdReq, getVisitsByStudent)

trackingRoute.patch('/v1/modifyLetter/:id', checkIdReq, checkLetterData, modifyLetterByID)

trackingRoute.patch('/v1/modifyBitacora/:id', checkIdReq, checkBitacoraData, modifyBitacoraById)

trackingRoute.patch('/v1/modifyVisit/:id', checkIdReq, checkVisitData, modifyVisitByID)

trackingRoute.post('/v1/create-visit', checkVisitData, createVisit)

export { trackingRoute }
