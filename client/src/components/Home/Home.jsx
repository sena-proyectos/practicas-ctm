import { Card } from '../Card/Card'
import { Siderbar } from '../Siderbar/Sidebar'
import { cards } from '../../Import/staticData'
import { Footer } from '../Footer/Footer'

import { useEffect } from 'react'

import Cookies from 'js-cookie'

const Home = () => {
  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) window.location.href = '/'
  }, [])

  const datosCards = [
    {
      title: 'Listado de aprendices',
      description: 'Podrás ver el listado de aprendices que actualmente se encuentran en prácticas.',
      isButton: true,
      buttonText: 'Llevame ahí',
      bgColor: 'bg-red-200',
      innerOnClick: () => {
        console.log('Hola')
      },
    },
  ]
  return (
    <main>
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
