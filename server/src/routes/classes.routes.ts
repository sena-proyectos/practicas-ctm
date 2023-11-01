import { type IRouter, Router } from 'express'
import { checkIdReq } from '../middlewares/idCheck.middlewares.js'
import { getClasses, getClassById, getClassByClassNumber, createClass, getClassByPracticalInstructorId, editPracticalInstructorClass, getClassDetail, editClassDates, getStudentsClassByClassNumber, getClassesFree, getClassByInstructorId, editLiderInstructorClass, createClassWithStudents, getClassFreeByClassNumber, getClassTeacherByClassNumber } from '../controllers/classes.controllers.js'
import { checkClassData, checkClassDate, checkClassNumber, checkLiderTeacherId, checkPracticalTeacherId, formatExcelFileClasses, readExcelFileClasses } from '../middlewares/classes.middlewares.js'
import { configureMulterExcel } from '../middlewares/inscriptions.middlewares.js'

const classRoutes: IRouter = Router()
const multerFile = configureMulterExcel()

// * GET

/* `classRoutes.get('/classes', getClasses)` está definiendo una ruta GET para el punto final
'/classes'. Cuando se realiza una solicitud GET a este punto final, se ejecutará la función
`getClasses` del archivo 'classes.controllers.js'. */
classRoutes.get('/v1/classes', getClasses)

/* `classRoutes.get('/studentsClassByClassNumber/:classNumber', checkClassNumber, getStudentsClassByClassNumber)` */
classRoutes.get('/v1/classesFree', getClassesFree)

/* `classRoutes.get('/classesDetail', getClassDetail)` está definiendo una ruta GET para el punto final
'/classesDetail'. Cuando se realiza una solicitud GET a este punto final, ejecutará la función del
controlador `getClassDetail`. */
classRoutes.get('/v1/classesDetail', getClassDetail)

/* `classRoutes.get('/class/:id', checkIdReq, getClassById)` está definiendo una ruta GET para el punto
final '/class/:id'. Cuando se realiza una solicitud GET a este punto final, ejecutará la función de
middleware `checkIdReq` seguida de la función de controlador `getClassById`. El middleware
`checkIdReq` es responsable de verificar si el parámetro `id` en la solicitud es válido, y la
función del controlador `getClassById` es responsable de recuperar una clase por su `id`. */
classRoutes.get('/v1/class/:id', checkIdReq, getClassById)

/* `classRoutes.get('/teacherClasses/:id', checkIdReq, getClassByTeacherId)` está definiendo una ruta
GET para el punto final '/teacherClasses/:id'. Cuando se realiza una solicitud GET a este punto
final, ejecutará la función de middleware `checkIdReq` seguida de la función del controlador
`getClassByTeacherId`. */
classRoutes.get('/v1/teacherClasses/:id', checkIdReq, getClassByPracticalInstructorId)

classRoutes.get('/v1/teacherLiderClasses/:id', checkIdReq, getClassByInstructorId)

/* `classRoutes.get('/classNumber', checkClassNumber, getClassByClassNumber)` está definiendo una ruta
GET para el punto final '/classNumber'. Cuando se realiza una solicitud GET a este punto final,
ejecutará el middleware `checkClassNumber` seguido de la función de controlador
`getClassByClassNumber`. */
classRoutes.get('/v1/classNumber', getClassByClassNumber)
classRoutes.get('/v1/classFreeNumber', getClassFreeByClassNumber)
classRoutes.get('/v1/classTeacherNumber/:id', checkIdReq, getClassTeacherByClassNumber)

/* La línea `classRoutes.get('/classStudents', checkClassNumber, getStudentsClassByClassNumber)` define
una ruta GET para el punto final '/classStudents'. Cuando se realiza una solicitud GET a este punto
final, ejecutará la función de middleware `checkClassNumber` seguida de la función de controlador
`getStudentsClassByClassNumber`. */
classRoutes.get('/v1/classStudents', getStudentsClassByClassNumber)

// * POST
/* `classRoutes.post('/class', checkClassData, createClass)` está definiendo una ruta para el método
POST en el punto final '/class'. Cuando se realiza una solicitud POST a este punto final, ejecutará
la función de middleware `checkClassData` seguida de la función del controlador `createClass`. */
classRoutes.post('/v1/class', checkClassData, createClass)
classRoutes.post('/v1/read-excel-file/classes', multerFile, readExcelFileClasses, formatExcelFileClasses, createClassWithStudents)

// * PATCH
/* `classRoutes.patch('/class/:id', checkIdReq, checkClassData, editClass)` está definiendo una ruta
para el método PATCH en el punto final '/class/:id'. Cuando se realiza una solicitud PATCH a este
punto final, ejecutará la función de middleware `checkIdReq` seguida de la función de middleware
`checkClassData` y, finalmente, la función de controlador `editClass`. */
// ! Deprecated: classRoutes.patch('/class/:id', checkIdReq, checkClassData, editClass)

/* `classRoutes.patch('/teacherClass/:id', checkClassNumber, checkPracticalTeacherId,
editPracticalInstructorClass)` define una ruta para el método PATCH en el extremo
'/teacherClass/:id'. Cuando se realiza una solicitud PATCH a este punto final, ejecutará la función
de middleware `checkClassNumber`, seguida de la función de middleware `checkPracticalTeacherId` y,
finalmente, la función de controlador `editPracticalInstructorClass`. */
classRoutes.patch('/v1/teacherClass', checkClassNumber, checkPracticalTeacherId, editPracticalInstructorClass)

classRoutes.patch('/v1/teacherLiderClass', checkClassNumber, checkLiderTeacherId, editLiderInstructorClass)

/* La línea `classRoutes.patch('/dateClass', checkClassNumber, checkClassDate, editClassDates)` define
una ruta para el método PATCH en el punto final '/dateClass'. Cuando se realiza una solicitud PATCH
a este punto final, ejecutará la función de middleware `checkClassNumber`, seguida de la función de
middleware `checkClassDate` y, finalmente, la función de controlador `editClassDates`. */
classRoutes.patch('/v1/dateClass', checkClassDate, editClassDates)

export { classRoutes }
