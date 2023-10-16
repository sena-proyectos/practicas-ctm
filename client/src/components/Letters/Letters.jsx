import { useParams } from 'react-router-dom'
import { apprenticeStore } from '../../store/config'
import { useEffect, useState } from 'react'
import { CardWithChildren } from '../Utils/Card/Card'
import { Button } from '../Utils/Button/Button'
import { toast } from 'react-toastify'
import { getLettersByStudentID, patchLetterByID } from '../../api/httpRequest'
import { LuSave } from 'react-icons/lu'
import { getUserID } from '../../import/getIDActualUser'
import { PiScrollLight } from 'react-icons/pi'

export const Letters = () => {
  const { id } = useParams()
  const { apprenticeData } = apprenticeStore()

  const [lettersInfo, setLettersInfo] = useState([])

  const getDataLetters = async () => {
    try {
      const response = await getLettersByStudentID(id)
      setLettersInfo(response.data)
    } catch (error) {
      const { message } = error.response.data.error.info
      toast.error(message ?? 'Error')
    }
  }

  useEffect(() => {
    const cachedData = JSON.parse(sessionStorage.getItem('apprenticeData'))
    if (cachedData) {
      apprenticeStore.setState({ apprenticeData: cachedData })
    }
  }, [])

  useEffect(() => {
    getDataLetters()
  }, [])

  const typeOfLetter = {
    start: 'inicio',
    end: 'fin'
  }

  const LetterState = {
    presented: 'Presentado',
    noPresented: 'No presentado'
  }

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
    <section className='flex flex-col w-full gap-4 md:flex-row'>
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
                <input name='estado_carta_aprendiz' type='checkbox' className='w-4 h-4 rounded-xl accent-purple-700' defaultChecked={lettersInfo[0].estado_carta === 'Presentado'} />
              </header>
              <hr className='border-gray-300' />
              <section className='flex flex-col gap-1 px-2 text-sm'>
                <div className='flex flex-row justify-between'>
                  <h3>{apprenticeData.nombre_completo}</h3>
                  <h3>CC {apprenticeData.numero_documento_aprendiz}</h3>
                </div>
                <textarea name='observaciones' defaultValue={lettersInfo[0].observaciones} className='w-full h-14 p-1.5 overflow-y-auto text-sm border-gray-300 focus:outline-none resize-none rounded-xl border-1' placeholder='Observaciones...' />
                <div className='flex flex-row items-center justify-between pt-2'>
                  <h3>
                    {apprenticeData.numero_ficha} - {apprenticeData.nombre_programa_formacion}
                  </h3>
                  <div className='w-fit'>
                    <Button bg={'bg-green-600'} px={'px-3'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'lg'} inline>
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
                <input name='estado_carta_aprendiz' type='checkbox' required className='w-4 h-4 rounded-xl accent-purple-700' defaultChecked={lettersInfo[1].estado_carta === 'Presentado'} />
              </header>
              <hr className='border-gray-300' />
              <section className='flex flex-col gap-1 px-2 text-sm'>
                <div className='flex flex-row justify-between'>
                  <h3>{apprenticeData.nombre_completo}</h3>
                  <h3>CC {apprenticeData.numero_documento_aprendiz}</h3>
                </div>
                <textarea name='observaciones' defaultValue={lettersInfo[1].observaciones} className='w-full h-14 p-1.5 overflow-y-auto text-sm border-gray-300 focus:outline-none resize-none rounded-xl border-1' placeholder='Observaciones...' />
                <div className='flex flex-row items-center justify-between pt-2'>
                  <h3>
                    {apprenticeData.numero_ficha} - {apprenticeData.nombre_programa_formacion}
                  </h3>
                  <div className='w-fit'>
                    <Button bg={'bg-green-600'} px={'px-3'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'lg'} inline>
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
