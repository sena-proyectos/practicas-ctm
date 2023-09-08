import Joi from 'joi'

export const inscriptionSchema = Joi.object({
  nombre_inscripcion: Joi
    .string()
    .required(),
  apellido_inscripcion: Joi
    .string()
    .required(),
  tipo_documento_inscripcion: Joi
    .string()
    .required(),
  documento_inscripcion: Joi
    .string()
    .required(),
  email_inscripcion: Joi
    .string()
    .required()
    .trim(),
  inscripcion_celular: Joi
    .string()
    .required(),
  etapa_actual_inscripcion: Joi
    .string()
    .required(),
  modalidad_inscripcion: Joi
    .number()
    .required(),
  nombre_programa_inscripcion: Joi
    .string()
    .required(),
  nivel_formacion_inscripcion: Joi
    .string()
    .required(),
  numero_ficha_inscripcion: Joi
    .string()
    .required(),
  fecha_fin_lectiva_inscripcion: Joi
    .date()
    .allow(null),
  nombre_instructor_lider_inscripcion: Joi
    .string()
    .allow(null),
  email_instructor_lider_inscripcion: Joi
    .string()
    .required()
    .trim(),
  apoyo_sostenimiento_inscripcion: Joi
    .string()
    .required()
    .min(3),
  nit_empresa_inscripcion: Joi
    .string()
    .allow(null),
  nombre_empresa_inscripcion: Joi
    .string()
    .allow(null),
  direccion_empresa_inscripcion: Joi
    .string()
    .allow(null),
  municipio_empresa: Joi
    .string()
    .allow(null),
  nombre_jefe_empresa_inscripcion: Joi
    .string()
    .allow(null),
  cargo_jefe_empresa_inscripcion: Joi
    .string()
    .allow(null),
  telefono_jefe_empresa_inscripcion: Joi
    .string()
    .allow(null)
    .trim(),
  email_jefe_empresa_inscripcion: Joi
    .string()
    .allow(null)

    .trim(),
  arl: Joi
    .string()
    .allow(null),
  link_documentos: Joi
    .string()
    .required(),
  observaciones: Joi
    .string()
    .allow(null),
  responsable_inscripcion: Joi
    .string()
    .required()

})

export const inscriptionDetailSchema = Joi.object({
  id: Joi
    .number()
    .required(),
  responsable_aval: Joi
    .number()
    .allow(null),
  estado_aval: Joi
    .string()
    .allow(null),
  observaciones: Joi
    .string()
    .allow(null)
})
