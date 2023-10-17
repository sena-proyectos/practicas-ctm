import { LuCalendarCheck2, LuCalendarX2 } from 'react-icons/lu'

/**
 * @description Nombres de roles y sus correspondientes identificadores.
 * @type {object}
 * @property {string} 1 - Líder prácticas
 * @property {string} 2 - Coordinador
 * @property {string} 3 - Instructor de Seguimiento
 * @property {string} 4 - Instructor Líder
 * @example
 * const nombreRol = rolesNames[1]; // Devuelve 'Líder prácticas'
 */
export const rolesNames = {
  1: 'Líder prácticas',
  2: 'Coordinador',
  3: 'Instructor de Seguimiento'
}

export const colorTextStatus = {
  Pendiente: 'text-blue-600',
  Aprobado: 'text-green-600',
  Rechazado: 'text-red-600'
}

export const keysRoles = Object.keys(rolesNames)

/**
 * @src src\components\Home\Home.jsx
 *
 * @description Datos de tarjetas de roles.
 * @type {object}
 * @property {Array<object>} 1 - Datos de tarjetas para el rol 1
 * @property {Array<object>} 2 - Datos de tarjetas para el rol 2
 * @property {Array<object>} 3 - Datos de tarjetas para el rol 3
 * @property {Array<object>} 4 - Datos de tarjetas para el rol 4
 * @example
 * const tarjetas = rolesCard[1]; // Devuelve un arreglo de objetos con datos de tarjetas para el rol 1
 */
export const rolesCard = {
  1: [
    {
      title: 'Listado de aprendices',
      titleColor: 'black',
      description: 'Podrás ver el listado de aprendices que actualmente se encuentran en prácticas.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-primary',
      sombra: 'shadow-shadowPrimary',
      link: '/seguimiento-aprendices'
    },
    {
      title: 'Bitácoras',
      titleColor: 'black',
      description: 'Podrás ver el listado de bitácoras.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-salmon',
      sombra: 'shadow-shadowSalmon',
      link: '/bitacoras'
    },
    {
      title: 'Registro',
      titleColor: 'black',
      description: 'Podrás ver los aprendices que registros para la modalidad de prácticas.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-[#385C57]',
      sombra: 'shadow-shadowGray',
      link: '/registros'
    },
    {
      title: 'Visitas',
      titleColor: 'black',
      description: 'Podrás ver el listado de las visitas.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-third',
      sombra: 'shadow-shadowThird',
      link: '/visitas'
    },
    {
      title: 'Registrar un aprendiz',
      titleColor: 'black',
      description: 'Podrás acceder al formulario de inscripción del aprendiz a su modalidad de prácticas.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-aqua',
      sombra: 'shadow-shadowAqua',
      link: '/registrar-aprendiz'
    }
  ],
  2: [
    {
      title: 'Listado de aprendices',
      titleColor: 'black',
      description: 'Podrás ver el listado de aprendices que actualmente se encuentran en prácticas.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-primary',
      sombra: 'shadow-shadowPrimary',
      link: '/seguimiento-aprendices'
    },
    {
      title: 'Bitácoras',
      titleColor: 'black',
      description: 'Podrás ver el listado de bitácoras.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-salmon',
      sombra: 'shadow-shadowSalmon',
      link: '/bitacoras'
    },
    {
      title: 'Registro',
      titleColor: 'black',
      description: 'Podrás ver los aprendices que registros para la modalidad de prácticas.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-[#385C57]',
      sombra: 'shadow-shadowGray',
      link: '/registros'
    },
    {
      title: 'Visitas',
      titleColor: 'black',
      description: 'Podrás ver el listado de las visitas.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-third',
      sombra: 'shadow-shadowThird',
      link: '/visitas'
    },
    {
      title: 'Registrar un aprendiz',
      titleColor: 'black',
      description: 'Podrás acceder al formulario de inscripción del aprendiz a su modalidad de prácticas.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-aqua',
      sombra: 'shadow-shadowAqua',
      link: '/registrar-aprendiz'
    }
  ],
  3: [
    {
      title: 'Listado de aprendices',
      titleColor: 'black',
      description: 'Podrás ver el listado de aprendices que actualmente se encuentran en prácticas.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-primary',
      sombra: 'shadow-shadowPrimary',
      link: '/seguimiento-aprendices'
    },
    {
      title: 'Bitácoras',
      titleColor: 'black',
      description: 'Podrás ver el listado de bitácoras.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-salmon',
      sombra: 'shadow-shadowSalmon',
      link: '/bitacoras'
    },
    {
      title: 'Registro',
      titleColor: 'black',
      description: 'Podrás ver los aprendices que registros para la modalidad de prácticas.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-[#385C57]',
      sombra: 'shadow-shadowGray',
      link: '/registros'
    },
    {
      title: 'Visitas',
      titleColor: 'black',
      description: 'Podrás ver el listado de las visitas.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-third',
      sombra: 'shadow-shadowThird',
      link: '/visitas'
    },
    {
      title: 'Registrar un aprendiz',
      titleColor: 'black',
      description: 'Podrás acceder al formulario de inscripción del aprendiz a su modalidad de prácticas.',
      buttonText: 'LLÉVAME AHÍ',
      bgColor: 'bg-aqua',
      sombra: 'shadow-shadowAqua',
      link: '/registrar-aprendiz'
    }
  ]
}

