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
    type: 'text',
    name: 'nombres_aprendiz_inscripcion',
    placeholder: 'Alejandro',
    label: 'Nombres',
  },
  {
    icon: <AiOutlineUser />,
    type: 'text',
    name: 'apellidos_aprendiz_inscripcion',
    placeholder: 'Rodriguez',
    label: 'Apellidos',
  },
  {
    icon: <AiOutlineIdcard />,
    type: 'select',
    name: 'tipo_documento_aprendiz_inscripcion',
    placeholder: 'sin seleccionar',
    label: 'Tipo documento',
  },
  {
    icon: <AiOutlineIdcard />,
    type: 'number',
    name: 'numero_documento_aprendiz_inscripcion',
    placeholder: '1023456789',
    label: 'Número documento',
  },
  {
    icon: <AiOutlineMail />,
    type: 'email',
    name: 'correo_electronico_aprendiz_inscripcion',
    placeholder: 'example@sena.edu.co',
    label: 'Correo electrónico',
  },
  {
    icon: <AiOutlinePhone />,
    type: 'number',
    name: 'numero_telefono_aprendiz_inscripcion',
    placeholder: '3012345467',
    label: 'Número de celular',
  },
  {
    icon: <AiOutlineUser />,
    type: 'number',
    name: 'numero_ficha_aprendiz_inscripcion',
    placeholder: '2134567',
    label: 'Número de ficha',
  },
  {
    icon: <AiOutlineUser />,
    type: 'text',
    name: 'programa_formacion_aprendiz_inscripcion',
    placeholder: 'ADSO',
    label: 'Programa de formación',
  },
  {
    icon: <AiOutlineUser />,
    type: 'select',
    name: 'tipo_modalidad_aprendiz_inscripcion',
    placeholder: 'Sin seleccionar',
    label: 'Modalidad',
  },
  {
    icon: <BsCalendar4 />,
    type: 'date',
    name: 'inicio_etapa_practica_aprendiz_inscripcion',
    label: 'Fecha de inicio prácticas',
  },
  {
    icon: <BsCalendar4 />,
    type: 'date',
    name: 'fin_etapa_practica_aprendiz_inscripcion',
    label: 'Fecha de fin prácticas',
  },
  {
    icon: <AiOutlineUser />,
    type: 'select',
    name: 'etapa_formacion_aprendiz_inscripcion',
    placeholder: 'Sin seleccionar',
    label: 'Etapa de formación',
  },
  {
    icon: <AiOutlineUser />,
    type: 'select',
    name: 'nivel_formacion_aprendiz_inscripcion',
    placeholder: 'Sin seleccionar',
    label: 'Nivel de formación',
  },
  {
    icon: <AiOutlineUser />,
    type: 'text',
    name: 'nombre_instructor_lider_aprendiz_inscripcion',
    placeholder: 'Juan Perez',
    label: 'Nombre Instructor Lider',
  },
  {
    icon: <AiOutlineMail />,
    type: 'email',
    name: 'correo_electronico_instructor_lider_aprendiz_inscripcion',
    placeholder: 'example@sena.edu.co',
    label: 'Correo electrónico Instructor Lider',
  },
  {
    icon: <BsCalendar4 />,
    type: 'date',
    name: 'fin_etapa_lectiva_aprendiz_inscripcion',
    label: 'Terminación de la etapa lectiva',
  },
  {
    icon: <AiOutlineUser />,
    type: 'select',
    name: 'apoyo_sostenimiento_aprendiz_inscripcion',
    placeholder: 'Sin seleccionar',
    label: '¿Recibe apoyo de sostenimiento?',
  },
  {
    icon: <AiOutlineUser />,
    type: 'number',
    name: 'nit_empresa_aprendiz_inscripcion',
    placeholder: '123456789',
    label: 'Nit de la empresa',
  },
  {
    icon: <AiOutlineUser />,
    type: 'text',
    name: 'nombre_empresa_aprendiz_inscripcion',
    placeholder: 'Sena',
    label: 'Razón social (Nombre Empresa)',
  },
  {
    icon: <FaRegAddressBook />,
    type: 'text',
    name: 'direccion_empresa_aprendiz_inscripcion',
    placeholder: 'Calle 123',
    label: 'Dirección de la empresa',
  },
  {
    icon: <AiOutlineUser />,
    type: 'text',
    name: 'nombre_jefe_inmediato_aprendiz_inscripcion',
    placeholder: 'Juan Perez',
    label: 'Nombre del Jefe inmediato',
  },
  {
    icon: <AiOutlineUser />,
    type: 'text',
    name: 'cargo_jefe_inmediato_aprendiz_inscripcion',
    placeholder: 'Gerente',
    label: 'Cargo del contacto en la empresa',
  },
  {
    icon: <AiOutlinePhone />,
    type: 'number',
    name: 'telefono_empresa_aprendiz_inscripcion',
    placeholder: '3012345678',
    label: 'Teléfono de la empresa',
  },
  {
    icon: <AiOutlineMail />,
    type: 'email',
    name: 'correo_empresa_aprendiz_inscripcion',
    placeholder: 'example@sena.edu.co',
    label: 'Correo electrónico de la empresa',
  },
  {
    icon: <AiOutlineUser />,
    type: 'select',
    name: 'arl_aprendiz_inscripcion',
    placeholder: 'Sin seleccionar',
    label: '¿Quien asume el pago del arl?',
  },
]

/*
 * src: src\components\Register-student\RegisterStudent.jsx
 */
export const idTypes = [
  { value: 'C.C', name: 'Cédula de ciudadanía' },
  { value: 'C.E', name: 'Cédula de extranjería' },
  { value: 'T.I', name: 'Tarjeta de identidad' },
]

/*
 * src: src\components\Register-student\RegisterStudent.jsx
 */
export const modalities = [
  { value: 'Contrato de aprendizaje', name: 'Contrato de aprendizaje' },
  { value: 'Pasantía', name: 'Pasantías' },
  { value: 'Proyecto formativoñ', name: 'Proyecto formativo' },
  { value: 'Vinculación laboral', name: 'Vinculación laboral' },
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
