import * as Joi from 'joi';

export const CreatePostSchema = Joi.object({
  userId: Joi.number().required(),
  newPostData: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    texts: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
  }).required(),
});
