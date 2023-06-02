import { Route, Routes } from 'react-router-dom'
import './App.css'
import { User } from './components/User/User'
import { RegisterStudent } from './components/Register-student/RegisterStudent'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<User />} />
      <Route path='/inscribir-aprendiz' element={<RegisterStudent />} />
    </Routes>
  )
}

export default App
