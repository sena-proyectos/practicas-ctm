import { Siderbar } from '../Siderbar/Sidebar'
import { Search } from '../Search/Search'
import { Footer } from '../Footer/Footer'
import { Button } from '../Utils/Button/Button'
import { HiOutlinePencil } from 'react-icons/hi'
import { useState } from 'react'
import { Modals } from '../Utils/Modals/Modals'

const Approvement = () => {
  const [modalAval, setModalAval] = useState(false)

  const handleAvales = () => {
    setModalAval(!modalAval)
  }

  return (
    <>
      {modalAval && <Modals bodyAvales closeModal={handleAvales} />}
      <main className="flex flex-row min-h-screen">
        <Siderbar />
        <section className="relative grid flex-auto w-min grid-rows-3-10-75-15">
          <header className="grid place-items-center">
            <Search filter />
          </header>
          <section>
            <table className="w-11/12 mx-auto">
              <thead>
                <tr>
                  <th className="px-6 text-[16px] font-semibold whitespace-nowrap">Nombre Completo</th>
                  <th className="px-6 text-[16px] font-semibold">Ficha</th>
                  <th className="px-6 text-[16px] font-semibold whitespace-nowrap">Documentos PDF</th>
                  <th className="px-6 text-[16px] font-semibold">Revisión</th>
                  <th className="px-6 text-[16px] font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 font-medium text-center break-words ">Guillermo Stiven Benjumea Morales</td>
                  <td className="px-5 font-light text-center">2473196</td>
                  <td className="text-center">
                    <Button value={'Descargar'} rounded="rounded-full" bg="bg-secondary/50" textColor="text-secondary" px="px-2" py="py-[1px]" textSize="text-sm" font="font-medium" />
                  </td>
                  <td className="py-3 text-center">
                    <div className="mx-auto transform cursor-pointer w-fit hover:scale-125 hover:text-purple-500" onClick={handleAvales}>
                      <HiOutlinePencil className="text-xl" />
                    </div>
                  </td>
                  <td className="px-5 font-light text-center">Aprobado</td>
                </tr>
              </tbody>
            </table>
          </section>
          <Footer />
        </section>
      </main>
    </>
  )
}

export { Approvement }
