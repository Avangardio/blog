import * as Joi from 'joi';

export const GetPostsSchema = Joi.object({
  page: Joi.number(),
  criteria: Joi.object({
    title: Joi.string(),
    tags: Joi.array(),
    authorId: Joi.number(),
  }),
}).options({});
