import { useState } from 'react'
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Siderbar } from '../Siderbar/Sidebar'
import { Button } from '../Utils/Button/Button'
import { Pagination } from '../Utils/Pagination/Pagination'
import { BsPatchCheck, BsHourglass, BsXOctagon } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

export const RegisterList = () => {
  const [pageNumber, setPageNumber] = useState(0)
  const registers = {
    data: [
      {
        name: 'Guillermo Stiven Benjumea Morales',
        modalidad: 'Pasantía',
        estado: 'Aprobado',
        avales: 3,
      },
      {
        name: 'Stiven Blandón Urrego',
        modalidad: 'Monitoria',
        estado: 'Sin aprobar',
        avales: 2,
      },
      {
        name: 'Lorena Quiceno Giraldo',
        modalidad: 'Contrato de Aprendizaje',
        estado: 'Rechazado',
        avales: 0,
      },
      {
        name: 'Guillermo Stiven Benjumea Morales',
        modalidad: 'Contrato Laboral',
        estado: 'Aprobado',
        avales: 3,
      },
      {
        name: 'Stiven Blandón Urrego',
        modalidad: 'Proyecto Productivo',
        estado: 'Sin aprobar',
        avales: 1,
      },
      {
        name: 'Stiven Blandón Urrego',
        modalidad: 'Proyecto Productivo',
        estado: 'Rechazado',
        avales: 0,
      },
    ],
  }

  const registersPerPage = 6
  const pageCount = Math.ceil(registers.data.length / registersPerPage)
  const startIndex = pageNumber * registersPerPage
  const endIndex = startIndex + registersPerPage

  const navigate = useNavigate()
  const handleAvales = () => {
    return navigate('/registro-detalles')
  }
  const handleRegister = () => {
    return navigate('/registrar-aprendiz')
  }

  return (
    <main className="flex flex-row min-h-screen">
      <Siderbar />
      <section className="relative grid flex-auto w-min grid-rows-3-10-75-15">
        <header className="grid place-items-center">
          <Search filter />
        </header>
        <section className="flex flex-col w-11/12 h-full gap-3 mx-auto mt-2">
          <table className="w-full h-full table-auto">
            <thead>
              <tr>
                <th className="px-6 text-[16px] font-semibold whitespace-nowrap">Nombre Completo</th>
                <th className="px-6 text-[16px] font-semibold whitespace-nowrap">Alternativa Práctica</th>
                <th className="px-6 text-[16px] font-semibold whitespace-nowrap">Fecha Creación</th>
                <th className="px-6 text-[16px] font-semibold whitespace-nowrap">Avales</th>
                <th className="px-6 text-[16px] font-semibold whitespace-nowrap">Estado</th>
                <th className="px-6 text-[16px] font-semibold whitespace-nowrap">Detalles</th>
              </tr>
            </thead>
            <tbody>
              {registers.data.slice(startIndex, endIndex).map((x, i) => {
                return (
                  <tr className="text-sm border-b border-gray-200 h-[3rem]" key={i}>
                    <td className="font-medium text-center break-words ">{x.name}</td>
                    <td className="px-5 font-light text-center">{x.modalidad}</td>
                    <td className="px-5 font-light text-center">2023 - 04 - 05</td>
                    <td className="px-5 text-sm font-light text-center">
                      <div className="w-10 rounded-full select-none bg-gray">{x.avales} | 3</div>
                    </td>
                    <td className="px-5 text-sm font-normal text-center whitespace-nowrap">
                      <div className={`px-2 py-[1px] ${x.estado === 'Aprobado' ? 'bg-green-200 text-emerald-700' : x.estado === 'Sin aprobar' ? 'bg-slate-200 text-slate-600' : x.estado === 'Rechazado' ? 'bg-red-200 text-red-700' : ''} rounded-full flex flex-row gap-1 items-center justify-center select-none`}>
                        <span>{x.estado}</span>
                        <span>{x.estado === 'Aprobado' ? <BsPatchCheck /> : x.estado === 'Sin aprobar' ? <BsHourglass /> : x.estado === 'Rechazado' ? <BsXOctagon /> : ''}</span>
                      </div>
                    </td>
                    <td className="text-center">
                      <Button value={'Detalles'} rounded="rounded-full" bg="bg-sky-600" px="px-2" py="py-[1px]" textSize="text-sm" font="font-medium" clickeame={handleAvales} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="flex justify-center h-[13vh] relative bottom-0">
            <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} pageCount={pageCount} />
          </div>
          <div className="absolute flex flex-row-reverse gap-3 right-12 bottom-16">
            <Button value={'Agregar'} rounded="rounded-full" bg="bg-emerald-900" px="px-3" py="py-[4px]" textSize="text-sm" font="font-medium" textColor="text-white" clickeame={handleRegister} />
            <Button value={'Subir excel'} rounded="rounded-full" bg="bg-cyan-600" px="px-3" py="py-[6px]" textSize="text-sm" textColor="text-white" font="font-medium" clickeame={handleRegister} />
          </div>
        </section>
        <Footer />
      </section>
    </main>
  )
}
