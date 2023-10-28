import * as Joi from 'joi';

export const GetPostsParamSchema = Joi.string()
  .required()
  .regex(/^\d+$/)
  .options({
    presence: 'required',
    abortEarly: false,
  });
