import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { User } from './components/User/User'
import { RegisterStudent } from './components/Register-student/RegisterStudent'
import { Home } from './components/Home/Home'
import { Student } from './components/Student/Student'
import { Visits } from './components/Visits/Visits'
import { Bitacoras } from './components/Bitacoras/Bitacoras'
import { Settings } from './components/Settings/Settings'
import { Teachers } from './components/Teachers/Teachers'
import { AssignClass } from './components/Assign-class/AssignClass'
import { Approvement } from './components/Approvement/approvement'
import { useSelector } from 'react-redux'
import { ProtectedRoute } from './ProtectedRoute'
import { keysRoles } from './import/staticData'

const App = () => {
  const idRol = useSelector((state) => state.id_rol)

  return (
    <Routes>
      <Route path="/" element={<User />} />
      <Route element={<ProtectedRoute idRol={idRol} />}>
        <Route path="/home" element={<Home />} />
        <Route path="/config" element={<Settings />} />
        <Route path="/aprendices" element={<Student />} />
        <Route path="/aprov" element={<Approvement />} />
        <Route path="/asignar-ficha" element={<AssignClass />} />
      </Route>

      <Route element={<ProtectedRoute idRol={idRol === Number(keysRoles[0]) || idRol === Number(keysRoles[1])} redirectTo="/home" />}>
        <Route path="inscribir-aprendiz" element={<RegisterStudent />} />
        <Route path="/instructores" element={<Teachers />} />
      </Route>

      <Route element={<ProtectedRoute idRol={idRol === Number(keysRoles[0]) || idRol === Number(keysRoles[2])} redirectTo="/home" />}>
        <Route path="/visitas" element={<Visits />} />
        <Route path="/bitacoras" element={<Bitacoras />} />
      </Route>
    </Routes>
  )
}

export default App
