import * as Joi from 'joi';

export const LoginINTSchema = Joi.object({
    email: Joi.string().email().required().error(new Error('INV_EMAIL')),
    password: Joi.string().required().error(new Error('INV_PASSWORD')),
}).options({
    presence: 'required',
    abortEarly: false,
});
