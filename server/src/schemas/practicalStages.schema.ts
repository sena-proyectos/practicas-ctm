import Joi from 'joi'

export const practicalStageSchema = Joi.object({
  tipo_modalidad_practica: Joi
    .string()
    .required()
    .min(3)
    .max(50),
  num_horas_minimas_modalidad_practica: Joi
    .number()
    .min(1),
  num_horas_maximas_modalidad_practica: Joi
    .number()
    .min(1)
})
