// import { useState } from "react";
import './App.css'
import { AiOutlineIdcard } from 'react-icons/ai'
import { BiLockAlt } from 'react-icons/bi'

const App = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
  }
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
            <form action="" className="flex flex-col justify-center my-4 gap-3" onSubmit={handleSubmit}>
              <div className="relative text-gray-400 mx-auto">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <AiOutlineIdcard />
                </span>
                <input type="search" name="q" className="py-1.5 text-sm text-black bg-white border-1 border-gray-400 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900 w-72" placeholder="1017924888" autoComplete="on" />
              </div>
              <div className="relative text-gray-400 mx-auto">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <BiLockAlt />
                </span>
                <input type="search" name="q" className="py-1.5 text-sm text-black bg-white border-1 border-gray-400 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900 w-72" placeholder="*********" autoComplete="on" />
              </div>
              <hr className="w-4/5 mx-auto bg-slate-500 h-[1px] my-2" />
              <button className="bg-primary rounded-md w-72 py-1.5 mx-auto text-white text-sm font-semibold">Iniciar Sesión</button>
            </form>
          </div>
        </section>

        <section className="bg-primary"></section>
      </main>
    </>
  )
}

export default App
