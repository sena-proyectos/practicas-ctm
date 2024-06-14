import { type IRouter, Router } from 'express'
import { createUser, editUser, getCoordinatorById, getCoordinators, getTeacherByName, getTeachers, getAllTeachers, getTeachersById, getUserById, getUsers, login } from '../controllers/users.controllers.js'
import { checkIdReq } from '../middlewares/idCheck.middlewares.js'
import { checkEditData, checkExistingUser, checkLoginData, checkName, checkRegisterData, generateToken } from '../middlewares/users.middlewares.js'

const userRoutes: IRouter = Router()

/**
 * Obtener todos los usuarios
 * @route GET /v1/users
 * @returns {Promise<Array.<Users>>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
userRoutes.get('/v1/users', getUsers)

/**
 * Obtener un usuario mediante su ID
 * @route GET /v1/user/:id
 * @param {any} getUsers
 * @returns {Promise<Array>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
userRoutes.get('/v1/user/:id', checkIdReq, getUserById)

/**
 * Obtener un instructor mediante su nombre completo
 * @route GET /v1/teacherName
 * @param {string} request.query.nombre_completo
 * @returns {Promise<Array>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
userRoutes.get('/v1/teacherName', checkName, getTeacherByName)

/**
 * Obtener todos los instructores
 * @route GET /v1/teachers
 * @returns {Promise<Array.<Users>>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
userRoutes.get('/v1/teachers', getTeachers)




/**
 * Obtener todos los instructores sin paginacion
 * @route GET /v1/teachers
 * @returns {Promise<Array.<Users>>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
userRoutes.get('/v1/allteachers', getAllTeachers)


/**
 * Obtener un instructor mediante su ID
 * @route GET /v1/teacher/:id
 * @param {string} request.param.id
 * @returns {Promise<Array>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
userRoutes.get('/v1/teacher/:id', checkIdReq, getTeachersById)

/**
 * Obtener todos los coordinadores
 * @route GET /v1/coordinators
 * @returns {Promise<Array.<Users>>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
userRoutes.get('/v1/coordinators', getCoordinators)

/**
 * Obtener un coordinador mediante su ID
 * @route GET /v1/coordinator/:id
 * @param {string} request.param.id
 * @returns {Promise<Array>}
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
userRoutes.get('/v1/coordinator/:id', checkIdReq, getCoordinatorById)

/**
 * Registrar un usuario
 * @route POST /v1/register
 * @param {userForm} request.body
 * @returns {Promise<string>} 200 - OK
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
userRoutes.post('/v1/register', checkRegisterData, checkExistingUser, createUser)

/**
 * Inicio de sesión con token
 * @route POST /v1/login
 * @param {LoginData} request.body
 * @returns {Promise<string>} 200 - Token
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
userRoutes.post('/v1/login', checkLoginData, login, generateToken)

/**
 * Editar un usuario mediante su ID
 * @route GET /v1/edit-user/:id
 * @param {string} request.param.id
 * @param {userForm} request.body
 * @returns {Promise<string>} 200 - OK
 * @returns {Error} HTTP Status - Error en el request
 * @async
 */
userRoutes.patch('/v1/edit-user/:id', checkIdReq, checkEditData, editUser)

export { userRoutes }
