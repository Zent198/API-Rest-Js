import joi from 'joi';

export const createUserSchema = joi.object({
    name: joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
        'string.min': 'El nombre debe tener al menos 3 caracteres',
        'any.required': 'El nombre es obligatorio'
    }),
  email: joi.string()
  .email()
  .required()
  .messages({
    'string.email': 'El formato del email no es válido',
    'any.required': 'El email es obligatorio'
  }),
  password: joi.string()
  .min(8)
  .required()
  .messages({
    'string.min': 'La contraseña debe tener al menos 8 caracteres'

  })

});

export const loginUserSchema = joi.object({
    email: joi.string()
    .email()
    .required()
    .messages({
        'string.email': 'El formato del email no es valido',
        'any.required': 'El email es obligatorio'
    }),
  password: joi.string()
  .min(3)
  .required()
  .messages({
      'string.min': 'La contraseña debe tener al menos 8 caracteres'
  })

});

