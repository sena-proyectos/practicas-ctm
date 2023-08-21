import Joi from 'joi'

export const inscriptionValidation = Joi.object({
  modalidad_inscripcion: Joi.number().required().min(1),
  nombre_inscripcion: Joi.string().required().min(3).max(50),
  apellido_inscripcion: Joi.string().required().min(3).max(45),
  tipo_documento_inscripcion: Joi.string().required().min(2).max(50),
  documento_inscripcion: Joi.string().required().min(5).max(20),
  email_inscripcion: Joi.string().required().min(5).max(60),
  inscripcion_celular: Joi.string().required().min(5).max(15),
  etapa_actual_inscripcion: Joi.string().required().min(3).max(15),
  nivel_formacion_inscripcion: Joi.string().required().min(3).max(20),
  numero_ficha_inscripcion: Joi.number().required().min(1),
  id_instructor_lider_inscripcion: Joi.number().required().min(1),
  apoyo_sostenimiento_inscripcion: Joi.string().required().min(2).max(50),
  id_empresa_inscripcion: Joi.number().min(1).allow(null),
  nombre_jefe_empresa_inscripcion: Joi.string().min(3).max(100).allow(null),
  cargo_jefe_empresa_inscripcion: Joi.string().min(3).max(100).allow(null),
  telefono_jefe_empresa_inscripcion: Joi.string().min(5).max(100).allow(null),
  email_jefe_empresa_inscripcion: Joi.string().min(5).max(100).allow(null),
  arl: Joi.string().min(2).max(20).allow(null),
  link_documentos: Joi.string().required().min(5).max(200),
  observaciones: Joi.string().required().min(1).max(200),
  fecha_creacion_inscripcion: Joi.date().required(),
  id_usuario_responsable_inscripcion: Joi.number().required().min(1)
})
