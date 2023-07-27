import { type IRouter, Router } from 'express'
import { checkIdReq } from '../middlewares/idCheck.middlewares.js'
import { checkName } from '../middlewares/users.middlewares.js'
import { createStudents, getDetailInfoStudent, getDetailInfoStudents, getStudentByName, getStudents, getStudentsById } from '../controllers/students.controllers.js'
import { checkRegisterStudentData } from '../middlewares/students.middlewares.js'

const studentRoutes: IRouter = Router()

// * GET
studentRoutes.get('/students', getStudents)
studentRoutes.get('/studentName', checkName, getStudentByName)
studentRoutes.get('/student/:id', checkIdReq, getStudentsById)
studentRoutes.get('/detailInfoStudents', getDetailInfoStudents)
studentRoutes.get('/detailInfoStudent/:id', checkIdReq, getDetailInfoStudent)

// * POST
studentRoutes.post('/create-students', checkRegisterStudentData, createStudents)

export { studentRoutes }
