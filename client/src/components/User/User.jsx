import { useState, useEffect, useRef } from 'react'

import { AiOutlineIdcard, AiOutlineMail } from 'react-icons/ai'
import { BiLockAlt } from 'react-icons/bi'
import { IoPersonOutline } from 'react-icons/io5'

import { Form } from '../Form/Form'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const User = () => {
  const goto = useNavigate()
  const idRol = Number(localStorage.getItem('idRol'))
  const cookie = Cookies.get('token')

  const earlyReturn = async () => {
    if (idRol && cookie) goto('/home', { replace: true })
  }

  useEffect(() => {
    earlyReturn()
  }, [])

  if (idRol && cookie) return null

  const divRef = useRef(null)

  const loginForm = [
    {
      icon: <AiOutlineIdcard />,
      placeholder: '1017924888',
      type: 'text',
      nameInput: 'num_documento'
    },
    {
      icon: <BiLockAlt />,
      placeholder: '**********',
      type: 'password',
      nameInput: 'contrasena'
    }
  ]
  const registerForm = [
    { icon: <AiOutlineIdcard />, placeholder: '1017924888', type: 'text', nameInput: 'num_documento' },
    { icon: <IoPersonOutline />, placeholder: 'Juan', type: 'text', nameInput: 'nombre' },
    { icon: <IoPersonOutline />, placeholder: 'Gonzales', type: 'text', nameInput: 'apellido' },
    { icon: <AiOutlineMail />, placeholder: 'correo@correo.com', type: 'email', nameInput: 'correo_electronico' },
    { icon: <BiLockAlt />, placeholder: '********', type: 'password', nameInput: 'contrasena' }
  ]

  const [selectedButton, setSelectedButton] = useState('login')

  const handleButtonClick = (button) => {
    setSelectedButton(button)
  }

  useEffect(() => {
    if (selectedButton === 'register') {
      divRef.current.classList.add('translate-x-[8.9rem]')
    } else {
      divRef.current.classList.remove('translate-x-[8.9rem]')
    }
  }, [selectedButton])

  const title = {
    login: 'Bienvenido de vuelta',
    register: 'Bienvenido a SENA'
  }

  return (
    <section>
      <div className='flex w-full h-screen overflow-hidden'>
        <div className='fixed'>
          <div className='absolute left-[-8rem] mt-[-10rem] hidden lg:flex'>
            <div className=' pulse h-[30rem] w-[30rem] rounded-full bg-aqua/100 ' />
          </div>
          <div className='absolute left-[28rem] mt-[10rem] hidden lg:flex'>
            <div className=' h-[10rem] w-[10rem] rounded-full bg-salmon ' />
          </div>
          <div className='absolute left-[68.5rem] mt-[18.5rem] hidden lg:flex'>
            <div className=' h-[20rem] w-[20rem] rounded-full bg-seventh ' />
          </div>
          <div className='absolute left-[75rem] mt-[4rem] hidden lg:flex'>
            <div className=' h-[3rem] w-[3rem] rounded-full bg-seventh ' />
          </div>
          <div className='absolute left-[50rem] mt-[20rem] hidden lg:flex '>
            <div className=' h-[10rem] w-[10rem] rounded-full bg-third ' />
          </div>
          <div className='absolute left-[8rem] mt-[30rem] hidden lg:flex '>
            <div className=' h-[3rem] w-[3rem]  rounded-full bg-third ' />
          </div>
        </div>

        <div className='relative flex items-center justify-center w-full'>
          <div className='z-10 flex flex-col p-8 bg-white border shadow-xl justify-self-center rounded-2xl border-neutral-400 '>
            {selectedButton === 'login' ? <h2 className='text-xl font-bold text-center'>{title.login}</h2> : <h2 className='text-xl font-bold text-center'>{title.register}</h2>}
            <span className='text-lg font-light '>Es un placer para nosotros tenerte aquí</span>
            <div className={`flex w-72 flex-row justify-items-center rounded-lg bg-gray ${selectedButton === 'register'}  relative mx-auto my-2.5 `}>
              <div className={`absolute ml-2 mt-1 h-6 w-32 rounded-md bg-white transition-all `} ref={divRef}></div>
              <button className='z-10 w-32 h-8 m-auto text-sm text-black rounded-md' onClick={() => handleButtonClick('login')}>
                Iniciar sesión
              </button>
              <button className='z-10 w-32 h-8 m-auto text-sm text-black rounded-md' onClick={() => handleButtonClick('register')}>
                Registrarse
              </button>
            </div>
            {selectedButton === 'login' ? <Form inputs={loginForm} isLoginForm={true} /> : <Form inputs={registerForm} isLoginForm={false} />}
          </div>
        </div>
      </div>
    </section>
  )
}

export { User }
