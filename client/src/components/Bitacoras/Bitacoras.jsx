import { useState } from 'react'
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Siderbar } from '../Siderbar/Sidebar'
import { Modals } from '../Utils/Modals/Modals'
import { dataInscription, filter, testInscriptions } from '../../import/staticData'
import { AiOutlineEye } from 'react-icons/ai'
import { HiOutlinePencil } from 'react-icons/hi'
import { Button } from '../Utils/Button/Button'

const Bitacoras = () => {
  const [mostrarModal, setMostrarModal] = useState(false)
  const [filteredData, setFilteredData] = useState([])
  const [modalDetalles, setModalDetalles] = useState()

  const handleIconClick = () => {
    setMostrarModal(!mostrarModal)
  }

  const handleModal = () => {
    setMostrarModal(!mostrarModal)
  }

  const handleDetalles = () => {
    setModalDetalles(!modalDetalles)
  }

  const filterBitacoras = filter.filterBitacoras

  const filterEstado = (estado) => {
    const filtered = testInscriptions.data.filter((x) => {
      return estado ? x.estado === estado : true
    })

    setFilteredData(filtered)
  }

  return (
    <>
      {mostrarModal && <Modals bodyFilter view={filterBitacoras} title={'Bitacoras'} closeModal={handleModal} />}
      {modalDetalles && <Modals detallesBitacoras title={'Detalles'} closeModal={handleDetalles} />}
      <main className="flex flex-row min-h-screen">
        <Siderbar />
        <section className="relative grid flex-auto w-min grid-rows-3-10-75-15">
          <header className="grid place-items-center">
            <Search filter iconClick={handleIconClick} />
          </header>
          <div>
            <section className="w-11/12 mx-auto">
              <div className="flex gap-5 mx-auto w-fit">
                <Button bg="bg-secondary/10" value={'BITÁCORAS CALIFICADAS'} textColor="text-black" font="font-normal" px="px-2" rounded="rounded-t-lg" textSize="text-sm" clickeame={() => filterEstado('Calificado')} />
                <Button bg="bg-secondary/10" value={'BITÁCORAS SIN CALIFICAR'} textColor="text-black" font="font-normal" px="px-2" rounded="rounded-t-lg" textSize="text-sm" clickeame={() => filterEstado('Sin Calificar')} />
              </div>
              <table className="w-full table-auto">
                <thead>
                  <tr className="text-sm leading-normal text-gray-600 bg-gray-200">
                    <th className="py-3 text-center whitespace-nowrap">Nombres y Apellidos</th>
                    <th className="py-3 text-center whitespace-nowrap">Programa de Formación</th>
                    <th className="py-3 text-center">Ficha</th>
                    <th className="py-3 text-center">Estado</th>
                    <th className="py-3 text-center">Fechas</th>
                    <th className="py-3 text-center">Detalles</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-light text-gray-600">
                  {filteredData.length > 0
                    ? filteredData.map((x, i) => (
                        <tr className="border-b border-gray-200" key={i}>
                          <td className="px-3 text-center">
                            <span className="font-medium break-words">{x.nombreCompleto}</span>
                          </td>
                          <td className="px-3 text-center">
                            <span className="break-words">{x.programaFormacion}</span>
                          </td>
                          <td className="px-6 py-3 text-center">
                            <div className="flex items-center justify-center">
                              <span>{x.ficha}</span>
                            </div>
                          </td>
                          <td className="px-6 py-3 text-center whitespace-nowrap">
                            <Button bg={x.estado === 'Sin Calificar' ? 'bg-red-200' : 'bg-green-200'} px={x.estado === 'Sin Calificar' ? 'px-3' : 'px-4'} py={'py-1'} textSize={'text-xs'} font={'font-medium'} rounded={'rounded-full'} textColor={x.estado === 'Sin Calificar' ? 'text-red-600' : 'text-green-600'} value={x.estado} />
                          </td>
                          <td className="px-6 py-3 text-center">
                            <div className="flex items-center justify-center">
                              <span>{x.fecha}</span>
                            </div>
                          </td>
                          <td className="px-6 py-3 text-center">
                            <div className="w-4 mr-2 transform cursor-pointer hover:scale-125 hover:text-purple-500" onClick={handleDetalles}>
                              <AiOutlineEye />
                            </div>
                          </td>
                        </tr>
                      ))
                    : testInscriptions.data.map((x, i) => (
                        <tr className="border-b border-gray-200" key={i}>
                          <td className="px-3 text-center">
                            <span className="font-medium break-words">{x.nombreCompleto}</span>
                          </td>
                          <td className="px-3 text-center">
                            <span className="break-words">{x.programaFormacion}</span>
                          </td>
                          <td className="px-6 py-3 text-center">
                            <div className="flex items-center justify-center">
                              <span>{x.ficha}</span>
                            </div>
                          </td>
                          <td className="px-6 py-3 text-center whitespace-nowrap">
                            <Button bg={x.estado === 'Sin Calificar' ? 'bg-red-200' : 'bg-green-200'} px={x.estado === 'Sin Calificar' ? 'px-3' : 'px-4'} py={'py-1'} textSize={'text-xs'} font={'font-medium'} rounded={'rounded-full'} textColor={x.estado === 'Sin Calificar' ? 'text-red-600' : 'text-green-600'} value={x.estado} />
                          </td>
                          <td className="px-6 py-3 text-center">
                            <div className="flex items-center justify-center">
                              <span>{x.fecha}</span>
                            </div>
                          </td>
                          <td className="px-6 py-3 text-center">
                            <div className="w-4 mr-2 transform cursor-pointer hover:scale-125 hover:text-purple-500" onClick={handleDetalles}>
                              <AiOutlineEye />
                            </div>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </section>
          </div>
          <Footer />
        </section>
      </main>
    </>
  )
}

export { Bitacoras }
