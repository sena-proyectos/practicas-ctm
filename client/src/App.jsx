// import { useState } from "react";
import './App.css'
import { FiMail } from 'react-icons/fi'
import { FiEye } from 'react-icons/fi'

function App() {
  return (
    <>
      <main className="grid grid-cols-2">
        <section className="sideLogin">
          <header>
            <h1 className="text-red-700">SENA</h1>
          </header>
          <div className="formLogin">
            <h2>BIENVENIDO DE VUELTA</h2>
            <span className="descripcionLogin">Es un placer tenerte de nuevo aquí</span>
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
          <footer>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, accusamus quisquam recusandae in necessitatibus nobis omnis cum quo debitis voluptatum beatae deleniti. Beatae eaque commodi dolor accusantium nam quibusdam sunt.</p>
          </footer>
        </section>

        <section className="sectionVerde"></section>
      </main>
    </>
  )
}

export default App
