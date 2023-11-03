import * as Joi from 'joi';

export const GetCommentsSchema = Joi.object({
    postId: Joi.number().required(),
}).options({
    presence: 'required',
});
