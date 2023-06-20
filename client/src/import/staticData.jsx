import { AiOutlineUser } from 'react-icons/ai'

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
    link: '/',
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
    icon: <AiOutlineUser />,
    type: 'select',
    name: 'tipo_documento_aprendiz_inscripcion',
    placeholder: 'sin seleccionar',
    label: 'Tipo documento',
  },
  {
    icon: <AiOutlineUser />,
    type: 'number',
    name: 'numero_documento_aprendiz_inscripcion',
    placeholder: '1023456789',
    label: 'Número documento',
  },
  {
    icon: <AiOutlineUser />,
    type: 'email',
    name: 'correo_electronico_aprendiz_inscripcion',
    placeholder: 'example@sena.edu.co',
    label: 'Correo electrónico',
  },
  {
    icon: <AiOutlineUser />,
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
    icon: <AiOutlineUser />,
    type: 'date',
    name: 'inicio_etapa_practica_aprendiz_inscripcion',
    label: 'Fecha de inicio prácticas',
  },
  {
    icon: <AiOutlineUser />,
    type: 'date',
    name: 'fin_etapa_practica_aprendiz_inscripcion',
    label: 'Fecha de fin prácticas',
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
