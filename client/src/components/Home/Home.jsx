import { Card } from '../Card/Card'
import { Siderbar } from '../Siderbar/Sidebar'
import { cards } from '../../Import/staticData'

const Home = () => {
  return (
    <main className="grid grid-cols-2-20r-80">
      <Siderbar />
      <section className="grid grid-rows-3-10-75-15">
        <header className="grid place-items-center">
          <h1 className="text-center font-bold text-2xl">Bienvenido a practicas ctm. ¿Qué desea realizar hoy?</h1>
        </header>
        <div className="grid grid-cols-3 p-4 gap-6">
          {cards.map(({ title, titleColor, description, buttonText, bgColor, link }) => {
            return <Card bgColor={bgColor} titleColor={titleColor} title={title} description={description} buttonText={buttonText} key={title} link={link} />
          })}
        </div>
        <footer className="h-fit ">
          <hr />
          <span className="text-center ">DERECHOS RESERVADOS AL SENA</span>
        </footer>
      </section>
    </main>
  )
}

export { Home }
