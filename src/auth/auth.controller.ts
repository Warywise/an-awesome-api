import { Request, Response } from 'express';
import { Controller, Post } from '@decorators/express';
// import jwt from 'jsonwebtoken';

import { VerifyEmail, VerifyHash } from '../middlewares/userMiddlewares';
import { VerifyToken } from '../middlewares/token';
import StatusCode from '../utils/enumStatusCodes';
import AuthService from './auth.service';

@Controller('/auth')
export default class AuthController {

  @Post('/login', [VerifyHash])
  async login(req: Request, res: Response) {
    try {
      const { email, hash } = req.body;
      const userLogin = await AuthService.login(email, hash);

      if ('error' in userLogin) {
        const { code, error } = userLogin;
        return res.status(code).json({ error });
      }
      return res.status(StatusCode.OK).json(userLogin);

    } catch (error) {
      if (error instanceof Error) throw Error(error.message);
      if (typeof error === 'string') throw Error(error);
    }
  }

  @Post('/logout', [VerifyToken, VerifyEmail])
  async logout(req: Request, res: Response) {
    try {
      const { body: { email }, headers: { authorization: token } } = req;
      const userLogout = await AuthService.logout(email, token as string);

      if (userLogout) {
        const { code, error } = userLogout;
        return res.status(code).json({ error });
      }
      return res.status(StatusCode.OK).end();

    } catch (error) {
      if (error instanceof Error) throw Error(error.message);
      if (typeof error === 'string') throw Error(error);
    }
  }
}