/**
 * @src \components\Register-student\RegisterStudent.jsx
 *
 * @description Datos de inscripción de estudiantes.
 * @type {object}
 * @property {Array<object>} dataAprendiz - Datos de inscripción del aprendiz
 * @property {Array<object>} dataEmpresa - Datos de inscripción de la empresa
 * @example
 * const datosAprendiz = dataInscription.dataAprendiz; // Devuelve un arreglo de objetos con datos de inscripción del aprendiz
 */
export const dataInscription = {
  dataAprendiz: [
    {
      type: 'select',
      name: 'modalidad_inscripcion',
      placeholder: 'Sin seleccionar',
      label: 'Modalidad',
      required: true
    },
    {
      type: 'text',
      name: 'apellido_inscripcion',
      placeholder: 'Rodriguez',
      label: 'Apellidos',
      required: true
    },
    {
      type: 'text',
      name: 'nombre_inscripcion',
      placeholder: 'Alejandro',
      label: 'Nombres',
      required: true
    },
    {
      type: 'select',
      name: 'tipo_documento_inscripcion',
      placeholder: 'Sin seleccionar',
      label: 'Tipo documento',
      required: true
    },
    {
      type: 'number',
      name: 'documento_inscripcion',
      placeholder: '1023456789',
      label: 'Número documento',
      required: true
    },
    {
      type: 'email',
      name: 'email_inscripcion',
      placeholder: 'example@sena.edu.co',
      label: 'Correo electrónico',
      required: true
    },
    {
      type: 'number',
      name: 'inscripcion_celular',
      placeholder: '3012345467',
      label: 'Número de celular',
      required: true
    },
    {
      type: 'select',
      name: 'etapa_actual_inscripcion',
      placeholder: 'Sin seleccionar',
      label: 'Etapa de formación',
      required: true
    },
    {
      type: 'select',
      name: 'nivel_formacion_inscripcion',
      placeholder: 'Sin seleccionar',
      label: 'Nivel de formación',
      required: true
    },
    {
      type: 'number',
      name: 'numero_ficha_inscripcion',
      placeholder: '2134567',
      label: 'Número de ficha',
      required: true
    },
    {
      type: 'text',
      name: 'nombre_programa_inscripcion',
      placeholder: 'Producción multimedia',
      label: 'Programa formación',
      required: true
    },
    {
      type: 'date',
      name: 'fecha_fin_lectiva_inscripcion',
      label: 'Fin etapa lectiva',
      required: true
    },
    {
      type: 'text',
      name: 'nombre_instructor_lider_inscripcion',
      placeholder: 'Juan Perez',
      label: 'Nombre instructor lider'
    },
    {
      type: 'email',
      name: 'email_instructor_lider_inscripcion',
      placeholder: 'example@sena.edu.co',
      label: 'Correo instructor lider',
      required: true
    },
    {
      type: 'select',
      name: 'apoyo_sostenimiento_inscripcion',
      placeholder: 'Sin seleccionar',
      label: '¿Recibe algún apoyo?',
      required: true
    }
  ],
  dataEmpresa: [
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
    },
    {
      type: 'file',
      name: 'link_documentos',
      label: 'Documentos',
      required: true,
      accept: '.pdf'
    },
    {
      type: 'textarea',
      name: 'observaciones',
      placeholder: 'Digite una observación',
      label: '¿Observaciones?'
    }
  ]
}

