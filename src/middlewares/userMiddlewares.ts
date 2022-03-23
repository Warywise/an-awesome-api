import { Middleware } from '@decorators/express';
import { NextFunction, Request, Response } from 'express';
import StatusCode from '../utils/enumStatusCodes';
import { joiAdress, joiCard, joiEmail, joiHash, joiUserData } from './joiObjects/users';

export class VerifyEmail implements Middleware {
  public use(req: Request, res: Response, next: NextFunction) {
    const email = req.body;
    const { error: err } = joiEmail.validate(email);

    if (err) return res.status(StatusCode.BAD_REQUEST).json({ error: err.message });
    next();
  }
}

export class VerifyHash implements Middleware {
  public use(req: Request, res: Response, next: NextFunction) {
      const hash = req.body;
      const { error: err } = joiHash.validate(hash);
  
      if (err) return res.status(StatusCode.BAD_REQUEST).json({ error: err.message });
      next();
    }
}

export class VerifyUserData implements Middleware {
  public use(req: Request, res: Response, next: NextFunction) {
      const userData = req.body;
    const { error: err } = joiUserData.validate(userData);

    if (err) return res.status(StatusCode.BAD_REQUEST).json({ error: err.message });
    next();
  }
}

export class VerifyAdressData implements Middleware {
  public use(req: Request, res: Response, next: NextFunction) {
    const userAdress = req.body;
    const { error: err } = joiAdress.validate(userAdress);

    if (err) return res.status(StatusCode.BAD_REQUEST).json({ error: err.message });
    next();
  }
}

export class VerifyCardData implements Middleware {
  public use(req: Request, res: Response, next: NextFunction) {
    const userCard = req.body;
    const { error: err } = joiCard.validate(userCard);

    if (err) return res.status(StatusCode.BAD_REQUEST).json({ error: err.message });
    next();
  }
}
