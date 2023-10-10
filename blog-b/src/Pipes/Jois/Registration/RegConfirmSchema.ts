const Joi = require('joi');

export const RegConfirmSchema = Joi.object({
  requestToken: Joi.string().required().error(new Error('RC1')),
  securityToken: Joi.string().required().error(new Error('RC2')),
  emailCode: Joi.string().required().error(new Error('RC3')),
}).options({
  abortEarly: false,
});
