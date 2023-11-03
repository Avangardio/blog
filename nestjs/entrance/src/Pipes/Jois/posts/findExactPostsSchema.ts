import * as Joi from 'joi';

export const FindExactPostsSchema = Joi.object({
    postId: Joi.number().required(),
}).options({
    presence: 'required',
});
