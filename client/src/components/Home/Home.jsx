import { Card } from '../Card/Card'
import { Siderbar } from '../Siderbar/Sidebar'
import { cards } from '../../Import/staticData'
import { Footer } from '../Footer/Footer'

const Home = () => {
  return (
    <main className="grid grid-cols-2-16r-84">
      <Siderbar />
      <section className="grid grid-rows-3-10-75-15">
        <header className="grid place-items-center">
          <h1 className="text-center font-bold text-2xl">Bienvenido a practicas ctm. ¿Qué desea realizar hoy?</h1>
        </header>
        <div className="grid grid-cols-3 p-4 gap-1">
          {cards.map(({ title, titleColor, description, buttonText, bgColor, link }) => {
            return <Card bgColor={bgColor} scale={'scale-90'} titleColor={titleColor} title={title} description={description} buttonText={buttonText} key={title} link={link} />
          })}
        </div>
        <Footer />
      </section>
    </main>
  )
}

export { Home }
