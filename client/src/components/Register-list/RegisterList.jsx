import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import decode from 'jwt-decode'
import LoadingUI from 'react-loading'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'

// icons
import { BsPatchCheck, BsHourglass, BsXOctagon } from 'react-icons/bs'
import { AiOutlineCloudUpload, AiOutlineFileAdd } from 'react-icons/ai'
import { IoAddCircleOutline } from 'react-icons/io5'
import { PiMicrosoftExcelLogoBold, PiCaretRightBold } from 'react-icons/pi'
import { BiSad } from 'react-icons/bi'
import { TiDelete } from 'react-icons/ti'

// Componentes
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Siderbar } from '../Siderbar/Sidebar'
import { Button } from '../Utils/Button/Button'
import { Pagination } from '../Utils/Pagination/Pagination'

import { InscriptionApprentice, getInscriptions, readExcel } from '../../api/httpRequest'
import { keysRoles } from '../../import/staticData'
import { LoadingModal, ModalConfirm } from '../Utils/Modals/Modals'

export const modalOptionList = {
  confirmModal: 'confirm',
  loadingExcelModal: 'read',
  uploadingExcelModal: 'toUpload',
  doneExcelModal: 'toEnd'
}

export const RegisterList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inscriptions, setInscriptions] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const [fileName, setFileName] = useState(null)
  const [modalOption, setModalOption] = useState(modalOptionList.confirmModal)
  const [username, setUsername] = useState(null)
  const [loadingData, setLoadingData] = useState(true)
  const excelRef = useRef()
  const navigate = useNavigate()
  const [showFiltros, setShowFiltros] = useState(false)
  const [filtersButtons, setFiltersButtons] = useState({ modalidad: false, estado: false, fecha: false })
  const [activeFilter, setActiveFilter] = useState(false)
  const [inscriptionOriginal, setInscriptionOriginal] = useState([])

  const inscriptionsPerPage = 6
  const pageCount = Math.ceil(inscriptions.length / inscriptionsPerPage)
  const startIndex = pageNumber * inscriptionsPerPage
  const endIndex = startIndex + inscriptionsPerPage
  const idRol = Number(localStorage.getItem('idRol'))

  const handleRegister = () => {
    return navigate('/registrar-aprendiz')
  }

  useEffect(() => {
    const token = Cookies.get('token')
    const { nombres_usuario, apellidos_usuario } = decode(token).data.user
    setUsername(`${nombres_usuario} ${apellidos_usuario}`)
  }, [])

  const handleModalOption = (data) => setModalOption(data)

  const notify = () => {
    toast.success('Archivo excel leído correctamente', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      className: 'text-sm'
    })
  }

  const handleCloseModal = () => {
    excelRef.current.value = ''
    setModalOption(modalOptionList.confirmModal)
    setFileName(null)
    setIsModalOpen(!isModalOpen)
  }

  const getRegistros = async () => {
    try {
      const response = await getInscriptions()
      const { data } = response.data
      setInscriptions(data)
      setInscriptionOriginal(data)
      setLoadingData(false)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    getRegistros()
  }, [])

  useEffect(() => {
    if (modalOption === modalOptionList.loadingExcelModal) readExcelFile()
  }, [modalOption])

  const readExcelFile = async () => {
    const { files } = excelRef.current
    const file = files[0]
    const fileData = new FormData()
    fileData.append('excelFile', file)
    const { data, code } = await (await readExcel(fileData)).data
    const dataToSend = data.map((item, index) => {
      return {
        ...data[index],
        responsable_inscripcion: username
      }
    })
    setTimeout(() => {
      uploadExcelFile(dataToSend, code)
    }, 1000)
  }

  const uploadExcelFile = async (payload, code) => {
    try {
      await InscriptionApprentice(payload)
      setModalOption(code)
      setTimeout(() => {
        handleCloseModal()
        notify()
        getRegistros()
      }, 1000)
    } catch (error) {
      const message = error?.response?.data?.error?.info?.message
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message ?? 'Ha ocurrido un error, intentelo de nuevo'
      })
      handleCloseModal()
    }
  }

  const handleExcelFile = () => {
    const { files } = excelRef.current
    if (files.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El archivo ingresado está vacio, corrígelo'
      })
      handleCloseModal()
    }
    const { name } = files[0]
    setFileName(name)
    setIsModalOpen(!isModalOpen)
  }

  const handleFilter = () => {
    setShowFiltros(!showFiltros)
  }

  const disableShowFiltros = () => {
    setTimeout(() => {
      setShowFiltros(false)
      setFiltersButtons({ modalidad: false, estado: false, fecha: false })
    }, 100)
  }

  const ShowFilter = (filterType) => {
    if (filterType === 'modalidad') setFiltersButtons({ modalidad: !filtersButtons.modalidad, etapa: false, fecha: false })
    if (filterType === 'estado') setFiltersButtons({ estado: !filtersButtons.estado, modalidad: false, fecha: false })
    if (filterType === 'fecha') setFiltersButtons({ fecha: !filtersButtons.fecha, modalidad: false, estado: false })
  }

  const handleTypeFilter = (filterType, filter) => {
    if (filterType === 'modalidad') {
      const filterMap = inscriptionOriginal.filter((inscription) => inscription.nombre_modalidad === filter)
      setInscriptions(filterMap)
    }
    if (filterType === 'estado') {
      const filterMap = inscriptionOriginal.filter((inscription) => inscription.estado_general_inscripcion === filter)
      setInscriptions(filterMap)
    }
    disableShowFiltros()
    setActiveFilter(true)
  }

  const handleResetFilter = () => {
    setInscriptions(inscriptionOriginal)
    disableShowFiltros()
    setActiveFilter(false)
  }

  return (
    <main className='flex flex-row min-h-screen bg-whitesmoke'>
      <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} theme='colored' />
      {isModalOpen && modalOption === modalOptionList.confirmModal && <ModalConfirm setModalOption={handleModalOption} title={'¿Está seguro?'} loadingFile={fileName} closeModal={handleCloseModal} />}
      {isModalOpen && modalOption === modalOptionList.loadingExcelModal && <LoadingExcelFileModal />}
      {isModalOpen && modalOption === modalOptionList.uploadingExcelModal && <UploadingExcelFileModal />}
      <Siderbar />
      <section className='relative grid flex-auto w-min grid-rows-3-10-75-15'>
        <header className='grid place-items-center'>
          <Search filter iconClick={handleFilter} />
          <ul className={`absolute right-80 mt-1 top-4 w-36 flex flex-col gap-y-1 py-2 text-sm border border-gray rounded-lg bg-white ${showFiltros ? 'visible' : 'hidden'} z-10 transition-all duration-200`} onMouseLeave={disableShowFiltros}>
            <li>
              <button type='button' className='relative flex items-center justify-between w-full h-full px-3 py-1 hover:bg-whitesmoke text-slate-800' onClick={() => ShowFilter('modalidad')}>
                Modalidad
                <PiCaretRightBold className={`text-md mt-[1px] ${filtersButtons.modalidad ? 'rotate-90' : 'rotate-0'} transition-all duration-200`} />
                {filtersButtons.modalidad && (
                  <section className='absolute left-full ml-[2px] bg-white top-0 border border-gray rounded-lg'>
                    <ul className='flex flex-col gap-1 py-2 w-44'>
                      <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleTypeFilter('modalidad', 'Pasantías')}>
                        Pasantías
                      </li>
                      <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleTypeFilter('modalidad', 'Proyecto Productivo')}>
                        Proyecto Productivo
                      </li>
                      <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleTypeFilter('modalidad', 'Monitoría')}>
                        Monitoría
                      </li>
                      <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleTypeFilter('modalidad', 'Vinculación laboral')}>
                        Vinculación laboral
                      </li>
                    </ul>
                  </section>
                )}
              </button>
            </li>
            <li>
              <button type='button' className='relative flex items-center justify-between w-full h-full px-3 py-1 hover:bg-whitesmoke text-slate-800' onClick={() => ShowFilter('estado')}>
                Estado
                <PiCaretRightBold className={`text-md mt-[1px] ${filtersButtons.estado ? 'rotate-90' : 'rotate-0'} transition-all duration-200`} />
                {filtersButtons.estado && (
                  <section className='absolute left-full ml-[2px] bg-white top-0 border border-gray rounded-lg'>
                    <ul className='flex flex-col w-40 gap-1 py-2'>
                      <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleTypeFilter('estado', 'Aprobado')}>
                        Aprobado
                      </li>
                      <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleTypeFilter('estado', 'Pendiente')}>
                        Pendiente
                      </li>
                      <li className='w-full px-3 py-1 text-left transition-colors hover:bg-whitesmoke hover:text-black' onClick={() => handleTypeFilter('estado', 'Rechazado')}>
                        Rechazado
                      </li>
                    </ul>
                  </section>
                )}
              </button>
            </li>
            <li>
              <button type='button' className='relative flex items-center justify-between w-full h-full px-3 py-1 hover:bg-whitesmoke text-slate-800' onClick={() => ShowFilter('fecha')}>
                Fecha
                <PiCaretRightBold className={`text-md mt-[1px] ${filtersButtons.fecha ? 'rotate-90' : 'rotate-0'} transition-all duration-200`} />
                {filtersButtons.fecha && (
                  <section className='absolute left-full ml-[2px] bg-white top-0 border border-gray rounded-lg h-10 flex items-center'>
                    <form action=''>
                      <input type='date' className='w-full py-1 pl-2 pr-3 text-sm text-black focus:text-gray-900 rounded-xl focus:bg-white focus:outline-none placeholder:text-slate-400' />
                    </form>
                  </section>
                )}
              </button>
            </li>
          </ul>
          {activeFilter && (
            <section className='absolute right-3'>
              <button type='button' className='text-sm font-light flex items-center gap-[2px] hover:text-red-500 transition-colors' onClick={handleResetFilter}>
                <TiDelete className='text-xl text-red-500' /> Borrar Filtro
              </button>
            </section>
          )}
        </header>
        <section className='flex flex-col w-11/12 gap-3 mx-auto overflow-x-auto'>
          <TableList inscriptions={inscriptions} startIndex={startIndex} endIndex={endIndex} loadingData={loadingData} />
          <div className='flex justify-center h-[11.5vh] relative bottom-0'>
            <Pagination setPageNumber={setPageNumber} pageCount={pageCount} />
          </div>
          {(idRol === Number(keysRoles[0]) || idRol === Number(keysRoles[1])) && (
            <div className='absolute flex flex-row-reverse gap-3 right-12 bottom-16'>
              <Button rounded='rounded-full' bg='bg-green-600' px='px-3' py='py-[4px]' textSize='text-sm' font='font-medium' textColor='text-white' onClick={handleRegister} inline>
                <IoAddCircleOutline className='text-xl' /> Agregar
              </Button>
              <div className='rounded-full shadow-md bg-cyan-600'>
                <label htmlFor='upload' className='flex items-center w-full h-full gap-2 px-3 py-2 text-white rounded-full cursor-pointer'>
                  <AiOutlineFileAdd />
                  <span className='text-sm font-medium text-white select-none'>Subir arhivo</span>
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

const TableList = ({ inscriptions, startIndex = 0, endIndex = 6, loadingData }) => {
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
        {inscriptions.length > 0 ? (
          inscriptions.slice(startIndex, endIndex).map((x) => {
            return (
              <tr className='grid items-center text-sm border-b border-gray-200 h-[60px] grid-cols-6-columns-table justify-items-center' key={x.id_inscripcion}>
                <td className='max-w-[20ch] font-medium text-center break-words'>{`${x.nombre_inscripcion} ${x.apellido_inscripcion}`}</td>
                <td className='font-light text-center max-w-[10ch] break-words'>{x.nombre_modalidad}</td>
                <td className='font-light text-center '>{x.fecha_creacion.split('T')[0]}</td>
                <td className='text-sm font-light text-center '>
                  <div className='w-10 mx-auto rounded-full select-none bg-grayPrimary'>{x.estado_general_inscripcion === 'Rechazado' ? 'N/A' : `${x.avales_aprobados} | 4`}</div>
                </td>
                <td className='text-sm font-normal text-center whitespace-nowrap'>
                  <div className={`px-2 py-[1px] ${x.estado_general_inscripcion === 'Aprobado' ? 'bg-green-200 text-emerald-700' : x.estado_general_inscripcion === 'Pendiente' ? 'bg-slate-200 text-slate-600' : x.estado_general_inscripcion === 'Rechazado' ? 'bg-red-200 text-red-700' : ''} rounded-full flex flex-row gap-1 items-center justify-center select-none`}>
                    <span>{x.estado_general_inscripcion}</span>
                    <span>{x.estado_general_inscripcion === 'Aprobado' ? <BsPatchCheck /> : x.estado_general_inscripcion === 'Pendiente' ? <BsHourglass /> : x.estado_general_inscripcion === 'Rechazado' ? <BsXOctagon /> : ''}</span>
                  </div>
                </td>
                <td className='text-center'>
                  <Button rounded='rounded-full' bg='bg-sky-600' px='px-2' py='py-[1px]' textSize='text-sm' font='font-medium' onClick={() => handleAvales(x.id_inscripcion)}>
                    Detalles
                  </Button>
                </td>
              </tr>
            )
          })
        ) : loadingData ? (
          <LoadingTableList number={6} />
        ) : (
          <tr className='grid h-full mt-10 place-content-center'>
            <th scope='row' className='flex items-center gap-1 text-xl text-red-500'>
              <p>¡Oops! No hay ninguna inscripción con este filtro.</p>
              <BiSad className='text-2xl' />
            </th>
          </tr>
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
