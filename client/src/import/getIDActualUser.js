import cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const getUserID = () => {
  const cookie = cookies.get('token')
  if (cookie) {
    const decoded = jwtDecode(cookie)
    return decoded.data 
  }
}