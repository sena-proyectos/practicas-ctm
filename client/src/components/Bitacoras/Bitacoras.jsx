import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Siderbar } from '../Siderbar/Sidebar'

const Bitacoras = () => {
  return (
    <main className="flex flex-row min-h-screen">
      <Siderbar />
      <section className="grid grid-rows-3-10-75-15 flex-auto w-min relative">
        <header className="grid place-items-center">
          <Search filter />
        </header>
        <div>holaaaa</div>
        <Footer />
      </section>
    </main>
  )
}

export { Bitacoras }
