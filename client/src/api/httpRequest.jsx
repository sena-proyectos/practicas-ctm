import axios from 'axios'
import { getPublicTokenFromSession } from '../import/getPublicToken'

const baseUrl = 'http://localhost:3000'
const api = '/api'
const publicToken = getPublicTokenFromSession()

export const getPublicToken = async () => {
  const URL = `${baseUrl}${api}/v1/public/token/generate`
  const { data } = await axios.get(URL, { headers: { Authorization: publicToken } })
  return data
}

/* LOGIN */
export const Login = async (data) => {
  const URL = `${baseUrl}${api}/v1/login`

  const response = await axios.post(URL, data, { headers: { Authorization: publicToken } })
  return response
}

/* OBTENER APRENDICES */
export const GetUsersHttp = async () => {
  const URL = `${baseUrl}${api}/v1/students`

  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

export const GetStudentsDetailById = async (userID) => {
  const URL = `${baseUrl}${api}/v1/detailInfoStudent/${userID}`

  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

/* INSCRIBIR APRENDICES */
export const InscriptionApprentice = async (data) => {
  const URL = `${baseUrl}${api}/v1/create-inscriptions`

  const response = await axios.post(URL, data, { headers: { Authorization: publicToken } })
  return response
}

/* BUSCAR APRENDICES POR NOMBRE */
export const GetUserByName = async (searchQuery) => {
  const URL = `${baseUrl}${api}/v1/studentName?nombreCompleto=${searchQuery}`
  const response = await axios.get(URL, { headers: { Authorization: publicToken } })

  return response
}
/* BUSCAR APRENDICES DE UNA FICHA */
export const GetStudentsByCourse = async (data) => {
  const URL = `${baseUrl}${api}/v1/classStudents?numero_ficha=${data}`
  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

/* BUSCAR INSTRUCTOR POR NOMBRE */
export const GetTeacherByName = async (data) => {
  const URL = `${baseUrl}${api}/v1/teacherName?nombreCompleto=${data}`
  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

// OBTENER FICHA POR NUMERO DE FICHA
export const GetClassByNumber = async (data) => {
  const URL = `${baseUrl}${api}/v1/classNumber?numero_ficha=${data}`
  const response = await axios.get(URL, { headers: { Authorization: publicToken } })

  return response
}

export const sendEmailFunctions = async (data) => {
  const URL = `${baseUrl}${api}/v1/sendEmail/functions`
  const response = await axios.post(URL, data, { headers: { Authorization: publicToken } })

  return response
}

export const detailInfoStudents = async () => {
  const URL = `${baseUrl}${api}/v1/detailInfoStudents`

  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

// OBTENER REGISTROS
export const getInscriptions = async () => {
  const URL = `${baseUrl}${api}/v1/inscriptions`

  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

// OBTENER REGISTRO POR ID
export const getInscriptionById = async (id) => {
  const URL = `${baseUrl}${api}/v1/inscription/${id}`

  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

// OBTENER DETALLES INSCRIPCION BY ID
export const getInscriptionDetails = async (id, limit = 4, offset = 0) => {
  const URL = `${baseUrl}${api}/v1/inscriptionDetails/${id}?limit=${limit}&offset=${offset}`

  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

// OBTENER DETALLES INSCRIPCION POR USUARIO
export const inscriptionDetailUser = async (id, limit = 3, offset = 0) => {
  const URL = `${baseUrl}${api}/v1/inscriptionDetailsUser/${id}?limit=${limit}&offset=${offset}`

  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

// MODIFICAR DETALLES DE LA INSCRIPCION
export const inscriptionDetailsUpdate = async (id, payload) => {
  const URL = `${baseUrl}${api}/v1/update-inscription-detail/${id}`

  const response = await axios.patch(URL, payload, { headers: { Authorization: publicToken } })
  return response
}

export const readExcel = async (fileData) => {
  const URL = `${baseUrl}${api}/v1/inscription-excel-file`
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
  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

// OBTENER FICHAS POR ID
export const getClassById = async (id) => {
  const URL = `${baseUrl}${api}/v1/class/${id}`

  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

// OBTENER INSTRUCTORES
export const getTeachers = async (limit = 50) => {
  const URL = `${baseUrl}${api}/v1/teachers?limit=${limit}`

  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

// OBTENER FICHAS POR ID INSTRUCTOR
export const getClassByTeacherId = async (id) => {
  const URL = `${baseUrl}${api}/v1/teacherClasses/${id}`

  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

// OBTENER FICHAS SIN INSTRUCTOR LIDER O SEGUIMIENTO
export const getClassFree = async () => {
  const URL = `${baseUrl}${api}/v1/classesFree`

  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

// OBTENER AVAL POR ID
export const getAvalById = async (id) => {
  const URL = `${baseUrl}${api}/v1/inscriptionDetail/${id}`

  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

// OBTENER USERS BY ID
export const getUserById = async (id) => {
  const URL = `${baseUrl}${api}/v1/user/${id}`

  try {
    const response = await axios.get(URL, { headers: { Authorization: publicToken } })
    return response
  } catch (error) {
    return error
  }
}

export const sendEmail = async (payload) => {
  const URL = `${baseUrl}${api}/v1/sendEmail`
  const response = await axios.post(URL, payload, { headers: { Authorization: publicToken } })
  return response
}

// MODIFICAR INSTRUCTOR SEGUIMIENTO DE UNA FICHA
export const updateTeacherSeguimiento = async (numero_ficha, payload) => {
  const URL = `${baseUrl}${api}/v1/teacherClass?numero_ficha=${numero_ficha}`

  const response = await axios.patch(URL, { id_instructor_seguimiento: payload }, { headers: { Authorization: publicToken } })
  return response
}

// MODIFICAR INSTRUCTOR LIDER DE UNA FICHA
export const updateTeacherLider = async (numero_ficha, payload) => {
  const URL = `${baseUrl}${api}/v1/teacherLiderClass?numero_ficha=${numero_ficha}`

  const response = await axios.patch(URL, { id_instructor_lider: payload }, { headers: { Authorization: publicToken } })
  return response
}

// OBTENER FICHAS POR ID INSTRUCTOR
export const getClassByLiderTeacherId = async (id) => {
  const URL = `${baseUrl}${api}/v1/teacherLiderClasses/${id}`

  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

// OBTENER MODALIDADES BY ID

export const getModalitiesById = async (id) => {
  const URL = `${baseUrl}${api}/v1/practical-stages/${id}`
  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

// Obtener inscripcion por nombre
export const GetInscriptionByName = async (data) => {
  const URL = `${baseUrl}${api}/v1/inscriptionName?nombreCompleto=${data}`
  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

export const createCourse = async (data) => {
  const URL = `${baseUrl}${api}/v1/class`
  return await axios.post(URL, data, { headers: { Authorization: publicToken } })
}
export const createStudent = async (data) => {
  const URL = `${baseUrl}${api}/v1/create-students`
  return await axios.post(URL, data, { headers: { Authorization: publicToken } })
}

export const registerUser = async (payload) => {
  const URL = `${baseUrl}${api}/v1/register`
  return await axios.post(URL, payload, { headers: { Authorization: publicToken } })
}

export const getInfoTeacherByID = async (id) => {
  const URL = `${baseUrl}${api}/v1/teacher/${id}`
  return await axios.get(URL, { headers: { Authorization: publicToken } })
}

/* Edit User */
export const EditUser = async (id, payload) => {
  const URL = `${baseUrl}${api}/v1/edit-user/${id}`

  const response = await axios.patch(URL, payload, { headers: { Authorization: publicToken } })
  return response
}

export const getCoordinators = async () => {
  const URL = `${baseUrl}${api}/v1/coordinators`
  return await axios.get(URL, { headers: { Authorization: publicToken } })
}

export const getCoordinatorNameByID = async (id) => {
  const URL = `${baseUrl}${api}/v1/coordinator/${id}`
  return await axios.get(URL, { headers: { Authorization: publicToken } })
}

export const getLettersByStudentID = async (id) => {
  const URL = `${baseUrl}${api}/v1/getLetterByStudent/${id}`
  return await axios.get(URL, { headers: { Authorization: publicToken } })
}

export const patchLetterByID = async (id, payload) => {
  const URL = `${baseUrl}${api}/v1/modifyLetter/${id}`
  return await axios.patch(URL, payload, { headers: { Authorization: publicToken } })
}

export const getBitacorasByStudentId = async (id) => {
  const URL = `${baseUrl}${api}/v1/getBitacorasByStudent/${id}`
  return await axios.get(URL, { headers: { Authorization: publicToken } })
}

export const patchBitacoraById = async (id, payload) => {
  const URL = `${baseUrl}${api}/v1/modifyBitacora/${id}`
  return await axios.patch(URL, payload, { headers: { Authorization: publicToken } })
}

export const patchVisitById = async (id, payload) => {
  const URL = `${baseUrl}${api}/v1/modifyVisit/${id}`
  return await axios.patch(URL, payload, { headers: { Authorization: publicToken } })
}

export const getVisitsByStudent = async (id) => {
  const URL = `${baseUrl}${api}/v1/getVisitsByStudent/${id}`
  return await axios.get(URL, { headers: { Authorization: publicToken } })
}

export const getVisitDataById = async (id) => {
  const URL = `${baseUrl}${api}/v1/getVisitData/${id}`
  return await axios.get(URL, { headers: { Authorization: publicToken } })
}

export const sendExcelContrato = async (payload) => {
  const URL = `${baseUrl}${api}/v1/read-excel-file/students`
  return await axios.post(URL, payload, { headers: { Authorization: publicToken } })
}

export const sendExcelCourse = async (payload) => {
  const URL = `${baseUrl}${api}/v1/read-excel-file/classes`
  return await axios.post(URL, payload, { headers: { Authorization: publicToken } })
}

export const generateExcelClass = async (classNumber) => {
  const URL = `${baseUrl}${api}/v1/create-excel-class`
  return await axios.get(URL, {
    params: {
      numero_ficha: classNumber
    },
    headers: { Authorization: publicToken },
    responseType: 'arraybuffer'
  })
}

export const generateExcelStudents = async () => {
  const URL = `${baseUrl}${api}/v1/create-excel-students`
  return await axios.get(URL, {
    headers: { Authorization: publicToken },
    responseType: 'arraybuffer'
  })
}

export const createVisit = async (payload) => {
  const URL = `${baseUrl}${api}/v1/create-visit`
  return await axios.post(URL, payload, { headers: { Authorization: publicToken } })
}

/* OBTENER ESTADO DE APRENDICES */
export const getStudentState = async (id) => {
  const URL = `${baseUrl}${api}/v1/studentState/${id}`

  const response = await axios.get(URL, { headers: { Authorization: publicToken } })
  return response
}

/* EDITAR ESTADO DE APRENDICES */
export const editStudentState = async (id, payload) => {
  const URL = `${baseUrl}${api}/v1/update-student-state/${id}`

  const response = await axios.patch(URL, payload, { headers: { Authorization: publicToken } })
  return response
}

export const editDateClass = async (payload) => {
  const URL = `${baseUrl}${api}/v1/dateClass`
  const response = await axios.patch(URL, payload, { headers: { Authorization: publicToken } })

  return response
}

// OBTENER FICHAS SIN INSTRUCTOR POR NUMERO DE FICHA
export const GetClassFreeByNumber = async (data) => {
  const URL = `${baseUrl}${api}/v1/classFreeNumber?numero_ficha=${data}`
  const response = await axios.get(URL, { headers: { Authorization: publicToken } })

  return response
}

// Generar excel de todos los aprendices en prácticas
export const generateExcelStudentsPractical = async () => {
  const URL = `${baseUrl}${api}/v1/create-excel-students-practical`
  return await axios.get(URL, {
    headers: { Authorization: publicToken },
    responseType: 'arraybuffer'
  })
}

// Generar excel de todos los aprendices sin prácticas
export const generateExcelStudentsNoPractical = async () => {
  const URL = `${baseUrl}${api}/v1/create-excel-students-nopractical`
  return await axios.get(URL, {
    headers: { Authorization: publicToken },
    responseType: 'arraybuffer'
  })
}
// Generar excel por modalidad
export const generateExcelStudentsByModality = async (modality) => {
  const URL = `${baseUrl}${api}/v1/create-excel-students-category?modality=${modality}`
  return await axios.get(URL, {
    headers: { Authorization: publicToken },
    responseType: 'arraybuffer'
  })
}

// Generar excel de estudiantes por instructor
export const generateExcelStudentsByInstructor = async (teacherName) => {
  const URL = `${baseUrl}${api}/v1/create-excel-students-instructor?instructor=${teacherName}`
  return await axios.get(URL, {
    headers: { Authorization: publicToken },
    responseType: 'arraybuffer'
  })
}

export const getClassTeacherByClassNumber = async (id, data) => {
  const URL = `${baseUrl}${api}/v1/classTeacherNumber/${id}?numero_ficha=${data}`
  const response = await axios.get(URL, { headers: { Authorization: publicToken } })

  return response
}
