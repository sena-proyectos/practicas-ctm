import Cookies from 'js-cookie'
import { isExpired } from 'react-jwt'
import { Navigate, useLocation } from 'react-router-dom'
import { getPublicTokenFromSession } from './import/getPublicToken'

export const ProtectedRoute = ({ redirectTo, children }) => {
  const location = useLocation()
  const idRol = localStorage.getItem('idRol')
  const token = Cookies.get('token')
  const publicToken = sessionStorage.getItem('public-token')
  const isExpiredToken = token && isExpired(token)
  const isExpiredPublicToken = publicToken && isExpired(publicToken)
  const auth = !idRol && !token && isExpiredToken && isExpiredPublicToken
  if (auth) {
    return <Navigate to={redirectTo} state={{ from: location }} />
  }

  return children
}

export const IsLogged = ({ redirectTo, children }) => {
  const location = useLocation()
  const idRol = localStorage.getItem('idRol')
  const token = Cookies.get('token')

  const publicToken = getPublicTokenFromSession()

  const isExpiredToken = token ? isExpired(token) : true
  const isExpiredPublicToken = publicToken ? isExpired(publicToken) : true

  const auth = !!(idRol && token && !isExpiredToken && !isExpiredPublicToken)
  if (auth) {
    return <Navigate to={redirectTo} state={{ from: location }} />
  }

  return children
}

export const IsAdminOrCoordinator = ({ redirectTo, children }) => {
  const location = useLocation()
  const idRol = localStorage.getItem('idRol')
  const auth = idRol === '1' || idRol === '2'
  if (!auth) {
    return <Navigate to={redirectTo} state={{ from: location }} />
  }

  return children
}

export const IsAdmin = ({ redirectTo, children }) => {
  const location = useLocation()
  const idRol = localStorage.getItem('idRol')
  const auth = idRol === '1'
  if (!auth) {
    return <Navigate to={redirectTo} state={{ from: location }} />
  }

  return children
}
