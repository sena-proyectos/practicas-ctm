import { useRef, useState } from 'react'
import { AiOutlineIdcard, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import { BiLockAlt } from 'react-icons/bi'
import { IoPersonOutline } from 'react-icons/io5'

import { Form } from '../Form/Form'

const User = () => {
  const divRef = useRef(null)
  const loginForm = [
    { icon: <AiOutlineIdcard />, placeholder: '1017924888', type: 'text' },
    { icon: <BiLockAlt />, placeholder: '**********', type: 'password' },
  ]
  const registerForm = [
    { icon: <AiOutlineIdcard />, placeholder: '1017924888', type: 'text' },
    { icon: <IoPersonOutline />, placeholder: 'Nombre', type: 'text' },
    { icon: <IoPersonOutline />, placeholder: 'Apellidos', type: 'text' },
    { icon: <AiOutlineIdcard />, placeholder: 'Tipo Documento', type: 'text' },
    { icon: <AiOutlineMail />, placeholder: 'correo@correo.com', type: 'text' },
    { icon: <AiOutlinePhone />, placeholder: '3183577499', type: 'text' },
    { icon: <BiLockAlt />, placeholder: '********', type: 'password' },
  ]
  const [selectedButton, setSelectedButton] = useState('login')

  const handleButtonClick = (button) => {
    setSelectedButton(button)
    // selectedButton === 'login' ? divRef.current.classList.add('translate-x-[8.9rem]') : divRef.current.classList.remove('translate-x-[8.9rem]')
    if (selectedButton === 'register') return divRef.current.classList.add('translate-x-[8.9rem]')
    if (selectedButton === 'login') return divRef.current.classList.remove('translate-x-[8.9rem]')
  }

  const title = {
    login: 'Bienvenido de vuelta',
    register: 'Bienvenido a SENA',
  }

  return (
    <main className="grid grid-cols-1 md:grid-cols-2-55-45 h-screen">
      <section className="grid grid-rows-2-30-70">
        <header className="grid place-items-center">
          <h1 className="font-bold text-4xl">SENA</h1>
        </header>
        <div className="flex flex-col justify-self-center">
          {selectedButton === 'login' ? <h2 className="font-bold text-lg text-center">{title.login}</h2> : <h2 className="font-bold text-lg text-center">{title.register}</h2>}
          <span className="font-light text-sm ">Es un placer para nosotros tenerte aquí</span>
          <div className="flex flex-row justify-items-center bg-gray rounded-lg w-72 h-10 mx-auto my-2.5 relative">
            <div className={`absolute bg-white w-32 h-7 mt-1.5 ml-2 rounded-md`} ref={divRef}></div>
            <button className="rounded-md w-32 h-8 m-auto text-black text-sm z-10" onClick={() => handleButtonClick('login')}>
              Iniciar sesión
            </button>
            <button className="rounded-md w-32 h-8 m-auto text-black text-sm z-10" onClick={() => handleButtonClick('register')}>
              Registrarse
            </button>
          </div>
          {selectedButton === 'login' ? <Form inputs={loginForm} /> : <Form inputs={registerForm} />}
        </div>
      </section>

      <section className="hidden md:bg-primary md:block"></section>
    </main>
  )
}

export { User }
