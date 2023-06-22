import { type IRouter, Router } from 'express'
import { createUser, editUser, getStudentByName, getTeachers, getTeachersById, getUserById, getUsers, login } from '../controllers/users.controllers.js'
import { checkIdReq } from '../middlewares/idCheck.middlewares.js'
import { checkEditData, checkExistingUser, checkLoginData, checkRegisterData, checkStudentName, generateToken } from '../middlewares/users.middlewares.js'

const userRoutes: IRouter = Router()

// * GET
userRoutes.get('/users', getUsers)
userRoutes.get('/user/:id', checkIdReq, getUserById)
userRoutes.get('/studentName', checkStudentName, getStudentByName)
userRoutes.get('/teachers', getTeachers)
userRoutes.get('/teacher/:id', checkIdReq, getTeachersById)

// * POST
userRoutes.post('/register', checkRegisterData, checkExistingUser, createUser)
userRoutes.post('/login', checkLoginData, login, generateToken)

// * PATCH
userRoutes.patch('/edit-user/:id', checkIdReq, checkEditData, editUser)

export { userRoutes }
