import { Request, Response } from 'express';
import { Controller, Post } from '@decorators/express';

import Handler from '../../superClass/handler';
import UserInfosService from './userInfos.service';
import { VerifyToken } from '../../middlewares/tokenMiddlewares';
import { VerifyAdressData, VerifyCardData } from '../../middlewares/userMiddlewares';
import StatusCode from '../../utils/enumStatusCodes';

@Controller('/users')
export default class UserInfosController extends Handler {

  @Post('/adress/:email', [VerifyToken, VerifyAdressData])
  async createAdress(req: Request, res: Response) {
    const {
      body: adress, headers: { authorization: token }, params: { email }
    } = req;

    const userAdress = await this
      .TryCatch(() => UserInfosService.createUserAdress(email, adress, token as string));

    if (userAdress && 'error' in userAdress) {
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

    const userCard = await this
      .TryCatch(() => UserInfosService.createUserCard(email, card, token as string));

    if (userCard && 'error' in userCard) {
      const { code, error } = userCard;
      return res.status(code).json({ error });
    }

    return res.status(StatusCode.CREATED).json(userCard);
  }
}
