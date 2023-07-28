import Joi from 'joi'

export const inscriptionSchema = Joi.object({
  nombre_inscripcion: Joi
    .string()
    .required()
    .min(3),
  apellido_inscripcion: Joi
    .string()
    .required()
    .min(3),
  tipo_documento_inscripcion: Joi
    .string()
    .required(),
  documento_inscripción: Joi
    .number()
    .required(),
  email_inscripcion: Joi
    .string()
    .email()
    .required()
    .min(3),
  inscripción_celular: Joi
    .number()
    .required(),
  etapa_actual_inscripcion: Joi
    .string()
    .required()
    .min(3),
  modalidad_inscripción: Joi
    .string()
    .required()
    .min(3),
  nombre_programa_inscripción: Joi
    .string()
    .required(),
  nivel_formacion_inscripcion: Joi
    .string()
    .required()
    .min(3),
  numero_ficha_inscripcion: Joi
    .number()
    .required(),
  fecha_fin_lectiva_inscripcion: Joi
    .date()
    .required(),
  nombre_instructor_lider_inscripcion: Joi
    .string()
    .required()
    .min(3),
  email_instructor_lider_inscripcion: Joi
    .string()
    .email()
    .required()
    .min(3),
  apoyo_sostenimiento_inscripcion: Joi
    .string()
    .required()
    .min(3),
  nit_empresa_inscripcion: Joi
    .number()
    .allow(null),
  nombre_empresa_inscripción: Joi
    .string()
    .allow(null)
    .min(3),
  direccion_empresa_inscripcion: Joi
    .string()
    .allow(null)
    .min(3),
  nombre_jefe_empresa_inscripcion: Joi
    .string()
    .allow(null)
    .min(3),
  cargo_jefe_empresa_inscripcion: Joi
    .string()
    .allow(null)
    .min(3),
  telefono_jefe_empresa_inscripcion: Joi
    .number()
    .allow(null),
  email_jefe_empresa_inscripcion: Joi
    .string()
    .email()
    .allow(null)
    .min(3),
  arl: Joi
    .string()
    .allow(null)
    .min(3),
  link_documentos: Joi
    .string()
    .required(),
  observaciones: Joi
    .string()
    .required(),
  responsable_inscripcion: Joi
    .string()
    .required()
    .min(3)
})

export const inscriptionDetailSchema = Joi.object({
  id_inscripcion: Joi
    .number()
    .required(),
  responsable_aval: Joi
    .number()
    .required(),
  estado_aval: Joi
    .string()
    .required(),
  observaciones: Joi
    .string()
    .allow(null)
})
