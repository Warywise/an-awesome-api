import { Request, Response } from 'express';
import { Controller, Get, Post } from '@decorators/express';

import UserService from './user.service';
import { VerifyEmail, VerifyHash, VerifyUserData } from '../middlewares/users';
import StatusCode from '../utils/enumStatusCodes';

@Controller('/users')
export default class UserController {

  @Get('', [VerifyEmail])
  async getUser(req: Request, res: Response) {
    try {
      const { body: { email }, headers: { authorization } } = req;
      const user = await UserService.getUserByEmail(email, authorization as string);

      if ('error' in user) {
        const { code, error } = user;
        return res.status(code).json({ error });
      }
      return res.status(StatusCode.OK).json(user);

    } catch (error) {
      if (error instanceof Error) throw Error(error.message);
      if (typeof error === 'string') throw Error(error);
    }
  }
}
