import { type IRouter, Router } from 'express'
import { checkIdReq } from '../middlewares/idCheck.middlewares.js'
import { checkName } from '../middlewares/users.middlewares.js'
import { createContractStudentsExcel, createStudents, editStudentState, getDetailInfoStudent, getDetailInfoStudents, getStudentByName, getStudentState, getStudents, getStudentsById, getStudentsByTeacherId } from '../controllers/students.controllers.js'
import { checkRegisterStudentData, classifyExcel, readExcelFileStudents } from '../middlewares/students.middlewares.js'
import { configureMulterExcel } from '../middlewares/inscriptions.middlewares.js'

const studentRoutes: IRouter = Router()

/**
 * Configurar el middleware para leer excels
 * @returns {RequestHandler}
 */
const multerFile = configureMulterExcel()

/**
 * Obtener todos los aprendices
 * @route GET /v1/students
 * @param {string} req.query.page
 * @param {string} req.query.limit
 * @returns {Promise<Array.<Students>>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
studentRoutes.get('/v1/students', getStudents)

/**
 * Obtener un aprendiz por su nombre completo
 * @route GET /v1/studentName
 * @param {string} request.query.nombreCompleto
 * @returns {Promise<Array>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
studentRoutes.get('/v1/studentName', checkName, getStudentByName)

/**
 * Obtener un aprendiz por su ID
 * @route GET /v1/student/:id
 * @param {string} request.param.id
 * @returns {Promise<Array>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
studentRoutes.get('/v1/student/:id', checkIdReq, getStudentsById)

/**
 * Obtener una información más detallada de los aprendices
 * @route GET /v1/detailInfoStudents
 * @returns {Promise<Array.<Students>>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
studentRoutes.get('/v1/detailInfoStudents', getDetailInfoStudents)

/**
 * Obtener aprendices por el ID del instructor de seguimiento
 * @route GET /v1/detailInfoStudents/teacher/:id
 * @param {string} request.param.id
 * @returns {Promise<Array>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
studentRoutes.get('/v1/detailInfoStudents/teacher/:id', checkIdReq, getStudentsByTeacherId)

/**
 * Obtener una información más detallada de un aprendiz
 * @route GET /v1/detailInfoStudents/:id
 * @returns {Promise<Array>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
studentRoutes.get('/v1/detailInfoStudent/:id', checkIdReq, getDetailInfoStudent)

/**
 * Obtener el estado del aprendiz por su ID
 * @route GET '/v1/studentState/:id
 * @param {string} request.param.id
 * @returns {Promise<Array>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
studentRoutes.get('/v1/studentState/:id', checkIdReq, getStudentState)

/**
 * Crea un array de estudiantes
 * @route POST /v1/create-students
 * @param {infoStudents[]} req.body.students
 * @returns {Promise<string>} 200 - OK
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
studentRoutes.post('/v1/create-students', checkRegisterStudentData, createStudents)

/**
 * Lee y guarda los aprendices dentro de un excel
 * ! Estos aprendices solo son de contrato de aprendizaje
 * @route POST /v1/read-excel-file/students
 * @param {Buffer} request.file
 * @returns {Promise<string>} 200 - OK
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
studentRoutes.post('/v1/read-excel-file/students', multerFile, readExcelFileStudents, classifyExcel, createContractStudentsExcel)

/**
 * Modifica el estado de un aprendiz mediante su ID
 * @route  PATCH /v1/update-student-state/:id
 * @param {string} request.param.id
 * @returns {Promise<string>} 200 - OK
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
studentRoutes.patch('/v1/update-student-state/:id', checkIdReq, editStudentState)

export { studentRoutes }
