import { useRef } from 'react'

// icons
import { AiOutlineIdcard, AiOutlineMail } from 'react-icons/ai'
import { BiLockAlt } from 'react-icons/bi'
import { PiUser, PiUserGear } from 'react-icons/pi'

// components
import { Form } from '../Form/Form'
import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'

export const RegisterUser = () => {
  const divRef = useRef(null)

  /**
   * @type {Object[]}
   * @name roles
   *
   * @description
   * Arreglo de objetos que contiene roles de usuario con sus valores correspondientes.
   *
   * @property {string} value - Valor numérico del rol.
   * @property {string} name - Nombre del rol.
   */
  const roles = [
    { value: '1', name: 'Administrador' },
    { value: '2', name: 'Coordinador' },
    { value: '3', name: 'Instructor' }
  ]

  /**
   * @type {Object[]}
   * @name registerForm
   *
   * @description
   * Arreglo de objetos que define la estructura de un formulario de registro.
   *
   * @property {JSX.Element} icon - Ícono relacionado al campo del formulario.
   * @property {string} placeholder - Texto de marcador de posición del campo.
   * @property {string} type - Tipo de campo (e.g., 'text', 'select', 'email', 'password').
   * @property {string} nameInput - Nombre del campo de entrada.
   * @property {Object[]} [option] - Opciones para campos de tipo 'select'.
   * @property {string} option[].value - Valor de la opción.
   * @property {string} option[].key - Clave de la opción.
   */
  const registerForm = [
    { icon: <AiOutlineIdcard />, placeholder: '1017924888', type: 'text', nameInput: 'num_documento' },
    { icon: <PiUser />, placeholder: 'Juan', type: 'text', nameInput: 'nombre' },
    { icon: <PiUser />, placeholder: 'Gonzales', type: 'text', nameInput: 'apellido' },
    {
      icon: <PiUserGear />,
      placeholder: 'Seleccione el rol',
      type: 'select',
      nameInput: 'id_rol',
      option: roles.map((item) => ({
        value: item.name,
        key: item.value
      }))
    },
    { icon: <AiOutlineMail />, placeholder: 'correo@correo.com', type: 'email', nameInput: 'correo_electronico' },
    { icon: <BiLockAlt />, placeholder: '********', type: 'password', nameInput: 'contrasena' }
  ]

  return (
    <main className='flex flex-row min-h-screen bg-whitesmoke'>
      <Siderbar />
      <section className='relative grid flex-auto h-screen  grid-rows-[auto_1fr_auto]'>
        <div className='flex w-full h-[93vh] overflow-hidden'>
          <div className='fixed'>
            <div className='absolute left-[1rem] mt-[-10rem] hidden lg:flex'>
              <div className=' pulse h-[15rem] w-[15rem] rounded-full bg-aqua/100 ' />
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
            <div className='z-10 flex flex-col bg-white border shadow-xl p-7 justify-self-center rounded-2xl border-neutral-400 '>
              <h2 className='text-xl font-bold text-center'>Registrar Usuario</h2>
              <div className='flex w-72 flex-row justify-items-center rounded-lg border border-gray-400  relative mx-auto my-2.5 '>
                <div className='absolute w-32 h-6 mt-1 ml-2 transition-all bg-white rounded-md ' ref={divRef}></div>
              </div>
              <Form inputs={registerForm} isLoginForm={false} />
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </main>
  )
}
