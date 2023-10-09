import { type IRouter, Router } from 'express'
import { checkIdReq } from '../middlewares/idCheck.middlewares.js'
import { getLettersByStudent, modifyLetterByID } from '../controllers/trackingStudents.controllers.js'
import { checkLetterData } from '../middlewares/trackingStudents.middlewares.js'

const trackingRoute: IRouter = Router()

trackingRoute.get('/getLetterByStudent/:id', checkIdReq, getLettersByStudent)

trackingRoute.patch('/modifyLetter/:id', checkIdReq, checkLetterData, modifyLetterByID)

export { trackingRoute }
