import Joi from 'joi'

export const modalitySchema = Joi.object({
  modality: Joi.string().required()
})
