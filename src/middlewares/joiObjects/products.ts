import Joi from 'joi';

export const joiProducts = Joi.object({
  name: Joi.string().min(1),
  category: Joi.string(),
  hasDiscount: Joi.boolean(),
  orderBy: Joi.object({
    name: Joi.string().valid('asc', 'desc'),
    price: Joi.string().valid('asc', 'desc'),
  }),
  skip: Joi.number().min(0),
  take: Joi.number().min(1),
});
