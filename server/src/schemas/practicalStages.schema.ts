import Joi from 'joi'

export const practicalStageSchema = Joi.object({
  tipo_modalidad_practica: Joi
    .string()
    .required()
    .min(3)
    .max(50)
})
