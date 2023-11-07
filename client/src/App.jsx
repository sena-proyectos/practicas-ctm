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
import { getPublicToken } from './api/httpRequest'
import { useEffect } from 'react'
import { getPublicTokenFromSession } from './import/getPublicToken'

const App = () => {
  useEffect(() => {
    const publicToken = getPublicTokenFromSession()
    if (!publicToken) {
      getAndSavePublicToken()
    }
  }, [])

  const getAndSavePublicToken = async () => {
    const response = await getPublicToken()
    sessionStorage.setItem('public-token', response)
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
