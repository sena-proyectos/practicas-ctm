import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

//icons
import { BsPatchCheck, BsHourglass, BsXOctagon } from 'react-icons/bs'

//Componentes
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Siderbar } from '../Siderbar/Sidebar'
import { Button } from '../Utils/Button/Button'
import { Pagination } from '../Utils/Pagination/Pagination'

import { getInscriptions } from '../../api/httpRequest'

export const RegisterList = () => {
  const [pageNumber, setPageNumber] = useState(0)
  const [inscriptions, setInscriptions] = useState([])

  useEffect(() => {
    const getRegistros = async () => {
      try {
        const response = await getInscriptions()
        const { data } = response.data
        setInscriptions(data)
      } catch (error) {
        setError('Error al obtener los aprendices')
      }
    }
    setTimeout(getRegistros, 1000)
  }, [])

  const inscriptionsPerPage = 6
  const pageCount = Math.ceil(inscriptions.length / inscriptionsPerPage)
  const startIndex = pageNumber * inscriptionsPerPage
  const endIndex = startIndex + inscriptionsPerPage

  const navigate = useNavigate()
  const handleAvales = (id) => {
    return navigate(`/registro-detalles?id=${id}`)
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
              {inscriptions.slice(startIndex, endIndex).map((x) => {
                return (
                  <tr className="text-sm border-b border-gray-200 h-[3rem]" key={x.id_inscripcion}>
                    <td className="font-medium text-center break-words ">
                      {x.nombre_inscripcion} {x.apellido_inscripcion}
                    </td>
                    <td className="px-5 font-light text-center">{x.modalidad_inscripcion === '1' ? 'Contrato de aprendizaje' : x.modalidad_inscripcion === '2' ? 'Pasantías' : null}</td>
                    <td className="px-5 font-light text-center">{x.fecha_creacion}</td>
                    <td className="px-5 text-sm font-light text-center">
                      <div className="w-10 rounded-full select-none bg-gray">{/* {x.avales}  */}| 3</div>
                    </td>
                    <td className="px-5 text-sm font-normal text-center whitespace-nowrap">
                      <div className={`px-2 py-[1px] ${x.estado_general_inscripcion === 'Aprobado' ? 'bg-green-200 text-emerald-700' : x.estado_general_inscripcion === 'Pendiente' ? 'bg-slate-200 text-slate-600' : x.estado_general_inscripcion === 'Rechazado' ? 'bg-red-200 text-red-700' : ''} rounded-full flex flex-row gap-1 items-center justify-center select-none`}>
                        <span>{x.estado_general_inscripcion}</span>
                        <span>{x.estado_general_inscripcion === 'Aprobado' ? <BsPatchCheck /> : x.estado_general_inscripcion === 'Pendiente' ? <BsHourglass /> : x.estado_general_inscripcion === 'Rechazado' ? <BsXOctagon /> : ''}</span>
                      </div>
                    </td>
                    <td className="text-center">
                      <Button value={'Detalles'} rounded="rounded-full" bg="bg-sky-600" px="px-2" py="py-[1px]" textSize="text-sm" font="font-medium" clickeame={() => handleAvales(x.id_inscripcion)} />
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
