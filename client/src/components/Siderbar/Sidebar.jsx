import { useState, useEffect } from 'react'

import Cookies from 'js-cookie'
import jwtdecoded from 'jwt-decode'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { IoCalendarClearOutline, IoDocumentTextOutline, IoHomeOutline, IoLogOutOutline, IoPersonOutline, IoSettingsOutline, IoPeopleOutline, IoPersonAddOutline, IoCheckmarkCircleOutline, IoBookOutline, IoArrowForwardOutline } from 'react-icons/io5'

import { colorIcon } from '../../import/staticData'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Siderbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)
  
  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 640 // Tamaño de la media query "sm"
      setOpen(!isSmallScreen)
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Llamada inicial para establecer el estado según el tamaño actual

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const [nameRol, setNameRol] = useState('')
  const [nameUser, setNameUser] = useState('')

  useEffect(() => {
    const token = Cookies.get('token')
    // mostrar alerta para el usuario
    if (!token) window.location.href = '/'

    const decoded = jwtdecoded(token)

    setNameRol(decoded.data.user.id_rol === 1 ? 'Administrador' : 'Instructor')

    setNameUser(decoded.data.user.nombre + ' ' + decoded.data.user.apellido)
  }, [])

  const styles = (path) => {
    return location.pathname === path ? 'flex items-center relative pl-10 py-2 font-semibold bg-white rounded-s-2xl w-[115%] h-8' : 'flex items-center relative pl-10 py-2 hover:bg-white rounded-s-2xl w-[115%] h-8 transition '
  }

  const spanStyle = (path) => {
    const color = colorIcon[path]
    return location.pathname === path ? `absolute inset-y-0 left-0 flex items-center ${open === true ? 'pl-3 text-md' : 'pl-5 text-lg'} font-bold ${color}` : `absolute inset-y-0 left-0 flex items-center ${open === true ? 'pl-3 text-sm' : 'pl-5 text-md'} `
  }

  const logout = () => {
    Cookies.remove('token')
    navigate('/')
  }

  return (
    <aside className={`bg-secondary/10 ${open ? 'w-[12rem]' : 'w-[4.5rem]'} sticky top-0 left-0 md:h-screen rounded-r-2xl`}>
      <nav className="grid grid-rows-3-10-78-12 md:grid-rows-3-10-78-12 mx-auto w-4/5 h-screen">
        <section className={`w-fit ${open === true ? 'flex flex-row pr-3' : 'flex flex-col mx-auto'} my-auto`}>
          <div className="w-[3rem] my-auto rounded-full">
            <img className="object-cover" src="public/user.png" alt="img_user" />
          </div>
          <div className={`w-full pl-3 pr-10 ${!open && 'hidden'}`}>
            <h5 className="text-xs ">{nameUser || <Skeleton width={100} />}</h5>
            <span className="text-center text-sm font-semibold">{nameRol || <Skeleton />}</span>
          </div>
        </section>
        <ul className="flex cursor-pointer flex-col items-start justify-center">
          <section className="mb-auto flex w-full flex-col gap-[3px]">
            <hr className="mx-auto my-2 h-[1px] w-full text-white" />
            <li>
              <Link to="/home" className={styles('/home')}>
                <span className={spanStyle('/home')}>
                  <IoHomeOutline />
                </span>
                {open && 'Inicio'}
              </Link>
            </li>
            <li>
              <Link to="/aprendices" className={styles('/aprendices')}>
                <span className={spanStyle('/aprendices')}>
                  <IoPersonOutline />
                </span>
                {open && 'Aprendices'}
              </Link>
            </li>
            <li>
              <Link to="/bitacoras" className={styles('/bitacoras')}>
                <span className={spanStyle('/bitacoras')}>
                  <IoDocumentTextOutline />
                </span>
                {open && 'Bitácoras'}
              </Link>
            </li>
            <li>
              <Link to="/inscribir-aprendiz" className={styles('/inscribir-aprendiz')}>
                <span className={spanStyle('/inscribir-aprendiz')}>
                  <IoPersonAddOutline />
                </span>
                {open && 'Inscripciones'}
              </Link>
            </li>
            <li>
              <Link to="/" className={styles('/')}>
                <span className={spanStyle('/')}>
                  <IoCheckmarkCircleOutline />
                </span>
                {open && 'Aprobaciones'}
              </Link>
            </li>
            <li>
              <Link to="/" className={styles('/')}>
                <span className={spanStyle('/')}>
                  <IoPeopleOutline />
                </span>
                {open && 'Instructores'}
              </Link>
            </li>
            <li>
              <Link to="/" className={styles('/')}>
                <span className={spanStyle('/')}>
                  <IoBookOutline />
                </span>
                {open && 'Fichas'}
              </Link>
            </li>
            <li>
              <Link to="/visitas" className={styles('/visitas')}>
                <span className={spanStyle('/visitas')}>
                  <IoCalendarClearOutline />
                </span>
                {open && 'Visitas'}
              </Link>
            </li>
            <hr className="mx-auto my-2 h-[1px] w-full text-white" />
            <li>
              <Link to="/config" className={styles('/config')}>
                <span className={spanStyle('/config')}>
                  <IoSettingsOutline />
                </span>
                {open && 'Configuración'}
              </Link>
            </li>
          </section>
          <span
            className={`absolute top-2 right-4 text-xl ${open && 'rotate-180'}`}
            onClick={() => {
              setOpen(!open)
            }}
          >
            <IoArrowForwardOutline />
          </span>
          <section className="w-full mb-0">
            <li className="flex items-center relative pl-10 py-2 h-10 hover:bg-white rounded-s-2xl w-[115%] transition text-red-700" onClick={logout}>
              <span className={`absolute inset-y-0 left-0 flex items-center ${open === true ? 'pl-3 text-xs' : 'pl-5 text-md'} text-red-700`}>
                <IoLogOutOutline />
              </span>
              {open && 'Cerrar Sesión'}
            </li>
          </section>
        </ul>
      </nav>
    </aside>
  )
}

export { Siderbar }
