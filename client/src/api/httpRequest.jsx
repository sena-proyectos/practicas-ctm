import axios from 'axios'

// Obtenemos todos los aprendices
export const GetUsersHttp = async () => {
  // pasamos la url que será la ruta de la api
  const URL = 'http://localhost:3000/api/inscriptions'

  // hacemos la petición get
  const response = await axios.get(URL)
  return response
}
