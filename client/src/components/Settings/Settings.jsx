import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify'

// Icons
import { IoSettingsOutline } from 'react-icons/io5'
import { LuSave } from 'react-icons/lu'
import { HiOutlinePencil } from 'react-icons/hi'

// Components
import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'
import { Button } from '../Utils/Button/Button'
import { PasswordModal } from '../Utils/Modals/Modals'
import { getUserById, EditUser } from '../../api/httpRequest'
import { settingsValidation } from '../../validation/settingsValidation'

export const Settings = () => {
  const [mostrarModal, setMostrarModal] = useState(false)
  const [user, setUser] = useState({})
  const [password, setPassword] = useState('')
  const [edit, setEdit] = useState(false)

  const handleEditModal = () => {
    setMostrarModal(!mostrarModal)
  }

  const handleModal = () => {
    setMostrarModal(!mostrarModal)
  }

  const handleEdit = () => {
    setEdit(!edit)
  }

  /**
   * Obtiene los datos del usuario.
   *
   * @description
   * Esta función se utiliza en un efecto de React para obtener los datos del usuario utilizando el token de autenticación almacenado en las cookies. El efecto se ejecuta una vez al cargar el componente, ya que tiene una dependencia vacía `[]`. Se decodifica el token para obtener el ID del usuario y se llama a la función `getUser(id_usuario)` para obtener los datos del usuario a partir de su ID.
   *
   * @returns {void}
   *
   */
  useEffect(() => {
    const token = Cookies.get('token')

    const tokenData = jwtDecode(token)
    const { id_usuario } = tokenData.data.user
    getUser(id_usuario)
  }, [])

  /**
   * @function
   * @name getUser
   * @async
   *
   * @description
   * Esta función se utiliza para obtener y actualizar la información de un usuario basada en su ID. Toma el ID del usuario como argumento. Realiza una solicitud para obtener los datos del usuario con el ID proporcionado y actualiza el estado user con los datos obtenidos. En caso de error, lanza una excepción.
   *
   * @param {number} id - El ID del usuario que se desea recuperar.
   * @throws {Error} Si ocurre un error al realizar la solicitud.
   * @returns {void}
   */
  const getUser = async (id) => {
    try {
      const response = await getUserById(id)
      const { data } = response.data
      setUser(data[0])
    } catch (error) {
      throw new Error(error)
    }
  }

  /**
   * @function
   * @name handleChangePassword
   *
   * @description
   * Esta función se utiliza para manejar el cambio de contraseña del usuario. Toma un objeto `formPassword` como argumento, que debe contener una nueva contraseña (`newPassword`) y una confirmación de la contraseña (`confirmPassword`). Compara las dos contraseñas y si coinciden, actualiza la contraseña del usuario con la nueva contraseña. En caso de no coincidencia, muestra un mensaje de error. Esta función no realiza ninguna solicitud de red, simplemente maneja el cambio de contraseña en el cliente.
   *
   * @param {Object} formPassword - Objeto que contiene las contraseñas.
   * @param {string} formPassword.newPassword - La nueva contraseña.
   * @param {string} formPassword.confirmPassword - La confirmación de la nueva contraseña.
   * @returns {void}
   */
  const handleChangePassword = (formPassword) => {
    formPassword.newPassword === formPassword.confirmPassword ? setPassword(formPassword.newPassword) : Swal.fire({ icon: 'error', title: 'Error', text: 'Las contraseñas no coinciden' })
  }

  /**
   * @function
   * @name handleSettingsForm
   * @async
   *
   * @description
   * Esta función se utiliza para manejar el envío del formulario de configuración. Toma el evento `e` como argumento. Primero, previene la acción por defecto del formulario. Luego, obtiene el ID del rol del usuario y las valores del formulario. Si no se proporciona una contraseña, se utiliza la contraseña actual del usuario. Después de obtener los valores, valida los datos del formulario. Si se encuentra un error de validación, muestra un mensaje de error específico. Finalmente, realiza una solicitud para editar los datos del usuario y muestra un mensaje de éxito en caso de éxito.
   *
   * @param {Event} e - El evento que desencadenó la función (generalmente un evento de formulario).
   * @returns {void}
   *
   */
  const handleSettingsForm = async (e) => {
    e.preventDefault()
    const id_rol = user.id_rol
    const formValues = Object.fromEntries(new FormData(e.target))
    formValues.id_rol = id_rol
    password !== '' && (formValues.contrasena = password)
    const id_usuario = user.id_usuario
    setPassword('')

    try {
      const { error } = settingsValidation.validate(formValues)
      if (error !== undefined) {
        let errorMessage
        const customErrorMessages = {
          nombre: 'El nombre debe tener al menos 3 caracteres.',
          apellido: 'El apellido debe tener al menos 3 caracteres.',
          num_documento: 'El número de documento debe tener entre 8 y 10 caracteres',
          num_celular: 'El número de celular debe tener entre 8 y 10 caracteres',
          correo_electronico: 'El correo electronico no tiene un formato valido',
          contrasena: 'La contraseñan debe tener 8 caracteres, 1 mayuscula, 1 minuscula y 1 número'
        }

        const path = error.details[0].path[0]
        if (customErrorMessages[path]) {
          errorMessage = customErrorMessages[path]
        }

        toast.error(errorMessage)
        return
      }
      await EditUser(id_usuario, formValues)
      Swal.fire({
        icon: 'success',
        title: '!Exitoso¡',
        text: 'Datos editados correctamente'
      })
      setEdit(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {mostrarModal && <PasswordModal bodyPassword title={'Cambiar Contraseña'} onSavePassword={handleChangePassword} closeModal={handleModal} />}
      <main className='flex flex-row min-h-screen bg-whitesmoke'>
        <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} theme='colored' />
        <Siderbar />
        <section className='relative grid flex-auto w-min grid-rows-2-93-6'>
          <div className='grid place-items-center '>
            <div className='grid w-10/12 m-auto bg-white shadow-md rounded-xl h-4/5 grid-rows-2-20-80'>
              <header className='flex flex-row items-center w-11/12 h-full gap-2 mx-auto'>
                <IoSettingsOutline className='text-5xl text-fifth' />
                <div>
                  <h2>{user.nombres_usuario + ' ' + user.apellidos_usuario}</h2>
                  <p>{user.tipo_documento_usuario + ' ' + user.numero_documento_usuario}</p>
                </div>
              </header>
              <section className='h-full'>
                <hr className='w-11/12 mx-auto border-1.5 rounded-lg' />
                <form onSubmit={handleSettingsForm} className='flex flex-col justify-center h-full gap-8 px-14'>
                  <section className='grid grid-cols-2 gap-8'>
                    <div className='flex flex-col'>
                      <label htmlFor='nombre'>Nombres</label>
                      <input name='nombre' type='text' defaultValue={user.nombres_usuario} className='rounded-[10px] border-1 border-gray-300 focus:outline-none px-2 disabled:bg-gray-200' disabled={!edit} />
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor='apellidos'>Apellidos</label>
                      <input name='apellido' type='text' defaultValue={user.apellidos_usuario} className='rounded-[10px] border-1 border-gray-300 focus:outline-none px-2 disabled:bg-gray-200' disabled={!edit} />
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor='email'>Correo electrónico</label>
                      <input name='correo_electronico' type='email' defaultValue={user.email_usuario} className='rounded-[10px] border-1 border-gray-300 focus:outline-none px-2 disabled:bg-gray-200' disabled={!edit} />
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor='contacto'>No. Contacto</label>
                      <input name='num_celular' type='text' defaultValue={user.numero_celular_usuario} className='rounded-[10px] border-1 border-gray-300 focus:outline-none px-2 disabled:bg-gray-200' disabled={!edit} />
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor='documento'>No. Documento</label>
                      <input name='num_documento' type='text' defaultValue={user.numero_documento_usuario} className='rounded-[10px] border-1 border-gray-300 focus:outline-none px-2 disabled:bg-gray-200' disabled={!edit} />
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor=''>Contraseña</label>
                      <div className='relative w-full '>
                        {edit && <HiOutlinePencil className='absolute inset-y-0 left-[80%] md:left-[93%] flex transform cursor-pointer items-center pr-3 hover:scale-125 text-2xl hover:text-purple-500' onClick={handleEditModal} />}

                        <input type='text' placeholder='**********' className={`rounded-[10px] border-1 border-gray-300 focus:outline-none pl-2 pr-8  px-2 w-full ${!edit ? 'disabled:bg-gray-200' : 'disabled:bg-white'}`} disabled={true} />
                      </div>
                    </div>
                  </section>

                  <div className='flex flex-row gap-5 w-fit'>
                    <Button name='edit' type='button' bg={'bg-[#ffba00]'} px={'px-2'} hover hoverConfig='bg-red-700' font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} inline onClick={handleEdit}>
                      <HiOutlinePencil />
                      Modificar
                    </Button>
                    {edit && (
                      <Button bg={'bg-[#16a34a]'} px={'px-2'} hover hoverConfig='bg-red-700' font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} inline>
                        <LuSave /> Guardar
                      </Button>
                    )}
                  </div>
                </form>
              </section>
            </div>
          </div>
          <Footer />
        </section>
      </main>
    </>
  )
}
