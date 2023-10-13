import Joi from 'joi'

export const coursesValidation = Joi.object({
  numero_ficha: Joi.number().required().min(3),
  nombre_programa_formacion: Joi.string().required().min(3).max(50),
  fecha_fin_lectiva: Joi.date().required(),
  fecha_inicio_practica: Joi.date().required(),
  nivel_formacion: Joi.string().required(),
  seguimiento_nombre_completo: Joi.string().required(),
  lider_nombre_completo: Joi.allow(null),
  id_instructor_seguimiento: Joi.number(),
  id_instructor_lider: Joi.number().allow(null),
  id_nivel_formacion: Joi.number()
})