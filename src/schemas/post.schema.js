import Joi from "joi";

export const createPostSchema = Joi.object({
    title: Joi.string()
    .min(5)
    .max(50)
    .required()
    .messages({
        'string.min': 'El titulo tiene que tener más de 5 caracteres',
        'any.required': 'El titulo es obligatorio'
    }),
    content: Joi.string()
    .min(30)
    .max(5000)
    .required()
    .messages({
        'string.min': 'El contenido debe tener al menos 30 caracteres',
        'any.required': 'El contenido es obligatorio'
    })
});