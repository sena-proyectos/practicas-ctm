import Joi from 'joi'

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

export const loginDataSchema = Joi.object({
  num_documento: Joi.string().required().min(8).max(50),
  contrasena: Joi.string().required().min(8).max(300).pattern(PASSWORD_REGEX)
})

export const registerDataSchema = Joi.object({
  nombre: Joi.string().required().min(2).max(50),
  apellido: Joi.string().required().min(2).max(45),
  tipo_documento: Joi.string()
    // .required()
    .min(1)
    .max(10),
  num_documento: Joi.string().required().min(8).max(50),
  correo_electronico: Joi.string().email().required().min(5).max(60),
  num_celular: Joi.string().required().min(5).max(15),
  id_rol: Joi.number(),
  // .required(),
  contrasena: Joi.string().required().min(8).max(300).pattern(PASSWORD_REGEX)
})

export const editDataSchema = Joi.object({
  nombre: Joi.string().min(2).max(50),
  apellido: Joi.string().min(2).max(45),
  tipo_documento: Joi.string().min(1).max(10),
  num_documento: Joi.string().min(8).max(50),
  correo_electronico: Joi.string().email().min(5).max(60),
  num_celular: Joi.string().min(5).max(15),
  id_rol: Joi.number(),
  contrasena: Joi.string().min(8).max(300).pattern(PASSWORD_REGEX)
})
