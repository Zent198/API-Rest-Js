import joi from 'joi';

export const idSchema = joi.object({
    id: joi.number().integer().positive().required()
    .messages({
      'number.base': 'El ID debe ser un número',
      'number.integer': 'El ID debe ser un número entero',
      'any.required': 'El ID es obligatorio'   
    })
});