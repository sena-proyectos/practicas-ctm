import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ idRol, children, redirectTo = '/' }) => {
  const navigate = useNavigate()

  useEffect(() => {
    console.log(!idRol, idRol)
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
  useEffect(() => {
    if (!cookie && !idRol) {
      return navigate('/', { replace: true })
    }
    if (cookie && idRol) {
      return navigate(redirectTo, { replace: true })
    }
  }, [cookie, idRol, navigate])
  return children || <Outlet />
}

export { ProtectedRoute, CheckExistingUser }
