import { Siderbar } from '../Siderbar/Sidebar'
import { Search } from '../Search/Search'
import { Footer } from '../Footer/Footer'
import { Button } from '../Utils/Button/Button'
import { HiOutlinePencil } from 'react-icons/hi'
import { useEffect, useState } from 'react'
import { Modals } from '../Utils/Modals/Modals'
import { BsThreeDotsVertical } from 'react-icons/bs'

const Approvement = () => {
  const [modalAval, setModalAval] = useState(false)
  const [isListVisible, setListVisible] = useState(false)
  const [filteredData, setFilteredData] = useState([])

  const handleAvales = () => {
    setModalAval(!modalAval)
  }

  const toggleList = () => {
    setListVisible(!isListVisible)
  }

  const approvements = {
    data: [
      {
        name: 'Guillermo Stiven Benjumea Morales',
        ficha: '2473196',
        estado: 'Aprobado',
      },
      {
        name: 'Stiven Blandón Urrego',
        ficha: '1234567',
        estado: 'Sin aprobar',
      },
      {
        name: 'Lorena Quiceno Giraldo',
        ficha: '7654321',
        estado: 'Rechazado',
      },
    ],
  }

  const filterAprov = (estado) => {
    const filtered = approvements.data.filter((x) => {
      return estado ? x.estado === estado : true
    })

    setFilteredData(filtered)
    setListVisible(false)
  }

  useEffect(() => {
    filterAprov('Sin aprobar')
  }, [])

  return (
    <>
      {modalAval && <Modals bodyAvales title={'Guillermo Stiven Benjumea Morales'} subtitle textSubtitle={'2473196'} closeModal={handleAvales} />}
      <main className="flex flex-row min-h-screen">
        <Siderbar />
        <section className="relative grid flex-auto w-min grid-rows-3-10-75-15">
          <header className="grid place-items-center">
            <Search filter />
          </header>
          <section className="w-11/12 mx-auto">
            <div className="flex flex-row-reverse gap-2 pb-2">
              <button onClick={toggleList}>
                <BsThreeDotsVertical className="w-7 h-7" />
              </button>
              {isListVisible && (
                <ul className="shadow-2xl bg-gray rounded-xl w-[8rem] cursor-pointer">
                  <li className="w-full text-center hover:bg-[#bdbbbb] hover:rounded-t-xl border-b-1 font-light text-sm" onClick={() => filterAprov('Aprobado')}>
                    Aprobado
                  </li>
                  <li className="w-full text-center font-light text-sm hover:bg-[#bdbbbb]" onClick={() => filterAprov('Sin aprobar')}>
                    Sin aprobar
                  </li>
                  <li className="w-full text-center hover:bg-[#bdbbbb] font-light text-sm hover:rounded-b-xl border-t-1" onClick={() => filterAprov('Rechazado')}>
                    Rechazado
                  </li>
                </ul>
              )}
            </div>
            <table className="w-full table-auto">
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
                {filteredData.length > 0
                  ? filteredData.map((x, i) => (
                      <tr className="border-b border-gray-200" key={i}>
                        <td className="py-2 font-medium text-center break-words ">{x.name}</td>
                        <td className="px-5 font-light text-center">{x.ficha}</td>
                        <td className="text-center">
                          <Button value={'Descargar'} rounded="rounded-full" bg="bg-secondary/50" textColor="text-secondary" px="px-2" py="py-[1px]" textSize="text-sm" font="font-medium" />
                        </td>
                        <td className="py-3 text-center">
                          <div className="mx-auto transform cursor-pointer w-fit hover:scale-125 hover:text-purple-500" onClick={handleAvales}>
                            <HiOutlinePencil className="text-xl" />
                          </div>
                        </td>
                        <td className="px-5 font-light text-center">{x.estado}</td>
                      </tr>
                    ))
                  : approvements.data.map((x, i) => (
                      <tr className="border-b border-gray-200" key={i}>
                        <td className="py-2 font-medium text-center break-words ">{x.name}</td>
                        <td className="px-5 font-light text-center">{x.ficha}</td>
                        <td className="text-center">
                          <Button value={'Descargar'} rounded="rounded-full" bg="bg-secondary/50" textColor="text-secondary" px="px-2" py="py-[1px]" textSize="text-sm" font="font-medium" />
                        </td>
                        <td className="py-3 text-center">
                          <div className="mx-auto transform cursor-pointer w-fit hover:scale-125 hover:text-purple-500" onClick={handleAvales}>
                            <HiOutlinePencil className="text-xl" />
                          </div>
                        </td>
                        <td className="px-5 font-light text-center">{x.estado}</td>
                      </tr>
                    ))}
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
