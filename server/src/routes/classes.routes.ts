import { type IRouter, Router } from 'express'
import { checkIdReq } from '../middlewares/idCheck.middlewares.js'
import { getClasses, getClassById, getClassByClassNumber, createClass, getClassByPracticalInstructorId, editPracticalInstructorClass, getClassDetail, editClassDates, getStudentsClassByClassNumber, getClassesFree, getClassByInstructorId, editLiderInstructorClass, createClassWithStudents, getClassFreeByClassNumber, getClassTeacherByClassNumber } from '../controllers/classes.controllers.js'
import { checkClassData, checkClassDate, checkClassNumber, checkLiderTeacherId, checkPracticalTeacherId, formatExcelFileClasses, readExcelFileClasses } from '../middlewares/classes.middlewares.js'
import { configureMulterExcel } from '../middlewares/inscriptions.middlewares.js'

const classRoutes: IRouter = Router()

/**
 * Configura el middleware para subir archivos excel
 * @function configureMulterExcel
 * @returns {RequestHandler}
 */
const multerFile = configureMulterExcel()

/**
 * Obtiene todas las clases
 * @route GET /v1/classes
 * @returns {Promise<Array.<classes>>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
classRoutes.get('/v1/classes', getClasses)

/**
 * Obtiene todas las clases sin instructor de seguimiento
 * @route GET /v1/classesFree
 * @returns {Promise<Array.<classes>>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
classRoutes.get('/v1/classesFree', getClassesFree)

/**
 * Obtiene todos los detalles de las fichas
 * @route GET /v1/classesDetail
 * @param {string} request.params.numero_ficha
 * @returns {Promise<Array.<classes>>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
classRoutes.get('/v1/classesDetail', getClassDetail)

/**
 * Obtiene una clase por su id
 * @route GET /v1/class/:id
 * @param {string} request.params.id
 * @returns {Promise<Array.<class>>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
classRoutes.get('/v1/class/:id', checkIdReq, getClassById)

/**
 * Obtiene todos las fichas relacionadas a un instructor de seguimiento
 * @route GET /v1/teacherClasses/:id
 * @param {string} request.params.id
 * @returns {Promise<Array.<classes>>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
classRoutes.get('/v1/teacherClasses/:id', checkIdReq, getClassByPracticalInstructorId)

/**
 * @deprecated Obtiene todas las fichas relacionadas a un instructor de lider
 * @route GET /v1/teacherLiderClasses/:id
 * @param {string} request.params.id
 * @returns {Promise<Array.<classes>>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
classRoutes.get('/v1/teacherLiderClasses/:id', checkIdReq, getClassByInstructorId)

/**
 * Obtiene una ficha por su numero de ficha
 * @route GET /v1/classNumber
 * @param {string} request.query.numero_ficha
 * @returns {Promise<Array.<class>>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
classRoutes.get('/v1/classNumber', getClassByClassNumber)

/**
 * Obtiene una ficha que no tenga instructor de seguimiento mediante su número de ficha.
 * @route GET /v1/classFreeNumber
 * @param {string} request.query.numero_ficha
 * @returns {Promise<Array.<class>>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
classRoutes.get('/v1/classFreeNumber', getClassFreeByClassNumber)

/**
 * Obtiene el instructor de seguimiento mediante en número de ficha relacionado
 * @route GET /v1/classTeacherNumber
 * @param {string} request.query.numero_ficha
 * @returns {Promise<Array>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
classRoutes.get('/v1/classTeacherNumber/:id', checkIdReq, getClassTeacherByClassNumber)

/**
 * Obtiene todos los estudiantes de una ficha
 * @param {string} request.query.numero_ficha
 * @returns {Promise<Array.<students>>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
classRoutes.get('/v1/classStudents', getStudentsClassByClassNumber)

/**
 * Crea una ficha
 * @route POST /v1/class
 * @param {string} request.body.numero_ficha
 * @param {string} request.body.nombre_programa_formacion
 * @param {string} request.body.fecha_inicio_lectiva
 * @param {string} request.body.fecha_inicio_practica
 * @param {string} request.body.id_instructor_seguimiento
 * @param {string} request.body.id_nivel_formacion
 * @returns {Promise<string>} 200 - OK
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
classRoutes.post('/v1/class', checkClassData, createClass)

/**
 * Crea un numero n de fichas mediante un archivo excel
 * @route POST /v1/read-excel-file/classes
 * @param {File} request.file
 * @returns {Promise<string>} 200 - Ok
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
classRoutes.post('/v1/read-excel-file/classes', multerFile, readExcelFileClasses, formatExcelFileClasses, createClassWithStudents)

/**
 * @deprecated Edita una ficha
 * @route PATCH /class/:id
 * @param {string} request.params.id
 * @returns {Promise<string>} 200 - OK
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
classRoutes.patch('/class/:id', checkIdReq, checkClassData)

/**
 * Modifica el instructor de seguimiento de una ficha
 * @route PATCH /v1/teacherClass
 * @param {string} request.query.numero_ficha
 * @param {string} request.body.id_instructor_seguimiento
 * @returns {Promise<string>} 200 - OK
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
classRoutes.patch('/v1/teacherClass', checkClassNumber, checkPracticalTeacherId, editPracticalInstructorClass)

/**
 * @deprecated Modifica el instructor de lider de una ficha
 * @route PATCH /v1/teacherLiderClass
 * @param {string} request.query.numero_ficha
 * @param {string} request.body.id_instructor_lider
 * @returns {Promise<string>} 200 - OK
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
classRoutes.patch('/v1/teacherLiderClass', checkClassNumber, checkLiderTeacherId, editLiderInstructorClass)

/**
 * Modifica la fecha de inicio de lectiva y práctica de una ficha
 * @route PATCH /v1/dateClass
 * @param {string} request.body.numero_ficha
 * @param {string} request.body.fecha_inicio_lectiva
 * @param {string} request.body.fecha_inicio_practica
 * @param {string} request.body.id_nivel_formacion
 * @returns {Promise<string>} 200 - OK
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
classRoutes.patch('/v1/dateClass', checkClassDate, editClassDates)

export { classRoutes }
