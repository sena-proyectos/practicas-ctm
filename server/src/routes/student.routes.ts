import { type IRouter, Router } from 'express'
import { checkIdReq } from '../middlewares/idCheck.middlewares.js'
import { checkName } from '../middlewares/users.middlewares.js'
import { getStudentByName, getStudents, getStudentsById } from '../controllers/students.controllers.js'

const studentRoutes: IRouter = Router()

// * GET
studentRoutes.get('/students', getStudents)
studentRoutes.get('/studentName', checkName, getStudentByName)
studentRoutes.get('/student/:id', checkIdReq, getStudentsById)

// * PATCH

export { studentRoutes }
