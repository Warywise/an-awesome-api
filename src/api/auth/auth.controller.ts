import { Request as RequestType, Response as ResponseType } from 'express';
import { Controller, Post, Request, Response } from '@decorators/express';

import Handler from '../../superClass/handler';
import AuthService from './auth.service';
import { VerifyBodyEmail, VerifyHash, VerifyToken } from '../../middlewares';
import StatusCode from '../../utils/enumStatusCodes';

@Controller('/auth')
export default class AuthController extends Handler {

  @Post('/login', [VerifyHash])
  async login(@Request() req: RequestType, @Response() res: ResponseType) {
    const { email, hash } = req.body;
    const userLogin = await this
      .TryCatch(() => AuthService.login(email, hash));

    if (userLogin && 'error' in userLogin) {
      const { code, error } = userLogin;
      return res.status(code).json({ error });
    }

    return res.status(StatusCode.OK).json(userLogin);
  }

  @Post('/logout', [VerifyToken, VerifyBodyEmail])
  async logout(@Request() req: RequestType, @Response() res: ResponseType) {
    const { body: { email }, headers: { authorization: token } } = req;
    const userLogout = await this
      .TryCatch(() => AuthService.logout(email, token as string));

    if (userLogout) {
      const { code, error } = userLogout;
      return res.status(code).json({ error });
    }

    return res.status(StatusCode.NO_CONTENT).end();
  }

  @Post('/refresh', [VerifyToken, VerifyBodyEmail])
  async refreshToken(@Request() req: RequestType, @Response() res: ResponseType) {
    const { body: { email }, headers: { authorization: token } } = req;
    const userRefreshToken = await this
      .TryCatch(() => AuthService.refreshToken(email, token as string));

    if (userRefreshToken && 'error' in userRefreshToken) {
      const { code, error } = userRefreshToken;
      return res.status(code).json({ error });
    }

    return res.status(StatusCode.OK).json(userRefreshToken);
  }
}
