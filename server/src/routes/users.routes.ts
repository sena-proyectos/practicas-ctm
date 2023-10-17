import { type IRouter, Router } from 'express'
import { createUser, editUser, getCoordinatorById, getCoordinators, getTeacherByName, getTeachers, getTeachersById, getUserById, getUsers, login } from '../controllers/users.controllers.js'
import { checkIdReq } from '../middlewares/idCheck.middlewares.js'
import { checkEditData, checkExistingUser, checkLoginData, checkName, checkRegisterData, generateToken } from '../middlewares/users.middlewares.js'

const userRoutes: IRouter = Router()

// * GET
userRoutes.get('/users', getUsers)
userRoutes.get('/user/:id', checkIdReq, getUserById)
userRoutes.get('/teacherName', checkName, getTeacherByName)
userRoutes.get('/teachers', getTeachers)
userRoutes.get('/teacher/:id', checkIdReq, getTeachersById)
userRoutes.get('/coordinators', getCoordinators)
userRoutes.get('/coordinator/:id', checkIdReq, getCoordinatorById)

// * POST
userRoutes.post('/register', checkRegisterData, checkExistingUser, createUser)
userRoutes.post('/login', checkLoginData, login, generateToken)

// * PATCH
userRoutes.patch('/edit-user/:id', checkIdReq, checkEditData, editUser)

export { userRoutes }
