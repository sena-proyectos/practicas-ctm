import Joi from 'joi'

export const modalitySchema = Joi.object({
  modality: Joi.string().required()
})

export const instructorFullNameSchema = Joi.object({
  instructor: Joi.string().required()
})
