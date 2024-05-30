import { useEffect, useRef } from 'react'

// icons
import { AiOutlineIdcard } from 'react-icons/ai'
import { BiLockAlt } from 'react-icons/bi'
// import { IoPersonOutline } from 'react-icons/io5'

// components
import { Form } from '../Form/Form'
import { useNotification } from '../../context/NotificationContext'

const User = () => {
  const { closeNotification } = useNotification()
  useEffect(() => {
    closeNotification()
  }, [])
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
   * @type {Object[]}
   * @name loginForm
   *
   * @description
   * Arreglo de objetos que define la estructura de un formulario de inicio de sesion.
   *
   * @property {JSX.Element} icon - Ícono relacionado al campo del formulario.
   * @property {string} placeholder - Texto de marcador de posición del campo.
   * @property {string} type - Tipo de campo (e.g., 'text', 'select', 'email', 'password').
   * @property {string} nameInput - Nombre del campo de entrada.
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
   * Título para la seccion de inicio de sesión.
   *
   * @constant
   * @name title
   * @type {Object}
   *
   * @example
   * const titulos = title;
   */
  const title = {
    login: 'Bienvenido de vuelta'
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

        <div className='relative flex flex-col items-center justify-center w-full gap-y-20'>
          <span>
            <h1 className='text-5xl font-semibold drop-shadow-xl text-center'>
              Etapa Productiva
            </h1>
            </span>
          <div className='z-10 flex flex-col p-8 bg-white border shadow-xl justify-self-center rounded-2xl border-neutral-400 '>
            <h2 className='text-xl font-bold text-center'>{title.login}</h2>
            <span className='text-lg font-light '>Es un placer para nosotros tenerte aquí</span>
            <div className='flex w-72 flex-row justify-items-center rounded-lg border border-gray-400 relative mx-auto my-2.5'>
              <div className='absolute w-32 h-6 mt-1 ml-2 transition-all bg-white rounded-md' ref={divRef}></div>
            </div>
            <Form inputs={loginForm} isLoginForm={true} />
          </div>
        </div>
      </div>
    </section>
  )
}

export { User }
