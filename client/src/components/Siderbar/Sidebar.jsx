import { useState, useEffect } from 'react'

import Cookies from 'js-cookie'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { IoCalendarClearOutline, IoDocumentTextOutline, IoHomeOutline, IoLogOutOutline, IoPersonOutline, IoSettingsOutline, IoPeopleOutline, IoPersonAddOutline, IoCheckmarkCircleOutline, IoBookOutline, IoArrowForwardOutline } from 'react-icons/io5'

import { colorIcon, rolesNames, keysRoles } from '../../import/staticData'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import jwtDecode from 'jwt-decode'

const Siderbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)
  const [dataFullName, setDataFullName] = useState(null)

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

  useEffect(() => {
    const token = Cookies.get('token')

    if (!token) {
      window.location.href = '/'
      return
    }

    const tokenData = jwtDecode(token)
    const { id_rol, nombres_usuario, apellidos_usuario } = tokenData.data.user
    const fullName = `${nombres_usuario} ${apellidos_usuario}`
    setDataFullName(fullName)

    localStorage.setItem('idRol', id_rol)
  }, [])

  const idRol = Number(localStorage.getItem('idRol'))

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
    <aside className={`bg-secondary/10 ${open ? 'w-[12rem]' : 'w-[4.5rem]'} sticky left-0 top-0 h-screen rounded-r-2xl`}>
      <nav className="grid w-4/5 h-screen mx-auto grid-rows-3-10-78-12 md:grid-rows-3-10-78-12">
        <section className={`w-fit ${open === true ? 'flex flex-row pr-3' : 'mx-auto flex flex-col'} my-auto`}>
          <div className="my-auto w-[3rem] rounded-full">
            <img className="object-cover" src="public/user.png" alt="img_user" />
          </div>
          <div className={`w-full pl-3 pr-10 ${!open && 'hidden'}`}>
            <h5 className="text-xs ">{dataFullName || <Skeleton width={100} />}</h5>
            <span className="text-sm font-semibold text-center">{rolesNames[idRol] || <Skeleton />}</span>
          </div>
        </section>
        <ul className="flex flex-col items-start justify-center cursor-pointer">
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
            {(idRol === Number(keysRoles[0]) || idRol === Number(keysRoles[1]) || idRol === Number(keysRoles[2])) && (
              <li>
                <Link to="/bitacoras" className={styles('/bitacoras')}>
                  <span className={spanStyle('/bitacoras')}>
                    <IoDocumentTextOutline />
                  </span>
                  {open && 'Bitácoras'}
                </Link>
              </li>
            )}
            {(idRol === Number(keysRoles[0]) || idRol === Number(keysRoles[1])) && (
              <li>
                <Link to="/inscribir-aprendiz" className={styles('/inscribir-aprendiz')}>
                  <span className={spanStyle('/inscribir-aprendiz')}>
                    <IoPersonAddOutline />
                  </span>
                  {open && 'Inscripciones'}
                </Link>
              </li>
            )}
            <li>
              <Link to="/aprov" className={styles('/aprov')}>
                <span className={spanStyle('/aprov')}>
                  <IoCheckmarkCircleOutline />
                </span>
                {open && 'Aprobaciones'}
              </Link>
            </li>
            {(idRol === Number(keysRoles[0]) || idRol === Number(keysRoles[1])) && (
              <li>
                <Link to="/instructores" className={styles('/instructores')}>
                  <span className={spanStyle('/instructores')}>
                    <IoPeopleOutline />
                  </span>
                  {open && 'Instructores'}
                </Link>
              </li>
            )}
            <li>
              <Link to="/asignar-ficha" className={styles('/asignar-ficha')}>
                <span className={spanStyle('/asignar-ficha')}>
                  <IoBookOutline />
                </span>
                {open && 'Fichas'}
              </Link>
            </li>
            {(idRol === Number(keysRoles[0]) || idRol === Number(keysRoles[1]) || idRol === Number(keysRoles[2])) && (
              <li>
                <Link to="/visitas" className={styles('/visitas')}>
                  <span className={spanStyle('/visitas')}>
                    <IoCalendarClearOutline />
                  </span>
                  {open && 'Visitas'}
                </Link>
              </li>
            )}
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
            className={`absolute right-4 top-2 text-xl ${open && 'rotate-180'}`}
            onClick={() => {
              setOpen(!open)
            }}
          >
            <IoArrowForwardOutline />
          </span>
          <section className="w-full mb-0">
            <li className="relative flex h-10 w-[115%] items-center rounded-s-2xl py-2 pl-10 text-red-700 transition hover:bg-white" onClick={logout}>
              <span className={`absolute inset-y-0 left-0 flex items-center ${open === true ? 'text-md pl-3' : 'pl-5 text-lg'} text-red-700`}>
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
