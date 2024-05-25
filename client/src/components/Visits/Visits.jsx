import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { apprenticeStore } from '../../store/config'
import { useEffect, useState } from 'react'
import { Button } from '../Utils/Button/Button'
import { getVisitsByStudent, patchVisitById, getAllInfoTeacher } from '../../api/httpRequest'
import { getUserID } from '../../import/getIDActualUser'
import { CardWithChildren } from '../Utils/Card/Card'
import { PiCalendarCheckLight } from 'react-icons/pi'
import { LuSave } from 'react-icons/lu'

export const Visits = () => {
  const { id } = useParams()
  const { apprenticeData } = apprenticeStore()

  const [visitsData, setVisitData] = useState([])
  const [fullNameInstructor, setFullNameInstructor] = useState([])
  const [searchTerms, setSearchTerms] = useState([])
  const [visitShowInstructors, setVisitShowInstructors] = useState({})
  const [selectedInstructors, setSelectedInstructors] = useState({})
  const [visitCheckboxStates, setVisitCheckboxStates] = useState({});

  useEffect(() => {
    const cachedData = JSON.parse(sessionStorage.getItem('apprenticeData'))
    if (cachedData) {
      apprenticeStore.setState({ apprenticeData: cachedData })
    }
  }, [])

  useEffect(() => {
    getVisits()
  }, [])

  const getVisits = async () => {
    try {
      const { data } = await getVisitsByStudent(id)
      setVisitData(data)
      setSearchTerms(Array(data.length).fill(''))
    } catch (error) {
      toast.error('Error al conseguir las visitas')
    }
  }

  const handleSearchChange = (index, value) => {
    const newSearchTerms = [...searchTerms]
    newSearchTerms[index] = value
    setSearchTerms(newSearchTerms)
  }

  const handleSelectInstructor = (index, instructorId) => {
    setSelectedInstructors((prevState) => ({
      ...prevState,
      [index]: instructorId
    }))
    setVisitShowInstructors((prevState) => ({
      ...prevState,
      [index]: false
    }))
  }

  const handleSubmit = async (e, id_visita, numero_visita, index) => {
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
    data.instructor = selectedInstructors[index]

    // Aquí agregamos la fecha de visita al objeto de datos
    data.visita_hora = formData.get('visita_hora')

    sendData(id_visita, { ...data, usuario_responsable })
  }

  const sendData = async (id, payload) => {
    try {
      await patchVisitById(id, payload)
      toast.success('Visita modificada correctamente')
      getVisits()
    } catch (error) {
      toast.error('Error al actualizar la visita')
    }
  }

  useEffect(() => {
    const fetchAllInstructors = async () => {
      try {
        const { data } = await getAllInfoTeacher('')
        setFullNameInstructor(data.data)
        console.log(data.data) // Verificar los datos obtenidos
      } catch (error) {
        toast.error('Error al obtener la lista de instructores', {
          isLoading: false,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'colored',
          closeButton: true,
          className: 'text-base'
        })
      }
    }

    fetchAllInstructors()
  }, [])

  const handleShowInstructors = (index) => {
    setVisitShowInstructors((prevState) => ({
      ...prevState,
      [index]: !prevState[index]
    }))
  }

  const filterInstructors = (instructor, searchTerm) => {
    const fullName = `${instructor.nombres_usuario} ${instructor.apellidos_usuario}`
    const email = instructor.email_usuario
    return fullName.toLowerCase().includes(searchTerm.toLowerCase()) || email.toLowerCase().includes(searchTerm.toLowerCase())
  }

  const handleCheckboxChange = (e, visitId) => {
    const isChecked = e.target.checked;
    setVisitCheckboxStates((prevState) => ({
      ...prevState,
      [visitId]: isChecked,
    }));
  };

  return (
    <section className='grid grid-cols-1 gap-4 md:grid-cols-2'>
      {visitsData &&
        visitsData.length !== 0 &&
        visitsData.map((visit, index) => {
          return (
            <CardWithChildren key={visit.id_visita} classNames='w-full'>
              <form className='flex flex-col gap-1.5' onSubmit={(e) => handleSubmit(e, visit.id_visita, visit.numero_visita, index)}>
                <header className='flex flex-row items-center justify-between relative '>
                  <div className='flex flex-row items-center gap-2'>
                    <div className='flex flex-col '>
                      <div className='flex items-center'>
                        <PiCalendarCheckLight className='text-3xl  top-0 ' />
                        <h2 className='font-medium  ml-2 '>Visita {visit.numero_visita === '1' ? 'Inicial' : visit.numero_visita === '2' ? 'Final' : 'Extracurricular'}</h2>
                      </div>
                      <div className=' flex items-center  '>
                        <span className='text-sm'>Fecha visita: </span>
                        <span className={`text-xs ${visit.estado_visita === 'Realizado' ? 'visible' : ''} ml-2 `}>{visit.visita_hora}</span>
                      </div>
                      <input type='date' name='visita_hora' defaultValue={visit.visita_hora} className='text-xs border-gray-300 focus:outline-none resize-none rounded-xl border-1 w-28 ' />
                      <div className=' flex items-center'>
                        <span className='text-sm'>Instructor: </span>
                        <span className={`text-xs ${visit.estado_visita === 'Realizado' ? 'visible' : ''} ml-2 `}>{visit.nombre_instructor}</span>
                        <span className={`text-xs ${visit.estado_visita === 'Realizado' ? 'visible' : ''} ml-2 `}>{visit.apellidos_usuario}</span>
                      </div>
                      <div className='relative  w-29 mt-1'>
                        <div className='bg-teal-500 text-white font-bold py-1 px-2 rounded-full shadow cursor-pointer w-25 text-center text-sm ' onClick={() => handleShowInstructors(index)}>
                          {visitShowInstructors[index] ? 'Ocultar Instructores' : 'Seleccionar Instructor'}
                        </div>
                        {visitShowInstructors[index] && (
                          <ul className='max-h-40 overflow-y-auto mt-2 absolute z-10 bg-white border border-gray-300 rounded shadow-md'>
                            <input type='text' placeholder='Buscar instructor...' className='w-full p-1 border border-gray-300 rounded' value={searchTerms[index]} onChange={(e) => handleSearchChange(index, e.target.value)} />
                            {Array.isArray(fullNameInstructor) &&
                              fullNameInstructor
                                .filter((instructor) => filterInstructors(instructor, searchTerms[index]))
                                .map((instructor) => (
                                  <li key={instructor.id_usuario} className='hover:bg-blue-50 transition-colors duration-200 p-2 rounded-md shadow-md my-1 cursor-pointer text-sm ' onClick={() => handleSelectInstructor(index, instructor.id_usuario)}>
                                    <div>{`${instructor.nombres_usuario} ${instructor.apellidos_usuario}`}</div>
                                    <div className='text-sm text-teal-500'>{instructor.email_usuario}</div>
                                  </li>
                                ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                  <input
                    id={`estado_visita_${visit.id_visita}`}
                    name='estado_visita'
                    type='checkbox'
                    onChange={(e) => handleCheckboxChange(e, visit.id_visita)}
                    checked={visitCheckboxStates[visit.id_visita] || false}
                    className='w-4 h-4 rounded-xl accent-teal-600'
                  />
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
