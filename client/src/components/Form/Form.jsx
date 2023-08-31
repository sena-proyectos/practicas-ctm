import { useRef, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import LoadingUI from 'react-loading'

import { Button } from '../Utils/Button/Button'
import { Login } from '../../api/httpRequest'

import Cookie from 'js-cookie'
import Swal from 'sweetalert2'
import jwtDecode from 'jwt-decode'

const Form = ({ inputs }) => {
  const navigate = useNavigate()
  const [loadingBtn, setLoadingBtn] = useState(false)

  const passwordIcons = {
    openEye: <AiOutlineEye />,
    closeEye: <AiOutlineEyeInvisible />
  }

  const passwordStatus = {
    shown: 'text',
    hidden: 'password'
  }

  const [showPassword, setShowPassword] = useState(passwordStatus.hidden)
  const formValuesRef = useRef({})

  const handlePassword = () => (showPassword === passwordStatus.shown ? setShowPassword(passwordStatus.hidden) : setShowPassword(passwordStatus.shown))

  const handleSubmit = (e) => {
    e.preventDefault()
    const dataToSend = flattenObject(formValuesRef.current)
    sendData(dataToSend)
  }

  const flattenObject = (obj) => {
    return Object.values(obj).reduce((result, current) => {
      return { ...result, ...current }
    }, {})
  }

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
            ) : (
              <input type={item.type} name={item.nameInput} className='border-gray-400 focus:text-gray-900 w-72 rounded-md border-1 bg-white py-1.5 pl-10 text-base text-black focus:bg-white focus:outline-none' placeholder={item.placeholder} autoComplete='on' onChange={(e) => handleInputChange(e, i)} />
            )}
          </div>
        )
      })}
      <hr className='mx-auto my-2 h-[1px] w-4/5 bg-slate-300' />
      {inputs.length === 2 ? loadingBtn ? <Button isDisabled={true} type={'submit'} icon={<LoadingUI className='mx-[3px]' width={25} height={25} type='spin' />} value={'Cargando'} bg={'bg-[#2864b5]'} /> : <Button value={'Iniciar Sesión'} bg={'bg-[#438EF2]'} type={'submit'} hover={'transition ease-in delay-75 hover:bg-[#2d61a5] duration-150'} /> : <Button value={'Registrarse'} bg={'bg-[#438EF2]'} type={'submit'} hover={'transition ease-in delay-75 hover:bg-[#2d61a5] duration-150'} />}
    </form>
  )
}

export { Form }

