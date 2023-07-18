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

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<User />} />
      <Route path="/home" element={<Home />} />
      <Route path="/inscribir-aprendiz" element={<RegisterStudent />} />
      <Route path="/aprendices" element={<Student />} />
      <Route path="/visitas" element={<Visits />} />
      <Route path="/bitacoras" element={<Bitacoras />} />
      <Route path="/config" element={<Settings />} />
      <Route path="/instructores" element={<Teachers />} />
      <Route path="/asignar-ficha" element={<AssignClass />} />
    </Routes>
  )
}

export default App
