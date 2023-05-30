import { Router } from 'express'
import { createUser, getTeachers, getTeachersById, getUserById, getUsers, login } from '../controllers/users.controllers.js'

const userRoutes = Router()

// * GET
userRoutes.get('/users', getUsers)
userRoutes.get('/user/:id', getUserById)
userRoutes.get('/teachers', getTeachers)
userRoutes.get('/teacher/:id', getTeachersById)

// * POST
userRoutes.post('/register', createUser)
userRoutes.post('/login', login)

export { userRoutes }
