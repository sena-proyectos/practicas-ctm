// import { useState } from "react";
import './App.css'
import { FiMail } from 'react-icons/fi'
import { FiEye } from 'react-icons/fi'

function App() {
  return (
    <>
      <main className="grid grid-cols-2-55-45 h-screen">
        <section className="grid grid-rows-2-30-70">
          <header className="grid place-items-center">
            <h1 className="font-bold text-4xl">SENA</h1>
          </header>
          <div className="flex flex-col justify-self-center">
            <h2 className="font-bold text-lg text-center">BIENVENIDO DE VUELTA</h2>
            <span className="font-light text-sm ">Es un placer para nosotros tenerte de nuevo aquí</span>
            <form action="">
              <div className="">
                <FiMail className="icon" />
                <input type="text" placeholder="example@example.com" />
              </div>
              <div className="">
                <FiEye className="icon" />
                <input type="password" placeholder="********" />
              </div>
              <button>Iniciar Sesión</button>
            </form>
          </div>
        </section>

        <section className="bg-primary"></section>
      </main>
    </>
  )
}

export default App
