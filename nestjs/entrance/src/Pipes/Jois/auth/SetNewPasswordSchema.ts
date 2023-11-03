import * as Joi from 'joi';

export const SetNewPasswordSchema = Joi.object({
    confirmationToken: Joi.string()
        .required()
        .regex(/^[a-zA-Z0-9]+$/)
        .error(new Error('INV_TOKEN')),
    emailCode: Joi.string()
        .required()
        .regex(/^[0-9]+$/)
        .error(new Error('INV_CODE')),
    password: Joi.string().required().error(new Error('INV_PASSWORD')),
    re_password: Joi.string()
        .required()
        .equal(Joi.ref('password'))
        .error(new Error('INV_RE_PASSWORD')),
}).options({
    presence: 'required',
    abortEarly: false,
});
