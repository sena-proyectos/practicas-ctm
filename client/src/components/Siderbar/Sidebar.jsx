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

  return (
    <aside className="bg-secondary/10 w-56 h-screen rounded-r-2xl">
      <nav className="flex flex-col justify-center item-center mx-auto w-4/5">
        <div>
          <h3>Personirri</h3>
        </div>
        <hr className="text-white w-full mx-auto h-[1px] my-2" />
        <ul className="flex flex-col gap-1 justify-center items-start mt-auto">
          <li className={liStyle('home')} onClick={() => handlePage('home')}>
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs">
              <IoHomeOutline />
            </span>
            Inicio
          </li>
          <li className={liStyle('aprendices')} onClick={() => handlePage('aprendices')}>
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs">
              <IoPersonOutline />
            </span>
            Aprendices
          </li>
          <li className={liStyle('bitacoras')} onClick={() => handlePage('bitacoras')}>
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs">
              <IoDocumentTextOutline />
            </span>
            Bitácoras
          </li>
          <li className={liStyle('visitas')} onClick={() => handlePage('visitas')}>
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs">
              <IoCalendarClearOutline />
            </span>
            Visitas
          </li>
          <hr className="text-white w-full mx-auto h-[1px] my-2" />
          {/* <li className={liStyle('home')}>
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <IoSettingsOutline />
            </span>
            Configuración
          </li>
          <li className={liStyle('home')}>
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <IoLogOutOutline />
            </span>
            Cerrar Sesión
          </li> */}
        </ul>
      </nav>
    </aside>
  )
}

export { Siderbar }
