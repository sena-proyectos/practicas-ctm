import { useState } from 'react'
import { IoCalendarClearOutline, IoDocumentTextOutline, IoHomeOutline, IoLogOutOutline, IoPersonOutline, IoSettingsOutline } from 'react-icons/io5'

const Siderbar = () => {
  const [selectPage, setSelectPage] = useState('home')

  const handlePage = (page) => {
    setSelectPage(page)
  }

  const liStyle = (page) => {
    return selectPage === page ? 'flex items-center relative pl-10 py-2 bg-white rounded-s-2xl w-[115%]' : 'flex items-center relative pl-10 py-2 hover:bg-white rounded-s-2xl w-[115%] transition '
  }

  const spanStyle = (page) => {
    return selectPage === page ? 'absolute inset-y-0 left-0 flex items-center pl-3 text-xs text-primary' : 'absolute inset-y-0 left-0 flex items-center pl-3 text-xs'
  }

  return (
    <aside className='bg-secondary/10 w-full md:h-screen rounded-r-2xl'>
      <nav className='grid grid-rows-3-10-78-12 md:grid-rows-3-10-78-12 mx-auto w-4/5 h-screen'>
        <section className='w-full grid grid-cols-2 my-auto'>
          <img className='h-4/5 w-auto my-auto' src='public/user.png' alt='img_user' />
          <div className='m-auto'>
            <h3>Personirri</h3>
            <span>Admin</span>
          </div>
        </section>
        <ul className='flex flex-col justify-center items-start'>
          <section className='w-full flex flex-col mb-auto gap-[3px]'>
            <hr className='text-white w-full mx-auto h-[1px] my-2' />
            <li className={liStyle('home')} onClick={() => handlePage('home')}>
              <span className={spanStyle('home')}>
                <IoHomeOutline />
              </span>
              Inicio
            </li>
            <li className={liStyle('aprendices')} onClick={() => handlePage('aprendices')}>
              <span className={spanStyle('aprendices')}>
                <IoPersonOutline />
              </span>
              Aprendices
            </li>
            <li className={liStyle('bitacoras')} onClick={() => handlePage('bitacoras')}>
              <span className={spanStyle('bitacoras')}>
                <IoDocumentTextOutline />
              </span>
              Bitácoras
            </li>
            <li className={liStyle('visitas')} onClick={() => handlePage('visitas')}>
              <span className={spanStyle('visitas')}>
                <IoCalendarClearOutline />
              </span>
              Visitas
            </li>
            <hr className='text-white w-full mx-auto h-[1px] my-2' />
            <li className={liStyle('config')} onClick={() => handlePage('config')}>
              <span className={spanStyle('config')}>
                <IoSettingsOutline />
              </span>
              Configuración
            </li>
          </section>
          <section className='w-full mb-0'>
            <li className='flex items-end self-end relative pl-10 py-2 hover:bg-white rounded-s-2xl w-[115%] transition text-red-700' onClick={() => handlePage('logout')}>
              <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-xs text-red-700'>
                <IoLogOutOutline />
              </span>
              Cerrar Sesión
            </li>
          </section>
        </ul>
      </nav>
    </aside>
  )
}

export { Siderbar }
