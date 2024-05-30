import { useRef, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

import { Button, LoadingButton } from '../Utils/Button/Button'
import { Login, registerUser } from '../../api/httpRequest'
import { randomNumberGenerator } from '../Utils/randomNumberGenerator'

import Cookie from 'js-cookie'
import Swal from 'sweetalert2'
import jwtDecode from 'jwt-decode'

const Form = ({ inputs, isLoginForm }) => {
  const navigate = useNavigate()
  const [loadingBtn, setLoadingBtn] = useState(false)

  /**
   * @type {object}
   *
   * @description
   * Este objeto constante almacena iconos que representan un ojo abierto y un ojo cerrado para la visualización de contraseñas en un formulario.
   *
   * @property {JSX.Element} openEye - Icono de un ojo abierto.
   * @property {JSX.Element} closeEye - Icono de un ojo cerrado.
   */
  const passwordIcons = {
    openEye: <AiOutlineEye />,
    closeEye: <AiOutlineEyeInvisible />
  }

  /**
   * @type {object}
   *
   * @description
   * Este objeto constante almacena valores que representan el estado de visibilidad de una contraseña en un formulario. Los valores son 'text' cuando la contraseña se muestra y 'password' cuando se oculta.
   *
   * @property {string} shown - Representa el estado en el que la contraseña se muestra.
   * @property {string} hidden - Representa el estado en el que la contraseña se oculta.
   */
  const passwordStatus = {
    shown: 'text',
    hidden: 'password'
  }

  /**
   * Estado para controlar la visibilidad de la contraseña.
   *
   * @state
   * @name showPassword
   * @type {string}
   *
   * @example
   * const mostrarContraseña = showPassword;
   */
  const [showPassword, setShowPassword] = useState(passwordStatus.hidden)

  /**
   * Referencia a los valores del formulario.
   *
   * @ref
   * @name formValuesRef
   * @type {Object}
   *
   */
  const formValuesRef = useRef({})

  /**
   * Función para manejar la visibilidad de la contraseña.
   *
   * @function
   * @name handlePassword
   * @returns {void}
   *
   * @example
   * handlePassword();
   */
  const handlePassword = () => (showPassword === passwordStatus.shown ? setShowPassword(passwordStatus.hidden) : setShowPassword(passwordStatus.shown))

  /**
   * Función para manejar el envío del formulario.
   *
   * @function
   * @name handleSubmit
   * @param {Event} e - Evento del formulario.
   * @returns {void}
   *
   * @example
   * handleSubmit(evento);
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    const dataToSend = flattenObject(formValuesRef.current)
    isLoginForm ? sendData(dataToSend) : sendRegisterData(dataToSend)
  }

  /**
   * Función para aplanar un objeto anidado.
   *
   * @function
   * @name flattenObject
   * @param {Object} obj - Objeto a aplanar.
   * @returns {Object} Objeto aplanado.
   *
   * @example
   * const objetoAplanado = flattenObject(objetoAnidado);
   */
  const flattenObject = (obj) => {
    return Object.values(obj).reduce((result, current) => {
      return { ...result, ...current }
    }, {})
  }

  /**
   * @function
   * @name sendData
   * @async
   *
   * @description
   * Esta función se utiliza para enviar datos de inicio de sesión al servidor a través de la función `Login`. Si la solicitud es exitosa, se almacena el token de acceso en una cookie y se obtiene el ID del rol del usuario para guardarlo en el almacenamiento local. Luego, se redirige al usuario a la página de inicio ('/home'). En caso de error, se muestra un mensaje de error utilizando la biblioteca Swal.
   *
   * @param {Object} data - Datos a enviar.
   * @throws {Error} Error en caso de fallo en la solicitud.
   * @returns {void}
   *
   * @example
   * sendData(datos);
   */
  const sendData = async (data) => {
    setLoadingBtn(true)
    try {
      const response = await Login(data)
      const Token = response.data.token

      Cookie.set('token', Token, {
        expires: 1,
        sameSite: 'none',
        secure: true
      })

      const tokenData = jwtDecode(Token)
      const { id_rol } = tokenData.data.user
      localStorage.setItem('idRol', id_rol)

      navigate('/home')
    } catch (error) {
      setLoadingBtn(false)
      const message = error?.response?.data?.error?.info?.message
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message ?? 'Ha ocurrido un error, intentelo de nuevo'
      })
    }
  }

  /**
   * @function
   * @name sendRegisterData
   * @async
   *
   * @description
   * Esta función se utiliza para enviar datos de registro de usuario al servidor a través de la función `registerUser`. Se genera un número de celular aleatorio de 8 dígitos y se agrega a los datos de registro. Luego, se realiza la solicitud al servidor. Si el registro es exitoso, se muestra un mensaje de éxito utilizando la biblioteca Swal. En caso de error, se muestra un mensaje de error con detalles si están disponibles.
   *
   * @param {object} data - Los datos de registro de usuario que se envían al servidor.
   * @throws {Error} - Si ocurre un error en la solicitud de registro de usuario.
   * @returns {void}
   *
   */
  const sendRegisterData = async (data) => {
    const num_celular = randomNumberGenerator(8)
    data.num_celular = num_celular.toString()
    setLoadingBtn(true)
    try {
      await registerUser(data)
      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Usuario creado correctamente'
      })
      setLoadingBtn(false)
    } catch (error) {
      setLoadingBtn(false)
      const message = error?.response?.data?.error?.info?.message
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message ?? 'Ha ocurrido un error, intentelo de nuevo'
      })
    }
  }

  /**
   * Función para manejar el cambio en la entrada del formulario.
   *
   * @function
   * @name handleInputChange
   * @param {Event} e - Evento de cambio en la entrada.
   * @param {string} index - Índice del formulario.
   * @returns {void}
   *
   * @example
   * handleInputChange(evento, 'index');
   */
  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    formValuesRef.current = {
      ...formValuesRef.current,
      [index]: {
        ...formValuesRef.current[index],
        [name]: value
      }
    }
  }

  return (
    <form action='' className='flex flex-col justify-center gap-3 my-4 ' onSubmit={handleSubmit}>
      {inputs.map((item, i) => {
        return (
          <div className='relative mx-auto text-grey' key={i}>
            <span className='absolute inset-y-0 left-0 flex items-center pl-3 '>{item.icon}</span>
            {item.type === 'password' ? (
              <>
                <span onClick={handlePassword} className='absolute inset-y-0 right-0 flex items-center pr-3 transition cursor-pointer text-slate-600 hover:text-slate-800'>
                  {showPassword === passwordStatus.shown ? passwordIcons.closeEye : passwordIcons.openEye}
                </span>
                <input type={showPassword} name={item.nameInput} className='border-gray-400 focus:text-gray-900 w-72 rounded-md border-1 bg-white py-1.5 pl-10 text-base text-black focus:bg-white focus:outline-none' placeholder={item.placeholder} autoComplete='on' onChange={(e) => handleInputChange(e, i)} />
              </>
            ) : item.type === 'select' ? (
              <select name={item.nameInput} className='border-gray-400 focus:text-gray-900 w-72 rounded-md border-1 bg-white py-1.5 pl-10 text-base text-black focus:bg-white focus:outline-none' placeholder={item.placeholder} autoComplete='on' onChange={(e) => handleInputChange(e, i)}>
                <option value=''>Selecciona una opción</option>
                {item.option.map((op) => {
                  return (
                    <option key={op.key} value={op.key}>
                      {op.value}
                    </option>
                  )
                })}
              </select>
            ) : (
              <input type={item.type} name={item.nameInput} className='border-gray-400 focus:text-gray-900 w-72 rounded-md border-1 bg-white py-1.5 pl-10 text-base text-black focus:bg-white focus:outline-none' placeholder={item.placeholder} autoComplete='on' onChange={(e) => handleInputChange(e, i)} />
            )}
          </div>
        )
      })}
      <hr className='mx-auto my-2 h-[1px] w-4/5 bg-slate-300' />
      {inputs.length === 2 ? (
        loadingBtn ? (
          <LoadingButton bgColor='[#438EF2]' classNames='rounded-md text-white flex gap-3 font-semibold text-lg py-1.5 justify-center w-5/6 mx-auto items-center' />
        ) : (
          <Button bg={'bg-[#438EF2]'} px='px-[5rem]' rounded='rounded-md' textColor='text-white' font='font-semibold' textSize='text-lg' py='py-1.5' type={'submit'} hover hoverConfig='bg-[#2d61a5] ease-in delay-75 duration-150'>
            Iniciar Sesión
          </Button>
        )
      ) : (
        <Button bg='bg-[#438EF2]' type='submit' px='px-[5rem]' rounded='rounded-md' textColor='text-white' font='font-semibold' textSize='text-lg' py='py-1.5' hover hoverConfig='bg-[#2d61a5] ease-in delay-75 duration-150'>
          Registrarse
        </Button>
      )}
    </form>
  )
}

export { Form }
