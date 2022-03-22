import { NextFunction, Request, Response } from 'express';
import StatusCode from '../utils/enumStatusCodes';
import { joiEmail } from './joiObjects/users';
import TokenMiddleware from './token';

class UserMiddleware extends TokenMiddleware {
  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    const missingToken = this.verifyToken(req);
    if (missingToken) {
      const { code, error } = missingToken;
      return res.status(code).json({ error });
    }

    const { email } = req.body;
    const { error } = joiEmail.validate(email);

    if (error) return res.status(StatusCode.BAD_REQUEST).json({ error });

    next();
  }
}
