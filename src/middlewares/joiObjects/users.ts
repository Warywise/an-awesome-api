import Joi from 'joi';

export const joiEmail = Joi.object({
  email: Joi.string().email().required(),
});

export const joiHash = Joi.object({
  hash: Joi.string().min(6).required(),
});

export const joiUserData = Joi.object({
  name: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  cpf: Joi.string().regex(/^(\d{3}\.){2}\d{3}-\d{2}$/),
});
