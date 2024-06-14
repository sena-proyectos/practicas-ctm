import React, { useState } from 'react';

const NotificationSingle = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className='mb-2 p-2 border rounded list-none'>
      <div className='flex justify-between items-center cursor-pointer' onClick={toggleOpen}>
        <span className='font-bold text-teal-500'>Notificaciones</span>
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && <div className='mt-2'>{children}</div>}
    </li>
  );
};

export { NotificationSingle };
