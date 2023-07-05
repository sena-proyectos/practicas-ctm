import Joi from 'joi'

export const classSchema = Joi.object({
  numero_ficha: Joi
    .string()
    .required()
    .min(3)
    .max(50),
  nombre_programa_formacion: Joi
    .string()
    .required()
    .min(3)
    .max(100),
  fecha_inicio_lectiva: Joi
    .date()
    .required(),
  fecha_fin_lectiva: Joi
    .date()
    .required(),
  fecha_inicio_practica: Joi
    .date()
    .required(),
  fecha_fin_practica: Joi
    .date()
    .required(),
  nivel_programa_formacion: Joi
    .string()
    .required()
    .min(3)
    .max(50),
  jornada_ficha: Joi
    .string()
    .required()
    .min(3)
    .max(50),
  id_instructor_lider_formacion: Joi
    .number()
    .required()
    .min(1),
  id_instructor_practicas_formacion: Joi
    .number()
    .allow(null)
    .min(1)
})
