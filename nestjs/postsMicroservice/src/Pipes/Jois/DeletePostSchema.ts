import * as Joi from 'joi';

export const DeletePostSchema = Joi.object({
    userId: Joi.number().required(),
    postId: Joi.number().required(),
}).options({
    presence: 'required',
});
