import Joi from 'joi'

export const studentSchema = Joi.object({
  nombre_aprendiz: Joi
    .string()
    .required()
    .min(3)
    .max(50),
  apellido_aprendiz: Joi
    .string()
    .required()
    .min(3)
    .max(50),
  tipo_documento_aprendiz: Joi
    .string()
    .required()
    .min(1)
    .max(30),
  numero_documento_aprendiz: Joi
    .number()
    .required()
    .min(5),
  email_aprendiz: Joi
    .string()
    .email()
    .required()
    .min(5)
    .max(50),
  celular_aprendiz: Joi
    .number()
    .required()
    .min(5),
  fecha_fin_practica_aprendiz: Joi
    .date()
    .required(),
  estado_aprendiz: Joi
    .string()
    .required()
    .min(3)
    .max(50),
  id_empresa: Joi
    .number()
    .required()
    .min(1),
  id_modalidad: Joi
    .number()
    .required()
    .min(1),
  id_jefe: Joi
    .number()
    .required()
    .min(1),
  id_arl: Joi
    .number()
    .required()
    .min(1)
})
