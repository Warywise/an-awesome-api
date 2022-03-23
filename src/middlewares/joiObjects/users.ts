import Joi from 'joi';

export const joiEmail = Joi.object({
  email: Joi.string().email().required(),
});

export const joiHash = Joi.object({
  email: Joi.string().email().required(),
  hash: Joi.string().min(6).required(),
});

export const joiUserData = Joi.object({
  email: Joi.string().email().required(),
  hash: Joi.string().min(6),
  name: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  cpf: Joi.string().regex(/^(\d{3}\.){2}\d{3}-\d{2}$/),
});

export const joiAdress = Joi.object({
  adress: Joi.string().min(7).required(),
  city: Joi.string().min(3).required(),
  district: Joi.string().min(3).required(),
  state: Joi.string().min(2).required(),
});

export const joiCard = Joi.object({
  cardNumber: Joi.string().min(16).required(),
  cardName: Joi.string().min(6).required(),
  cardValidity: Joi.string().regex(/^\d{2}\/\d{2}$/).required(),
  cpf: Joi.string().regex(/^(\d{3}\.){2}\d{3}-\d{2}$/).required(),
});
