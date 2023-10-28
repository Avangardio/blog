import * as Joi from 'joi';

export const GetPostsQuerySchema = Joi.object({
  title: Joi.string(),
  tags: Joi.string(),
  authorId: Joi.string().regex(/^\d+$/),
}).options({
  abortEarly: false,
});
