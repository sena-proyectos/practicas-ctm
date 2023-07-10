import { AiOutlineIdcard, AiOutlineMail, AiOutlinePhone, AiOutlineUser } from 'react-icons/ai'
import { FaRegAddressBook } from 'react-icons/fa'
import { BsCalendar4 } from 'react-icons/bs'
import { LuCalendarCheck2, LuCalendarX2 } from 'react-icons/lu'

/*
 * src: src\components\Home\Home.jsx
 */
export const cards = [
  {
    title: 'Listado de aprendices',
    titleColor: 'black',
    description: 'Podrás ver el listado de aprendices que actualmente se encuentran en prácticas.',
    buttonText: 'LLÉVAME AHÍ',
    bgColor: 'bg-primary',
    link: '/aprendices',
  },
  {
    title: 'Bitácoras incompletas',
    titleColor: 'black',
    description: 'Podrás ver el listado de bitácoras que actualmente se encuentran incompletas.',
    buttonText: 'LLÉVAME AHÍ',
    bgColor: 'bg-salmon',
    link: '/bitacoras',
  },
  {
    title: 'Bitácoras completas',
    titleColor: 'black',
    description: 'Podrás ver el listado de bitácoras que actualmente se encuentran completas.',
    buttonText: 'LLÉVAME AHÍ',
    bgColor: 'bg-seventh',
    link: '/bitacoras',
  },
  {
    title: 'Aprobaciones',
    titleColor: 'black',
    description: 'Podrás ver los aprendices que estan esperando aprobación para la modalidad de prácticas.',
    buttonText: 'LLÉVAME AHÍ',
    bgColor: 'bg-[#385C57]',
    link: '/home',
  },
  {
    title: 'Visitas no hechas',
    titleColor: 'black',
    description: 'Podrás ver el listado de visitas que actualmente no se encuentran en realizadas.',
    buttonText: 'LLÉVAME AHÍ',
    bgColor: 'bg-third',
    link: '/visitas',
  },
  {
    title: 'Inscribir un aprendiz',
    titleColor: 'black',
    description: 'Podrás acceder al formulario de inscripción del aprendiz a su modalidad de prácticas.',
    buttonText: 'LLÉVAME AHÍ',
    bgColor: 'bg-aqua',
    link: '/inscribir-aprendiz',
  },
]

/*
 * src: src\components\Register-student\RegisterStudent.jsx
 */
