import { useState } from 'react'
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Siderbar } from '../Siderbar/Sidebar'
import { Modals } from '../Utils/Modals/Modals'

const Bitacoras = () => {
  const [mostrarModal, setMostrarModal] = useState(false)

  const handleIconClick = () => {
    setMostrarModal(!mostrarModal)
  }

  const handleModal = () => {
    setMostrarModal(!mostrarModal)
  }
  return (
    <>
      {mostrarModal && <Modals bodyFilter title={'Bitacoras'} closeModal={handleModal} />}
      <main className="flex flex-row min-h-screen">
        <Siderbar />
        <section className="grid grid-rows-3-10-75-15 flex-auto w-min relative">
          <header className="grid place-items-center">
            <Search filter iconClick={handleIconClick} />
          </header>
          <div>holaaaa</div>
          <Footer />
        </section>
      </main>
    </>
  )
}

export { Bitacoras }
