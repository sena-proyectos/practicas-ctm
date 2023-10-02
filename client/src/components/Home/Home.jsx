import { Card } from '../Utils/Card/Card'
import { Siderbar } from '../Siderbar/Sidebar'
import { rolesCard } from '../../import/staticData'
import { Footer } from '../Footer/Footer'

const Home = () => {
  // const [idRol, setIdRol] = useState(Number(localStorage.getItem('idRol')))
  const idRol = Number(localStorage.getItem('idRol'))
  return (
    <main className='flex flex-row min-h-screen bg-whitesmoke'>
      <Siderbar />
      <section className='relative grid flex-auto w-min grid-rows-3-10-75-15'>
        <header className='grid place-items-center'>
          <h1 className='text-2xl font-medium text-center'>Bienvenido </h1>
        </header>
        <div className='grid items-center grid-cols-1 px-4 sm:grid-cols-2 md:grid-cols-3'>
          {rolesCard[idRol].map(({ title, titleColor, description, buttonText, bgColor, sombra, link }) => {
            return <Card cardHome height={'h-[11.5rem] sm:h-[15.7rem] md:h-[14rem]'} bgColor={bgColor} shadow={`shadow-inner-custom`} shadowColor={sombra} scale={'scale-90'} titleColor={titleColor} title={title} description={description} roundedLink={'rounded-md'} borderColor={'border-black'} buttonText={buttonText} key={title} link={link} transition={`hover:bg-white/70 transition-colors`} />
          })}
        </div>

        <Footer />
      </section>
    </main>
  )
}

export { Home }
