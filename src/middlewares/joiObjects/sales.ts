import Joi from 'joi';

export const joiSale = Joi.object({
  email: Joi.string(),
  payMethodId: Joi.number().required(),
  productsSold: Joi.array().items(Joi.number()).min(1).required(),
});
