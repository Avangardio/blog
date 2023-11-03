import * as Joi from 'joi';

export const DeleteCommentSchema = Joi.object({
  commentId: Joi.number().required(),
  userId: Joi.number().required(),
  postId: Joi.number().required(),
}).options({
  presence: 'required',
});
