import { Request, Response } from 'express';
import { Controller, Post } from '@decorators/express';

import SaleService from './sale.service';
import StatusCode from '../utils/enumStatusCodes';
import { VerifyToken } from '../middlewares/tokenMiddlewares';
import { VerifyEmail } from '../middlewares/userMiddlewares';
import { VerifySale } from '../middlewares/saleMiddlewares';

@Controller('/sales')
export default class SaleController {

  @Post('/:email', [VerifyToken, VerifyEmail, VerifySale])
  async createSale(req: Request, res: Response) {
    try {
      const {
        body, headers: { authorization: token }, params: { email }
      } = req;
      const saleResult = await SaleService.createUserPurchase(email, body, token as string);

      if (saleResult) {
        const { code, error } = saleResult;
        return res.status(code).json({ error });
      }
      return res.status(StatusCode.CREATED).json(saleResult);

    } catch (error) {
      if (error instanceof Error) throw Error(error.message);
      if (typeof error === 'string') throw Error(error);
    }
  }
}
