import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

// Icons
import { LuSave } from 'react-icons/lu'
import { PiBooksLight } from 'react-icons/pi'

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
   * Esta función realiza una solicitud para obtener la información de las bitácoras asociadas a un estudiante identificado por `id`. Luego, actualiza el estado `bitacorasInfo` con la respuesta obtenida. En caso de error, muestra un mensaje de error con la descripción del error o un mensaje genérico.
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
  const getDataBitacoras = async () => {
    try {
      const response = await getBitacorasByStudentId(id)
      setBitacorasInfo(response.data)
    } catch (error) {
      const { message } = error.response.data.error.info
      toast.error(message ?? 'Error')
    }
  }

  useEffect(() => {
    getDataBitacoras()
  }, [])

  /**
   * @function
   * @name handleBitacora
   *
   * @description
   * Esta función se utiliza para gestionar la presentación de un formulario y el envío de datos para actualizar el estado de una bitácora identificada por `id_bitacora`. Dependiendo de la selección en el formulario, se establece el estado de la bitácora como 'Calificado' o 'Pendiente'. Luego, se envían los datos mediante la función `modifyBitacora`.
   *
   * @param {Event} e - El evento del formulario que se está manejando.
   * @param {number} id_bitacora - El ID de la bitácora que se va a actualizar.
   * @returns {void}
   *
   * @reference
   * Esta función se utiliza en un formulario para actualizar el estado de una bitácora y enviar los datos actualizados al servidor.
   *
   * @example
   * const bitacoraID = 456;
   * handleBitacora(event, bitacoraID);
   *
   */
  const handleBitacora = (e, id_bitacora) => {
    e.preventDefault()
    const { id_usuario: usuario_responsable } = getUserID().user
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    if (data.calificacion_bitacora === 'on') {
      data.calificacion_bitacora = 'Calificado'
    } else {
      data.calificacion_bitacora = 'Pendiente'
    }

    modifyBitacora(id_bitacora, { ...data, usuario_responsable })
  }

  /**
   * @function
   * @name modifyBitacora
   * @async
   *
   * @description
   * Esta función realiza una solicitud para modificar los datos de una bitácora en el servidor, identificada por `id`, utilizando el objeto `payload`. En caso de éxito, muestra un mensaje de éxito con opciones de notificación personalizadas, y actualiza la lista de bitácoras mediante la función `getDataBitacoras`. En caso de error, muestra un mensaje de error con la descripción del error o un mensaje genérico.
   *
   * @param {number} id - El ID de la bitácora que se va a modificar.
   * @param {Object} payload - Los datos a enviar para modificar la bitácora.
   * @throws {Error} Si la solicitud no se procesa con éxito, se muestra un mensaje de error.
   * @returns {Promise<void>}
   *
   * @reference
   * Esta función se utiliza para enviar datos y modificar una bitácora en el servidor, y se invoca en respuesta a eventos o acciones en el componente.
   *
   * @example
   * modifyBitacora(bitacoraID, { ...data, usuario_responsable });
   *
   */
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
      const message = error.response.data.error.info.message
      toast.error(message ?? 'Error')
    }
  }

  return (
    <section className='w-full'>
      <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='colored' />
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {bitacorasInfo.map((x) => {
          return (
            <CardWithChildren key={x.id_bitacora} classNames='w-full'>
              <form onSubmit={(e) => handleBitacora(e, x.id_bitacora)} className='flex flex-col gap-1.5'>
                <header className='flex flex-row items-center justify-between'>
                  <div className='flex flex-row items-center gap-2'>
                    <PiBooksLight className='text-3xl' />
                    <div className='flex flex-col '>
                      <h2 className='font-medium'>Bitácora {x.numero_bitacora}</h2>
                      <span className={`text-xs ${x.calificacion_bitacora === 'Calificado' ? 'visible' : 'hidden'}`}>{x.fecha_modificacion}</span>
                    </div>
                  </div>
                  <input name='calificacion_bitacora' type='checkbox' required className='w-4 h-4 rounded-xl accent-teal-600' defaultChecked={x.calificacion_bitacora === 'Calificado'} />
                </header>
                <hr className='border-gray-300' />
                <section className='flex flex-col gap-1 px-2 text-sm'>
                  <div className='flex flex-row justify-between'>
                    <h3>{apprenticeData.nombre_completo}</h3>
                    <h3 className='uppercase'>{apprenticeData.tipo_documento_aprendiz + ' ' + apprenticeData.numero_documento_aprendiz}</h3>
                  </div>
                  <textarea name='observaciones_bitacora' defaultValue={x.observaciones_bitacora} className='w-full h-14 p-1.5 overflow-y-auto text-sm border-gray-300 focus:outline-none resize-none rounded-xl border-1' placeholder='Observaciones...' />
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
          )
        })}
      </div>
    </section>
  )
}
