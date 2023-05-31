import { AiOutlineIdcard } from 'react-icons/ai'
import { BiLockAlt } from 'react-icons/bi'

import { Form } from '../Form/Form'

const User = () => {
  const forms = [
    { icon: <AiOutlineIdcard />, placeholder: '1017924888', type: 'text' },
    { icon: <BiLockAlt />, placeholder: '**********', type: 'password' },
  ]

  const handleRegister = () => {
    console.log('clickao')
  }
  const title = 'Bienvenido de vuelta'
  const subtitle = 'Es un placer para nosotros tenerte aquí'
  return (
    <main className="grid grid-cols-1 md:grid-cols-2-55-45 h-screen">
      <section className="grid grid-rows-2-30-70">
        <header className="grid place-items-center">
          <h1 className="font-bold text-4xl">SENA</h1>
        </header>
        <div className="flex flex-col justify-self-center">
          <h2 className="font-bold text-lg text-center">{title}</h2>
          <span className="font-light text-sm ">{subtitle}</span>
          <div className="flex flex-row justify-items-center bg-gray rounded-lg w-72 h-10 mx-auto my-2.5 ">
            <button className="bg-white rounded-md w-32 h-8 m-auto text-black text-sm">Iniciar sesión</button>
            <button className="rounded-md w-32 h-8 m-auto text-black text-sm" onClick={handleRegister}>
              Registrarse
            </button>
          </div>
          <Form inputs={forms} />
        </div>
      </section>

      <section className="hidden md:bg-primary md:block"></section>
    </main>
  )
}

export { User }
