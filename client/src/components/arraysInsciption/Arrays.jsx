import { AiOutlineUser } from "react-icons/ai";

export const DataInscription = [
  {
    icon: <AiOutlineUser />,
    type: "text",
    name: "nombres_aprendiz_inscripcion",
    placeholder: "Alejandro",
    label: "Nombres",
  },
  {
    icon: <AiOutlineUser />,
    type: "text",
    name: "apellidos_aprendiz_inscripcion",
    placeholder: "Rodriguez",
    label: "Apellidos",
  },
  {
    icon: <AiOutlineUser />,
    type: "select",
    name: "tipo_documento_aprendiz_inscripcion",
    placeholder: "sin seleccionar",
    label: "Tipo documento",
  },
  {
    icon: <AiOutlineUser />,
    type: "number",
    name: "numero_documento_aprendiz_inscripcion",
    placeholder: "1023456789",
    label: "Número documento",
  },
  {
    icon: <AiOutlineUser />,
    type: "email",
    name: "correo_electronico_aprendiz_inscripcion",
    placeholder: "example@sena.edu.co",
    label: "Correo electrónico",
  },
  {
    icon: <AiOutlineUser />,
    type: "number",
    name: "numero_telefono_aprendiz_inscripcion",
    placeholder: "3012345467",
    label: "Número de celular",
  },
  {
    icon: <AiOutlineUser />,
    type: "number",
    name: "numero_ficha_aprendiz_inscripcion",
    placeholder: "2134567",
    label: "Número de ficha",
  },
  {
    icon: <AiOutlineUser />,
    type: "text",
    name: "programa_formacion_aprendiz_inscripcion",
    placeholder: "ADSO",
    label: "Programa de formación",
  },
  {
    icon: <AiOutlineUser />,
    type: "select",
    name: "tipo_modalidad_aprendiz_inscripcion",
    placeholder: "Sin seleccionar",
    label: "Modalidad",
  },
  {
    icon: <AiOutlineUser />,
    type: "date",
    name: "inicio_etapa_practica_aprendiz_inscripcion",
    label: "Fecha de inicio prácticas",
  },
  {
    icon: <AiOutlineUser />,
    type: "date",
    name: "fin_etapa_practica_aprendiz_inscripcion",
    label: "Fecha de fin prácticas",
  },
];

export const IdTypes = [
  { value: "C.C", name: "Cédula de ciudadanía" },
  { value: "C.E", name: "Cédula de extranjería" },
  { value: "T.I", name: "Tarjeta de identidad" },
];

export const Modalities = [
  { value: "Contrato de aprendizaje", name: "Contrato de aprendizaje" },
  { value: "Pasantias", name: "Pasantías" },
  { value: "Proyecto formativo", name: "Proyecto formativo" },
];