export const dataInscription = {
  dataAprendiz: [
    {
      type: 'select',
      name: 'id_modalidad_inscripcion',
      placeholder: 'Sin seleccionar',
      label: 'Modalidad',
      required: true,
    },
    {
      type: 'text',
      name: 'apellidos_inscripcion',
      placeholder: 'Rodriguez',
      label: 'Apellidos',
      required: true,
    },
    {
      type: 'text',
      name: 'nombres_inscripcion',
      placeholder: 'Alejandro',
      label: 'Nombres',
      required: true,
    },
    {
      type: 'select',
      name: 'tipo_documento_inscripcion',
      placeholder: 'sin seleccionar',
      label: 'Tipo documento',
      required: true,
    },
    {
      type: 'number',
      name: 'numero_documento_inscripcion',
      placeholder: '1023456789',
      label: 'Número documento',
      required: true,
    },
    {
      type: 'email',
      name: 'correo_electronico_inscripcion',
      placeholder: 'example@sena.edu.co',
      label: 'Correo electrónico',
      required: true,
    },
    {
      type: 'number',
      name: 'numero_celular_inscripcion',
      placeholder: '3012345467',
      label: 'Número de celular',
      required: true,
    },
    {
      type: 'select',
      name: 'etapa_formacion_actual_inscripcion',
      placeholder: 'Sin seleccionar',
      label: 'Etapa de formación',
      required: true,
    },
    {
      type: 'select',
      name: 'nivel_formacion_actual_inscripcion',
      placeholder: 'Sin seleccionar',
      label: 'Nivel de formación',
      required: true,
    },
    {
      type: 'number',
      name: 'id_ficha_inscripcion',
      placeholder: '2134567',
      label: 'Número de ficha',
      required: true,
    },
    {
      type: 'text',
      name: 'nombre_programa_formacion_inscripcion',
      placeholder: 'Producción multimedia',
      label: 'Programa formación',
      required: true,
    },
    {
      type: 'date',
      name: 'fin_etapa_lectiva_inscripcion',
      label: 'Fin etapa lectiva',
      required: true,
    },
    {
      type: 'text',
      name: 'nombre_instructor_lider_inscripcion',
      placeholder: 'Juan Perez',
      label: 'Nombre instructor lider',
    },
    {
      type: 'email',
      name: 'correo_electronico_instructor_lider_inscripcion',
      placeholder: 'example@sena.edu.co',
      label: 'Correo instructor lider',
      required: true,
    },
    {
      type: 'select',
      name: 'apoyo_sostenimiento_inscripcion',
      placeholder: 'Sin seleccionar',
      label: '¿Recibe algún apoyo?',
      required: true,
    },
  ],
  dataEmpresa: [
    {
      type: 'number',
      name: 'nit_empresa_inscripcion',
      placeholder: '123456789',
      label: 'NIT de la empresa',
    },
    {
      type: 'text',
      name: 'nombre_empresa_inscripcion',
      placeholder: 'Sena',
      label: 'Razón social (Empresa)',
    },
    {
      type: 'text',
      name: 'direccion_empresa_inscripcion',
      placeholder: 'Calle 123',
      label: 'Dirección de empresa',
    },
    {
      type: 'text',
      name: 'nombre_completo_jefe_inmediato_inscripcion',
      placeholder: 'Juan Perez',
      label: 'Nombre jefe inmediato',
    },
    {
      type: 'text',
      name: 'cargo_jefe_inmediato_inscripcion',
      placeholder: 'Gerente',
      label: 'Cargo jefe inmediato',
    },
    {
      type: 'number',
      name: 'telefono_jefe_inmediato_inscripcion',
      placeholder: '3012345678',
      label: 'Teléfono jefe inmediato',
    },
    {
      type: 'email',
      name: 'correo_jefe_inmediato_inscripcion',
      placeholder: 'example@sena.edu.co',
      label: 'Correo jefe Inmediato',
    },
    {
      type: 'select',
      name: 'asume_pago_arl_inscripcion',
      placeholder: 'Sin seleccionar',
      label: '¿Quién asume pago arl?',
    },
    {
      type: 'text',
      name: 'observaciones_inscripcion',
      placeholder: 'Digite una observación',
      label: '¿Observaciones?',
      required: true,
    },
  ],
}

/*
 * src: src\components\Register-student\RegisterStudent.jsx
 */
export const idTypes = [
  { value: 'C.C', name: 'Cédula de ciudadanía' },
  { value: 'C.E', name: 'Cédula de extranjería' },
  { value: 'T.I', name: 'Tarjeta de identidad' },
  { value: 'PEP', name: 'Persona expuesta políticamente' },
]

/*
 * src: src\components\Register-student\RegisterStudent.jsx
 */
export const modalities = [
  { value: 1, name: 'Pasantías' },
  { value: 2, name: 'Contrato de aprendizaje' },
  { value: 3, name: 'Proyecto productivo' },
  { value: 4, name: 'Monitoria' },
  { value: 5, name: 'Vinculación laboral' },
]

/*
 * src: src\components\Register-student\RegisterStudent.jsx
 */
export const etapasFormacion = [
  { value: 'Lectiva', name: 'Lectiva' },
  { value: 'Práctica', name: 'Práctica' },
]

/*
 * src: src\components\Register-student\RegisterStudent.jsx
 */
export const nivelFormacion = [
  { value: 'Técnico', name: 'Técnico' },
  { value: 'Tecnología', name: 'Tecnología' },
]

/*
 * src: src\components\Register-student\RegisterStudent.jsx
 */
export const apoyoSostenimiento = [
  { value: 'FIC', name: 'FIC' },
  { value: 'Jóvenes en Acción', name: 'Jóvenes en Acción' },
  { value: 'Apoyo de sostenimiento Sena', name: 'Apoyo de sostenimiento Sena' },
  { value: 'Ninguno', name: 'Ninguno' },
]

/*
 * src: src\components\Register-student\RegisterStudent.jsx
 */
export const pagoArl = [
  { value: 'Empresa', name: 'Empresa' },
  { value: 'SENA', name: 'SENA' },
]

