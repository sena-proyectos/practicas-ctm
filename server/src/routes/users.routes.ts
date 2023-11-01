import { type IRouter, Router } from 'express'
import { createUser, editUser, getCoordinatorById, getCoordinators, getTeacherByName, getTeachers, getTeachersById, getUserById, getUsers, login } from '../controllers/users.controllers.js'
import { checkIdReq } from '../middlewares/idCheck.middlewares.js'
import { checkEditData, checkExistingUser, checkLoginData, checkName, checkRegisterData, generateToken } from '../middlewares/users.middlewares.js'

const userRoutes: IRouter = Router()

// * GET
userRoutes.get('/v1/users', getUsers)
userRoutes.get('/v1/user/:id', checkIdReq, getUserById)
userRoutes.get('/v1/teacherName', checkName, getTeacherByName)
userRoutes.get('/v1/teachers', getTeachers)
userRoutes.get('/v1/teacher/:id', checkIdReq, getTeachersById)
userRoutes.get('/v1/coordinators', getCoordinators)
userRoutes.get('/v1/coordinator/:id', checkIdReq, getCoordinatorById)

// * POST
userRoutes.post('/v1/register', checkRegisterData, checkExistingUser, createUser)
userRoutes.post('/v1/login', checkLoginData, login, generateToken)

// * PATCH
userRoutes.patch('/v1/edit-user/:id', checkIdReq, checkEditData, editUser)

export { userRoutes }
