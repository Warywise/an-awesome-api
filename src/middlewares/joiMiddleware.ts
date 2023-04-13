import { NextFunction, Response } from 'express';
import Joi from 'joi';

import StatusCode from '../utils/enumStatusCodes';
import { anyType } from '../interfaces/anyType';

export const joiValidator = (req: Record<string, anyType>, res: Response, next: NextFunction, key: string, joiObject: Joi.ObjectSchema) => {
  const { error: err, value } = joiObject.validate(req[key]);

  if (err) return res.status(StatusCode.BAD_REQUEST).json({ error: err.message });

  req[key] = value;
  next();
};
