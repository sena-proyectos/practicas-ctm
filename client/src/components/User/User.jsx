import { useRef } from 'react'

import { AiOutlineIdcard } from 'react-icons/ai'
import { BiLockAlt } from 'react-icons/bi'
// import { IoPersonOutline } from 'react-icons/io5'

import { Form } from '../Form/Form'

const User = () => {
  /**
   * Función asincrónica para redirigir al usuario a la página de inicio si ya está autenticado.
   *
   * @async
   * @function
   * @name earlyReturn
   * @throws {Error} Redirección si el usuario ya está autenticado.
   * @returns {void}
   *
   * @example
   */

  const divRef = useRef(null)

  /**
   * Configuración del formulario de inicio de sesión.
   *
   * @constant
   * @name loginForm
   * @type {Array}
   *
   * @example
   * const configuracionFormularioLogin = loginForm;
   */
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

  /**
   * Títulos para las secciones de inicio de sesión y registro.
   *
   * @constant
   * @name title
   * @type {Object}
   *
   * @example
   * const titulos = title;
   */
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
            <h2 className='text-xl font-bold text-center'>{title.login}</h2>
            <span className='text-lg font-light '>Es un placer para nosotros tenerte aquí</span>
            <div className={`flex w-72 flex-row justify-items-center rounded-lg border border-gray-400 relative mx-auto my-2.5 `}>
              <div className={`absolute ml-2 mt-1 h-6 w-32 rounded-md bg-white transition-all `} ref={divRef}></div>
            </div>
            <Form inputs={loginForm} isLoginForm={true} />
          </div>
        </div>
      </div>
    </section>
  )
}

export { User }
