import axios from 'axios'
import { getPublicTokenFromSession } from '../import/getPublicToken'

const baseUrl = 'http://localhost:3000'
const api = '/api'

export const getPublicToken = async () => {
  const URL = `${baseUrl}${api}/v1/public/token/generate`
  const publicToken = getPublicTokenFromSession()
  const { data } = await axios.get(URL, { headers: { Authorization: publicToken } })
  return data
}

export const getStudentsByTeacherId = async (id) => {
  const URL = `${baseUrl}${api}/v1/detailInfoStudents/teacher/${id}`
  const publicToken = getPublicTokenFromSession()
  const { data } = await axios.get(URL, { headers: { Authorization: publicToken } })
  return data
}

/* LOGIN */
export const Login = async (data) => {
  const URL = `${baseUrl}${api}/v1/login`
  const publicToken = getPublicTokenFromSession()

  const response = await axios.post(URL, data, { headers: { Authorization: publicToken } })
  return response
}

/* OBTENER APRENDICES */
export const GetUsersHttp = async () => {
  const URL = `${baseUrl}${api}/v1/students`
  const publicToken = getPublicTokenFromSession()

  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

/* OBTENER DETALLES DE UN APRENDIZ POR ID */
export const GetStudentsDetailById = async (userID) => {
  const URL = `${baseUrl}${api}/v1/detailInfoStudent/${userID}`
  const publicToken = getPublicTokenFromSession()

  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

/* INSCRIBIR APRENDICES */
export const InscriptionApprentice = async (data) => {
  const URL = `${baseUrl}${api}/v1/create-inscriptions`
  const publicToken = getPublicTokenFromSession()

  const response = await axios.post(URL, data, { headers: { Authorization: publicToken } })
  return response
}

/* BUSCAR APRENDICES POR NOMBRE */
export const GetUserByName = async (searchQuery) => {
  const URL = `${baseUrl}${api}/v1/studentName?nombreCompleto=${searchQuery}`
  const publicToken = getPublicTokenFromSession()
  const response = await axios.get(URL, { headers: { Authorization: publicToken } })

  return response
}
/* BUSCAR APRENDICES DE UNA FICHA */
export const GetStudentsByCourse = async (data) => {
  const URL = `${baseUrl}${api}/v1/classStudents?numero_ficha=${data}`
  const publicToken = getPublicTokenFromSession()
  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

/* BUSCAR INSTRUCTOR POR NOMBRE */
export const GetTeacherByName = async (data) => {
  const URL = `${baseUrl}${api}/v1/teacherName?nombreCompleto=${data}`
  const publicToken = getPublicTokenFromSession()
  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

// OBTENER FICHA POR NUMERO DE FICHA
export const GetClassByNumber = async (data) => {
  const URL = `${baseUrl}${api}/v1/classNumber?numero_ficha=${data}`
  const publicToken = getPublicTokenFromSession()
  const response = await axios.get(URL, { headers: { Authorization: publicToken } })

  return response
}

/* ENVIAR EMAIL DE ASIGNACION DE FUNCIONES */
export const sendEmailFunctions = async (data) => {
  const URL = `${baseUrl}${api}/v1/sendEmail/functions`
  const publicToken = getPublicTokenFromSession()
  const response = await axios.post(URL, data, { headers: { Authorization: publicToken } })

  return response
}

/* OBTENER INFORMACION DETALLADA DE LOS APRENDICES */
export const detailInfoStudents = async () => {
  const URL = `${baseUrl}${api}/v1/detailInfoStudents`
  const publicToken = getPublicTokenFromSession()

  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

// OBTENER REGISTROS
export const getInscriptions = async () => {
  const URL = `${baseUrl}${api}/v1/inscriptions`
  const publicToken = getPublicTokenFromSession()

  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

/* OBTENER REGISTROS POR ID DEL INSTRUCTOR */
export const getInscriptionsByTeacherId = async (id) => {
  const URL = `${baseUrl}${api}/v1/inscriptions/teacher/${id}`
  const publicToken = getPublicTokenFromSession()

  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response.data
}

// OBTENER REGISTRO POR ID
export const getInscriptionById = async (id) => {
  const URL = `${baseUrl}${api}/v1/inscription/${id}`
  const publicToken = getPublicTokenFromSession()

  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

// OBTENER DETALLES INSCRIPCION BY ID
export const getInscriptionDetails = async (id, limit = 4, offset = 0) => {
  const URL = `${baseUrl}${api}/v1/inscriptionDetails/${id}?limit=${limit}&offset=${offset}`
  const publicToken = getPublicTokenFromSession()

  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

// OBTENER DETALLES INSCRIPCION POR USUARIO
export const inscriptionDetailUser = async (id, limit = 3, offset = 0) => {
  const URL = `${baseUrl}${api}/v1/inscriptionDetailsUser/${id}?limit=${limit}&offset=${offset}`
  const publicToken = getPublicTokenFromSession()

  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

// MODIFICAR DETALLES DE LA INSCRIPCION
export const inscriptionDetailsUpdate = async (id, payload) => {
  const URL = `${baseUrl}${api}/v1/update-inscription-detail/${id}`
  const publicToken = getPublicTokenFromSession()

  const response = await axios.patch(URL, payload, { headers: { Authorization: publicToken } })
  return response
}

/* LECTOR DE EXCEL DE LOS REGISTROS */
export const readExcel = async (fileData) => {
  const URL = `${baseUrl}${api}/v1/inscription-excel-file`
  const publicToken = getPublicTokenFromSession()
  const response = await axios.post(URL, fileData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: publicToken
    }
  })
  return response
}

// OBTENER FICHAS
export const getClass = async () => {
  const URL = `${baseUrl}${api}/v1/classes`
  const publicToken = getPublicTokenFromSession()
  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

// OBTENER FICHAS POR ID
export const getClassById = async (id) => {
  const URL = `${baseUrl}${api}/v1/class/${id}`
  const publicToken = getPublicTokenFromSession()

  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

// OBTENER INSTRUCTORES
export const getTeachers = async (limit = 50) => {
  const URL = `${baseUrl}${api}/v1/teachers?limit=${limit}`
  const publicToken = getPublicTokenFromSession()

  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

// OBTENER FICHAS POR ID INSTRUCTOR
export const getClassByTeacherId = async (id) => {
  const URL = `${baseUrl}${api}/v1/teacherClasses/${id}`
  const publicToken = getPublicTokenFromSession()

  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

// OBTENER FICHAS SIN INSTRUCTOR DE SEGUIMIENTO
export const getClassFree = async () => {
  const URL = `${baseUrl}${api}/v1/classesFree`
  const publicToken = getPublicTokenFromSession()

  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

// OBTENER AVAL POR ID
export const getAvalById = async (id) => {
  const URL = `${baseUrl}${api}/v1/inscriptionDetail/${id}`
  const publicToken = getPublicTokenFromSession()

  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

// OBTENER USERS BY ID
export const getUserById = async (id) => {
  const URL = `${baseUrl}${api}/v1/user/${id}`
  const publicToken = getPublicTokenFromSession()

  try {
    const response = await axios.get(URL, { headers: { Authorization: publicToken } })
    return response
  } catch (error) {
    return error
  }
}

// ENVIA CORREO
export const sendEmail = async (payload) => {
  const URL = `${baseUrl}${api}/v1/sendEmail`
  const publicToken = getPublicTokenFromSession()
  const response = await axios.post(URL, payload, { headers: { Authorization: publicToken } })
  return response
}

// MODIFICAR INSTRUCTOR SEGUIMIENTO DE UNA FICHA
export const updateTeacherSeguimiento = async (numero_ficha, payload) => {
  const URL = `${baseUrl}${api}/v1/teacherClass?numero_ficha=${numero_ficha}`
  const publicToken = getPublicTokenFromSession()

  const response = await axios.patch(URL, { id_instructor_seguimiento: payload }, { headers: { Authorization: publicToken } })
  return response
}

// MODIFICAR INSTRUCTOR LIDER DE UNA FICHA
export const updateTeacherLider = async (numero_ficha, payload) => {
  const URL = `${baseUrl}${api}/v1/teacherLiderClass?numero_ficha=${numero_ficha}`
  const publicToken = getPublicTokenFromSession()

  const response = await axios.patch(URL, { id_instructor_lider: payload }, { headers: { Authorization: publicToken } })
  return response
}

// OBTENER FICHAS POR ID INSTRUCTOR
export const getClassByLiderTeacherId = async (id) => {
  const URL = `${baseUrl}${api}/v1/teacherLiderClasses/${id}`
  const publicToken = getPublicTokenFromSession()

  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

// OBTENER MODALIDADES BY ID
export const getModalitiesById = async (id) => {
  const URL = `${baseUrl}${api}/v1/practical-stages/${id}`
  const publicToken = getPublicTokenFromSession()
  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

// OBTENER REGISTROS POR NOMBRE
export const GetInscriptionByName = async (data) => {
  const URL = `${baseUrl}${api}/v1/inscriptionName?nombreCompleto=${data}`
  const publicToken = getPublicTokenFromSession()
  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

// CREAR UN CURSO
export const createCourse = async (data) => {
  const URL = `${baseUrl}${api}/v1/class`
  const publicToken = getPublicTokenFromSession()
  return await axios.post(URL, data, { headers: { Authorization: publicToken } })
}

// CREAR UN APRENDIZ
export const createStudent = async (data) => {
  const URL = `${baseUrl}${api}/v1/create-students`
  const publicToken = getPublicTokenFromSession()
  return await axios.post(URL, data, { headers: { Authorization: publicToken } })
}

// REGISTRAR UN USUARIO
export const registerUser = async (payload) => {
  const URL = `${baseUrl}${api}/v1/register`
  const publicToken = getPublicTokenFromSession()
  return await axios.post(URL, payload, { headers: { Authorization: publicToken } })
}

// OBTENER INSTRUCTOR POR SU ID
export const getInfoTeacherByID = async (id) => {
  const URL = `${baseUrl}${api}/v1/teacher/${id}`
  const publicToken = getPublicTokenFromSession()
  return await axios.get(URL, { headers: { Authorization: publicToken } })
}

/* EDITAR USUARIO */
export const EditUser = async (id, payload) => {
  const URL = `${baseUrl}${api}/v1/edit-user/${id}`
  const publicToken = getPublicTokenFromSession()

  const response = await axios.patch(URL, payload, { headers: { Authorization: publicToken } })
  return response
}

// OBTENER LOS COORDINADORES
export const getCoordinators = async () => {
  const URL = `${baseUrl}${api}/v1/coordinators`
  const publicToken = getPublicTokenFromSession()
  return await axios.get(URL, { headers: { Authorization: publicToken } })
}

// OBTENER EL NOMBRE DEL COORDINADOR POR SU ID
export const getCoordinatorNameByID = async (id) => {
  const URL = `${baseUrl}${api}/v1/coordinator/${id}`
  const publicToken = getPublicTokenFromSession()
  return await axios.get(URL, { headers: { Authorization: publicToken } })
}

// OBTENER CARTAS POR EL ID DE UN APRENDIZ
export const getLettersByStudentID = async (id) => {
  const URL = `${baseUrl}${api}/v1/getLetterByStudent/${id}`
  const publicToken = getPublicTokenFromSession()
  return await axios.get(URL, { headers: { Authorization: publicToken } })
}

// EDITAR CARTAS POR SU ID
export const patchLetterByID = async (id, payload) => {
  const URL = `${baseUrl}${api}/v1/modifyLetter/${id}`
  const publicToken = getPublicTokenFromSession()
  return await axios.patch(URL, payload, { headers: { Authorization: publicToken } })
}

// OBTENER BITACORAS POR EL ID DE UN APRENDIZ
export const getBitacorasByStudentId = async (id) => {
  const URL = `${baseUrl}${api}/v1/getBitacorasByStudent/${id}`
  const publicToken = getPublicTokenFromSession()
  return await axios.get(URL, { headers: { Authorization: publicToken } })
}

// EDITAR BITACORAS POR SU ID
export const patchBitacoraById = async (id, payload) => {
  const URL = `${baseUrl}${api}/v1/modifyBitacora/${id}`
  const publicToken = getPublicTokenFromSession()
  return await axios.patch(URL, payload, { headers: { Authorization: publicToken } })
}

// EDITAR VISITAS POR SU ID
export const patchVisitById = async (id, payload) => {
  const URL = `${baseUrl}${api}/v1/modifyVisit/${id}`
  const publicToken = getPublicTokenFromSession()
  return await axios.patch(URL, payload, { headers: { Authorization: publicToken } })
}

// OBTENER VISITAS POR EL ID DE UN APRENDIZ
export const getVisitsByStudent = async (id) => {
  const URL = `${baseUrl}${api}/v1/getVisitsByStudent/${id}`
  const publicToken = getPublicTokenFromSession()
  return await axios.get(URL, { headers: { Authorization: publicToken } })
}

// OBTENER DATOS DE UNA VISITA POR SU ID
export const getVisitDataById = async (id) => {
  const URL = `${baseUrl}${api}/v1/getVisitData/${id}`
  const publicToken = getPublicTokenFromSession()
  return await axios.get(URL, { headers: { Authorization: publicToken } })
}

// LECTOR DE EXCEL DE CONTRATOS DE APRENDIZAJE
export const sendExcelContrato = async (payload) => {
  const URL = `${baseUrl}${api}/v1/read-excel-file/students`
  const publicToken = getPublicTokenFromSession()
  return await axios.post(URL, payload, { headers: { Authorization: publicToken } })
}

// lECTOR DE EXCEL DE CURSOS
export const sendExcelCourse = async (payload) => {
  const URL = `${baseUrl}${api}/v1/read-excel-file/classes`
  const publicToken = getPublicTokenFromSession()
  return await axios.post(URL, payload, { headers: { Authorization: publicToken } })
}

// GENERA EXCEL POR NUMERO DE FICHA
export const generateExcelClass = async (classNumber) => {
  const URL = `${baseUrl}${api}/v1/create-excel-class`
  const publicToken = getPublicTokenFromSession()
  return await axios.get(URL, {
    params: {
      numero_ficha: classNumber
    },
    headers: { Authorization: publicToken },
    responseType: 'arraybuffer'
  })
}

// GENERA EXCEL DE LOS APRENDICES
export const generateExcelStudents = async () => {
  const URL = `${baseUrl}${api}/v1/create-excel-students`
  const publicToken = getPublicTokenFromSession()
  return await axios.get(URL, {
    headers: { Authorization: publicToken },
    responseType: 'arraybuffer'
  })
}

// CREAR VISITA
export const createVisit = async (payload) => {
  const URL = `${baseUrl}${api}/v1/create-visit`
  const publicToken = getPublicTokenFromSession()
  return await axios.post(URL, payload, { headers: { Authorization: publicToken } })
}

/* OBTENER ESTADO DE APRENDICES */
export const getStudentState = async (id) => {
  const URL = `${baseUrl}${api}/v1/studentState/${id}`
  const publicToken = getPublicTokenFromSession()

  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

/* EDITAR ESTADO DE APRENDICES */
export const editStudentState = async (id, payload) => {
  const URL = `${baseUrl}${api}/v1/update-student-state/${id}`
  const publicToken = getPublicTokenFromSession()

  const response = await axios.patch(URL, payload, { headers: { Authorization: publicToken } })
  return response
}

// EDITAR CLASES
export const editDateClass = async (payload) => {
  const URL = `${baseUrl}${api}/v1/dateClass`
  const publicToken = getPublicTokenFromSession()
  const response = await axios.patch(URL, payload, { headers: { Authorization: publicToken } })

  return response
}

// OBTENER FICHAS SIN INSTRUCTOR POR NUMERO DE FICHA
export const GetClassFreeByNumber = async (data) => {
  const URL = `${baseUrl}${api}/v1/classFreeNumber?numero_ficha=${data}`
  const publicToken = getPublicTokenFromSession()
  const response = await axios.get(URL, { headers: { Authorization: publicToken } })

  return response
}

// Generar excel de todos los aprendices en prácticas
export const generateExcelStudentsPractical = async () => {
  const URL = `${baseUrl}${api}/v1/create-excel-students-practical`
  const publicToken = getPublicTokenFromSession()
  return await axios.get(URL, {
    headers: { Authorization: publicToken },
    responseType: 'arraybuffer'
  })
}

// Generar excel de todos los aprendices sin prácticas
export const generateExcelStudentsNoPractical = async () => {
  const URL = `${baseUrl}${api}/v1/create-excel-students-nopractical`
  const publicToken = getPublicTokenFromSession()
  return await axios.get(URL, {
    headers: { Authorization: publicToken },
    responseType: 'arraybuffer'
  })
}
// Generar excel por modalidad
export const generateExcelStudentsByModality = async (modality) => {
  const URL = `${baseUrl}${api}/v1/create-excel-students-category?modality=${modality}`
  const publicToken = getPublicTokenFromSession()
  return await axios.get(URL, {
    headers: { Authorization: publicToken },
    responseType: 'arraybuffer'
  })
}

// Generar excel de estudiantes por instructor
export const generateExcelStudentsByInstructor = async (teacherName) => {
  const URL = `${baseUrl}${api}/v1/create-excel-students-instructor?instructor=${teacherName}`
  const publicToken = getPublicTokenFromSession()
  return await axios.get(URL, {
    headers: { Authorization: publicToken },
    responseType: 'arraybuffer'
  })
}

// OBTENER CLASES DE UN INSTRUCTOR POR EL NUMERO DE FICHA
export const getClassTeacherByClassNumber = async (id, data) => {
  const URL = `${baseUrl}${api}/v1/classTeacherNumber/${id}?numero_ficha=${data}`
  const publicToken = getPublicTokenFromSession()
  const response = await axios.get(URL, { headers: { Authorization: publicToken } })

  return response
}
