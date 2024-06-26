import Joi from 'joi'

enum typeOfLetter {
  start = 'inicio',
  end = 'fin'
}

enum LetterState {
  presented = 'Presentado',
  noPresented = 'No presentado'
}

export const letterSchema = Joi.object({
  tipo_carta_aprendiz: Joi.alternatives().try(Joi.string().valid(typeOfLetter.start), Joi.string().valid(typeOfLetter.end)),
  estado_carta_aprendiz: Joi.alternatives().try(Joi.string().valid(LetterState.presented), Joi.string().valid(LetterState.noPresented)),
  observaciones: Joi.string().min(5).max(200).allow(null, ''),
  usuario_responsable: Joi.number().required()
})

export const bitacoraSchema = Joi.object({
  calificacion_bitacora: Joi.string().required(),
  observaciones_bitacora: Joi.string().min(5).max(200).allow(null, ''),
  usuario_responsable: Joi.number().required()
})

export const visitCreateSchema = Joi.object({
  id_aprendiz: Joi.string().required(),
  estado_visita: Joi.string().required(),
  observaciones_visita: Joi.string().min(5).max(200).allow(null, ''),
  usuario_responsable: Joi.number().required()
})



export const visitSchema = Joi.object({
  numero_visita: Joi.string().required(),
  estado_visita: Joi.string().required(),
  observaciones_visita: Joi.string().min(5).max(200).allow(null, ''),
  usuario_responsable: Joi.number().required()
})