import { type IRouter, Router } from 'express'
import { checkIdReq } from '../middlewares/idCheck.middlewares.js'
import { getClasses, getClassById, getClassByClassNumber, createClass, editClass, getClassByPracticalInstructorId, editPracticalInstructorClass, getClassDetail } from '../controllers/classes.controllers.js'
import { checkClassData, checkClassNumber, checkPracticalTeacherId } from '../middlewares/classes.middlewares.js'

const classRoutes: IRouter = Router()

// * GET

/* `classRoutes.get('/classes', getClasses)` está definiendo una ruta GET para el punto final
'/classes'. Cuando se realiza una solicitud GET a este punto final, se ejecutará la función
`getClasses` del archivo 'classes.controllers.js'. */
classRoutes.get('/classes', getClasses)

classRoutes.get('/classesDetail', getClassDetail)

/* `classRoutes.get('/class/:id', checkIdReq, getClassById)` está definiendo una ruta GET para el punto
final '/class/:id'. Cuando se realiza una solicitud GET a este punto final, ejecutará la función de
middleware `checkIdReq` seguida de la función de controlador `getClassById`. El middleware
`checkIdReq` es responsable de verificar si el parámetro `id` en la solicitud es válido, y la
función del controlador `getClassById` es responsable de recuperar una clase por su `id`. */
classRoutes.get('/class/:id', checkIdReq, getClassById)

/* `classRoutes.get('/teacherClasses/:id', checkIdReq, getClassByTeacherId)` está definiendo una ruta
GET para el punto final '/teacherClasses/:id'. Cuando se realiza una solicitud GET a este punto
final, ejecutará la función de middleware `checkIdReq` seguida de la función del controlador
`getClassByTeacherId`. */
classRoutes.get('/teacherClasses/:id', checkIdReq, getClassByPracticalInstructorId)

/* `classRoutes.get('/classNumber', checkClassNumber, getClassByClassNumber)` está definiendo una ruta
GET para el punto final '/classNumber'. Cuando se realiza una solicitud GET a este punto final,
ejecutará el middleware `checkClassNumber` seguido de la función de controlador
`getClassByClassNumber`. */
classRoutes.get('/classNumber', checkClassNumber, getClassByClassNumber)

// * POST
/* `classRoutes.post('/class', checkClassData, createClass)` está definiendo una ruta para el método
POST en el punto final '/class'. Cuando se realiza una solicitud POST a este punto final, ejecutará
la función de middleware `checkClassData` seguida de la función del controlador `createClass`. */
classRoutes.post('/class', checkClassData, createClass)

// * PATCH
/* `classRoutes.patch('/class/:id', checkIdReq, checkClassData, editClass)` está definiendo una ruta
para el método PATCH en el punto final '/class/:id'. Cuando se realiza una solicitud PATCH a este
punto final, ejecutará la función de middleware `checkIdReq` seguida de la función de middleware
`checkClassData` y, finalmente, la función de controlador `editClass`. */
classRoutes.patch('/class/:id', checkIdReq, checkClassData, editClass)

/* `classRoutes.patch('/teacherClass/:id', checkClassNumber, checkPracticalTeacherId,
editPracticalInstructorClass)` define una ruta para el método PATCH en el extremo
'/teacherClass/:id'. Cuando se realiza una solicitud PATCH a este punto final, ejecutará la función
de middleware `checkClassNumber`, seguida de la función de middleware `checkPracticalTeacherId` y,
finalmente, la función de controlador `editPracticalInstructorClass`. */
classRoutes.patch('/teacherClass', checkClassNumber, checkPracticalTeacherId, editPracticalInstructorClass)

export { classRoutes }