/**
 * @src src\components\Register-student\RegisterStudent.jsx
 *
 * @description Tipos de identificación.
 * @type {Array<object>}
 * @example
 * const tiposIdentificacion = idTypes; // Devuelve un arreglo de objetos con tipos de identificación
 */
export const idTypes = [
  { value: 'CC', name: 'Cédula de ciudadanía' },
  { value: 'CE', name: 'Cédula de extranjería' },
  { value: 'TI', name: 'Tarjeta de identidad' },
  { value: 'PEP', name: 'Persona expuesta políticamente' }
]

/**
 * @src src\components\Register-student\RegisterStudent.jsx
 *
 * @description Modalidades de formación.
 * @type {Array<Object>}
 */
export const modalities = [
  { value: 1, name: 'Pasantías' },
  { value: 2, name: 'Contrato de aprendizaje' },
  { value: 3, name: 'Proyecto productivo' },
  { value: 4, name: 'Monitoria' },
  { value: 5, name: 'Vinculación laboral' }
]

/**
 * @src src\components\Register-student\RegisterStudent.jsx
 *
 * @description Etapas de formación.
 * @type {Array<Object>}
 */
export const etapasFormacion = [
  { value: 'lectiva', name: 'Lectiva' },
  { value: 'practica', name: 'Práctica' }
]

/**
 * @src src\components\Register-student\RegisterStudent.jsx
 *
 * @description Niveles de formación.
 * @type {Array<Object>}
 */
export const nivelFormacion = [
  { value: 'tecnico', name: 'Técnico' },
  { value: 'tecnologia', name: 'Tecnología' }
]

/**
 * @src src\components\Register-student\RegisterStudent.jsx
 *
 * @description Opciones de apoyo de sostenimiento.
 * @type {Array<Object>}
 */
export const apoyoSostenimiento = [
  { value: 'FIC', name: 'FIC' },
  { value: 'jovenes en accion', name: 'Jóvenes en Acción' },
  { value: 'apoyo de sostenimiento sena', name: 'Apoyo de sostenimiento Sena' },
  { value: 'ninguno', name: 'Ninguno' }
]

/**
 * @src src\components\Register-student\RegisterStudent.jsx
 *
 * @description Opciones de pago de ARL.
 * @type {Array<Object>}
 */
export const pagoArl = [
  { value: 'empresa', name: 'Empresa' },
  { value: 'SENA', name: 'SENA' }
]

/**
 * @src src\components\Form\Form.jsx
 *
 * @description Estados de contraseña.
 * @type {Object} PasswordStatus
 * @property {string} shown - Clase de texto para contraseña visible.
 * @property {string} hidden - Clase de texto para contraseña oculta.
 * @example
 * const passwordStatus = {
 *   shown: 'text',
 *   hidden: 'password'
 * };
 */
export const passwordStatus = {
  shown: 'text',
  hidden: 'password'
}

/**
 * @src src\components\Siderbar\Sidebar.jsx
 *
 * @description Colores de iconos en la barra lateral.
 * @typedef {Object} ColorIcon
 * @property {string} /home - Clase de color para la página de inicio.
 * @property {string} /seguimiento-aprendices - Clase de color para la página de seguimiento de aprendices.
 * @property {string} /bitacoras - Clase de color para la página de bitácoras.
 * @property {string} /registros - Clase de color para la página de registros.
 * @property {string} /aprov - Clase de color para la página de aprobaciones.
 * @property {string} /instructores - Clase de color para la página de instructores.
 * @property {string} /fichas - Clase de color para la página de fichas.
 * @property {string} /visitas - Clase de color para la página de visitas.
 * @property {string} /config - Clase de color para la página de configuración.
 * @example
 * const colorIcon = {
 *   '/home': 'text-salmon',
 *   '/seguimiento-aprendices': 'text-third',
 *   '/bitacoras': 'text-seventh',
 *   '/registros': 'text-lima',
 *   '/aprov': 'text-secondary',
 *   '/instructores': 'text-rosa',
 *   '/fichas': 'text-coffee',
 *   // '/fichas-instructor/:id': 'text-coffee',
 *   '/visitas': 'text-primary',
 *   '/config': 'text-fifth'
 * };
 */
