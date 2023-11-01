import { type IRouter, Router } from 'express'
import { excelGeneratorClass, excelGeneratorStudents, excelGeneratorStudentsCategory, excelGeneratorStudentsInstructor, excelGeneratorStudentsNoPractical, excelGeneratorStudentsPractical } from '../controllers/documents.controllers.js'
import { checkClassNumber } from '../middlewares/classes.middlewares.js'
import { checkInstructor, checkModality } from '../middlewares/documents.middlewares.js'

const documentRoutes: IRouter = Router()

/**
 * @route GET /create-excel-class
 * @description Genera un archivo de Excel relacionado con las clases.
 * @param numero_ficha Número de la clase.
 * @access Público
 */
documentRoutes.get('/v1/create-excel-class', checkClassNumber, excelGeneratorClass)

/**
 * @route GET /create-excel-students
 * @description Genera un archivo de Excel de todos los estudiantes.
 * @access Público
 */
documentRoutes.get('/v1/create-excel-students', excelGeneratorStudents)

/**
 * @route GET /create-excel-students-practical
 * @description Genera un archivo de Excel relacionado con los estudiantes en prácticas.
 * @access Público
 */
documentRoutes.get('/v1/create-excel-students-practical', excelGeneratorStudentsPractical)

/**
 * @route GET /create-excel-students-nopractical
 * @description Genera un archivo de Excel relacionado con los estudiantes sin prácticas.
 * @access Público
 */
documentRoutes.get('/v1/create-excel-students-nopractical', excelGeneratorStudentsNoPractical)

/**
 * @route GET /create-excel-students-category
 * @description Genera un archivo de Excel relacionado con los estudiantes por modalidad de practicas.
 * @param modality Nombre modalidad de practicas.
 * @access Público
 */
documentRoutes.get('/v1/create-excel-students-category', checkModality, excelGeneratorStudentsCategory)

/**
 * @route GET /create-excel-students-instructor
 * @description Genera un archivo de Excel relacionado con los estudiantes por instructor.
 * @param instructor Nombre completo del instructor.
 * @access Público
 */
documentRoutes.get('/v1/create-excel-students-instructor', checkInstructor, excelGeneratorStudentsInstructor)

export { documentRoutes }
