import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ idRol, children, redirectTo = '/' }) => {
  const navigate = useNavigate()
  if (idRol !== false) {
    idRol = Number(localStorage.getItem('idRol'))
  }

  useEffect(() => {
    if (!idRol) {
      return navigate(redirectTo)
    }
  }, [idRol, navigate])

  return children || <Outlet />
}

const CheckExistingUser = ({ children, redirectTo = '/home' }) => {
  const navigate = useNavigate()
  const idRol = Number(localStorage.getItem('idRol'))
  const cookie = Cookies.get('token')
  const location = useLocation()
  let locationKeyHome
  if (location.pathname === '/home') {
    locationKeyHome = location.key
  }
  useEffect(() => {
    if ((cookie && idRol && location.pathname === '/' && location.key === locationKeyHome) === true) {
      return navigate(redirectTo, { replace: true })
    }
  }, [cookie, idRol, navigate])
  return children || <Outlet />
}

export { ProtectedRoute, CheckExistingUser }
