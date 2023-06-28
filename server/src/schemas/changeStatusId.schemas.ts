import Joi from 'joi'

export const changeStatusIdSchema = Joi.object({
  nombreTabla: Joi.string().required().max(100),
  idNombreTabla: Joi.string().required().max(100),
  id: Joi.number().required(),
  estado: Joi.string().required().min(3).max(12)
})
