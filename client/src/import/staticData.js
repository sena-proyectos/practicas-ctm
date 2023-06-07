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
    link: '/',
  },
  {
    title: 'Bitácoras Incompletas',
    titleColor: 'black',
    description: 'Podrás ver el listado de bitácoras que actualmente se encuentran en incompletas.',
    buttonText: 'LLÉVAME AHÍ',
    bgColor: 'bg-[#CB7766]',
    link: '/',
  },
  {
    title: 'Bitácoras Completas',
    titleColor: 'black',
    description: 'Podrás ver el listado de bitácoras que actualmente se encuentran completas.',
    buttonText: 'LLÉVAME AHÍ',
    bgColor: 'bg-[#FFC107]',
    link: '/',
  },
  {
    title: 'Aprobaciones',
    titleColor: 'black',
    description: 'Podrás ver los aprendices que estan esperando una aprobación para la modalidad de prácticas deseadas',
    buttonText: 'LLÉVAME AHÍ',
    bgColor: 'bg-[#385C57]',
    link: '/',
  },
  {
    title: 'Visitas no hechas',
    titleColor: 'black',
    description: 'Podrás ver el listado de visitas que actualmente no se encuentran en realizadas.',
    buttonText: 'LLÉVAME AHÍ',
    bgColor: 'bg-[#82DEF0]',
    link: '/',
  },
  {
    title: 'Inscribir un aprendiz',
    titleColor: 'black',
    description: 'Podrás acceder al formulario de inscripción del aprendiz a su modalidad de prácticas.',
    buttonText: 'LLÉVAME AHÍ',
    bgColor: 'bg-[#B8F1D8]',
    link: '/',
  },
]

/*
 * src: src\components\User\User.jsx
 */
export const loginForm = [
  { icon: <AiOutlineIdcard />, placeholder: '1017924888', type: 'text', nameInput: 'num_documento' },
  { icon: <BiLockAlt />, placeholder: '**********', type: 'password', nameInput: 'contrasena' },
]

/*
 * src: src\components\User\User.jsx
 */
export const registerForm = [
  { icon: <AiOutlineIdcard />, placeholder: '1017924888', type: 'text', nameInput: 'num_documento' },
  { icon: <IoPersonOutline />, placeholder: 'Juan', type: 'text', nameInput: 'nombre' },
  { icon: <IoPersonOutline />, placeholder: 'Gonzales', type: 'text', nameInput: 'apellido' },
  { icon: <AiOutlineMail />, placeholder: 'correo@correo.com', type: 'email', nameInput: 'correo_electronico' },
  { icon: <AiOutlinePhone />, placeholder: '3183577499', type: 'text', nameInput: 'num_celular' },
  { icon: <BiLockAlt />, placeholder: '********', type: 'password', nameInput: 'contrasena' },
]

/*
 * src: src\components\Register-student\RegisterStudent.jsx
 */
export const dataInscription = [
  { icon: <AiOutlineUser />, type: 'text', name: 'name', placeholder: 'Alejandro', label: 'Nombres' },
  { icon: <AiOutlineUser />, type: 'text', name: 'lastname', placeholder: 'Rodriguez', label: 'Apellidos' },
  { icon: <AiOutlineUser />, type: 'select', name: 'typeid', placeholder: 'sin seleccionar', label: 'Tipo documento' },
  { icon: <AiOutlineUser />, type: 'number', name: 'numberid', placeholder: '1023456789', label: 'Número documento' },
  { icon: <AiOutlineUser />, type: 'email', name: 'email', placeholder: 'example@sena.edu.co', label: 'Correo electrónico' },
  { icon: <AiOutlineUser />, type: 'number', name: 'phone', placeholder: '3012345467', label: 'Número de celular' },
  { icon: <AiOutlineUser />, type: 'number', name: 'formationnumber', placeholder: '2134567', label: 'Número de ficha' },
  { icon: <AiOutlineUser />, type: 'text', name: 'program', placeholder: 'ADSO', label: 'Programa de formación' },
  { icon: <AiOutlineUser />, type: 'select', name: 'modality', placeholder: 'Sin seleccionar', label: 'Modalidad' },
  { icon: <AiOutlineUser />, type: 'date', name: 'datestart', label: 'Fecha de inicio prácticas' },
  { icon: <AiOutlineUser />, type: 'date', name: 'dateend', label: 'Fecha de fin prácticas' },
]

/*
 * src: src\components\Register-student\RegisterStudent.jsx
 */
export const idTypes = [
  { value: 'cc', name: 'Cédula de ciudadanía' },
  { value: 'ce', name: 'Cédula de extranjería' },
  { value: 'ti', name: 'Tarjeta de identidad' },
]

/*
 * src: src\components\Register-student\RegisterStudent.jsx
 */
export const modalities = [
  { value: 'contrato', name: 'Contrato de aprendizaje' },
  { value: 'pasantia', name: 'Pasantías' },
  { value: 'proyecto', name: 'Proyecto formativo' },
]

/*
 * src: src\components\Form\Form.jsx
 */
export const passwordIcons = {
  openEye: <AiOutlineEye />,
  closeEye: <AiOutlineEyeInvisible />,
}

/*
 * src: src\components\Form\Form.jsx
 */
export const passwordStatus = {
  shown: 'text',
  hidden: 'password',
}
