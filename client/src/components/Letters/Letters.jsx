import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

// icons
import { LuSave } from 'react-icons/lu'
import { PiScrollLight } from 'react-icons/pi'

// components
import { apprenticeStore } from '../../store/config'
import { CardWithChildren } from '../Utils/Card/Card'
import { Button } from '../Utils/Button/Button'
import { getLettersByStudentID, patchLetterByID } from '../../api/httpRequest'
import { getUserID } from '../../import/getIDActualUser'

export const Letters = () => {
  const { id } = useParams()
  const { apprenticeData } = apprenticeStore()

  const [lettersInfo, setLettersInfo] = useState([])

  /**
   * @function
   * @name getDataLetters
   * @async
   *
   * @description
   * Esta función realiza una solicitud para obtener la información de las cartas de aprendiz asociadas a un estudiante utilizando su identificador `id`. Luego, actualiza el estado `lettersInfo` con la respuesta obtenida. En caso de error, muestra un mensaje de error con la descripción del error o un mensaje genérico.
   *
   * @param {number} id - El ID del estudiante para el cual se desean obtener las cartas.
   * @throws {Error} Si ocurre un error durante la solicitud, se maneja y muestra un mensaje de error.
   * @returns {Promise<void>}

   *
   * @reference Esta función se utiliza para obtener datos de cartas de un estudiante y se invoca en respuesta a ciertos eventos o acciones en el componente.
   *
   * @example
   * getDataLetters(25)
   *
   */
  const getDataLetters = async () => {
    try {
      const response = await getLettersByStudentID(id)
      setLettersInfo(response.data)
    } catch (error) {
      const { message } = error.response.data.error.info
      toast.error(message ?? 'Error')
    }
  }

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

  useEffect(() => {
    getDataLetters()
  }, [])

  /**
   * @typedef {Object} typeOfLetter
   *
   * @description
   * Este objeto define los tipos de cartas disponibles en una aplicación.
   *
   * @property {string} start - Tipo de carta de inicio.
   * @property {string} end - Tipo de carta de fin.
   */
  const typeOfLetter = {
    start: 'inicio',
    end: 'fin'
  }

  /**
   * @typedef {Object} LetterState
   *
   * @description
   * Este objeto define los estados posibles de una carta en una aplicación.
   *
   * @property {string} presented - Representa el estado de una carta como "Presentado".
   * @property {string} noPresented - Representa el estado de una carta como "No presentado".
   */
  const LetterState = {
    presented: 'Presentado',
    noPresented: 'No presentado'
  }

  /**
   * @function
   * @name formHandleStateEnd
   *
   * @description
   * Este método se utiliza para gestionar el estado de la carta final del aprendiz.
   * Actualiza el estado de la carta y realiza una llamada a la función `modifyLetterState` para guardar los cambios en el servidor.
   *
   * @param {Event} e - El evento del formulario que se está manejando.
   * @returns {void}
   *
   * @reference
   * Esta función se utiliza en un formulario para cambiar el estado de una carta al estado final y enviar los datos actualizados al servidor.
   *
   * @example
   * formHandleStateEnd(event);
   *
   */
  const formHandleStateEnd = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    if (data.estado_carta_aprendiz === 'on') {
      data.estado_carta_aprendiz = LetterState.presented
    } else {
      data.estado_carta_aprendiz = LetterState.noPresented
    }
    const { id_carta_aprendiz } = lettersInfo[1]
    const { id_usuario: usuario_responsable } = getUserID().user
    modifyLetterState(id_carta_aprendiz, { tipo_carta_aprendiz: typeOfLetter.end, ...data, usuario_responsable })
  }

  /**
   * @function
   * @name formHandleStateStart
   *
   * @description
   * Este método se utiliza para gestionar el estado de la carta inicial del aprendiz.
   * Actualiza el estado de la carta y realiza una llamada a la función `modifyLetterState` para guardar los cambios en el servidor.
   *
   * @param {Event} e - El evento del formulario que se está manejando.
   * @returns {void}
   *
   * @reference
   * Esta función se utiliza en un formulario para cambiar el estado de una carta al estado inicial y enviar los datos actualizados al servidor.
   *
   * @example
   * formHandleStateStart(event);
   *
   */
  const formHandleStateStart = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    if (data.estado_carta_aprendiz === 'on') {
      data.estado_carta_aprendiz = LetterState.presented
    } else {
      data.estado_carta_aprendiz = LetterState.noPresented
    }
    const { id_carta_aprendiz } = lettersInfo[0]
    const { id_usuario: usuario_responsable } = getUserID().user
    modifyLetterState(id_carta_aprendiz, { tipo_carta_aprendiz: typeOfLetter.start, ...data, usuario_responsable })
  }

  /**
   * @function
   * @name modifyLetterState
   * @async
   *
   * @description
   * Esta función realiza una solicitud para modificar el estado de una carta de aprendiz en el servidor mediante la llamada a la función `patchLetterByID`. En caso de éxito, muestra un mensaje de éxito y refresca la lista de cartas con la función `getDataLetters`. En caso de error, muestra un mensaje de error con la descripción del error o un mensaje genérico.
   *
   * @param {number} id - El ID de la carta que se va a modificar.
   * @param {Object} payload - Los datos a enviar para modificar la carta.
   * @throws {Error} Si la solicitud no se procesa con éxito, se muestra un mensaje de error.
   * @returns {Promise<void>}
   *
   * @reference
   * Esta función se utiliza para actualizar el estado de una carta en el servidor a través de una solicitud PATCH y notificar al usuario sobre el resultado.
   *
   * @example
   * modifyLetterState(letterId, { tipo_carta_aprendiz: typeOfLetter.start, ...data, usuario_responsable });
   *
   */
  const modifyLetterState = async (id, payload) => {
    try {
      const { data } = await patchLetterByID(id, payload)
      if (data.affectedRows === 0) throw new Error()
      toast.success('Se ha modificado correctamente la carta')
      getDataLetters()
    } catch (error) {
      const message = error.response.data.error.info.message
      toast.error(message ?? 'Error')
    }
  }

  return (
    <section className='grid grid-cols-1 gap-4 md:grid-cols-2'>
      {lettersInfo.length > 0 ? (
        <>
          <CardWithChildren key={lettersInfo[0].id_carta_aprendiz} classNames='w-full'>
            <form className='flex flex-col gap-1.5' onSubmit={formHandleStateStart}>
              <header className='flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center gap-2'>
                  <PiScrollLight className='text-3xl' />
                  <div className='flex flex-col '>
                    <h2 className='font-medium'>Carta de {lettersInfo[0].tipo_carta}</h2>
                    <span className={`text-xs ${lettersInfo[0].estado_carta === 'Presentado' ? 'visible' : 'hidden'}`}>{lettersInfo[0].fecha_modificacion}</span>
                  </div>
                </div>
                <input name='estado_carta_aprendiz' type='checkbox' className='w-4 h-4 rounded-xl accent-teal-600' defaultChecked={lettersInfo[0].estado_carta === 'Presentado'} />
              </header>
              <hr className='border-gray-300' />
              <section className='flex flex-col gap-1 px-2 text-sm'>
                <div className='flex flex-row justify-between'>
                  <h3>{apprenticeData.nombre_completo}</h3>
                  <h3 className='uppercase'>{apprenticeData.tipo_documento_aprendiz + ' ' + apprenticeData.numero_documento_aprendiz}</h3>
                </div>
                <textarea name='observaciones' defaultValue={lettersInfo[0].observaciones} className='w-full h-14 p-1.5 overflow-y-auto text-sm border-gray-300 focus:outline-none resize-none rounded-xl border-1' placeholder='Observaciones...' />
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
          <CardWithChildren key={lettersInfo[1].id_carta_aprendiz} classNames='w-full'>
            <form className='flex flex-col gap-1.5' onSubmit={formHandleStateEnd}>
              <header className='flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center gap-2'>
                  <PiScrollLight className='text-3xl' />
                  <div className='flex flex-col '>
                    <h2 className='font-medium'>Carta de {lettersInfo[1].tipo_carta}</h2>
                    <span className={`text-xs ${lettersInfo[1].estado_carta === 'Presentado' ? 'visible' : 'hidden'}`}>{lettersInfo[1].fecha_modificacion}</span>
                  </div>
                </div>
                <input name='estado_carta_aprendiz' type='checkbox' required className='w-4 h-4 rounded-xl accent-teal-600' defaultChecked={lettersInfo[1].estado_carta === 'Presentado'} />
              </header>
              <hr className='border-gray-300' />
              <section className='flex flex-col gap-1 px-2 text-sm'>
                <div className='flex flex-row justify-between'>
                  <h3>{apprenticeData.nombre_completo}</h3>
                  <h3 className='uppercase'>{apprenticeData.tipo_documento_aprendiz + ' ' + apprenticeData.numero_documento_aprendiz}</h3>
                </div>
                <textarea name='observaciones' defaultValue={lettersInfo[1].observaciones} className='w-full h-14 p-1.5 overflow-y-auto text-sm border-gray-300 focus:outline-none resize-none rounded-xl border-1' placeholder='Observaciones...' />
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
        </>
      ) : (
        <h2>Error al conseguir las cartas del aprendiz</h2>
      )}
    </section>
  )
}
