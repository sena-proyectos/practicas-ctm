import { LuCalendarCheck2, LuCalendarX2 } from 'react-icons/lu'

export const rolesNames = {
  1: 'Administrador',
  2: 'Coordinador',
  3: 'Instructor de Seguimiento',
  4: 'Instructor Líder',
}

export const keysRoles = Object.keys(rolesNames)

/*
 * src: src\components\Home\Home.jsx
 */

export const rolesCard = {
  1: [
    {
      title: 'Listado de aprendices',
      titleColor: 'black',
      description: 'Podrás ver el listado de aprendices que actualmente se encuentran en prácticas.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-primary',
      sombra: 'shadowPrimary/50',
      link: '/aprendices',
    },
    {
      title: 'Bitácoras incompletas',
      titleColor: 'black',
      description: 'Podrás ver el listado de bitácoras que actualmente se encuentran incompletas.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-salmon',
      sombra: 'shadowSalmon/50',
      link: '/bitacoras',
    },
    {
      title: 'Bitácoras completas',
      titleColor: 'black',
      description: 'Podrás ver el listado de bitácoras que actualmente se encuentran completas.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-seventh',
      sombra: 'shadowSeventh/75',
      link: '/bitacoras',
    },
    {
      title: 'Aprobaciones',
      titleColor: 'black',
      description: 'Podrás ver los aprendices que estan esperando aprobación para la modalidad de prácticas.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-[#385C57]',
      sombra: '[#385C57]/20',
      link: '/aprov',
    },
    {
      title: 'Visitas',
      titleColor: 'black',
      description: 'Podrás ver el listado de las visitas que se han realizado y las que se encuentran pendientes.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-third',
      sombra: 'shadowThird/100',
      link: '/visitas',
    },
    {
      title: 'Inscribir un aprendiz',
      titleColor: 'black',
      description: 'Podrás acceder al formulario de inscripción del aprendiz a su modalidad de prácticas.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-aqua',
      sombra: 'shadowAqua/100',
      link: '/inscribir-aprendiz',
    },
  ],
  2: [
    {
      title: 'Listado de aprendices',
      titleColor: 'black',
      description: 'Podrás ver el listado de aprendices que actualmente se encuentran en prácticas.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-primary',
      sombra: 'shadowPrimary/50',
      link: '/aprendices',
    },
    {
      title: 'Bitácoras incompletas',
      titleColor: 'black',
      description: 'Podrás ver el listado de bitácoras que actualmente se encuentran incompletas.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-salmon',
      sombra: 'shadowSalmon/50',
      link: '/bitacoras',
    },
    {
      title: 'Bitácoras completas',
      titleColor: 'black',
      description: 'Podrás ver el listado de bitácoras que actualmente se encuentran completas.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-seventh',
      sombra: 'shadowSeventh/75',
      link: '/bitacoras',
    },
    {
      title: 'Aprobaciones',
      titleColor: 'black',
      description: 'Podrás ver los aprendices que estan esperando aprobación para la modalidad de prácticas.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-[#385C57]',
      sombra: '[#385C57]/20',
      link: '/aprov',
    },
    {
      title: 'Visitas',
      titleColor: 'black',
      description: 'Podrás ver el listado de las visitas que se han realizado y las que se encuentran pendientes.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-third',
      sombra: 'shadowThird/100',
      link: '/visitas',
    },
    {
      title: 'Inscribir un aprendiz',
      titleColor: 'black',
      description: 'Podrás acceder al formulario de inscripción del aprendiz a su modalidad de prácticas.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-aqua',
      sombra: 'shadowAqua/100',
      link: '/inscribir-aprendiz',
    },
  ],
  3: [
    {
      title: 'Listado de aprendices',
      titleColor: 'black',
      description: 'Podrás ver el listado de aprendices que actualmente se encuentran en prácticas.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-primary',
      sombra: 'shadowPrimary/50',
      link: '/aprendices',
    },
    {
      title: 'Bitácoras incompletas',
      titleColor: 'black',
      description: 'Podrás ver el listado de bitácoras que actualmente se encuentran incompletas.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-salmon',
      sombra: 'shadowSalmon/50',
      link: '/bitacoras',
    },
    {
      title: 'Bitácoras completas',
      titleColor: 'black',
      description: 'Podrás ver el listado de bitácoras que actualmente se encuentran completas.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-seventh',
      sombra: 'shadowSeventh/75',
      link: '/bitacoras',
    },
    {
      title: 'Aprobaciones',
      titleColor: 'black',
      description: 'Podrás ver los aprendices que estan esperando aprobación para la modalidad de prácticas.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-[#385C57]',
      sombra: '[#385C57]/20',
      link: '/aprov',
    },
    {
      title: 'Visitas',
      titleColor: 'black',
      description: 'Podrás ver el listado de las visitas que se han realizado y las que se encuentran pendientes.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-third',
      sombra: 'shadowThird/100',
      link: '/visitas',
    },
  ],
  4: [
    {
      title: 'Listado de aprendices',
      titleColor: 'black',
      description: 'Podrás ver el listado de aprendices que actualmente se encuentran en prácticas.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-aqua',
      sombra: 'shadowAqua/100',
      link: '/aprendices',
    },
    {
      title: 'Aprobaciones',
      titleColor: 'black',
      description: 'Podrás ver los aprendices que estan esperando aprobación para la modalidad de prácticas.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-seventh',
      sombra: 'shadowSeventh/75',
      link: '/aprov',
    },
    {
      title: 'Fichas',
      titleColor: 'black',
      description: 'Podrás ver el listado de fichas que tienes asignadas.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-salmon',
      sombra: 'shadowSalmon/50',
      link: '/fichas',
    },
  ],
}

