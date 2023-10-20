import Joi from 'joi'

export const classSchema = Joi.object({
  numero_ficha: Joi.number().required(),
  nombre_programa_formacion: Joi.string().required().min(3).max(100),
  fecha_inicio_lectiva: Joi.date().required(),
  fecha_inicio_practica: Joi.date().required(),
  id_instructor_seguimiento: Joi.number(),
  id_nivel_formacion: Joi.number().required()
})

export const classDates = Joi.object({
  numero_ficha: Joi.number().required(),
  fecha_inicio_lectiva: Joi.date().required(),
  fecha_inicio_practica: Joi.date().required()
})
