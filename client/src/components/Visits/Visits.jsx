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

  useEffect(() => {
    const cachedData = JSON.parse(sessionStorage.getItem('apprenticeData'))
    if (cachedData) {
      apprenticeStore.setState({ apprenticeData: cachedData })
    }
  }, [])

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

  const sendData = async (id, payload) => {
    try {
      await patchVisitById(id, payload)
      toast.success('Visita modificada correctamente')
      getVisits()
    } catch (error) {
      console.log(error)
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
