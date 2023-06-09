import Joi from 'joi'

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/

export const loginDataSchema = Joi.object({
  num_documento: Joi
    .string()
    .required()
    .min(8)
    .max(10),
  contrasena: Joi
    .string()
    .required()
    .min(8)
    .max(16)
    .pattern(PASSWORD_REGEX)
})
