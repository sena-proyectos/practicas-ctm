import axios from 'axios';

/* LOGIN */
export const Login = async (data) => {
  const URL = 'http://localhost:3000/api/login'

  const response = await axios.post(URL, data)
  return response
}

/* OBTENER APRENDICES */
export const GetUsersHttp = async () => {
    const URL = 'http://localhost:3000/api/inscriptions';

  const response = await axios.get(URL)
  return response
}

/* INSCRIBIR APRENDICES */
export const InscriptionApprentice = async (data) => {
  const URL = 'http://localhost:3000/api/create-inscription'

  const response = await axios.post(URL, data)
  return response
}
