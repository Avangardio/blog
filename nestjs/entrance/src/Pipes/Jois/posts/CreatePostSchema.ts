import * as Joi from 'joi';

export const CreatePostSchema = Joi.object({
    userId: Joi.number().required(),
    newPostData: Joi.object({
        title: Joi.string().min(10).required(),
        description: Joi.string().min(10).required(),
        texts: Joi.string().min(10).required(),
        tags: Joi.array().items(Joi.string()).required(),
        picture: Joi.string().required(),
    }).options({
        presence: 'required',
    }),
});
