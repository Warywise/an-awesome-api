import Joi from 'joi';

export const joiEmail = Joi.object({
  email: Joi.string().email().required(),
});
