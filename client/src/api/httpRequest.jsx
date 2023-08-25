import axios from 'axios'

const baseUrl = 'http://localhost:3000'
const api = '/api'

/* LOGIN */
export const Login = async (data) => {
  const URL = `${baseUrl}${api}/login`

  const response = await axios.post(URL, data)
  return response
}

/* OBTENER APRENDICES */
export const GetUsersHttp = async () => {
  const URL = `${baseUrl}${api}/students`

  const response = await axios.get(URL)
  return response
}

export const GetStudentsDetailById = async (userID) => {
  const URL = `${baseUrl}${api}/detailInfoStudent/${userID}`

  const response = await axios.get(URL)
  return response
}

/* INSCRIBIR APRENDICES */
export const InscriptionApprentice = async (data) => {
  const URL = `${baseUrl}${api}/create-inscriptions`

  const response = await axios.post(URL, data)
  return response
}

/* BUSCAR APRENDICES POR NOMBRE */
export const GetUserByName = async (searchQuery) => {
  const URL = `${baseUrl}${api}/studentName?nombreCompleto=${searchQuery}`
  const response = await axios.get(URL)

  return response
}
/* BUSCAR APRENDICES DE UNA FICHA */
export const GetStudentsByCourse = async (data) => {
  const URL = `${baseUrl}${api}/classStudents?numero_ficha=${data}`
  const response = await axios.get(URL)
  return response
}

/* BUSCAR INSTRUCTOR POR NOMBRE */
export const GetTeacherByName = async (data) => {
  const URL = `${baseUrl}${api}/teacherName?nombreCompleto=${data}`
  const response = await axios.get(URL)

  return response
}

// OBTENER FICHA POR NUMERO DE FICHA
export const GetClassByNumber = async (data) => {
  const URL = `${baseUrl}${api}/classNumber?numero_ficha=${data}`
  const response = await axios.get(URL)

  return response
}

export const detailInfoStudents = async () => {
  const URL = `${baseUrl}${api}/detailInfoStudents`

  const response = await axios.get(URL)
  return response
}

// OBTENER REGISTROS
export const getInscriptions = async () => {
  const URL = `${baseUrl}${api}/inscriptions`

  const response = await axios.get(URL)
  return response
}

// OBTENER REGISTRO POR ID
export const getInscriptionById = async (id) => {
  const URL = `${baseUrl}${api}/inscription/${id}`

  const response = await axios.get(URL)
  return response
}

// OBTENER DETALLES INSCRIPCION BY ID
export const getInscriptionDetails = async (id, limit = 3, offset = 0) => {
  const URL = `${baseUrl}${api}/inscriptionDetails/${id}?limit=${limit}&offset=${offset}`

  const response = await axios.get(URL)
  return response
}

// OBTENER DETALLES INSCRIPCION POR USUARIO
export const inscriptionDetailUser = async (id, limit = 3, offset = 0) => {
  const URL = `${baseUrl}${api}/inscriptionDetailsUser/${id}?limit=${limit}&offset=${offset}`

  const response = await axios.get(URL)
  return response
}

export const readExcel = async (fileData) => {
  const URL = `${baseUrl}${api}/inscription-excel-file`
  const response = await axios.post(URL, fileData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response
}

// OBTENER FICHAS
export const getClass = async () => {
  const URL = `${baseUrl}${api}/classes`

  const response = await axios.get(URL)
  return response
}

// OBTENER APRENDICES DE UNA FICHA
export const getClassById = async (id) => {
  const URL = `${baseUrl}${api}/class/${id}`

  const response = await axios.get(URL)
  return response
}

