import { Card } from '../Card/Card'
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Siderbar } from '../Siderbar/Sidebar'

const Visits = () => {
  const visits = [
    {
      id: 1,
      nameAprendiz: 'Juan David Gómez',
      correoAprendiz: 'jdgomez@gmail.com',
      fichaAprendiz: 2473196,
      programaAprendiz: 'Analisis y desarrollo de software',
      estadoAprendiz: 'Este aprendiz ya ha sido visitado',
      link: '/aprendices',
    },
    {
      id: 2,
      nameAprendiz: 'Juan David Gómez',
      correoAprendiz: 'jdgomez@gmail.com',
      fichaAprendiz: 2473196,
      programaAprendiz: 'Analisis y desarrollo de software',
      estadoAprendiz: 'Este aprendiz no ha sido visitado',
      link: '/aprendices',
    },
    {
      id: 3,
      nameAprendiz: 'Juan David Gómez',
      correoAprendiz: 'jdgomez@gmail.com',
      fichaAprendiz: 2473196,
      programaAprendiz: 'Analisis y desarrollo de software',
      estadoAprendiz: 'Este aprendiz ya ha sido visitado',
      link: '/aprendices',
    },
    {
      id: 4,
      nameAprendiz: 'Juan David Gómez',
      correoAprendiz: 'jdgomez@gmail.com',
      fichaAprendiz: 2473196,
      programaAprendiz: 'Analisis y desarrollo de software',
      estadoAprendiz: 'Este aprendiz no ha sido visitado',
      link: '/aprendices',
    },
    {
      id: 5,
      nameAprendiz: 'Juan David Gómez',
      correoAprendiz: 'jdgomez@gmail.com',
      fichaAprendiz: 2473196,
      programaAprendiz: 'Analisis y desarrollo de software',
      estadoAprendiz: 'Este aprendiz ya ha sido visitado',
      link: '/aprendices',
    },
    {
      id: 6,
      nameAprendiz: 'Juan David Gómez',
      correoAprendiz: 'jdgomez@gmail.com',
      fichaAprendiz: 2473196,
      programaAprendiz: 'Analisis y desarrollo de software',
      estadoAprendiz: 'Este aprendiz no ha sido visitado',
      link: '/aprendices',
    },
  ]

  return (
    <main className="flex flex-row">
      <Siderbar />
      <section className="grid grid-rows-3-10-75-15 flex-auto w-min">
        <header className="grid place-items-center">
          <Search />
        </header>
        <div className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-2 md:grid-cols-3">
          {visits.map((visit) => {
            return <Card cardVisits shadow={'shadow-2xl'} marginLink={'mx-auto'} scale={'scale-90'} title={visit.nameAprendiz} subtitle={visit.correoAprendiz} key={visit.id} info1={visit.fichaAprendiz} info2={visit.programaAprendiz} description={visit.estadoAprendiz} roundedLink={'rounded-xl'} borderColor={'border-primary'} buttonText={'Más información'} link={'/home'} />
          })}
        </div>
        <Footer />
      </section>
    </main>
  )
}

export { Visits }