/*
 * src: src\components\Form\Form.jsx
 */
export const passwordStatus = {
  shown: 'text',
  hidden: 'password',
}

/*
 * src: src\components\Siderbar\Sidebar.jsx
 */
export const colorIcon = {
  '/home': 'text-salmon',
  '/aprendices': 'text-third',
  '/bitacoras': 'text-seventh',
  '/visitas': 'text-primary',
  '/config': 'text-fifth',
}

/*
 * src: src\components\Visits\Visits.jsx
 */
export const estadoIcons = {
  visitado: <LuCalendarCheck2 />,
  visitadont: <LuCalendarX2 />,
}

/*
 * src: src\components\Utils\Modals\Modals.jsx
 */

export const filter = {
  filterStudents: [
    {
      type: 'text',
      name: 'ficha',
      placeholder: '2473196',
      label: 'Fichas:',
    },
    {
      type: 'text',
      name: 'programaFormacion',
      placeholder: 'ADSO',
      label: 'Programa de formación:',
    },
    {
      type: 'select',
      name: 'modalitie',
      placeholder: 'Sin seleccionar',
      label: 'Modalidad:',
    },
  ],
  filterVisits: [
    {
      type: 'date',
      name: 'fechaInicio',
      placeholder: '2021-01-01',
      label: 'Fecha inicio',
    },
    {
      type: 'date',
      name: 'fechaFin',
      placeholder: '2021-01-01',
      label: 'Fecha fin',
    },
    {
      type: 'text',
      name: 'ficha',
      placeholder: '2473196',
      label: 'Ficha',
    },
    {
      type: 'text',
      name: 'empresa',
      placeholder: 'Empresa',
      label: 'Empresa',
    },
  ],
  filterBitacoras: [
    {
      type: 'text',
      name: 'ficha',
      placeholder: '2473196',
      label: 'Fichas',
    },
    {
      type: 'text',
      name: 'programaFormacion',
      placeholder: 'ADSO',
      label: 'Programa de formación',
    },
    {
      type: 'text',
      name: 'nombreAprendiz',
      placeholder: 'Juan Perez',
      label: 'Nombre Aprendiz',
    },
  ],
}

/*
 * src: src\components\Bitacoras\Bitacoras.jsx
 */
export const testInscriptions = {
  data: [
    {
      nombreCompleto: 'Guillermo Stiven Benjumea Morales',
      programaFormacion: 'Fabicación de Muebles Contemporaneos y Modulares',
      ficha: '2345678',
      estado: 'Calificado',
      fecha: '29/06/2023',
    },
    {
      nombreCompleto: 'Stiven Blandón Urrego',
      programaFormacion: 'Analisis y Desarrollo de Software',
      ficha: '2345678',
      estado: 'Calificado',
      fecha: '29/06/2023',
    },
    {
      nombreCompleto: 'Lorena Quiceno Giraldo',
      programaFormacion: 'Producción y Multimedia',
      ficha: '2345678',
      estado: 'Calificado',
      fecha: '28/05/2023',
    },
    {
      nombreCompleto: 'Juan Guillermo Gomez Zapata',
      programaFormacion: 'Dibujo arquitectónico',
      ficha: '2456666',
      estado: 'Calificado',
      fecha: '01/06/2023',
    },
    {
      nombreCompleto: 'Guillermo Stiven Benjumea Morales',
      programaFormacion: 'Fabicación de Muebles Contemporaneos y Modulares',
      ficha: '2345678',
      estado: 'Sin Calificar',
      fecha: '06/07/2023',
    },
    {
      nombreCompleto: 'Stiven Blandón Urrego',
      programaFormacion: 'Analisis y Desarrollo de Software',
      ficha: '2345678',
      estado: 'Sin Calificar',
      fecha: '06/07/2023',
    },
    {
      nombreCompleto: 'Lorena Quiceno Giraldo',
      programaFormacion: 'Producción y Multimedia',
      ficha: '2345678',
      estado: 'Sin Calificar',
      fecha: '06/07/2023',
    },
    {
      nombreCompleto: 'Juan Guillermo Gomez Zapata',
      programaFormacion: 'Dibujo arquitectónico',
      ficha: '2456666',
      estado: 'Sin Calificar',
      fecha: '06/07/2023',
    },
  ],
}
