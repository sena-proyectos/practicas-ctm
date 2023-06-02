import { Route, Routes } from 'react-router-dom'
import './App.css'
import { User } from './components/User/User'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<User />} />
    </Routes>
  )
}

export default App
