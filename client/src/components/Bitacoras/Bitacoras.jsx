import { useState } from 'react'
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Siderbar } from '../Siderbar/Sidebar'
import { Modals } from '../Utils/Modals/Modals'
import { filter } from '../../import/staticData'
import { AiOutlineEye } from 'react-icons/ai'
import { HiOutlinePencil } from 'react-icons/hi'
import { Button } from '../Button/Button'

const Bitacoras = () => {
  const [mostrarModal, setMostrarModal] = useState(false)

  const handleIconClick = () => {
    setMostrarModal(!mostrarModal)
  }

  const handleModal = () => {
    setMostrarModal(!mostrarModal)
  }
  const filterBitacoras = filter.filterBitacoras
  return (
    <>
      {mostrarModal && <Modals bodyFilter view={filterBitacoras} title={'Bitacoras'} closeModal={handleModal} />}
      <main className="flex flex-row min-h-screen">
        <Siderbar />
        <section className="grid grid-rows-3-10-75-15 flex-auto w-min relative">
          <header className="grid place-items-center">
            <Search filter iconClick={handleIconClick} />
          </header>
          <div>
            <section className="w-11/12 mx-auto">
              <div className="w-fit flex gap-5 mx-auto">
                <Button
                  bg="bg-secondary/10"
                  value={'BITÁCORAS CALIFICADAS'}
                  textColor="text-black"
                  font="font-normal"
                  px="px-2"
                  rounded="rounded-t-lg"
                  textSize="text-sm"
                  //  clickeame={}
                />
                <Button
                  bg="bg-secondary/10"
                  value={'BITÁCORAS SIN CALIFICAR'}
                  textColor="text-black"
                  font="font-normal"
                  px="px-2"
                  rounded="rounded-t-lg"
                  textSize="text-sm"
                  // clickeame={}
                />
              </div>
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                    <th className="py-3 text-center whitespace-nowrap">Nombres y Apellidos</th>
                    <th className="py-3 text-center whitespace-nowrap">Programa de Formación</th>
                    <th className="py-3 text-center">Ficha</th>
                    <th className="py-3 text-center">Estado</th>
                    <th className="py-3 text-center">Fechas</th>
                    <th className="py-3 text-center">Detalles</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  <tr className="border-b border-gray-200">
                    <td className="px-3 text-center">
                      <span className="font-medium break-words">Guillermo Stiven Benjumea Morales</span>
                    </td>
                    <td className="px-3 text-center">
                      <span className="break-words">Fabicación de Muebles Contemporaneos y Modulares</span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        <span>2345678</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center whitespace-nowrap">
                      <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">Sin Calificar</span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        <span>29/06/2023</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-4 mr-2 cursor-pointer transform hover:text-purple-500 hover:scale-125">
                          <AiOutlineEye />
                        </div>
                        <div className="w-4 mr-2 cursor-pointer transform hover:text-purple-500 hover:scale-125">
                          <HiOutlinePencil />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
                    <td className="px-3 text-center">
                      <span className="font-medium break-words">Stiven Blandón Urrego</span>
                    </td>
                    <td className="px-3 text-center">
                      <span className="break-words">Analisis y Desarrollo de Software</span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        <span>2345678</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center whitespace-nowrap">
                      <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">Calificado</span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        <span>29/06/2023</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-4 mr-2 cursor-pointer transform hover:text-purple-500 hover:scale-125">
                          <AiOutlineEye />
                        </div>
                        <div className="w-4 mr-2 cursor-pointer transform hover:text-purple-500 hover:scale-125">
                          <HiOutlinePencil />
                        </div>
                      </div>
                    </td>
                  </tr>
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
