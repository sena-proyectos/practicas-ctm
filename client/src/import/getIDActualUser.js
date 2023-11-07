import cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

/**
 * @function
 * @name getUserID
 *
 * @description
 * Esta función se utiliza para obtener los datos del usuario decodificados a partir de una cookie de token. Primero, obtiene la cookie de token utilizando la biblioteca 'cookies'. Luego, si se encuentra una cookie válida, decodifica su contenido utilizando 'jwtDecode' y devuelve los datos del usuario.
 *
 * @returns {object | undefined} - El ID del usuario o "undefined" si no se encuentra un token válido en las cookies.
 */
export const getUserID = () => {
  const cookie = cookies.get('token')
  if (cookie) {
    const decoded = jwtDecode(cookie)
    return decoded.data
  }
}