export const colorIcon = {
  '/home': 'text-salmon',
  '/seguimiento-aprendices': 'text-third',
  '/bitacoras': 'text-seventh',
  '/registros': 'text-lima',
  '/instructores': 'text-rosa',
  '/fichas': 'text-coffee',
  // '/fichas-instructor/:id': 'text-coffee',
  '/visitas': 'text-primary',
  '/config': 'text-fifth',
  '/registrar-usuario': 'text-purple-500'
}

/**
 * @src src\components\Visits\Visits.jsx
 *
 * @description Íconos para visitas dependiendo del estado.
 * @type {Object} EstadoIcons
 * @property {JSX.Element} visitado - Ícono para estado "visitado".
 * @property {JSX.Element} visitadont - Ícono para estado "visitado (no)".
 */
export const estadoIcons = {
  visitado: <LuCalendarCheck2 />,
  visitadont: <LuCalendarX2 />
}

/**
 * @src src\components\Bitacoras\Bitacoras.jsx
 *
 * @description Bitacoras de prueba.
 * @type {Object} TestInscriptions
 */
export const testInscriptions = {
  data: [
    {
      nombreCompleto: 'Guillermo Stiven Benjumea Morales',
      programaFormacion: 'Fabicación de Muebles Contemporaneos y Modulares',
      ficha: '2345678',
      estado: 'Calificado',
      fecha: '29/06/2023'
    },
    {
      nombreCompleto: 'Stiven Blandón Urrego',
      programaFormacion: 'Analisis y Desarrollo de Software',
      ficha: '2345678',
      estado: 'Calificado',
      fecha: '29/06/2023'
    },
    {
      nombreCompleto: 'Lorena Quiceno Giraldo',
      programaFormacion: 'Producción y Multimedia',
      ficha: '2345678',
      estado: 'Calificado',
      fecha: '28/05/2023'
    },
    {
      nombreCompleto: 'Juan Guillermo Gomez Zapata',
      programaFormacion: 'Dibujo arquitectónico',
      ficha: '2456666',
      estado: 'Calificado',
      fecha: '01/06/2023'
    },
    {
      nombreCompleto: 'Guillermo Stiven Benjumea Morales',
      programaFormacion: 'Fabicación de Muebles Contemporaneos y Modulares',
      ficha: '2345678',
      estado: 'Sin Calificar',
      fecha: '06/07/2023'
    },
    {
      nombreCompleto: 'Stiven Blandón Urrego',
      programaFormacion: 'Analisis y Desarrollo de Software',
      ficha: '2345678',
      estado: 'Sin Calificar',
      fecha: '06/07/2023'
    },
    {
      nombreCompleto: 'Lorena Quiceno Giraldo',
      programaFormacion: 'Producción y Multimedia',
      ficha: '2345678',
      estado: 'Sin Calificar',
      fecha: '06/07/2023'
    },
    {
      nombreCompleto: 'Juan Guillermo Gomez Zapata',
      programaFormacion: 'Dibujo arquitectónico',
      ficha: '2456666',
      estado: 'Sin Calificar',
      fecha: '06/07/2023'
    }
  ]
}

/**
 * @src src\components\Teachers\Teachers.jsx
 *
 * @description Colores para card de instructores.
 * @type {Array<Object>}
 */
export const colorsOddRow = [
  {
    hrcolor: 'border-purple-400',
    sidecolor: 'bg-purple-400',
    linkcolor: 'bg-purple-600'
  },
  {
    hrcolor: 'border-aqua',
    sidecolor: 'bg-aqua',
    linkcolor: 'bg-emerald-400'
  },
  {
    hrcolor: 'border-salmon/75',
    sidecolor: 'bg-salmon/75',
    linkcolor: 'bg-salmon'
  },
  {
    hrcolor: 'border-third',
    sidecolor: 'bg-third',
    linkcolor: 'bg-sky-400'
  },
  {
    hrcolor: 'border-third',
    sidecolor: 'bg-third',
    linkcolor: 'bg-sky-400'
  },
  {
    hrcolor: 'border-salmon/75',
    sidecolor: 'bg-salmon/75',
    linkcolor: 'bg-salmon'
  },
  {
    hrcolor: 'border-aqua',
    sidecolor: 'bg-aqua',
    linkcolor: 'bg-emerald-400'
  },
  {
    hrcolor: 'border-purple-400',
    sidecolor: 'bg-purple-400',
    linkcolor: 'bg-purple-600'
  }
]
