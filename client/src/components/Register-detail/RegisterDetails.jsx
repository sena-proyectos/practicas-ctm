import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// icons
// import { BsCheck2Circle } from 'react-icons/bs'
import { LuSave } from 'react-icons/lu'
// import { AiOutlineCloudUpload } from 'react-icons/ai'
import { IoReturnDownBack } from 'react-icons/io5'

// Components
import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'
import { Button } from '../Utils/Button/Button'
import { Select } from '../Utils/Select/Select'
// import { idTypes, modalities, etapasFormacion, nivelFormacion, apoyoSostenimiento, pagoArl, keysRoles } from '../../import/staticData'
import { getInscriptionById } from '../../api/httpRequest' // getInscriptionDetails } from '../../api/httpRequest'

export const RegisterDetails = () => {
  const { id } = useParams()
  const [selectedTab, setSelectedTab] = useState('infoAprendiz')

  // const idRol = Number(localStorage.getItem('idRol'))

  useEffect(() => {
    getInscriptionAprendiz(id)
    // getDetallesInscripcion(id)
  }, [id])

  const inputRefs = {
    apellido_inscripcion: useRef(null),
    nombre_inscripcion: useRef(null),
    documento_inscripcion: useRef(null),
    email_inscripcion: useRef(null),
    inscripcion_celular: useRef(null),
    numero_ficha_inscripcion: useRef(null),
    nombre_programa_inscripcion: useRef(null),
    nombre_instructor_lider_inscripcion: useRef(null),
    email_instructor_lider_inscripcion: useRef(null),
    tipo_documento_inscripcion: useRef(null),
    modalidad_inscripcion: useRef(null),
    fecha_fin_lectiva_inscripcion: useRef(null),
    apoyo_sostenimiento_inscripcion: useRef(null),
    etapa_actual_inscripcion: useRef(null),
    nivel_formacion_inscripcion: useRef(null),
    nit_empresa_inscripcion: useRef(null),
    telefono_jefe_empresa_inscripcion: useRef(null),
    email_jefe_empresa_inscripcion: useRef(null),
    nombre_empresa_inscripcion: useRef(null),
    direccion_empresa_inscripcion: useRef(null),
    nombre_jefe_empresa_inscripcion: useRef(null),
    cargo_jefe_empresa_inscripcion: useRef(null),
    arl: useRef(null),
    observaciones: useRef(null)
  }

  const getInscriptionAprendiz = async (id) => {
    try {
      const response = await getInscriptionById(id)
      const res = response.data.data[0]
      Object.keys(res).forEach((fieldName) => {
        if (inputRefs[fieldName] && inputRefs[fieldName].current) {
          inputRefs[fieldName].current.value = res[fieldName]
        }
      })
    } catch (error) {
      console.log('Ha ocurrido un error al mostrar los datos del usuario')
    }
  }

  // const getDetallesInscripcion = async (id) => {
  //   try {
  //     const response = await getInscriptionDetails(id)
  //     // id === Cookies.id => habilitado ? desha
  //     console.log(response)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const [isSectionOpen, setIsSectionOpen] = useState(true)

  //

  return (
    <main className='flex flex-row min-h-screen bg-whitesmoke'>
      <Siderbar />
      <section className='relative grid flex-auto gap-2 w-min grid-rows-3-10-75-15'>
        <header className='border-b-1 w-[70%] mx-auto border-b-zinc-300 h-[9vh]'>
          <ul className='flex flex-row items-center justify-around h-full'>
            <li className={`text-sm font-light cursor-pointer hover:text-purple-800 hover:scale-110 hover:font-medium ${selectedTab === 'infoAprendiz' ? 'font-medium text-purple-800' : ''}`} onClick={() => setSelectedTab('infoAprendiz')}>
              Info. Aprendiz
            </li>
            <li className={`text-sm font-light cursor-pointer hover:text-purple-800 hover:scale-110 hover:font-medium ${selectedTab === 'infoEmpresa' ? 'font-medium text-purple-800' : ''}`} onClick={() => setSelectedTab('infoEmpresa')}>
              Info. Empresa
            </li>
            <li className={`text-sm font-light cursor-pointer hover:text-purple-800 hover:scale-110 hover:font-medium ${selectedTab === 'coordinador' ? 'font-medium text-purple-800' : ''}`} onClick={() => setSelectedTab('coordinador')}>
              Coordinador
            </li>
            <li className={`text-sm font-light cursor-pointer hover:text-purple-800 hover:scale-110 hover:font-medium ${selectedTab === 'documentos' ? 'font-medium text-purple-800' : ''}`} onClick={() => setSelectedTab('documentos')}>
              Documentos
            </li>
            <li className={`text-sm font-light cursor-pointer hover:text-purple-800 hover:scale-110 hover:font-medium ${selectedTab === 'raps' ? 'font-medium text-purple-800' : ''}`} onClick={() => setSelectedTab('raps')}>
              RAPS
            </li>
          </ul>
        </header>
        <section>
          <div className={`${selectedTab === 'infoAprendiz' ? 'visible' : 'hidden'}`}>
            <InfoAprendiz inputRefs={inputRefs} />
          </div>
          <div className={`${selectedTab === 'infoEmpresa' ? 'visible' : 'hidden'}`}>
            <InfoEmpresa inputRefs={inputRefs} />
          </div>
          <div className={`${selectedTab === 'coordinador' ? 'visible' : 'hidden'}`}>
            <Coordinador />
          </div>
          <div className={`${selectedTab === 'documentos' ? 'visible h-full' : 'hidden'}`}>
            <Documentos />
          </div>
          <div className={`${selectedTab === 'raps' ? 'visible' : 'hidden'}`}>
            <RAPS />
          </div>

          <div className='absolute top-4 left-8'>
            <Link to='/registros' className='flex items-center gap-2 text-sm font-medium rounded-full text-white bg-slate-600 px-4 py-[2px] transition-colors'>
              <IoReturnDownBack />
              Salir
            </Link>
          </div>
        </section>
        <Footer />
      </section>
    </main>
  )
}

