import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ idRol, children, redirectTo = '/' }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!idRol) {
      return navigate(redirectTo)
    }
  }, [idRol])

  return children || <Outlet />
}

export { ProtectedRoute }
