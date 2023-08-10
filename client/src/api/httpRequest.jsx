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
export const GetFichasHttp = async () => {
  const URL = `${baseUrl}${api}/classes`

  const response = await axios.get(URL)
  return response.data.data
}

export const GetStudentsDetailyId = async (userID) => {
  const URL = `${baseUrl}${api}/detailInfoStudent/${userID}`

  const response = await axios.get(URL)
  return response
}

/* INSCRIBIR APRENDICES */
export const InscriptionApprentice = async (data) => {
  const URL = `${baseUrl}${api}/create-inscription`
  const response = await axios.post(URL, data)
  return response
}

/* BUSCAR APRENDICES POR NOMBRE */
export const GetUserByName = async (searchQuery) => {
  const URL = `${baseUrl}${api}/studentName?nombreCompleto=${searchQuery}`
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

//OBTENER REGISTROS
export const getInscriptions = async () => {
  const URL = `${baseUrl}${api}/inscriptions`

  const response = await axios.get(URL)
  return response
}

//OBTENER REGISTRO POR ID
export const getInscriptionById = async (id) => {
  const URL = `${baseUrl}${api}/inscription/${id}`

  const response = await axios.get(URL)
  return response
}
