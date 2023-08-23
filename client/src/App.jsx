import './App.css'
import { Route, Routes } from 'react-router-dom'
import { User } from './components/User/User'
import { Home } from './components/Home/Home'
import { StudentMonitoring } from './components/Student-monitoring/StudentMonitoring'
import { Visits } from './components/Visits/Visits'
import { Bitacoras } from './components/Bitacoras/Bitacoras'
import { Settings } from './components/Settings/Settings'
import { Teachers } from './components/Teachers/Teachers'
import { AssignClass } from './components/Assign-class/AssignClass'
import { ProtectedRoute } from './ProtectedRoute'
import { keysRoles } from './import/staticData'
import { RegisterList } from './components/Register-list/RegisterList'
import { RegisterStudent } from './components/Register-student/RegisterStudent'
import { RegisterDetails } from './components/Register-detail/RegisterDetails'
import { Courses } from './components/Courses/Courses'
import { Students } from './components/Students/Students'

const App = () => {
  const idRol = Number(localStorage.getItem('idRol'))

  return (
    <>
      <Routes>
        <Route path='/' element={<User />} />
        <Route element={<ProtectedRoute idRol={idRol} />}>
          <Route path='/home' element={<Home />} />
          <Route path='/config' element={<Settings />} />
          <Route path='/seguimiento-aprendices' element={<StudentMonitoring />} />
          <Route path='/registros' element={<RegisterList />} />
          <Route path='/registrar-aprendiz' element={<RegisterStudent />} />
          <Route path='/registro-detalles/:id' element={<RegisterDetails />} />
          <Route path='/asignar-ficha' element={<AssignClass />} />
          <Route path='/fichas' element={<Courses />} />
          {/* No está bien hecho, deberia ser anidado */}
          <Route path='/fichas/aprendices' element={<Students />} />
        </Route>

        <Route element={<ProtectedRoute idRol={idRol === Number(keysRoles[0]) || idRol === Number(keysRoles[1])} redirectTo='/home' />}>
          <Route path='/instructores' element={<Teachers />} />
        </Route>

        <Route element={<ProtectedRoute idRol={idRol === Number(keysRoles[0]) || idRol === Number(keysRoles[2])} redirectTo='/home' />}>
          <Route path='/visitas' element={<Visits />} />
          <Route path='/bitacoras' element={<Bitacoras />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
