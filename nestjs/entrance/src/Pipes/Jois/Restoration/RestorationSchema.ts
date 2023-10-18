import * as Joi from 'joi';

export const RestorationSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .error(new Error('INV_EMAIL')),
}).options({
  presence: 'required',
  abortEarly: false,
});
