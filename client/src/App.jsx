import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Siderbar } from './components/Siderbar/Sidebar'
import { User } from './components/User/User'
import { RegisterStudent } from './components/Register-student/RegisterStudent'
import { Home } from './components/Home/Home'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<User />} />
      <Route path='/home' element={<Home />} />
      <Route path='/inscribir-aprendiz' element={<RegisterStudent />} />
    </Routes>
  )
}

export default App
