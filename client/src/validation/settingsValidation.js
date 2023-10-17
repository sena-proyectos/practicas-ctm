import Joi from 'joi'

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

export const settingsValidation = Joi.object({
  nombre: Joi.string().min(3).max(50),
  apellido: Joi.string().min(3).max(45),
  num_documento: Joi.string().min(8).max(10),
  correo_electronico: Joi.string().min(5).max(60),
  num_celular: Joi.string().min(5).max(15),
  id_rol: Joi.number(),
  contrasena: Joi.string().min(8).max(300).pattern(PASSWORD_REGEX)
})
