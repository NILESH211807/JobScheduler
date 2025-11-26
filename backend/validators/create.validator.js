import Joi from 'joi';

export const jobCreateSchema = Joi.object({
    task_name: Joi
        .string()
        .required()
        .min(3)
        .max(150)
        .messages({
            'string.base': 'Task name should be a type of string',
            'string.empty': 'Task name cannot be an empty',
            'any.required': 'Task name is a required',
            'string.min': 'Task name should have a minimum length 3',
            'string.max': 'Task name should have a maximum length of 150',
        }),
    priority: Joi
        .string()
        .required()
        .valid('low', 'medium', 'high')
        .messages({
            "any.required": "Priority is required",
            "any.only": "Priority must be low, medium, or high",
            "string.empty": "Priority cannot be an empty",
            "string.base": "Priority should be a type of string",
        }),
    payload: Joi.any()
        .required()
        .messages({
            "any.required": "Payload is required"
        }),
});