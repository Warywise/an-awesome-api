import { Request as RequestType, Response as ResponseType } from 'express';
import { Controller, Response, Request, Delete, Get, Post, Put } from '@decorators/express';

import Handler from '../../superClass/handler';
import UserService from './user.service';
import { VerifyEmail, VerifyHash, VerifyUserData, VerifyToken } from '../../middlewares';
import StatusCode from '../../utils/enumStatusCodes';

@Controller('/users')
export default class UserController extends Handler {

  @Get('', [VerifyToken, VerifyEmail])
  async getUser(@Request() req: RequestType, @Response() res: ResponseType) {
    const { headers: { authorization, email } } = req;
    const user = await this
      .TryCatch(() => UserService.getUserByEmail(email as string, authorization as string));

    if (user && 'error' in user) {
      const { code, error } = user;
      return res.status(code).json({ error });
    }

    return res.status(StatusCode.OK).json(user);
  }

  @Get('/infos', [VerifyToken, VerifyEmail])
  async getUserInfos(@Request() req: RequestType, @Response() res: ResponseType) {
    const { headers: { authorization, email } } = req;
    const userInfos = await this
      .TryCatch(() => UserService.getUserInfosByEmail(email as string, authorization as string));

    if (userInfos && 'error' in userInfos) {
      const { code, error } = userInfos;
      return res.status(code).json({ error });
    }

    return res.status(StatusCode.OK).json(userInfos);
  }

  @Get('/:email', [VerifyEmail])
  async getUserCondition(@Request() req: RequestType, @Response() res: ResponseType) {
    const { email } = req.params;
    const userInfos = await this
      .TryCatch(() => UserService.verifyUserCondition(email));

    if (userInfos && 'error' in userInfos) {
      const { code, error } = userInfos;
      return res.status(code).json({ error });
    }

    return res.status(StatusCode.OK).json(userInfos);
  }

  @Post('', [VerifyUserData])
  async upsertUser(@Request() req: RequestType, @Response() res: ResponseType) {
    const userData = req.body;
    const userResult = await this
      .TryCatch(() => UserService.createOrUpdateUser(userData));

    return res.status(StatusCode.OK).json(userResult);
  }

  @Put('', [VerifyToken, VerifyUserData])
  async updateUser(@Request() req: RequestType, @Response() res: ResponseType) {
    const { body: userData, headers: { authorization: token } } = req;
    const userResult = await this
      .TryCatch(() => UserService.updateUser(userData, token as string));

    if (userResult && 'error' in userResult) {
      const { code, error } = userResult;
      return res.status(code).json({ error });
    }

    return res.status(StatusCode.OK).json(userResult);
  }

  @Delete('', [VerifyToken, VerifyHash])
  async disableUser(@Request() req: RequestType, @Response() res: ResponseType) {
    const {
      body: { email, hash }, headers: { authorization: token }
    } = req;
    const userResult = await this
      .TryCatch(() => UserService.disableUser(email, hash, token as string));

    if (userResult && 'error' in userResult) {
      const { code, error } = userResult;
      return res.status(code).json({ error });
    }

    return res.status(StatusCode.OK).json(userResult);
  }
}
