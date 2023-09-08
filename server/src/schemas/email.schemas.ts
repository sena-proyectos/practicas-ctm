import Joi from 'joi'

export const emailSchema = Joi.object({
  to: Joi
    .string()
    .required(),
  text: Joi
    .string()
    .required(),
  title: Joi
    .string()
    .required()
})
