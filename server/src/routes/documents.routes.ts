import { type IRouter, Router } from 'express'
import { excelGeneratorClass, excelGeneratorStudents, excelGeneratorStudentsPractical } from '../controllers/documents.controllers.js'
import { checkClassNumber } from '../middlewares/classes.middlewares.js'

const documentRoutes: IRouter = Router()

documentRoutes.get('/create-excel-class', checkClassNumber, excelGeneratorClass)
documentRoutes.get('/create-excel-students', excelGeneratorStudents)
documentRoutes.get('/create-excel-students-practical', excelGeneratorStudentsPractical)

export { documentRoutes }
