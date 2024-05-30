import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// Icons
import { LuSave } from 'react-icons/lu'
import { PiBooksLight } from 'react-icons/pi'
import { FaCalendarAlt } from 'react-icons/fa'

// Components
import { Button } from '../Utils/Button/Button'
import { getBitacorasByStudentId, patchBitacoraById } from '../../api/httpRequest'
import { getUserID } from '../../import/getIDActualUser'
import { CardWithChildren } from '../Utils/Card/Card'
import { apprenticeStore } from '../../store/config'

export const Bitacoras = () => {
  const { id } = useParams()
  const { apprenticeData } = apprenticeStore()

  const [bitacorasInfo, setBitacorasInfo] = useState([])
  const [selectedBitacoraIndex, setSelectedBitacoraIndex] = useState(0)

  /**
   * @function
   *
   * @description
   * Este efecto de React se utiliza para cargar datos de un estudiante desde la memoria caché de la sesión y actualizar el estado del componente cuando se monta por primera vez.
   *
   * @param {function} effect - La función que contiene la lógica del efecto.
   * @param {array} dependencies - Un arreglo de dependencias que determina cuándo se debe ejecutar el efecto. Si está vacío, el efecto se ejecuta solo una vez al montar el componente.
   * @returns {void}
   *
   * @reference
   * Este efecto se utiliza para cargar datos de estudiante almacenados en la memoria caché de la sesión y actualizar el estado del componente al montarse por primera vez.
   *
   */

  // Cargar datos de estudiante desde la memoria caché de la sesión al montar el componente
  useEffect(() => {
    const cachedData = JSON.parse(sessionStorage.getItem('apprenticeData'))
    if (cachedData) {
      apprenticeStore.setState({ apprenticeData: cachedData })
    }
  }, [])

  /**
   * @function
   * @name getDataBitacoras
   * @async
   *
   * @description
   * Esta función realiza una solicitud para obtener la información de las bitácoras asociadas a un estudiante identificado por id. Luego, actualiza el estado bitacorasInfo con la respuesta obtenida. En caso de error, muestra un mensaje de error con la descripción del error o un mensaje genérico.
   *
   * @param {number} id - El ID del estudiante para el cual se desean obtener las cartas.
   * @throws {Error} Si la solicitud no se procesa con éxito, se muestra un mensaje de error.
   * @returns {Promise<void>}
   *
   * @reference
   * Esta función se utiliza para obtener datos de bitácoras de un estudiante y se invoca en respuesta a eventos o acciones en el componente.
   *
   * @example
   * getDataBitacoras();
   *
   */

  // Obtener datos de bitácoras del estudiante
  const getDataBitacoras = async () => {
    try {
      const response = await getBitacorasByStudentId(id)
      setBitacorasInfo(response.data)
    } catch (error) {
      const { message } = error.response?.data?.error?.info ?? {}
      toast.error(message ?? 'Error')
    }
  }

  useEffect(() => {
    getDataBitacoras()
  }, [id])

  // Manejar el envío del formulario de bitácoras
  const handleBitacora = (e, id_bitacora) => {
    e.preventDefault()
    const { id_usuario: usuario_responsable } = getUserID().user
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    console.log(data)

    if (data.calificacion_bitacora === 'on') {
      data.calificacion_bitacora = 'Calificado'
    } else {
      data.calificacion_bitacora = 'Pendiente'
    }

    // Asegurarse de que observaciones_fecha esté incluida en los datos enviados
    data.observaciones_fecha = bitacorasInfo[selectedBitacoraIndex].observaciones_fecha

    modifyBitacora(id_bitacora, { ...data, usuario_responsable })
  }

  // Actualizar bitácora en la base de datos
  const modifyBitacora = async (id, payload) => {
    try {
      await patchBitacoraById(id, payload)
      toast.success('Bitácora modificada correctamente', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        className: 'text-sm'
      })
      getDataBitacoras()
    } catch (error) {
      const message = error.response?.data?.error?.info?.message
      toast.error(message ?? 'Error')
    }
  }

  // Manejar el cambio en el selector de bitácoras
  const handleSelectChange = (event) => {
    setSelectedBitacoraIndex(Number(event.target.value))
  }

  // Verificar si una fecha es válida
  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date)
  }

  // Manejar el cambio de fecha en el selector de fecha
  const handleDateChange = (date) => {
    if (isValidDate(date)) {
      const updatedBitacoras = [...bitacorasInfo]
      updatedBitacoras[selectedBitacoraIndex].observaciones_fecha = date.toISOString()
      setBitacorasInfo(updatedBitacoras)
    }
  }

  const selectedBitacora = bitacorasInfo[selectedBitacoraIndex]

  return (
    <section className='w-full'>
      <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='colored' />

      {bitacorasInfo.length > 0 && selectedBitacora && (
        <CardWithChildren key={selectedBitacora.id_bitacora} classNames='w-full'>
          <form onSubmit={(e) => handleBitacora(e, selectedBitacora.id_bitacora)} className='flex flex-col gap-1.5'>
            <header className='flex flex-row items-center justify-between'>
              <div className='flex flex-row items-center gap-2'>
                <PiBooksLight className='text-3xl' />
                <div className='flex flex-col '>
                  <h2 className='font-medium'>Bitácoras</h2>
                  <div className='flex justify-end mb-4'>
                    <label htmlFor='bitacora-select' className='mr-2'>
                      Seleccionar número de bitácora:{' '}
                    </label>
                    <select id='bitacora-select' value={selectedBitacoraIndex} onChange={handleSelectChange} className='border border-gray-300 rounded'>
                      {bitacorasInfo.map((bitacora, index) => (
                        <option key={bitacora.id_bitacora} value={index}>
                          Bitácora {index + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='flex items-center'>
                    <span>fecha de entrega:</span>
                    <span className={`text-xs ml-2 ${selectedBitacora.calificacion_bitacora === 'Calificado' ? 'visible' : 'hidden'}`}>{selectedBitacora.fecha_entrega}</span>
                  </div>
                </div>
              </div>
              <input name='calificacion_bitacora' type='checkbox' required className='w-4 h-4 rounded-xl accent-teal-600' defaultChecked={selectedBitacora.calificacion_bitacora === 'Calificado'} />
            </header>
            <hr className='border-gray-300' />
            <section className='flex flex-col gap-1 px-2 text-sm'>
              <div className='flex flex-row justify-between'>
                <h3 className='font-bold'>{apprenticeData.nombre_completo}</h3>
                <h3 className='uppercase font-bold'>{apprenticeData.tipo_documento_aprendiz + ' ' + apprenticeData.numero_documento_aprendiz}</h3>
              </div>
              <div className='flex flex-col gap-1'>
                <label className='text-sm' htmlFor='observaciones_fecha'>
                  Fecha de entrega de bitácora:
                  <DatePicker selected={isValidDate(new Date(selectedBitacora.observaciones_fecha)) ? new Date(selectedBitacora.observaciones_fecha) : null} onChange={handleDateChange} name='fecha_entrega' dateFormat='yyyy/MM/dd' className='w-full h-10 p-2 text-sm border-gray-300 focus:outline-none rounded-xl' placeholderText='Seleccionar fecha...' />
                </label>
              </div>
              <div className='flex flex-row items-center justify-between pt-2'>
                <h3>
                  {apprenticeData.numero_ficha} - {apprenticeData.nombre_programa_formacion}
                </h3>
                <div className='w-fit'>
                  <Button bg={'bg-teal-600'} px={'px-3'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'lg'} inline>
                    <LuSave />
                    Guardar
                  </Button>
                </div>
              </div>
            </section>
          </form>
        </CardWithChildren>
      )}
    </section>
  )
}