const InfoAprendiz = ({ inputRefs }) => {
  const dataAprendiz = [
    {
      type: 'select',
      name: 'modalidad_inscripcion',
      placeholder: 'Sin seleccionar',
      label: 'Modalidad'
    },
    {
      type: 'text',
      name: 'nombre_inscripcion',
      placeholder: 'Alejandro',
      label: 'Nombres'
    },
    {
      type: 'text',
      name: 'apellido_inscripcion',
      placeholder: 'Rodriguez',
      label: 'Apellidos'
    },
    {
      type: 'select',
      name: 'tipo_documento_inscripcion',
      placeholder: 'sin seleccionar',
      label: 'Tipo documento'
    },
    {
      type: 'number',
      name: 'documento_inscripcion',
      placeholder: '1023456789',
      label: 'Número documento'
    },
    {
      type: 'email',
      name: 'email_inscripcion',
      placeholder: 'example@sena.edu.co',
      label: 'Correo electrónico'
    },
    {
      type: 'number',
      name: 'inscripcion_celular',
      placeholder: '3012345467',
      label: 'Número de celular'
    },
    {
      type: 'select',
      name: 'etapa_actual_inscripcion',
      placeholder: 'Sin seleccionar',
      label: 'Etapa de formación'
    },
    {
      type: 'select',
      name: 'nivel_formacion_inscripcion',
      placeholder: 'Sin seleccionar',
      label: 'Nivel de formación'
    },
    {
      type: 'number',
      name: 'numero_ficha_inscripcion',
      placeholder: '2134567',
      label: 'Número de ficha'
    },
    {
      type: 'text',
      name: 'nombre_programa_inscripcion',
      placeholder: 'Producción multimedia',
      label: 'Programa formación'
    },
    {
      type: 'date',
      name: 'fecha_fin_lectiva_inscripcion',
      label: 'Fin etapa lectiva'
    }
  ]

  return (
    <section className={`flex flex-col w-[95%] gap-2 p-2 mx-auto mt-2 bg-violet-200 border-1 rounded-xl h-52`}>
      <h3>Información del aprendiz</h3>
      <div>
        <section className='grid gap-y-3 gap-x-6 sm:grid-cols-2 md:grid-cols-3'>
          {dataAprendiz.map((item, i) => {
            const inputRef = inputRefs[item.name]
            return (
              <div className='flex flex-col w-full m-auto text-gray-400' key={i}>
                {item.type === 'number' ? <input type={item.type} name={item.name} ref={inputRef} className='focus:text-gray-900 w-full rounded-xl shadow-lg py-1 pl-2 text-sm text-black bg-white focus:bg-white focus:outline-none [appearance:textfield] [&::-webit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder:text-slate-400' disabled autoComplete='on' /> : <input type={item.type} name={item.name} ref={inputRef} className='w-full py-1 pl-2 pr-3 text-sm text-black bg-white shadow-lg focus:text-gray-900 rounded-xl focus:bg-white focus:outline-none' autoComplete='on' disabled />}
              </div>
            )
          })}
        </section>
      </div>
    </section>
  )
}

