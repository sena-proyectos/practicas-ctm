import { type IRouter, Router } from 'express'
import { checkIdReq } from '../middlewares/idCheck.middlewares.js'
import { checkName } from '../middlewares/users.middlewares.js'
import { createContractStudentsExcel, createStudents, editStudentState, getDetailInfoStudent, getDetailInfoStudents, getStudentByName, getStudentState, getStudents, getStudentsById, getStudentsByTeacherId } from '../controllers/students.controllers.js'
import { checkRegisterStudentData, classifyExcel, readExcelFileStudents } from '../middlewares/students.middlewares.js'
import { configureMulterExcel } from '../middlewares/inscriptions.middlewares.js'

const studentRoutes: IRouter = Router()
const multerFile = configureMulterExcel()

// * GET
studentRoutes.get('/v1/students', getStudents)
studentRoutes.get('/v1/studentName', checkName, getStudentByName)
studentRoutes.get('/v1/student/:id', checkIdReq, getStudentsById)
studentRoutes.get('/v1/detailInfoStudents', getDetailInfoStudents)
studentRoutes.get('/v1/detailInfoStudents/teacher/:id', checkIdReq, getStudentsByTeacherId)
studentRoutes.get('/v1/detailInfoStudent/:id', checkIdReq, getDetailInfoStudent)
studentRoutes.get('/v1/studentState/:id', checkIdReq, getStudentState)

// * POST
studentRoutes.post('/v1/create-students', checkRegisterStudentData, createStudents)
studentRoutes.post('/v1/read-excel-file/students', multerFile, readExcelFileStudents, classifyExcel, createContractStudentsExcel)

// * PATCH
studentRoutes.patch('/v1/update-student-state/:id', checkIdReq, editStudentState)

export { studentRoutes }
