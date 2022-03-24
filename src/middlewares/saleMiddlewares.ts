import { NextFunction, Request, Response } from 'express';
import { Middleware } from '@decorators/express';

import { joiSale } from './joiObjects/sales';
import StatusCode from '../utils/enumStatusCodes';

export class VerifySale implements Middleware {
  public use(req: Request, res: Response, next: NextFunction) {
    const saleData = req.body;
    const { error: err } = joiSale.validate(saleData);

    if (err) return res.status(StatusCode.BAD_REQUEST).json({ error: err.message });
    next();
  }
}
