import Joi from 'joi';

const newsletterSchema = Joi.object({
    title: Joi.string().min(3).max(150).required(),
    content: Joi.string().max(1000).required(),
});

export { newsletterSchema };