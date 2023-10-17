import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

// Icons
import { LuSave } from 'react-icons/lu'

// Components
import { Button } from '../Utils/Button/Button'
import { GetStudentsDetailById, getBitacorasByStudentId, patchBitacoraById } from '../../api/httpRequest'
import { getUserID } from '../../import/getIDActualUser'
import { CardWithChildren } from '../Utils/Card/Card'
import { PiBooksLight } from 'react-icons/pi'

export const Bitacoras = () => {
  const { id } = useParams()
  const [dataStudent, setDataStudent] = useState([])
  const [bitacorasInfo, setBitacorasInfo] = useState([])

  const getInfoStudent = async () => {
    try {
      const { data } = await GetStudentsDetailById(id)
      const info = await data.data[0]
      setDataStudent(info)
    } catch (error) {
      console.error(error)
    }
  }

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
    getInfoStudent()
  }, [])

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
      <div className='flex flex-col w-full gap-4 rounded-2xl'>
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
                  <input name='calificacion_bitacora' type='checkbox' required className='w-4 h-4 rounded-xl accent-purple-700' defaultChecked={x.calificacion_bitacora === 'Calificado'} />
                </header>
                <hr className='border-gray-300' />
                <section className='flex flex-col gap-1 px-2 text-sm'>
                  <div className='flex flex-row justify-between'>
                    <h3>{dataStudent.nombre_completo}</h3>
                    <h3>CC {dataStudent.numero_documento_aprendiz}</h3>
                  </div>
                  <textarea name='observaciones_bitacora' defaultValue={x.observaciones_bitacora} className='w-full h-14 p-1.5 overflow-y-auto text-sm border-gray-300 focus:outline-none resize-none rounded-xl border-1' placeholder='Observaciones...' />
                  <div className='flex flex-row items-center justify-between pt-2'>
                    <h3>
                      {dataStudent.numero_ficha} - {dataStudent.nombre_programa_formacion}
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
          )
        })}
      </div>
    </section>
  )
}
