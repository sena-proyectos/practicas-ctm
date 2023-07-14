import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'

export const AssignClass = () => {
  return (
    <main className="flex min-h-screen flex-row">
      <Siderbar />
      <section className="relative grid w-min flex-auto grid-rows-3-10-75-15">
        <h1>Asignar Ficha</h1>
        <Footer />
      </section>
    </main>
  )
}
