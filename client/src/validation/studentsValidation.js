import Joi from "joi";

export const studentsValidation = Joi.object({
    "nombre_aprendiz": Joi.string().required(),
    "apellido_aprendiz": Joi.string().required(),
    "tipo_documento_aprendiz": Joi.string().required(),
    "numero_documento_aprendiz": Joi.number().required(),
    "email_aprendiz": Joi.string().required(),
    "celular_aprendiz": Joi.number(),
    "fecha_fin_practica_aprendiz": Joi.date().required(),
    "estado_aprendiz": Joi.string().required(),
    "id_empresa": Joi.number().required(),
    "id_modalidad": Joi.number().required(),
    "id_jefe": Joi.number().required(),
    "id_arl": Joi.number().required()
})