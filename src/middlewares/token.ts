import { NextFunction, Request, Response } from 'express';
import { Middleware } from '@decorators/express';
import StatusCode from '../utils/enumStatusCodes';

export class VerifyToken implements Middleware{
  public use(req: Request, res: Response, next: NextFunction) {
    const { authorization: token } = req.headers;

    if (!token || typeof token !== 'string') {
      return res.status(StatusCode.UNAUTHORIZED_USER).json({ error: 'Missing authorization token' });
    }

    next();
  }
}
