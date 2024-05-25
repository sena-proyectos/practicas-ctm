import { createContext, useContext, useState } from 'react'

const NotificationContext = createContext()

export const useNotification = () => {
  return useContext(NotificationContext)
}

export const NotificationProvider = ({ children }) => {
  const [showNotification, setShowNotification] = useState(false)

  const toggleNotification = () => {
    setShowNotification(!showNotification)
  }

  const closeNotification = () => {
    setShowNotification(false)
  }

  return (
    <NotificationContext.Provider value={{ showNotification, toggleNotification, closeNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}
