import { createContext, useContext, useState, useEffect } from 'react'
import { getNotification , getNotificationInstructor } from '../api/httpRequest'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

const NotificationContext = createContext()

export const useNotification = () => {
  return useContext(NotificationContext)
}

export const NotificationProvider = ({ children }) => {
  const [showNotification, setShowNotification] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [userId, setUserId] = useState(null)
  const [notificationIn , setNotificationIn] = useState([])

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



  useEffect(() => {
    const token = Cookies.get('token');

    try {
      const tokenData = jwtDecode(token);
      const { id_usuario } = tokenData.data.user;
      setUserId(id_usuario); // Almacenar el id_usuario en el estado
      showNotificationInstructor(id_usuario); // Llamar a la función para obtener notificaciones del instructor
    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }
  }, []);

  const showNotificationInstructor = async (id) => {
    try {
      const res = await getNotificationInstructor(id); // Llamar a la función con el id_usuario
      const data = res.data;
      setNotificationIn(data)
      console.log(data)
    } catch (error) {
      console.error('Error al obtener las notificaciones del instructor:', error);
    }
  };


  return <NotificationContext.Provider value={{ showNotification, toggleNotification, closeNotification, notifications, notificationIn}}>{children}</NotificationContext.Provider>
}
