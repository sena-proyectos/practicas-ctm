import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getAvalById, getUserById } from '../../../api/httpRequest'
import { DenyModal } from '../../Utils/Modals/Modals'
import { keysRoles } from '../../../import/staticData'
import { Button } from '../../Utils/Button/Button'
import { PiCheckCircleBold, PiXCircleBold } from 'react-icons/pi'
import { LuSave } from 'react-icons/lu'

export const Docs = ({ idRol, avalDocumentos }) => {
  const [avalInfo, setAvalInfo] = useState([])
  const [nameResponsable, setNameResponsable] = useState('')

  const [showModal, setShowModal] = useState(false)
  const [notify, setNotify] = useState(false)

  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  useEffect(() => {
    if (notify) {
      toast.success('Se ha rechazado correctamente', {
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
    }
    setNotify(false)
  }, [notify])

  const fetchData = async () => {
    const res = await getAvalById(avalDocumentos)
    const { data } = res.data
    const response = await getUserById(data[0].responsable_aval)
    const { nombres_usuario, apellidos_usuario } = response.data.data[0]
    const fullName = `${nombres_usuario} ${apellidos_usuario}`
    setNameResponsable(fullName)
    setAvalInfo(data)
  }

  useEffect(() => {
    if (avalDocumentos) fetchData()
  }, [avalDocumentos])

  return (
    <>
      {showModal && <DenyModal setNotify={setNotify} id={avalDocumentos} closeModal={handleCloseModal} title={'Escribe la razón del rechazo'} />}
      <section className='grid grid-cols-2 w-[95%] h-full gap-2 mx-auto'>
        <section>Documentación</section>
        <section className='flex flex-col w-[95%] gap-2 p-2 mx-auto'>
          <div className='w-[95%] mx-auto h-full'>
            {avalInfo.map((aval) => {
              return (
                <form action='' className='flex flex-col gap-7' key={aval.id_detalle_inscripcion}>
                  <div className='flex flex-col gap-1'>
                    <label htmlFor='' className='text-sm font-light'>
                      Líder Prácticas
                    </label>
                    <input type='text' defaultValue={nameResponsable} className='w-full py-1 pl-2 pr-3 text-sm text-black bg-white shadow-md border-t-[0.5px] border-slate-200 shadow-slate-400 focus:text-gray-900 rounded-lg focus:outline-none placeholder:text-slate-400' autoComplete='on' disabled />
                  </div>
                  {idRol === Number(keysRoles[0]) ? (
                    <div className='flex flex-row gap-2 place-self-center'>
                      <Button value={'Sí'} type='button' bg={'bg-primary'} px={'px-2'} hover font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} icon={<PiCheckCircleBold className='text-xl' />} />
                      <Button value={'No'} type='button' bg={'bg-red-500'} px={'px-2'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow='2xl' icon={<PiXCircleBold className='text-xl' />} onClick={handleShowModal} />
                    </div>
                  ) : (
                    <h5 className={`text-sm font-medium text-center ${aval.estado_aval === 'Pendiente' ? 'text-slate-600' : aval.estado_aval === 'Rechazado' ? 'text-red-500' : aval.estado_aval === 'Aprobado' ? 'text-green-500' : null}`}>{aval.estado_aval === 'Pendiente' ? 'Actualmente la documentación se encuentra en revisión' : aval.estado_aval === 'Rechazado' ? 'Rechazado' : aval.estado_aval === 'Aprobado' ? 'Aprobado' : null}</h5>
                  )}
                  <div>
                    <label htmlFor='' className='text-sm font-light'>
                      Observaciones
                    </label>
                    <textarea id='editor' value={aval.observaciones} rows='3' className='block w-full h-[5rem] px-3 py-2 overflow-y-auto text-sm text-black bg-white shadow-md border-t-[0.5px] border-slate-200 resize-none focus:text-gray-900 rounded-xl shadow-slate-400 focus:bg-white focus:outline-none placeholder:text-slate-400 placeholder:font-light' placeholder='Deja una observación' />
                  </div>
                  {idRol === Number(keysRoles[0]) && <Button value={'Guardar'} bg={'bg-primary'} px={'px-3'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'lg'} icon={<LuSave />} isDisabled />}
                </form>
              )
            })}
          </div>
        </section>
      </section>
    </>
  )
}
