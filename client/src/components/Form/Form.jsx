import { useRef, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

import { Button } from '../Button/Button'
import { Login } from '../../api/httpRequest'

import Cookie from 'js-cookie'
import jwtdecoded from 'jwt-decode'
import Swal from 'sweetalert2'

const Form = ({ inputs }) => {
  const navigate = useNavigate()

  const passwordIcons = {
    openEye: <AiOutlineEye />,
    closeEye: <AiOutlineEyeInvisible />,
  }

  const passwordStatus = {
    shown: 'text',
    hidden: 'password',
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
    try {
      const response = await Login(data)
      const Token = response.data.token

      Cookie.set('token', Token, {
        expires: 1,
        sameSite: 'none',
        secure: true,
      })

      const getCookies = Cookie.get('token')

      const decoded = jwtdecoded(getCookies)

      const id_rol = decoded.data.user.id_rol

      if (id_rol === 1 || id_rol === 2) navigate('/home')
    } catch (error) {
      const message = error.response.data.error.info.message
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
      })
    }
  }

  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    formValuesRef.current = {
      ...formValuesRef.current,
      [index]: {
        ...formValuesRef.current[index],
        [name]: value,
      },
    }
  }

  return (
    <form action="" className="my-4 flex flex-col justify-center gap-3" onSubmit={handleSubmit}>
      {inputs.map((item, i) => {
        return (
          <div className="text-gray-400 relative mx-auto" key={i}>
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">{item.icon}</span>
            {item.type === 'password' ? (
              <>
                <span onClick={handlePassword} className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-slate-600 transition hover:text-slate-800">
                  {showPassword === passwordStatus.shown ? passwordIcons.closeEye : passwordIcons.openEye}
                </span>
                <input type={showPassword} name={item.nameInput} className="border-gray-400 focus:text-gray-900 w-72 rounded-md border-1 bg-white py-1.5 pl-10 text-base text-black focus:bg-white focus:outline-none" placeholder={item.placeholder} autoComplete="on" onChange={(e) => handleInputChange(e, i)} />
              </>
            ) : (
              <input type={item.type} name={item.nameInput} className="border-gray-400 focus:text-gray-900 w-72 rounded-md border-1 bg-white py-1.5 pl-10 text-base text-black focus:bg-white focus:outline-none" placeholder={item.placeholder} autoComplete="on" onChange={(e) => handleInputChange(e, i)} />
            )}
          </div>
        )
      })}
      <hr className="mx-auto my-2 h-[1px] w-4/5 bg-slate-300" />
      <Button value={'Iniciar Sesión'} bg={'bg-primary'} />
    </form>
  )
}

export { Form }
