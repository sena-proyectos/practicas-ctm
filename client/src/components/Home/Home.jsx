import { Card } from '../Utils/Card/Card'
import { Siderbar } from '../Siderbar/Sidebar'
import { cards } from '../../import/staticData'
import { Footer } from '../Footer/Footer'

import { useEffect } from 'react'

import Cookies from 'js-cookie'

const Home = () => {
  //useEffect(() => {
   // const token = Cookies.get('token')
   // if (!token) {
   //   window.location.href = '/'
   // }
 // }, [])

  return (
    <main className="flex min-h-screen flex-row">
      <Siderbar />
      <section className="relative grid w-min flex-auto grid-rows-3-10-75-15">
        <header className="grid place-items-center">
          <h1 className="text-center text-2xl font-bold">Bienvenido a practicas ctm. ¿Qué desea realizar hoy?</h1>
        </header>
        <div className="grid grid-cols-1 gap-1 p-5 sm:grid-cols-2 md:grid-cols-3 ">
          {cards.map(({ title, titleColor, description, buttonText, bgColor, sombra, link }) => {
            return <Card cardHome bgColor={bgColor} shadow={`shadow-inner-custom shadow-${sombra}`} scale={'scale-90'} titleColor={titleColor} title={title} description={description} roundedLink={'rounded-md'} buttonText={buttonText} key={title} link={link} transition={`transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:${bgColor}/100 duration-500`} />
          })}
        </div>

        <Footer />
      </section>
    </main>
  )
}

export { Home }
