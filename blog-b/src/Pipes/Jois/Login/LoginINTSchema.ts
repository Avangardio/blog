const Joi = require('joi');

export const LoginINTSchema = Joi.object({
    email: Joi.string().required().error(new Error('F1')),
    password: Joi.string().required().error(new Error('F2')),
}).options({
    abortEarly: false,
});
