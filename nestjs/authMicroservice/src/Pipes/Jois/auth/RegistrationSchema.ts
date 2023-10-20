import * as Joi from 'joi';

export const RegistrationSchema = Joi.object({
  name: Joi.string().required().min(5).max(20).error(new Error('INV_NAME')),

  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .error(new Error('INV_EMAIL')),

  password: Joi.string()
    .required()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+=[\]{}|\\:',.?`~\-]+$/)
    .min(12)
    .max(50)
    .error(new Error('INV_PASSWORD')),

  language: Joi.string()
    .required()
    .valid('RU', 'EN')
    .error(new Error('INV_LANGUAGE')),
}).options({
  presence: 'required',
  abortEarly: false,
});
