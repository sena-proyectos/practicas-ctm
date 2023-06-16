import { useState, useEffect } from 'react'

import Cookies from 'js-cookie'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import jwtdecoded from 'jwt-decode'

import { IoCalendarClearOutline, IoDocumentTextOutline, IoHandLeft, IoHomeOutline, IoLogOutOutline, IoPersonOutline, IoSettingsOutline } from 'react-icons/io5'
import { CiCircleChevLeft } from 'react-icons/ci'

import { colorIcon } from '../../import/staticData'

const Siderbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)

  const [nameRol, setNameRol] = useState('')
  const [nameUser, setNameUser] = useState('')

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) window.location.href = '/'

    const decoded = jwtdecoded(token)

    setNameRol(decoded.data[0].id_rol === 1 ? 'Administrador' : 'Instructor')

    setNameUser(decoded.data[0].nombre + ' ' + decoded.data[0].apellido)
  }, [])

  const styles = (path) => {
    return location.pathname === path ? 'flex items-center relative pl-10 py-2 font-semibold bg-white rounded-s-2xl w-[115%]' : 'flex items-center relative pl-10 py-2 hover:bg-white rounded-s-2xl w-[115%] transition '
  }

  const spanStyle = (path) => {
    const color = colorIcon[path]
    return location.pathname === path ? `absolute inset-y-0 left-0 flex items-center pl-3 text-sm font-bold ${color}` : 'absolute inset-y-0 left-0 flex items-center pl-3 text-xs'
  }

  const logout = () => {
    Cookies.remove('token')
    navigate('/')
  }

  return (
    <aside className={`bg-secondary/10 ${open ? 'w-full' : 'w-[5rem]'}  md:h-screen rounded-r-2xl`}>
      <span
        className={`absolute top-3/4 pl-3 text-2xl ${open && 'rotate-180'}`}
        onClick={() => {
          setOpen(!open)
        }}
      >
        <CiCircleChevLeft />
      </span>
      <nav className="grid grid-rows-3-10-78-12 md:grid-rows-3-10-78-12 mx-auto w-4/5 h-screen">
        <section className="w-full grid grid-cols-2 my-auto">
          <img className="h-4/5 w-auto my-auto" src="public/user.png" alt="img_user" />
          <div className="m-auto">
            <h5>{nameUser}</h5>
            <span>{nameRol}</span>
          </div>
        </section>
        <ul className="flex flex-col justify-center items-start cursor-pointer">
          <section className="w-full flex flex-col mb-auto gap-[3px]">
            <hr className="text-white w-full mx-auto h-[1px] my-2" />
            <li>
              <Link to="/home" className={styles('/home')}>
                <span className={spanStyle('/home')}>
                  <IoHomeOutline />
                </span>
                {open ? 'Inicio' : ''}
              </Link>
            </li>
            <li>
              <Link to="/aprendices" className={styles('/aprendices')}>
                <span className={spanStyle('/aprendices')}>
                  <IoPersonOutline />
                </span>
                Aprendices
              </Link>
            </li>
            <li>
              <Link to="/bitacoras" className={styles('/bitacoras')}>
                <span className={spanStyle('/bitacoras')}>
                  <IoDocumentTextOutline />
                </span>
                Bitácoras
              </Link>
            </li>
            <li>
              <Link to="/visitas" className={styles('/visitas')}>
                <span className={spanStyle('/visitas')}>
                  <IoCalendarClearOutline />
                </span>
                Visitas
              </Link>
            </li>
            <hr className="text-white w-full mx-auto h-[1px] my-2" />
            <li>
              <Link to="/config" className={styles('/config')}>
                <span className={spanStyle('/config')}>
                  <IoSettingsOutline />
                </span>
                Configuración
              </Link>
            </li>
          </section>
          <section className="w-full mb-0">
            <li className="flex items-center relative pl-10 py-2 hover:bg-white rounded-s-2xl w-[115%] transition text-red-700">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs text-red-700">
                <IoLogOutOutline />
              </span>
              <span onClick={logout}>Cerrar Sesión</span>
            </li>
          </section>
        </ul>
      </nav>
    </aside>
  )
}

export { Siderbar }
