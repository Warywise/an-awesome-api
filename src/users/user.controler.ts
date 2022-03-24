import { Request, Response } from 'express';
import { Controller, Delete, Get, Post, Put } from '@decorators/express';

import UserService from './user.service';
import { VerifyEmail, VerifyHash, VerifyUserData } from '../middlewares/userMiddlewares';
import StatusCode from '../utils/enumStatusCodes';
import { VerifyToken } from '../middlewares/tokenMiddlewares';

@Controller('/users')
export default class UserController {

  @Get('', [VerifyToken, VerifyEmail])
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

  @Get('/infos', [VerifyToken, VerifyEmail])
  async getUserInfos(req: Request, res: Response) {
    try {
      const { body: { email }, headers: { authorization } } = req;
      const userInfos = await UserService.getUserInfosByEmail(email, authorization as string);

      if ('error' in userInfos) {
        const { code, error } = userInfos;
        return res.status(code).json({ error });
      }
      return res.status(StatusCode.OK).json(userInfos);

    } catch (error) {
      if (error instanceof Error) throw Error(error.message);
      if (typeof error === 'string') throw Error(error);
    }
  }

  @Get('/:email')
  async getUserCondition(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const userInfos = await UserService.verifyUserCondition(email);

      if ('error' in userInfos) {
        const { code, error } = userInfos;
        return res.status(code).json({ error });
      }
      return res.status(StatusCode.OK).json(userInfos);

    } catch (error) {
      if (error instanceof Error) throw Error(error.message);
      if (typeof error === 'string') throw Error(error);
    }
  }

  @Post('', [VerifyUserData])
  async upsertUser(req: Request, res: Response) {
    try {
      const userData = req.body;
      const userResult = await UserService.createOrUpdateUser(userData);

      return res.status(StatusCode.OK).json(userResult);
    } catch (error) {
      if (error instanceof Error) throw Error(error.message);
      if (typeof error === 'string') throw Error(error);
    }
  }

  @Put('', [VerifyToken, VerifyUserData])
  async updateUser(req: Request, res: Response) {
    try {
      const { body: userData, headers: { authorization: token } } = req;
      const userResult = await UserService.updateUser(userData, token as string);

      if ('error' in userResult) {
        const { code, error } = userResult;
        return res.status(code).json({ error });
      }
      return res.status(StatusCode.OK).json(userResult);

    } catch (error) {
      if (error instanceof Error) throw Error(error.message);
      if (typeof error === 'string') throw Error(error);
    }
  }

  @Delete('', [VerifyToken, VerifyHash])
  async disableUser(req: Request, res: Response) {
    try {
      const {
        body: { email, hash }, headers: { authorization: token }
      } = req;
      const userResult = await UserService.disableUser(email, hash, token as string);

      if ('error' in userResult) {
        const { code, error } = userResult;
        return res.status(code).json({ error });
      }
      return res.status(StatusCode.OK).json(userResult);

    } catch (error) {
      if (error instanceof Error) throw Error(error.message);
      if (typeof error === 'string') throw Error(error);
    }
  }
}
