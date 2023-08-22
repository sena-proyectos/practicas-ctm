import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import * as XLSX from 'xlsx'
import LoadingUI from 'react-loading'

// icons
import { BsPatchCheck, BsHourglass, BsXOctagon } from 'react-icons/bs'
import { AiOutlineCloudUpload, AiOutlineFileAdd } from 'react-icons/ai'
import { IoAddCircleOutline } from 'react-icons/io5'
import { PiMicrosoftExcelLogoBold } from 'react-icons/pi'

// Componentes
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Siderbar } from '../Siderbar/Sidebar'
import { Button } from '../Utils/Button/Button'
import { Pagination } from '../Utils/Pagination/Pagination'

import { getInscriptions } from '../../api/httpRequest'
import { keysRoles } from '../../import/staticData'
import { LoadingModal, Modals } from '../Utils/Modals/Modals'

export const modalOptionList = {
  confirmModal: 'confirm',
  loadingExcelModal: 'read',
  uploadingExcelModal: 'upload',
  doneExcelModal: 'done'
}

export const RegisterList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inscriptions, setInscriptions] = useState([])
  const [pageNumber, setPageNumber] = useState(-1)
  const [fileName, setFileName] = useState(null)
  const [modalOption, setModalOption] = useState(modalOptionList.confirmModal)
  const excelRef = useRef()
  const navigate = useNavigate()

  const inscriptionsPerPage = 6
  const pageCount = Math.ceil(inscriptions.length / inscriptionsPerPage)
  const startIndex = (pageNumber + 1) * inscriptionsPerPage
  const endIndex = startIndex + inscriptionsPerPage
  const idRol = Number(localStorage.getItem('idRol'))

  const handleRegister = () => {
    return navigate('/registrar-aprendiz')
  }

  const handleModalOption = (data) => setModalOption(data)

  useEffect(() => {
    if (modalOption === 'upload') {
      setTimeout(() => {
        setModalOption(modalOptionList.doneExcelModal)
      }, 3000)
    }
    if (modalOption === 'done') {
      excelRef.current.value = ''
    }
  }, [modalOption])

  useEffect(() => {
    if (isModalOpen === false && modalOption === 'done') setModalOption(modalOptionList.confirmModal)
  }, [isModalOpen])

  useEffect(() => {
    if (modalOption === 'read') readExcelFile()
  }, [modalOption])

  const handleCloseModal = () => {
    excelRef.current.value = ''
    setFileName(null)
    setIsModalOpen(!isModalOpen)
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

  const readExcelFile = () => {
    const { files } = excelRef.current
    const file = files[0]

    // Info a enviar
    const fileData = new FormData()
    fileData.append('excelFile', file)

    // Lo lee
    const reader = new FileReader()

    reader.onload = (e) => {
      const data = e.target.result
      const workbook = XLSX.read(data, { type: 'binary' })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const excelData = XLSX.utils.sheet_to_json(worksheet)

      setTimeout(() => {
        if (excelData) setModalOption(modalOptionList.uploadingExcelModal)
      }, 3000)

      console.log(excelData)
    }

    reader.readAsBinaryString(file)
  }

  const handleExcelFile = () => {
    const { files } = excelRef.current
    if (files.length === 0) {
      //! ...Mostrar error
    }
    const { name } = files[0]
    setFileName(name)
    setIsModalOpen(!isModalOpen)
  }

  return (
    <main className='flex flex-row min-h-screen bg-whitesmoke'>
      {isModalOpen && modalOption === 'confirm' && <Modals setModalOption={handleModalOption} bodyConfirm title={'¿Está seguro?'} loadingFile={fileName} closeModal={handleCloseModal} />}
      {isModalOpen && modalOption === 'read' && <LoadingExcelFileModal />}
      {isModalOpen && modalOption === 'upload' && <UploadingExcelFileModal />}
      {isModalOpen && modalOption === 'done' && <Modals bodyAccept closeModal={handleCloseModal} />}
      <Siderbar />
      <section className='relative grid flex-auto w-min grid-rows-3-10-75-15'>
        <header className='grid place-items-center'>
          <Search filter />
        </header>
        <section className='flex flex-col w-11/12 gap-3 mx-auto mt-2'>
          <TableList inscriptions={inscriptions} startIndex={startIndex} endIndex={endIndex} />
          <div className='flex justify-center h-[13vh] relative bottom-0'>
            <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} pageCount={pageCount} />
          </div>
          {(idRol === Number(keysRoles[0]) || idRol === Number(keysRoles[1])) && (
            <div className='absolute flex flex-row-reverse gap-3 right-12 bottom-16'>
              <Button value={'Agregar'} rounded='rounded-full' bg='bg-green-600' px='px-3' py='py-[4px]' textSize='text-sm' font='font-medium' textColor='text-white' clickeame={handleRegister} icon={<IoAddCircleOutline className='text-xl' />} />
              <div className='rounded-full shadow-md bg-cyan-600'>
                <label htmlFor='upload' className='flex items-center w-full h-full gap-2 px-3 py-2 text-white rounded-full cursor-pointer'>
                  <AiOutlineFileAdd />
                  <span className='text-sm font-medium text-white select-none'>{fileName === null ? 'Subir arhivo' : fileName}</span>
                </label>
                <input id='upload' accept='.xlsx, .xls' type='file' className='hidden w-full' ref={excelRef} onChange={handleExcelFile} />
              </div>
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
    <table className='w-full h-96'>
      <thead className=''>
        <tr className='grid grid-cols-6-columns-table justify-items-center'>
          <th className='text-center text-[16px] w-fit font-semibold whitespace-nowrap'>Nombres Aprendiz</th>
          <th className='text-[16px] w-fit font-semibold whitespace-nowrap'>Modalidad</th>
          <th className='text-[16px] w-fit font-semibold whitespace-nowrap'>Creación</th>
          <th className='text-[16px] w-fit font-semibold whitespace-nowrap'>Avales</th>
          <th className='text-[16px] w-fit font-semibold whitespace-nowrap'>Estado</th>
          <th className='text-[16px] w-fit font-semibold whitespace-nowrap'>Detalles</th>
        </tr>
      </thead>
      <tbody className='grid grid-rows-6'>
        {inscriptions.length === 0 ? (
          <LoadingTableList number={6} />
        ) : (
          inscriptions.slice(startIndex, endIndex).map((x) => {
            return (
              <tr className='grid items-center text-sm border-b border-gray-200 h-[60px] grid-cols-6-columns-table justify-items-center' key={x.id_inscripcion}>
                <td className='max-w-[20ch] font-medium text-center break-words'>{`${x.nombre_inscripcion} ${x.apellido_inscripcion}`}</td>
                <td className='font-light text-center '>{x.modalidad_inscripcion === '1' ? 'Pasantías' : x.modalidad_inscripcion === '2' ? 'Contrato de aprendizaje' : x.modalidad_inscripcion === '3' ? 'Proyecto Productivo' : x.modalidad_inscripcion === '4' ? 'Monitoría' : x.modalidad_inscripcion === '5' ? 'Vinculación laboral' : null}</td>
                <td className='font-light text-center '>{x.fecha_creacion.split('T')[0]}</td>
                <td className='text-sm font-light text-center '>
                  <div className='w-10 mx-auto rounded-full select-none bg-gray'>{x.estado_general_inscripcion === 'Rechazado' ? 'N/A' : `${x.avales_aprobados} | 3`}</div>
                </td>
                <td className='text-sm font-normal text-center whitespace-nowrap'>
                  <div className={`px-2 py-[1px] ${x.estado_general_inscripcion === 'Aprobado' ? 'bg-green-200 text-emerald-700' : x.estado_general_inscripcion === 'Pendiente' ? 'bg-slate-200 text-slate-600' : x.estado_general_inscripcion === 'Rechazado' ? 'bg-red-200 text-red-700' : ''} rounded-full flex flex-row gap-1 items-center justify-center select-none`}>
                    <span>{x.estado_general_inscripcion}</span>
                    <span>{x.estado_general_inscripcion === 'Aprobado' ? <BsPatchCheck /> : x.estado_general_inscripcion === 'Pendiente' ? <BsHourglass /> : x.estado_general_inscripcion === 'Rechazado' ? <BsXOctagon /> : ''}</span>
                  </div>
                </td>
                <td className='text-center'>
                  <Button value={'Detalles'} rounded='rounded-full' bg='bg-sky-600' px='px-2' py='py-[1px]' textSize='text-sm' font='font-medium' clickeame={() => handleAvales(x.id_inscripcion)} />
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
    <tr className='grid items-center text-sm border-b border-gray-200 grid-cols-6-columns-table justify-items-center h-[60px] select-none' key={index}>
      <td className='max-w-[20ch] font-medium text-center break-words'>
        <Skeleton width={150} />
      </td>
      <td className='font-light text-center '>
        <Skeleton width={100} />
      </td>
      <td className='font-light text-center '>
        <Skeleton width={90} />
      </td>
      <td className='text-sm font-light text-center '>
        <Skeleton width={35} borderRadius={40} />
      </td>
      <td className='text-sm font-normal text-center whitespace-nowrap'>
        <Skeleton width={100} borderRadius={20} />
      </td>
      <td className='text-center'>
        <Skeleton width={75} borderRadius={20} />
      </td>
    </tr>
  ))

const LoadingExcelFileModal = () => (
  <LoadingModal title='Leyendo Excel'>
    <section className='flex flex-col gap-3 py-5'>
      <section className='flex flex-col gap-1'>
        <PiMicrosoftExcelLogoBold className='text-[70px] mx-auto' color='green' />
        <LoadingUI type='spin' color='green' height={30} width={30} className='mx-auto' />
      </section>
      <p className='text-slate-500'>Espere por favor.</p>
    </section>
  </LoadingModal>
)

const UploadingExcelFileModal = () => (
  <LoadingModal title='Subiendo Excel'>
    <section className='flex flex-col gap-3 py-5'>
      <section className='flex flex-col gap-1'>
        <AiOutlineCloudUpload className='text-[70px] mx-auto' color='green' />
        <LoadingUI type='spin' color='green' height={30} width={30} className='mx-auto' />
      </section>
      <p className='text-slate-500'>Espere por favor.</p>
    </section>
  </LoadingModal>
)
