import * as Joi from 'joi';

export const LikeBodySchema = Joi.object({
  userId: Joi.number().required(),
  postId: Joi.number().required(),
}).options({
  presence: 'required',
});
