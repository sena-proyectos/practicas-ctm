import Joi from 'joi'

export const visitValidation = Joi.object({
  id_aprendiz: Joi.number().required(),
  estado_visita: Joi.string().required(),
  observaciones_visita: Joi.string().max(200).allow(null, ''),
  usuario_responsable: Joi.number().required()
})
