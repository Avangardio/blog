import * as Joi from 'joi';

export const RequestValidationSchema = Joi.object({
    confirmationToken: Joi.string()
        .required()
        .regex(/^[a-zA-Z0-9]+$/)
        .error(new Error('INV_TOKEN')),
    emailCode: Joi.string()
        .required()
        .regex(/^[0-9]+$/)
        .error(new Error('INV_CODE')),
}).options({
    presence: 'required',
    abortEarly: false,
});