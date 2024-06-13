import React from 'react';
import { useNotification } from '../../context/NotificationContext';

const AlertVisita = () => {
  const { notifications, notificationIn } = useNotification();

  return (
    <ul className='space-y-2 max-h-60 overflow-y-auto mt-3'>
      {notifications.map((notification, index) => (
        <li key={index} className='mb-2 p-2 border rounded'>
          <span>Visita pendiente</span>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='font-bold text-teal-500'>Instructor:</p>
              <p>{notification.nombre_instructor}</p>
            </div>
            <div>
              <p className='font-bold text-teal-500'>Aprendiz:</p>
              <p>{notification.nombre_aprendiz}</p>
            </div>
            <div className='col-span-2'>
              <p className='font-bold text-teal-500'>Fecha de Visita:</p>
              <p>{notification.visita_hora}</p>
            </div>
          </div>
        </li>
      ))}
      {notificationIn.map((notification, index) => (
        <li key={index} className='mb-2 p-2 border rounded'>
          <span>Notificación de Instructor</span>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='font-bold text-teal-500'>Instructor:</p>
              <p>{notification.nombre_instructor}</p>
            </div>
            <div>
              <p className='font-bold text-teal-500'>Aprendiz:</p>
              <p>{notification.nombre_aprendiz}</p>
            </div>
            <div className='col-span-2'>
              <p className='font-bold text-teal-500'>Fecha Visita:</p>
              <p>{notification.visita_hora}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export { AlertVisita };
