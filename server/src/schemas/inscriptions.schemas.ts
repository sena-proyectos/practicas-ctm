import Joi from 'joi'

export const inscriptionSchema = Joi.object({
  nombres_aprendiz_inscripcion: Joi
    .string()
    .required()
})
