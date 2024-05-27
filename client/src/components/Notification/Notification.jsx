import { useNotification } from '../../context/NotificationContext'

const Notification = () => {
  const { showNotification } = useNotification()

  if (!showNotification) return null

  return (
      <div className='absolute left-[14rem] top-5 w-96 h-[20rem] z-50'>
    <div className="relative h-full">
      <div className="bg-white rounded-lg p-4 h-full shadow-md">
        <p className='text-xl font-semibold'>Notificaciones</p>
      </div>
      <div className="absolute top-8 right-full transform -translate-y-1">
        <div className="w-0 h-0 border-solid border-8 border-transparent border-r-white"></div>
      </div>
    </div>

      </div>
  )
}

export { Notification }
