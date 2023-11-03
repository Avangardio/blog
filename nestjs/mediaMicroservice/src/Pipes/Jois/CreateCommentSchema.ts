import * as Joi from 'joi';

export const CreateCommentSchema = Joi.object({
    text: Joi.string().required(),
    userId: Joi.number().required(),
    postId: Joi.number().required(),
}).options({
    presence: 'required',
});
