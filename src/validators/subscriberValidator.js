import Joi from 'joi';

const subscriberSchema = Joi.object({
    email: Joi.string().email().required(),
});

export { subscriberSchema };