import { Request, Response } from 'express';
import { Controller, Post } from '@decorators/express';

import UserInfosService from './userInfos.service';
import StatusCode from '../../utils/enumStatusCodes';
import { VerifyToken } from '../../middlewares/token';
import { VerifyAdressData } from '../../middlewares/userMiddlewares';

@Controller('/users')
export default class UserInfosController {

  @Post('/adress/:email', [VerifyToken, VerifyAdressData])
  async createAdress(req: Request, res: Response) {
    const {
      body, headers: { authorization: token }, params: { email }
    } = req;

    const userAdress = await UserInfosService.createUserAdress(email, body, token as string);

    if ('error' in userAdress) {
      const { code, error } = userAdress;
      return res.status(code).json({ error });
    }

    return res.status(StatusCode.CREATED).json(userAdress);
  }
}
