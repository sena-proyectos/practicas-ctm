import { AiOutlineIdcard } from 'react-icons/ai'
import { BiLockAlt } from 'react-icons/bi'

import { Form } from '../Form/Form'

const User = () => {
  const loginForm = [
    {
      icon: <AiOutlineIdcard />,
      placeholder: '1017924888',
      type: 'text',
      nameInput: 'num_documento',
    },
    {
      icon: <BiLockAlt />,
      placeholder: '**********',
      type: 'password',
      nameInput: 'contrasena',
    },
  ]

  const title = {
    login: 'Bienvenido de vuelta',
  }

  return (
    <main className={`grid grid-cols-1 md:grid-cols-2-55-45 `}>
      <section className="grid h-full grid-rows-2-30-70">
        <header className="grid place-items-center">
          <h1 className="mt-10 text-4xl font-bold">SENA</h1>
        </header>
        <div className="mt-3 flex flex-col justify-self-center pt-14">
          <h2 className="text-center text-xl font-bold">{title.login}</h2>
          <span className="text-lg font-light ">Es un placer para nosotros tenerte aquí</span>
          <Form inputs={loginForm} />
        </div>
      </section>

      <section className="hidden md:block md:bg-primary">
        <div className="flex h-screen flex-col items-center justify-center">
          <img className="h-56 w-auto" src="public/logo2.png" alt="logoSena" />
        </div>
      </section>
    </main>
  )
}

export { User }
