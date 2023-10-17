import { type IRouter, Router } from 'express'
import { checkIdReq } from '../middlewares/idCheck.middlewares.js'
import { checkName } from '../middlewares/users.middlewares.js'
import { createContractStudentsExcel, createStudents, editStudentState, getDetailInfoStudent, getDetailInfoStudents, getStudentByName, getStudentState, getStudents, getStudentsById } from '../controllers/students.controllers.js'
import { checkRegisterStudentData, classifyExcel, readExcelFileStudents } from '../middlewares/students.middlewares.js'
import { configureMulterExcel } from '../middlewares/inscriptions.middlewares.js'

const studentRoutes: IRouter = Router()
const multerFile = configureMulterExcel()

// * GET
studentRoutes.get('/students', getStudents)
studentRoutes.get('/studentName', checkName, getStudentByName)
studentRoutes.get('/student/:id', checkIdReq, getStudentsById)
studentRoutes.get('/detailInfoStudents', getDetailInfoStudents)
studentRoutes.get('/detailInfoStudent/:id', checkIdReq, getDetailInfoStudent)
studentRoutes.get('/studentState/:id', checkIdReq, getStudentState)

// * POST
studentRoutes.post('/create-students', checkRegisterStudentData, createStudents)
studentRoutes.post('/read-excel-file/students', multerFile, readExcelFileStudents, classifyExcel, createContractStudentsExcel)

// * PATCH
studentRoutes.patch('/update-student-state/:id', checkIdReq, editStudentState)

export { studentRoutes }
