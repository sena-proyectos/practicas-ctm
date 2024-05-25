import './App.css'
import { Route, Routes } from 'react-router-dom'
import { IsAdmin, IsAdminOrCoordinator, IsLogged, ProtectedRoute } from './ProtectedRoute'
import { User } from './components/User/User'
import { Home } from './components/Home/Home'
import { StudentMonitoring } from './components/Student-monitoring/StudentMonitoring'
import { Settings } from './components/Settings/Settings'
import { Teachers } from './components/Teachers/Teachers'
import { AssignClass } from './components/Assign-class/AssignClass'
import { RegisterList } from './components/Register-list/RegisterList'
import { RegisterStudent } from './components/Register-student/RegisterStudent'
import { RegisterDetails } from './components/Register-detail/RegisterDetails'
import { Courses } from './components/Courses/Courses'
import { Students } from './components/Students/Students'
import { TeacherClass } from './components/Teacher-class/TeacherClass'
import { InfoStudent } from './components/Info-student/InfoStudent'
import { RegisterUser } from './components/Register-user/RegisterUser'
import { getPublicToken, getNotification } from './api/httpRequest'
import { useEffect, useState } from 'react'
import { getPublicTokenFromSession } from './import/getPublicToken'

const App = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const publicToken = getPublicTokenFromSession()
    if (!publicToken) {
      getAndSavePublicToken()
    } else {
      setLoading(false)
    }
  }, [])

  const getAndSavePublicToken = async () => {
    const response = await getPublicToken()
    sessionStorage.setItem('public-token', response)
    setLoading(false)
  }
  useEffect(() => {
    const showNotifications = async () => {
      try {
        // Obtener el rol del usuario del localStorage
        const userRole = localStorage.getItem('idRol')

        // Verificar si el rol del usuario es 1 o 2
        if (userRole === '1' || userRole === '2') {
          // Si el rol es 1 o 2, obtener las notificaciones
          const notifications = await getNotification()
          console.log('Notificaciones:', notifications)
        } else {
          // Si el rol no es 1 ni 2, mostrar un mensaje indicando que el usuario no tiene permiso para ver las notificaciones
          console.log('El usuario no tiene permiso para ver las notificaciones.')
        }
      } catch (error) {
        // Manejar cualquier error que pueda ocurrir al obtener las notificaciones
        console.error('Error al obtener las notificaciones:', error)
      }
    }

    showNotifications()
  }, [])

  if (loading) {
    return <div>Terminando de configurar algunos ajustes...</div>
  }

  return (
    <Routes>
      <Route
        path='/'
        element={
          <IsLogged redirectTo={'/home'}>
            <User />
          </IsLogged>
        }
      />
      <Route
        path='/home'
        element={
          <ProtectedRoute redirectTo='/'>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path='/config'
        element={
          <ProtectedRoute redirectTo='/home'>
            <Settings />
          </ProtectedRoute>
        }
      />

      <Route
        path='/seguimiento-aprendices'
        element={
          <ProtectedRoute redirectTo='/home'>
            <StudentMonitoring />
          </ProtectedRoute>
        }
      />

      <Route
        path='/info-aprendiz/:id'
        element={
          <ProtectedRoute redirectTo='/home'>
            <InfoStudent />
          </ProtectedRoute>
        }
      />

      <Route
        path='/registros'
        element={
          <ProtectedRoute redirectTo='/home'>
            <RegisterList />
          </ProtectedRoute>
        }
      />

      <Route
        path='/registrar-aprendiz'
        element={
          <ProtectedRoute redirectTo='/home'>
            <RegisterStudent />
          </ProtectedRoute>
        }
      />

      <Route
        path='/registro-detalles/:id'
        element={
          <ProtectedRoute redirectTo='/home'>
            <RegisterDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path='/asignar-ficha'
        element={
          <ProtectedRoute redirectTo='/home'>
            <AssignClass />
          </ProtectedRoute>
        }
      />

      <Route
        path='/fichas'
        element={
          <ProtectedRoute redirectTo='/home'>
            <Courses />
          </ProtectedRoute>
        }
      />

      <Route
        path='/fichas/aprendices/:id'
        element={
          <ProtectedRoute redirectTo='/home'>
            <Students />
          </ProtectedRoute>
        }
      />

      <Route
        path='/fichas-instructor/:id'
        element={
          <ProtectedRoute redirectTo='/home'>
            <TeacherClass />
          </ProtectedRoute>
        }
      />

      <Route
        path='/instructores'
        element={
          <ProtectedRoute redirectTo='/home'>
            <IsAdminOrCoordinator redirectTo={'/home'}>
              <Teachers />
            </IsAdminOrCoordinator>
          </ProtectedRoute>
        }
      />

      <Route
        path='/registrar-usuario'
        element={
          <ProtectedRoute redirectTo='/home'>
            <IsAdmin redirectTo={'/home'}>
              <RegisterUser />
            </IsAdmin>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
