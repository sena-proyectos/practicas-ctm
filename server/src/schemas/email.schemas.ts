import Joi from "joi";

export const emailSchema = Joi.object({
  from: Joi
    .string()
    .required()
    .min(10)
    .max(100),
  to: Joi
    .string()
    .required()
    .min(10)
    .max(100),
  subject: Joi
    .string()
    .min(1)
    .max(50),
  text: Joi
    .string()
    .required()
    .min(1)
})