const InfoEmpresa = ({ inputRefs }) => {
  const dataEmpresa = [
    {
      type: 'number',
      name: 'nit_empresa_inscripcion',
      placeholder: '899999034-1',
      label: 'NIT de la empresa'
    },
    {
      type: 'text',
      name: 'nombre_empresa_inscripcion',
      placeholder: 'SENA',
      label: 'Razón social (Empresa)'
    },
    {
      type: 'text',
      name: 'direccion_empresa_inscripcion',
      placeholder: 'Cra 30 No. 3E 164',
      label: 'Dirección de empresa'
    },
    {
      type: 'text',
      name: 'nombre_jefe_empresa_inscripcion',
      placeholder: 'Juan Perez',
      label: 'Nombre jefe inmediato'
    },
    {
      type: 'text',
      name: 'cargo_jefe_empresa_inscripcion',
      placeholder: 'Gerente',
      label: 'Cargo jefe inmediato'
    },
    {
      type: 'number',
      name: 'telefono_jefe_empresa_inscripcion',
      placeholder: '3012345678',
      label: 'Teléfono jefe inmediato'
    },
    {
      type: 'email',
      name: 'email_jefe_empresa_inscripcion',
      placeholder: 'example@sena.edu.co',
      label: 'Correo jefe Inmediato'
    },
    {
      type: 'select',
      name: 'arl',
      placeholder: 'Sin seleccionar',
      label: '¿Quién asume pago arl?'
    }
  ]
  return (
    <section className={`flex flex-col w-[95%] gap-2 p-2 mx-auto mt-2 bg-violet-200 border-1 rounded-xl h-44`}>
      <h3>Información del aprendiz</h3>
      <div>
        <section className='grid gap-y-3 gap-x-6 sm:grid-cols-2 md:grid-cols-4'>
          {dataEmpresa.map((item, i) => {
            const inputRef = inputRefs[item.name]
            return (
              <div className='flex flex-col w-full m-auto text-gray-400' key={i}>
                {item.type === 'number' ? <input type={item.type} name={item.name} ref={inputRef} className='focus:text-gray-900 w-full rounded-xl shadow-lg py-1 pl-2 text-sm text-black bg-white focus:bg-white focus:outline-none [appearance:textfield] [&::-webit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder:text-slate-400' disabled autoComplete='on' /> : <input type={item.type} name={item.name} ref={inputRef} className='w-full py-1 pl-2 pr-3 text-sm text-black bg-white shadow-lg focus:text-gray-900 rounded-xl focus:bg-white focus:outline-none' autoComplete='on' disabled />}
              </div>
            )
          })}
        </section>
      </div>
    </section>
  )
}

const Coordinador = () => {
  const option = [
    { value: 'Sergio Soto Henao', key: 'Sergio Soto Henao' },
    { value: 'Marianela Henao Atehortúa', key: 'Marianela Henao Atehortúa' },
    { value: 'Jaime León Vergara Areiza', key: 'Jaime León Vergara Areiza' },
    { value: 'Mauro Isaías Arango Vanegas', key: 'Mauro Isaías Arango Vanegas' }
  ]
  return (
    <section className={`flex flex-col w-[95%] gap-2 p-2 mx-auto mt-2 h-auto`}>
      <div className={` w-[95%] mx-auto`}>
        <form action='' className='flex flex-col gap-4 '>
          <div>
            <label htmlFor='' className='text-sm font-light'>
              Coordinador Asignado
            </label>
            <Select placeholder='Coordinador' rounded='rounded-lg' py='py-1' hoverColor='hover:bg-gray' hoverTextColor='hover:text-black' textSize='text-sm' options={option} shadow={'shadow-md shadow-slate-400'} border='none' />
          </div>
          <div className='flex flex-row gap-7 place-self-center'>
            <Button value={'Aceptar'} bg={'bg-primary'} px={'px-4'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'shadow-lg'} />
            <Button value={'Rechazar'} bg={'bg-red-500'} px={'px-3'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'shadow-lg'} />
          </div>
          <div>
            <label htmlFor='' className='text-sm font-light'>
              Observaciones
            </label>
            <textarea id='editor' rows='3' className='block w-full h-[5rem] px-3 py-2 overflow-y-auto text-sm text-black bg-white shadow-md border-t-[0.5px] border-slate-200 resize-none focus:text-gray-900 rounded-xl shadow-slate-400 focus:bg-white focus:outline-none placeholder:text-slate-400 placeholder:font-light' placeholder='Deja una observación' />
          </div>
          <Button value={'Guardar'} bg={'bg-primary'} px={'px-3'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'shadow-lg'} icon={<LuSave />} />
        </form>
      </div>
    </section>
  )
}

