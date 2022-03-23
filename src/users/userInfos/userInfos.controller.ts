import { Request, Response } from 'express';
import { Controller, Post } from '@decorators/express';

import UserInfosService from './userInfos.service';
import StatusCode from '../../utils/enumStatusCodes';
import { VerifyToken } from '../../middlewares/token';
import { VerifyAdressData, VerifyCardData } from '../../middlewares/userMiddlewares';

@Controller('/users')
export default class UserInfosController {

  @Post('/adress/:email', [VerifyToken, VerifyAdressData])
  async createAdress(req: Request, res: Response) {
    const {
      body: adress, headers: { authorization: token }, params: { email }
    } = req;

    const userAdress = await UserInfosService.createUserAdress(email, adress, token as string);

    if ('error' in userAdress) {
      const { code, error } = userAdress;
      return res.status(code).json({ error });
    }

    return res.status(StatusCode.CREATED).json(userAdress);
  }

  @Post('/card/:email', [VerifyToken, VerifyCardData])
  async createCard(req: Request, res: Response) {
    const {
      body: card, headers: { authorization: token }, params: { email }
    } = req;

    const userCard = await UserInfosService.createUserCard(email, card, token as string);

    if ('error' in userCard) {
      const { code, error } = userCard;
      return res.status(code).json({ error });
    }

    return res.status(StatusCode.CREATED).json(userCard);
  }
}
