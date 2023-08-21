import { useState } from 'react'

import { Card } from '../Utils/Card/Card'
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Siderbar } from '../Siderbar/Sidebar'
import { estadoIcons, filter } from '../../import/staticData'
import { Modals } from '../Utils/Modals/Modals'

const Visits = () => {
  const [modalFilter, setModalFilter] = useState(false)
  const [modalInfoVisita, setModalInfoVisita] = useState(false)

  const handleIconClick = () => {
    setModalFilter(!modalFilter)
  }

  const handleModal = () => {
    setModalFilter(!modalFilter)
  }

  const modalVisit = () => {
    setModalInfoVisita(!modalInfoVisita)
  }

  const handleModalInfo = () => {
    setModalInfoVisita(!modalInfoVisita)
  }

  const visits = [
    {
      id: 1,
      nameAprendiz: 'Juan David Gómez',
      correoAprendiz: 'jdgomez@gmail.com',
      fichaAprendiz: 2473196,
      programaAprendiz: 'Analisis y desarrollo de software',
      estadoAprendiz: 1,
      link: '/aprendices'
    },
    {
      id: 2,
      nameAprendiz: 'Juan David Gómez',
      correoAprendiz: 'jdgomez@gmail.com',
      fichaAprendiz: 2473196,
      programaAprendiz: 'Analisis y desarrollo de software',
      estadoAprendiz: 2,
      link: '/aprendices'
    },
    {
      id: 3,
      nameAprendiz: 'Juan David Gómez',
      correoAprendiz: 'jdgomez@gmail.com',
      fichaAprendiz: 2473196,
      programaAprendiz: 'Analisis y desarrollo de software',
      estadoAprendiz: 1,
      link: '/aprendices'
    },
    {
      id: 4,
      nameAprendiz: 'Juan David Gómez',
      correoAprendiz: 'jdgomez@gmail.com',
      fichaAprendiz: 2473196,
      programaAprendiz: 'Analisis y desarrollo de software',
      estadoAprendiz: 2,
      link: '/aprendices'
    },
    {
      id: 5,
      nameAprendiz: 'Juan David Gómez',
      correoAprendiz: 'jdgomez@gmail.com',
      fichaAprendiz: 2473196,
      programaAprendiz: 'Analisis y desarrollo de software',
      estadoAprendiz: 1,
      link: '/aprendices'
    },
    {
      id: 6,
      nameAprendiz: 'Juan David Gómez',
      correoAprendiz: 'jdgomez@gmail.com',
      fichaAprendiz: 2473196,
      programaAprendiz: 'Analisis y desarrollo de software',
      estadoAprendiz: 2,
      link: '/aprendices'
    }
  ]

  const filterVisits = filter.filterVisits

  return (
    <>
      {modalFilter && <Modals bodyFilter view={filterVisits} title={'Visitas'} closeModal={handleModal} stylesFilterVisits />}
      {modalInfoVisita && <Modals closeModal={handleModalInfo} bodyVisits title={'Visitas'} />}
      <main className='flex min-h-screen flex-row'>
        <Siderbar />
        <section className='relative grid w-min flex-auto grid-rows-3-10-75-15'>
          <header className='grid place-items-center'>
            <Search searchFilter iconClick={handleIconClick} />
          </header>
          <div className='grid grid-cols-1 gap-1 p-4 sm:grid-cols-2 md:grid-cols-3'>
            {visits.map((visit) => {
              return <Card cardVisits shadow={'shadow-2xl'} scale={'scale-90'} title={visit.nameAprendiz} subtitle={visit.correoAprendiz} key={visit.id} icon={visit.estadoAprendiz === 1 ? estadoIcons.visitado : estadoIcons.visitadont} info1={visit.fichaAprendiz} info2={visit.programaAprendiz} description={visit.estadoAprendiz === 1 ? 'Este aprendiz ya ha sido visitado' : 'Este aprendiz no ha sido visitado'} roundedLink={'rounded-xl'} borderColor={'border-primary'} buttonText={'Más información'} isButton showModal modalClicked={modalVisit} />
            })}
          </div>
          <Footer />
        </section>
      </main>
    </>
  )
}

export { Visits }
