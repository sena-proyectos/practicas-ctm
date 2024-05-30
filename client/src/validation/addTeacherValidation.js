import Joi from 'joi'

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

export const addTeacherValidation = Joi.object({
  nombre: Joi.string().required().min(3).max(50),
  apellido: Joi.string().required().min(3).max(50),
  num_documento: Joi.string().required().min(8).max(10),
  correo_electronico: Joi.string().required().min(10).max(50),
  num_celular: Joi.string().required().min(8).max(10),
  id_rol: Joi.number().required(),
  contrasena: Joi.string().min(8).max(300).pattern(PASSWORD_REGEX)
})
