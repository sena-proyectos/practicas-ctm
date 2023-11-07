import Cookies from 'js-cookie'
import { isExpired } from 'react-jwt'
import { Navigate, useLocation } from 'react-router-dom'

/**
 * @function ProtectedRoute
 *
 * @description
 * Este componente de React se utiliza para proteger rutas en una aplicación. Comprueba la autenticación del usuario y redirige si no está autenticado. Utiliza cookies y tokens para determinar la autenticación.
 *
 * @param {object} props - Propiedades del componente.
 * @param {string} props.redirectTo - Ruta a la que redirigir si no se cumple la autenticación.
 * @param {ReactNode} props.children - Elementos hijos a renderizar si la autenticación es exitosa.
 * @returns {ReactNode} - Los elementos hijos si la autenticación es exitosa, o una redirección si no se cumple la autenticación.
 *
 */
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

/**
 * @function IsLogged
 *
 * @description
 * Este componente de React se utiliza para verificar si un usuario está autenticado y redirigirlo en consecuencia. Comprueba la presencia de un ID de rol y tokens para determinar la autenticación.
 *
 * @param {object} props - Propiedades del componente.
 * @param {string} props.redirectTo - Ruta a la que redirigir si el usuario está autenticado.
 * @param {ReactNode} props.children - Elementos hijos a renderizar si el usuario no está autenticado.
 * @returns {ReactNode} - Los elementos hijos si el usuario no está autenticado, o una redirección si está autenticado.
 *
 */
export const IsLogged = ({ redirectTo, children }) => {
  const location = useLocation()
  const idRol = localStorage.getItem('idRol')
  const token = Cookies.get('token')

  const publicToken = sessionStorage.getItem('public-token')
  const isExpiredToken = token ? isExpired(token) : true
  const isExpiredPublicToken = publicToken ? isExpired(publicToken) : true

  const auth = !!(idRol && token && !isExpiredToken && !isExpiredPublicToken)
  if (auth) {
    return <Navigate to={redirectTo} state={{ from: location }} />
  }

  return children
}

/**
 * @function IsAdminOrCoordinator
 *
 * @description
 * Este componente de React se utiliza para verificar si un usuario tiene el rol de administrador o coordinador. Redirige al usuario si no tiene uno de estos roles.
 *
 * @param {object} props - Propiedades del componente.
 * @param {string} props.redirectTo - Ruta a la que redirigir si el usuario no tiene el rol de administrador o coordinador.
 * @param {ReactNode} props.children - Elementos hijos a renderizar si el usuario tiene el rol de administrador o coordinador.
 * @returns {ReactNode} - Los elementos hijos si el usuario tiene el rol de administrador o coordinador, o una redirección si no tiene el rol adecuado.
 *
 */
export const IsAdminOrCoordinator = ({ redirectTo, children }) => {
  const location = useLocation()
  const idRol = localStorage.getItem('idRol')
  const auth = idRol === '1' || idRol === '2'
  if (!auth) {
    return <Navigate to={redirectTo} state={{ from: location }} />
  }

  return children
}

/**
 * @function IsAdmin
 *
 * @description
 * Este componente de React se utiliza para verificar si un usuario tiene el rol de administrador. Redirige al usuario si no tiene este rol.
 *
 * @param {object} props - Propiedades del componente.
 * @param {string} props.redirectTo - Ruta a la que redirigir si el usuario no tiene el rol de administrador.
 * @param {ReactNode} props.children - Elementos hijos a renderizar si el usuario tiene el rol de administrador.
 * @returns {ReactNode} - Los elementos hijos si el usuario tiene el rol de administrador, o una redirección si no tiene el rol adecuado.
 *
 */
export const IsAdmin = ({ redirectTo, children }) => {
  const location = useLocation()
  const idRol = localStorage.getItem('idRol')
  const auth = idRol === '1'
  if (!auth) {
    return <Navigate to={redirectTo} state={{ from: location }} />
  }

  return children
}
