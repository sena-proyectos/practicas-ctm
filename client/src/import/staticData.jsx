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
    title: 'Bitácoras Incompletas',
    titleColor: 'black',
    description: 'Podrás ver el listado de bitácoras que actualmente se encuentran en incompletas.',
    buttonText: 'LLÉVAME AHÍ',
    bgColor: 'bg-salmon',
    link: '/bitacoras',
  },
  {
    title: 'Bitácoras Completas',
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
export const dataInscription = [
  {
    icon: <AiOutlineUser />,
    type: 'select',
    name: 'id_modalidad_inscripcion',
    placeholder: 'Sin seleccionar',
    label: 'Modalidad',
    required: true,
  },
  {
    icon: <AiOutlineUser />,
    type: 'text',
    name: 'apellidos_inscripcion',
    placeholder: 'Rodriguez',
    label: 'Apellidos',
    required: true,
  },
  {
    icon: <AiOutlineUser />,
    type: 'text',
    name: 'nombres_inscripcion',
    placeholder: 'Alejandro',
    label: 'Nombres',
    required: true,
  },
  {
    icon: <AiOutlineIdcard />,
    type: 'select',
    name: 'tipo_documento_inscripcion',
    placeholder: 'sin seleccionar',
    label: 'Tipo documento',
    required: true,
  },
  {
    icon: <AiOutlineIdcard />,
    type: 'number',
    name: 'numero_documento_inscripcion',
    placeholder: '1023456789',
    label: 'Número documento',
    required: true,
  },
  {
    icon: <AiOutlineMail />,
    type: 'email',
    name: 'correo_electronico_inscripcion',
    placeholder: 'example@sena.edu.co',
    label: 'Correo electrónico',
    required: true,
  },
  {
    icon: <AiOutlinePhone />,
    type: 'number',
    name: 'numero_celular_inscripcion',
    placeholder: '3012345467',
    label: 'Número de celular',
    required: true,
  },
  {
    icon: <AiOutlineUser />,
    type: 'select',
    name: 'etapa_formacion_actual_inscripcion',
    placeholder: 'Sin seleccionar',
    label: 'Etapa de formación',
    required: true,
  },
  {
    icon: <AiOutlineUser />,
    type: 'select',
    name: 'nivel_formacion_actual_inscripcion',
    placeholder: 'Sin seleccionar',
    label: 'Nivel de formación',
    required: true,
  },
  {
    icon: <AiOutlineUser />,
    type: 'number',
    name: 'id_ficha_inscripcion',
    placeholder: '2134567',
    label: 'Número de ficha',
    required: true,
  },
  {
    icon: <AiOutlineUser />,
    type: 'text',
    name: 'nombre_programa_formacion_inscripcion',
    placeholder: 'Producción multimedia',
    label: 'Nombre del programa',
    required: true,
  },
  {
    icon: <BsCalendar4 />,
    type: 'date',
    name: 'fin_etapa_lectiva_inscripcion',
    label: 'Terminación de la etapa lectiva',
    required: true,
  },
  {
    icon: <AiOutlineUser />,
    type: 'text',
    name: 'nombre_instructor_lider_inscripcion',
    placeholder: 'Juan Perez',
    label: 'Nombre Instructor Lider',
  },
  {
    icon: <AiOutlineUser />,
    type: 'email',
    name: 'correo_electronico_instructor_lider_inscripcion',
    placeholder: 'example@sena.edu.co',
    label: 'Correo electrónico Instructor Lider',
    required: true,
  },
  {
    icon: <AiOutlineUser />,
    type: 'select',
    name: 'apoyo_sostenimiento_inscripcion',
    placeholder: 'Sin seleccionar',
    label: '¿Recibe apoyo de sostenimiento?',
    required: true,
  },
  {
    icon: <AiOutlineUser />,
    type: 'number',
    name: 'nit_empresa_inscripcion',
    placeholder: '123456789',
    label: 'Nit de la empresa',
  },
  {
    icon: <AiOutlineUser />,
    type: 'text',
    name: 'nombre_empresa_inscripcion',
    placeholder: 'Sena',
    label: 'Razón social (Nombre Empresa)',
  },
  {
    icon: <AiOutlineUser />,
    type: 'text',
    name: 'direccion_empresa_inscripcion',
    placeholder: 'Calle 123',
    label: 'Dirección de la empresa',
  },
  {
    icon: <AiOutlineUser />,
    type: 'text',
    name: 'nombre_completo_jefe_inmediato_inscripcion',
    placeholder: 'Juan Perez',
    label: 'Nombre del Jefe inmediato',
  },
  {
    icon: <AiOutlineUser />,
    type: 'text',
    name: 'cargo_jefe_inmediato_inscripcion',
    placeholder: 'Gerente',
    label: 'Cargo del contacto en la empresa',
  },
  {
    icon: <AiOutlineUser />,
    type: 'number',
    name: 'telefono_jefe_inmediato_inscripcion',
    placeholder: '3012345678',
    label: 'Teléfono de la empresa',
  },
  {
    icon: <AiOutlineUser />,
    type: 'email',
    name: 'correo_jefe_inmediato_inscripcion',
    placeholder: 'example@sena.edu.co',
    label: 'Correo electrónico de la empresa',
  },
  {
    icon: <AiOutlineUser />,
    type: 'select',
    name: 'asume_pago_arl_inscripcion',
    placeholder: 'Sin seleccionar',
    label: '¿Quien asume el pago del arl?',
  },
  {
    icon: <AiOutlineUser />,
    type: 'text',
    name: 'observaciones_inscripcion',
    placeholder: 'Digite una observación',
    label: '¿Tiene alguna observación?',
    required: true,
  },
]

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