/*
 * src: src\components\Register-student\RegisterStudent.jsx
 */
export const dataInscription = {
  dataAprendiz: [
    {
      type: 'select',
      name: 'modalidad_inscripcion',
      placeholder: 'Sin seleccionar',
      label: 'Modalidad',
      required: true,
    },
    {
      type: 'text',
      name: 'apellido_inscripcion',
      placeholder: 'Rodriguez',
      label: 'Apellidos',
      required: true,
    },
    {
      type: 'text',
      name: 'nombre_inscripcion',
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
      name: 'documento_inscripcion',
      placeholder: '1023456789',
      label: 'Número documento',
      required: true,
    },
    {
      type: 'email',
      name: 'email_inscripcion',
      placeholder: 'example@sena.edu.co',
      label: 'Correo electrónico',
      required: true,
    },
    {
      type: 'number',
      name: 'inscripcion_celular',
      placeholder: '3012345467',
      label: 'Número de celular',
      required: true,
    },
    {
      type: 'select',
      name: 'etapa_actual_inscripcion',
      placeholder: 'Sin seleccionar',
      label: 'Etapa de formación',
      required: true,
    },
    {
      type: 'select',
      name: 'nivel_formacion_inscripcion',
      placeholder: 'Sin seleccionar',
      label: 'Nivel de formación',
      required: true,
    },
    {
      type: 'number',
      name: 'numero_ficha_inscripcion',
      placeholder: '2134567',
      label: 'Número de ficha',
      required: true,
    },
    {
      type: 'text',
      name: 'nombre_programa_inscripcion',
      placeholder: 'Producción multimedia',
      label: 'Programa formación',
      required: true,
    },
    {
      type: 'date',
      name: 'fecha_fin_lectiva_inscripcion',
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
      name: 'email_instructor_lider_inscripcion',
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
      placeholder: '899999034-1',
      label: 'NIT de la empresa',
    },
    {
      type: 'text',
      name: 'nombre_empresa_inscripción',
      placeholder: 'SENA',
      label: 'Razón social (Empresa)',
    },
    {
      type: 'text',
      name: 'direccion_empresa_inscripcion',
      placeholder: 'Cra 30 No. 3E 164',
      label: 'Dirección de empresa',
    },
    {
      type: 'text',
      name: 'nombre_jefe_empresa_inscripcion',
      placeholder: 'Juan Perez',
      label: 'Nombre jefe inmediato',
    },
    {
      type: 'text',
      name: 'cargo_jefe_empresa_inscripcion',
      placeholder: 'Gerente',
      label: 'Cargo jefe inmediato',
    },
    {
      type: 'number',
      name: 'telefono_jefe_empresa_inscripcion',
      placeholder: '3012345678',
      label: 'Teléfono jefe inmediato',
    },
    {
      type: 'email',
      name: 'email_jefe_empresa_inscripcion',
      placeholder: 'example@sena.edu.co',
      label: 'Correo jefe Inmediato',
    },
    {
      type: 'select',
      name: 'arl',
      placeholder: 'Sin seleccionar',
      label: '¿Quién asume pago arl?',
    },
    {
      type: 'file',
      name: 'link_documentos',
      label: 'Documentos',
      required: true,
      accept: '.pdf',
    },
    {
      type: 'textarea',
      name: 'observaciones',
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
  { value: 'CC', name: 'Cédula de ciudadanía' },
  { value: 'CE', name: 'Cédula de extranjería' },
  { value: 'TI', name: 'Tarjeta de identidad' },
  { value: 'PEP', name: 'Persona expuesta políticamente' },
]

/*
 * src: src\components\Register-student\RegisterStudent.jsx
 */
export const modalities = [
  { value: 1, name: 'Contrato de aprendizaje' },
  { value: 2, name: 'Pasantías' },
  { value: 3, name: 'Proyecto productivo' },
  { value: 4, name: 'Monitoria' },
  { value: 5, name: 'Vinculación laboral' },
]

/*
 * src: src\components\Register-student\RegisterStudent.jsx
 */
export const etapasFormacion = [
  { value: 'lectiva', name: 'Lectiva' },
  { value: 'practica', name: 'Práctica' },
]

/*
 * src: src\components\Register-student\RegisterStudent.jsx
 */
export const nivelFormacion = [
  { value: 'tecnico', name: 'Técnico' },
  { value: 'tecnologia', name: 'Tecnología' },
]

/*
 * src: src\components\Register-student\RegisterStudent.jsx
 */
export const apoyoSostenimiento = [
  { value: 'FIC', name: 'FIC' },
  { value: 'jovenes en accion', name: 'Jóvenes en Acción' },
  { value: 'apoyo de sostenimiento sena', name: 'Apoyo de sostenimiento Sena' },
  { value: 'ninguno', name: 'ninguno' },
]

/*
 * src: src\components\Register-student\RegisterStudent.jsx
 */
export const pagoArl = [
  { value: 'empresa', name: 'Empresa' },
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
  '/registros': 'text-lima',
  '/aprov': 'text-secondary',
  '/instructores': 'text-rosa',
  '/fichas': 'text-coffee',
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
