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

/* INSCRIBIR APRENDICES */
export const InscriptionApprentice = async (data) => {
  const URL = `${baseUrl}${api}/create-inscription`

  const response = await axios.post(URL, data)
  return response
}

/* BUSCAR APRENDICES POR NOMBRE */
export const GetUserByName = async (data) => {
  const URL = `${baseUrl}${api}/studentName`
  const response = await axios.post(URL, { nombreCompleto: data })

  return response
}

/* BUSCAR INSTRUCTOR POR NOMBRE */
export const GetTeacherByName = async (data) => {
  const URL = `${baseUrl}${api}/teacherName`
  const response = await axios.post(URL, data)

  return response
}
