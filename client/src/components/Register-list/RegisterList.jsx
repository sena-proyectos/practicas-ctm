import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'

//icons
import { BsPatchCheck, BsHourglass, BsXOctagon } from 'react-icons/bs'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { IoAddCircleOutline } from 'react-icons/io5'

//Componentes
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Siderbar } from '../Siderbar/Sidebar'
import { Button } from '../Utils/Button/Button'
import { Pagination } from '../Utils/Pagination/Pagination'

import { getInscriptions } from '../../api/httpRequest'
import { keysRoles } from '../../import/staticData'

export const RegisterList = () => {
  const [inscriptions, setInscriptions] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const navigate = useNavigate()

  const inscriptionsPerPage = 6
  const pageCount = Math.ceil(inscriptions.length / inscriptionsPerPage)
  const startIndex = pageNumber * inscriptionsPerPage
  const endIndex = startIndex + inscriptionsPerPage

  const idRol = Number(localStorage.getItem('idRol'))

  const handleRegister = () => {
    return navigate('/registrar-aprendiz')
  }

  useEffect(() => {
    const getRegistros = async () => {
      try {
        const response = await getInscriptions()
        const { data } = response.data
        setInscriptions(data)
      } catch (error) {
        throw new Error(error)
      }
    }
    getRegistros()
  }, [])
  return (
    <main className="flex flex-row min-h-screen">
      <Siderbar />
      <section className="relative grid flex-auto w-min grid-rows-3-10-75-15">
        <header className="grid place-items-center">
          <Search filter />
        </header>
        <section className="flex flex-col w-11/12 gap-3 mx-auto mt-2">
          <TableList inscriptions={inscriptions} startIndex={startIndex} endIndex={endIndex} />
          <div className="flex justify-center h-[13vh] relative bottom-0">
            <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} pageCount={pageCount} />
          </div>
          {(idRol === Number(keysRoles[0]) || idRol === Number(keysRoles[1])) && (
            <div className="absolute flex flex-row-reverse gap-3 right-12 bottom-16">
              <Button value={'Agregar'} rounded="rounded-full" bg="bg-green-600" px="px-3" py="py-[4px]" textSize="text-sm" font="font-medium" textColor="text-white" clickeame={handleRegister} icon={<IoAddCircleOutline className="text-xl" />} />
              <Button value={'Subir excel'} rounded="rounded-full" bg="bg-cyan-600" px="px-3" py="py-[6px]" textSize="text-sm" textColor="text-white" font="font-medium" clickeame={handleRegister} icon={<AiOutlineFileAdd className="text-lg" />} />
            </div>
          )}
        </section>
        <Footer />
      </section>
    </main>
  )
}

const TableList = ({ inscriptions, startIndex = 0, endIndex = 6 }) => {
  const navigate = useNavigate()
  const handleAvales = (id) => {
    return navigate(`/registro-detalles/${id}`)
  }
  return (
    <table className="w-full h-96">
      <thead className="">
        <tr className="grid grid-cols-6-columns-table justify-items-center">
          <th className="text-center text-[16px] w-fit font-semibold whitespace-nowrap">Nombres Aprendiz</th>
          <th className="text-[16px] w-fit font-semibold whitespace-nowrap">Modalidad</th>
          <th className="text-[16px] w-fit font-semibold whitespace-nowrap">Creación</th>
          <th className="text-[16px] w-fit font-semibold whitespace-nowrap">Avales</th>
          <th className="text-[16px] w-fit font-semibold whitespace-nowrap">Estado</th>
          <th className="text-[16px] w-fit font-semibold whitespace-nowrap">Detalles</th>
        </tr>
      </thead>
      <tbody className="grid grid-rows-6">
        {inscriptions.length === 0 ? (
          <LoadingTableList number={3} />
        ) : (
          inscriptions.slice(startIndex, endIndex).map((x) => {
            return (
              <tr className="grid items-center text-sm border-b border-gray-200 h-[60px] grid-cols-6-columns-table justify-items-center" key={x.id_inscripcion}>
                <td className="max-w-[20ch] font-medium text-center break-words">{`${x.nombre_inscripcion} ${x.apellido_inscripcion}`}</td>
                <td className="font-light text-center ">{x.modalidad_inscripcion === '1' ? 'Pasantías' : x.modalidad_inscripcion === '2' ? 'Contrato de aprendizaje' : null}</td>
                <td className="font-light text-center ">{x.fecha_creacion.split('T')[0]}</td>
                <td className="text-sm font-light text-center ">
                  <div className="w-10 mx-auto rounded-full select-none bg-gray">{x.estado_general_inscripcion === 'Rechazado' ? 'N/A' : `${x.avales_aprobados} | 3`}</div>
                </td>
                <td className="text-sm font-normal text-center whitespace-nowrap">
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
          })
        )}
      </tbody>
    </table>
  )
}

const LoadingTableList = ({ number = 6 }) =>
  [...Array(number)].map((_, index) => (
    <tr className="grid items-center text-sm border-b border-gray-200 grid-cols-6-columns-table justify-items-center h-28" key={index}>
      <td className="max-w-[20ch] font-medium text-center break-words">
        <Skeleton width={150} />
      </td>
      <td className="font-light text-center ">
        <Skeleton width={100} />
      </td>
      <td className="font-light text-center ">
        <Skeleton width={90} />
      </td>
      <td className="text-sm font-light text-center ">
        <Skeleton width={35} borderRadius={40} />
      </td>
      <td className="text-sm font-normal text-center whitespace-nowrap">
        <Skeleton width={100} borderRadius={20} />
      </td>
      <td className="text-center">
        <Skeleton width={75} borderRadius={20} />
      </td>
    </tr>
  ))
