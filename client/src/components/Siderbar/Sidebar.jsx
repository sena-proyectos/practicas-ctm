import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// Icons
import { IoHomeOutline, IoLogOutOutline, IoPersonOutline, IoSettingsOutline, IoPeopleOutline, IoPersonAddOutline, IoBookOutline } from 'react-icons/io5'

// Componentes
import { colorIcon, rolesNames, keysRoles } from '../../import/staticData'

const Siderbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)
  const [dataFullName, setDataFullName] = useState(null)

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 640
      setOpen(!isSmallScreen)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const idRol = Number(localStorage.getItem('idRol'))
  const removeIdRolFromLocalStorage = () => {
    localStorage.removeItem('idRol')
  }

  useEffect(() => {
    const token = Cookies.get('token')

    if (!token) {
      window.location.href = '/'
      removeIdRolFromLocalStorage()
      return
    }

    try {
      const tokenData = jwtDecode(token)
      const { nombres_usuario, apellidos_usuario } = tokenData.data.user
      const fullName = `${nombres_usuario} ${apellidos_usuario}`
      setDataFullName(fullName)
    } catch (error) {
      window.location.href = '/'
      removeIdRolFromLocalStorage()
    }
  }, [])

  const logout = () => {
    Cookies.remove('token')
    removeIdRolFromLocalStorage()
    navigate('/')
  }

  const styles = (path) => {
    return location.pathname === path ? 'flex items-center relative pl-10 py-2 font-semibold bg-white rounded-s-2xl w-[115%] h-8' : 'flex items-center relative pl-10 py-2 hover:bg-white rounded-s-2xl w-[115%] h-8 transition '
  }

  const spanStyle = (path) => {
    const color = colorIcon[path]
    return location.pathname === path ? `absolute inset-y-0 left-0 flex items-center ${open === true ? 'pl-3 text-md' : 'pl-5 text-lg'} font-bold ${color}` : `absolute inset-y-0 left-0 flex items-center ${open === true ? 'pl-3 text-sm' : 'pl-5 text-md'} `
  }

  return (
    <aside className={`bg-secondary/10 ${open ? 'w-[13rem]' : 'w-[4.5rem]'} sticky left-0 top-0 h-screen rounded-r-3xl shadow-slate-400 shadow-md`}>
      <nav className='grid h-screen grid-rows-3-10-78-12 md:grid-rows-3-10-78-12'>
        <section className={`w-[80%] ${open === true ? 'flex flex-row mx-auto' : 'mx-auto flex flex-col items-center'} my-auto`}>
          <div className='my-auto w-[2.5rem] rounded-full'>
            <img className='object-cover' src='/user.png' alt='img_user' />
          </div>
          <div className={`w-fit mx-auto ${!open && 'hidden'}`}>
            <h5 className='text-xs font-light text-center'>{dataFullName || <Skeleton width={100} />}</h5>
            <h6 className='text-sm font-semibold text-center'>{rolesNames[idRol] || <Skeleton />}</h6>
          </div>
        </section>
        <ul className='flex flex-col w-[80%] mx-auto items-start justify-center cursor-pointer'>
          <section className='mb-auto flex w-full flex-col gap-[3px]'>
            <hr className='w-full my-2 text-white border-[1.4px] rounded-lg' />
            <li>
              <Link to='/home' className={styles('/home')}>
                <span className={spanStyle('/home')}>
                  <IoHomeOutline />
                </span>
                {open && 'Inicio'}
              </Link>
            </li>
            <li>
              <Link to='/seguimiento-aprendices' className={styles('/seguimiento-aprendices')}>
                <span className={spanStyle('/seguimiento-aprendices')}>
                  <IoPersonOutline />
                </span>
                {open && 'Aprendices'}
              </Link>
            </li>
            <li>
              <Link to='/registros' className={styles('/registros')}>
                <span className={spanStyle('/registros')}>
                  <IoPersonAddOutline />
                </span>
                {open && 'Registro'}
              </Link>
            </li>
            {(idRol === Number(keysRoles[0]) || idRol === Number(keysRoles[1])) && (
              <li>
                <Link to='/instructores' className={styles('/instructores')}>
                  <span className={spanStyle('/instructores')}>
                    <IoPeopleOutline />
                  </span>
                  {open && 'Instructores'}
                </Link>
              </li>
            )}
            <li>
              <Link to='/fichas' className={styles('/fichas')}>
                <span className={spanStyle('/fichas')}>
                  <IoBookOutline />
                </span>
                {open && (idRol === Number(keysRoles[0]) || idRol === Number(keysRoles[1]) ? 'Fichas' : 'Mis fichas')}
              </Link>
            </li>
            {/* {(idRol === Number(keysRoles[0]) || idRol === Number(keysRoles[1]) || idRol === Number(keysRoles[2])) && (
              <li>
                <Link to="/bitacoras" className={styles('/bitacoras')}>
                  <span className={spanStyle('/bitacoras')}>
                    <IoDocumentTextOutline />
                  </span>
                  {open && 'Bitácoras'}
                </Link>
              </li>
            )} */}
            {/* {(idRol === Number(keysRoles[0]) || idRol === Number(keysRoles[1]) || idRol === Number(keysRoles[2])) && (
              <li>
                <Link to="/visitas" className={styles('/visitas')}>
                  <span className={spanStyle('/visitas')}>
                    <IoCalendarClearOutline />
                  </span>
                  {open && 'Visitas'}
                </Link>
              </li>
            )} */}
            <hr className='w-full my-2 text-white border-[1.4px] rounded-lg' />
            <li>
              <Link to='/config' className={styles('/config')}>
                <span className={spanStyle('/config')}>
                  <IoSettingsOutline />
                </span>
                {open && 'Configuración'}
              </Link>
            </li>
          </section>
          <section className='w-full mb-0'>
            <li className='relative flex h-10 w-[115%] items-center rounded-s-2xl py-2 pl-10 text-red-700 transition hover:bg-white' onClick={logout}>
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

