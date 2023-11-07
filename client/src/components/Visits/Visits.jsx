import { toast } from 'react-toastify'

import { useParams } from 'react-router-dom'
import { apprenticeStore } from '../../store/config'
import { useEffect, useState } from 'react'
import { Button } from '../Utils/Button/Button'

import { getVisitsByStudent, patchVisitById } from '../../api/httpRequest'
import { getUserID } from '../../import/getIDActualUser'
import { CardWithChildren } from '../Utils/Card/Card'
import { PiCalendarCheckLight } from 'react-icons/pi'
import { LuSave } from 'react-icons/lu'

export const Visits = () => {
  const { id } = useParams()
  const { apprenticeData } = apprenticeStore()

  const [visitsData, setVisitData] = useState([])

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
   * @name getVisits
   * @async
   *
   * @description
   * Esta función realiza una solicitud para obtener los datos de las visitas realizadas por el estudiante identificado por `id`. Luego, actualiza el estado `visitData` con los datos obtenidos. En caso de error, muestra un mensaje de error genérico.
   *
   * @param {number} id - El ID del estudiante para el cual se desean obtener las visitas.
   * @throws {Error} Si la solicitud no se procesa con éxito, se muestra un mensaje de error.
   * @returns {Promise<void>}
   *
   * @reference
   * Esta función se utiliza para obtener datos de visitas de un estudiante y se invoca en respuesta a eventos o acciones en el componente.
   *
   * @example
   * getVisits();
   *
   */
  const getVisits = async () => {
    try {
      const { data } = await getVisitsByStudent(id)
      setVisitData(data)
    } catch (error) {
      toast.error('Error al conseguir las visitas')
    }
  }
  useEffect(() => {
    getVisits()
  }, [])

  /**
   * @function handleSubmit
   *
   * @description
   * Esta función se utiliza para gestionar la presentación de un formulario y el envío de datos para actualizar el estado de una visita identificada por `id_visita`. Dependiendo de la selección en el formulario, se establece el estado de la visita como 'Realizado' o 'Pendiente'. Además, se incluye el número de la visita en los datos antes de enviarlos mediante la función `sendData`.
   *
   * @param {Event} e - El evento del formulario que se está manejando.
   * @param {number} id_visita - El ID de la visita que se va a actualizar.
   * @param {number} numero_visita - El número de la visita que se va a actualizar.
   * @returns {void}
   *
   * @reference
   * Esta función se utiliza en un formulario para actualizar el estado de una visita y enviar los datos actualizados al servidor.
   *
   * @example
   * handleSubmit(e, visitaID, numeroVisita);
   *
   */
  const handleSubmit = (e, id_visita, numero_visita) => {
    e.preventDefault()
    const { id_usuario: usuario_responsable } = getUserID().user
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    if (data.estado_visita === 'on') {
      data.estado_visita = 'Realizado'
    } else {
      data.estado_visita = 'Pendiente'
    }
    data.numero_visita = numero_visita
    sendData(id_visita, { ...data, usuario_responsable })
  }

  /**
   * @function
   * @name sendData
   * @async
   *
   * @description
   * Esta función realiza una solicitud para enviar los datos actualizados de una visita al servidor, identificada por `id`, utilizando el objeto `payload`. En caso de éxito, muestra un mensaje de éxito y actualiza la lista de visitas mediante la función `getVisits`. En caso de error, muestra un mensaje de error genérico.
   *
   * @param {number} id - El ID de la visita que se va a actualizar.
   * @param {Object} payload - Los datos a enviar para actualizar la visita.
   * @throws {Error} Si la solicitud no se procesa con éxito, se muestra un mensaje de error.
   * @returns {Promise<void>}
   *
   * @reference
   * Esta función se utiliza para enviar datos y actualizar una visita en el servidor, y se invoca en respuesta a eventos o acciones en el componente.
   *
   * @example
   * sendData(visitaID, { ...data, usuario_responsable });
   *
   */
  const sendData = async (id, payload) => {
    try {
      await patchVisitById(id, payload)
      toast.success('Visita modificada correctamente')
      getVisits()
    } catch (error) {
      toast.error('Error al actualizar la visita')
    }
  }

  return (
    <section className='grid grid-cols-1 gap-4 md:grid-cols-2'>
      {visitsData &&
        visitsData.length !== 0 &&
        visitsData.map((visit) => {
          return (
            <CardWithChildren key={visit.id_visita} classNames='w-full'>
              <form className='flex flex-col gap-1.5' onSubmit={(e) => handleSubmit(e, visit.id_visita, visit.numero_visita)}>
                <header className='flex flex-row items-center justify-between'>
                  <div className='flex flex-row items-center gap-2'>
                    <PiCalendarCheckLight className='text-3xl' />
                    <div className='flex flex-col '>
                      <h2 className='font-medium'>Visita {visit.numero_visita === '1' ? 'Inicial' : visit.numero_visita === '2' ? 'Final' : 'Extracurricular'}</h2>
                      <span className={`text-xs ${visit.estado_visita === 'Realizado' ? 'visible' : 'hidden'}`}>{visit.fecha_modificacion}</span>
                    </div>
                  </div>
                  <input name='estado_visita' type='checkbox' required className='w-4 h-4 rounded-xl accent-teal-600' defaultChecked={visit.estado_visita === 'Realizado'} />
                </header>
                <hr className='border-gray-300' />
                <section className='flex flex-col gap-1 px-2 text-sm'>
                  <div className='flex flex-row justify-between'>
                    <h3>{apprenticeData.nombre_completo}</h3>
                    <h3 className='uppercase'>{apprenticeData.tipo_documento_aprendiz + ' ' + apprenticeData.numero_documento_aprendiz}</h3>
                  </div>
                  <textarea name='observaciones_visita' defaultValue={visit.observaciones_visita} className='w-full h-14 p-1.5 overflow-y-auto text-sm border-gray-300 focus:outline-none resize-none rounded-xl border-1' placeholder='Observaciones...' />
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
    </section>
  )
}
