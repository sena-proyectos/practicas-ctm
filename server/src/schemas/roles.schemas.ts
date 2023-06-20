import Joi from 'joi'

export const createRoleSchema = Joi.object({
  nombre_rol: Joi
    .string()
    .required()
    .min(3)
    .max(45)
})
