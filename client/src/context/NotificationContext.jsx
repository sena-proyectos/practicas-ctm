import { createContext, useContext, useState, useEffect } from 'react'
import { getNotification } from '../api/httpRequest'
const NotificationContext = createContext()

export const useNotification = () => {
  return useContext(NotificationContext)
}

export const NotificationProvider = ({ children }) => {
  const [showNotification, setShowNotification] = useState(false)
  const [notifications, setNotifications] = useState([])

  const toggleNotification = () => {
    setShowNotification(!showNotification)
  }

  const closeNotification = () => {
    setShowNotification(false)
  }

  useEffect(() => {
    const showNotifications = async () => {
      try {
        const userRole = localStorage.getItem('idRol')

        if (userRole === '1' || userRole === '2') {
          const response = await getNotification()
          setNotifications(response.data)
          console.log('Notificaciones:', response.data)
        } else {
          console.log('El usuario no tiene permiso para ver las notificaciones.')
        }
      } catch (error) {
        console.error('Error al obtener las notificaciones:', error)
      }
    }

    showNotifications()
  }, [])

  return <NotificationContext.Provider value={{ showNotification, toggleNotification, closeNotification, notifications }}>{children}</NotificationContext.Provider>
}
