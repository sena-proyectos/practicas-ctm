import './index.css'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/system'

ReactDOM.createRoot(document.getElementById('root')).render(
  <NextUIProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </NextUIProvider>
)

