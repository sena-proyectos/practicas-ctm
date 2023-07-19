import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'

const Approvement = () => {
  return (
    <main className="flex flex-row min-h-screen">
      <Siderbar />
      <section className="relative grid flex-auto w-min grid-rows-3-10-75-15">
        <header className="grid place-items-center">
          <h1>Aprobao</h1>
        </header>
        <section></section>
        <Footer />
      </section>
    </main>
  )
}

export { Approvement }
