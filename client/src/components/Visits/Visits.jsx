import { Card } from '../Card/Card'
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Siderbar } from '../Siderbar/Sidebar'
import { estadoIcons } from '../../import/staticData'

const Visits = () => {
  const visits = [
    {
      id: 1,
      nameAprendiz: 'Juan David Gómez',
      correoAprendiz: 'jdgomez@gmail.com',
      fichaAprendiz: 2473196,
      programaAprendiz: 'Analisis y desarrollo de software',
      estadoAprendiz: 1,
      link: '/aprendices',
    },
    {
      id: 2,
      nameAprendiz: 'Juan David Gómez',
      correoAprendiz: 'jdgomez@gmail.com',
      fichaAprendiz: 2473196,
      programaAprendiz: 'Analisis y desarrollo de software',
      estadoAprendiz: 2,
      link: '/aprendices',
    },
    {
      id: 3,
      nameAprendiz: 'Juan David Gómez',
      correoAprendiz: 'jdgomez@gmail.com',
      fichaAprendiz: 2473196,
      programaAprendiz: 'Analisis y desarrollo de software',
      estadoAprendiz: 1,
      link: '/aprendices',
    },
    {
      id: 4,
      nameAprendiz: 'Juan David Gómez',
      correoAprendiz: 'jdgomez@gmail.com',
      fichaAprendiz: 2473196,
      programaAprendiz: 'Analisis y desarrollo de software',
      estadoAprendiz: 2,
      link: '/aprendices',
    },
    {
      id: 5,
      nameAprendiz: 'Juan David Gómez',
      correoAprendiz: 'jdgomez@gmail.com',
      fichaAprendiz: 2473196,
      programaAprendiz: 'Analisis y desarrollo de software',
      estadoAprendiz: 1,
      link: '/aprendices',
    },
    {
      id: 6,
      nameAprendiz: 'Juan David Gómez',
      correoAprendiz: 'jdgomez@gmail.com',
      fichaAprendiz: 2473196,
      programaAprendiz: 'Analisis y desarrollo de software',
      estadoAprendiz: 2,
      link: '/aprendices',
    },
  ]

  return (
    <main className="flex flex-row min-h-screen">
      <Siderbar />
      <section className="grid grid-rows-3-10-75-15 flex-auto w-min relative">
        <header className="grid place-items-center">
          <Search />
        </header>
        <div className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-2 md:grid-cols-3">
          {visits.map((visit) => {
            return <Card cardVisits shadow={'shadow-2xl'} scale={'scale-90'} title={visit.nameAprendiz} subtitle={visit.correoAprendiz} key={visit.id} icon={visit.estadoAprendiz === 1 ? estadoIcons.visitado : estadoIcons.visitadont} info1={visit.fichaAprendiz} info2={visit.programaAprendiz} description={visit.estadoAprendiz === 1 ? 'Este aprendiz ya ha sido visitado' : 'Este aprendiz no ha sido visitado'} roundedLink={'rounded-xl'} borderColor={'border-primary'} buttonText={'Más información'} link={'/home'} />
          })}
        </div>
        <Footer />
      </section>
    </main>
  )
}

export { Visits }
