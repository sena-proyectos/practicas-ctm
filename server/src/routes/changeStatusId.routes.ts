import { type IRouter, Router } from 'express'
import { changeStatusId } from '../controllers/changeStatusId.controllers.js'
import { checkIdReq } from '../middlewares/idCheck.middlewares.js'
import { checkStatusData } from '../middlewares/changeStatusId.middlewares.js'

const unableRoutes: IRouter = Router()

unableRoutes.patch('/v1/unable/:id', checkIdReq, checkStatusData, changeStatusId)

export { unableRoutes }