const Documentos = () => {
  return (
    <section className='grid grid-cols-2 w-[95%] h-full gap-2 mx-auto'>
      <section>Documentación</section>
      <section className='flex flex-col items-center gap-3'>
        <section className='flex flex-col w-[95%] gap-2 p-2 mx-auto'>
          <div className='w-[95%] mx-auto h-full'>
            <form action='' className='flex flex-col gap-3'>
              <div className='flex flex-col gap-1'>
                <label htmlFor='' className='text-sm font-light'>
                  Instructor Líder
                </label>
                <input type='text' className='w-full py-1 pl-2 pr-3 text-sm text-black bg-white shadow-md border-t-[0.5px] border-slate-200 shadow-slate-400 focus:text-gray-900 rounded-lg focus:outline-none placeholder:text-slate-400' autoComplete='on' />
              </div>
              <div className='flex flex-row gap-7 place-self-center'>
                <Button value={'Aceptar'} bg={'bg-primary'} px={'px-4'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'shadow-lg'} />
                <Button value={'Rechazar'} bg={'bg-red-500'} px={'px-3'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'shadow-lg'} />
              </div>
              <div>
                <label htmlFor='' className='text-sm font-light'>
                  Observaciones
                </label>
                <textarea id='editor' rows='3' className='block w-full h-[5rem] px-3 py-2 overflow-y-auto text-sm text-black bg-white shadow-md border-t-[0.5px] border-slate-200 resize-none focus:text-gray-900 rounded-xl shadow-slate-400 focus:bg-white focus:outline-none placeholder:text-slate-400 placeholder:font-light' placeholder='Deja una observación' />
              </div>
            </form>
          </div>
        </section>
        <hr className='w-3/4 border border-slate-500' />
        <section className='flex flex-col w-[95%] gap-2 p-2 mx-auto'>
          <div className='w-[95%] mx-auto h-full'>
            <form action='' className='flex flex-col gap-3'>
              <div className='flex flex-col gap-1'>
                <label htmlFor='' className='text-sm font-light'>
                  Instructor de Seguimiento
                </label>
                <input type='text' className='w-full py-1 pl-2 pr-3 text-sm text-black bg-white shadow-md border-t-[0.5px] border-slate-200 shadow-slate-400 focus:text-gray-900 rounded-lg focus:outline-none placeholder:text-slate-400' autoComplete='on' />
              </div>
              <div className='flex flex-row gap-7 place-self-center'>
                <Button value={'Aceptar'} bg={'bg-primary'} px={'px-4'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'shadow-lg'} />
                <Button value={'Rechazar'} bg={'bg-red-500'} px={'px-3'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'shadow-lg'} />
              </div>
              <div>
                <label htmlFor='' className='text-sm font-light'>
                  Observaciones
                </label>
                <textarea id='editor' rows='3' className='block w-full h-[5rem] px-3 py-2 overflow-y-auto text-sm text-black bg-white shadow-md border-t-[0.5px] border-slate-200 resize-none focus:text-gray-900 rounded-xl shadow-slate-400 focus:bg-white focus:outline-none placeholder:text-slate-400 placeholder:font-light' placeholder='Deja una observación' />
              </div>
            </form>
          </div>
        </section>
      </section>
    </section>
  )
}

const RAPS = () => {
  return (
    <section className='grid grid-cols-2 w-[95%] h-full gap-2 mx-auto'>
      <section>RAPS</section>
      <section className='flex flex-col w-[95%] gap-2 p-2 mx-auto mt-2'>
        <div className='w-[95%] mx-auto h-full'>
          <form action='' className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <label htmlFor='' className='text-sm font-light'>
                Instructor Líder
              </label>
              <input type='text' className='w-full py-1 pl-2 pr-3 text-sm text-black bg-white shadow-md border-t-[0.5px] border-slate-200 shadow-slate-400 focus:text-gray-900 rounded-lg focus:outline-none placeholder:text-slate-400' autoComplete='on' />
            </div>
            <div className='flex flex-row gap-7 place-self-center'>
              <Button value={'Aceptar'} bg={'bg-primary'} px={'px-4'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'shadow-lg'} />
              <Button value={'Rechazar'} bg={'bg-red-500'} px={'px-3'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'shadow-lg'} />
            </div>
            <div>
              <label htmlFor='' className='text-sm font-light'>
                Observaciones
              </label>
              <textarea id='editor' rows='3' className='block w-full h-[5rem] px-3 py-2 overflow-y-auto text-sm text-black bg-white shadow-md border-t-[0.5px] border-slate-200 resize-none focus:text-gray-900 rounded-xl shadow-slate-400 focus:bg-white focus:outline-none placeholder:text-slate-400 placeholder:font-light' placeholder='Deja una observación' />
            </div>
            <Button value={'Guardar'} bg={'bg-slate-600'} px={'px-3'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'shadow-lg'} icon={<LuSave />} />
          </form>
        </div>
      </section>
    </section>
  )
}
