import { type IRouter, Router } from 'express'
import { checkIdReq } from '../middlewares/idCheck.middlewares.js'
import { getClasses, getClassById, getClassByClassNumber } from '../controllers/classes.controllers.js'
import { checkClassNumber } from '../middlewares/classes.middlewares.js'

const classRoutes: IRouter = Router()

// * GET
classRoutes.get('/classes', getClasses)
classRoutes.get('/class/:id', checkIdReq, getClassById)
classRoutes.get('/classNumber', checkClassNumber, getClassByClassNumber)

// * POST

// * PATCH

export { classRoutes }
