import { useEffect, useRef, useState } from 'react'
import { AiOutlineIdcard, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import { BiLockAlt } from 'react-icons/bi'
import { IoPersonOutline } from 'react-icons/io5'

import { Form } from '../Form/Form'

const User = () => {
  const divRef = useRef(null)
  const loginForm = [
    { icon: <AiOutlineIdcard />, placeholder: '1017924888', type: 'text', nameInput: 'num_documento' },
    { icon: <BiLockAlt />, placeholder: '**********', type: 'password', nameInput: 'contrasena' },
  ]
  const registerForm = [
    { icon: <AiOutlineIdcard />, placeholder: '1017924888', type: 'text', nameInput: 'num_documento' },
    { icon: <IoPersonOutline />, placeholder: 'Juan', type: 'text', nameInput: 'nombre' },
    { icon: <IoPersonOutline />, placeholder: 'Gonzales', type: 'text', nameInput: 'apellido' },
    { icon: <AiOutlineMail />, placeholder: 'correo@correo.com', type: 'email', nameInput: 'correo_electronico' },
    { icon: <AiOutlinePhone />, placeholder: '3183577499', type: 'text', nameInput: 'num_celular' },
    { icon: <BiLockAlt />, placeholder: '********', type: 'password', nameInput: 'contrasena' },
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
    register: 'Bienvenido a SENA',
  }

  return (
    <main className={`grid grid-cols-1 md:grid-cols-2-55-45 ${selectedButton === 'register' ? 'min-h-screen' : 'h-screen'}`}>
      <section className="grid grid-rows-2-30-70 h-full">
        <header className="grid place-items-center">
          <h1 className="font-bold text-4xl">SENA</h1>
        </header>
        <div className="flex flex-col justify-self-center pt-14">
          {selectedButton === 'login' ? <h2 className="font-bold text-xl text-center">{title.login}</h2> : <h2 className="font-bold text-xl text-center">{title.register}</h2>}
          <span className="font-light text-lg ">Es un placer para nosotros tenerte aquí</span>
          {/* TODO: Arreglar las alturas */}
          <div className={`flex flex-row justify-items-center bg-gray rounded-lg w-72 ${selectedButton === 'register' ? 'h-[2.8rem]' : 'h-10'} mx-auto my-2.5 relative`}>
            <div className={`absolute bg-white w-32 h-7 mt-1.5 ml-2 rounded-md transition-all`} ref={divRef}></div>
            <button className="rounded-md w-32 h-8 m-auto text-black text-sm z-10" onClick={() => handleButtonClick('login')}>
              Iniciar sesión
            </button>
            <button className="rounded-md w-32 h-8 m-auto text-black text-sm z-10" onClick={() => handleButtonClick('register')}>
              Registrarse
            </button>
          </div>
          {selectedButton === 'login' ? <Form inputs={loginForm} isLoginForm={true} /> : <Form inputs={registerForm} isLoginForm={false} />}
        </div>
      </section>

      <section className="hidden md:bg-primary md:block">
        <div className="flex flex-col justify-center items-center h-screen">
          <img className="h-56 w-auto" src="public/logo2.png" alt="logoSena" />
        </div>
      </section>
    </main>
  )
}

export { User }
