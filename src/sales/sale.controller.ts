import { Request, Response } from 'express';
import { Controller, Post } from '@decorators/express';

import Handler from '../superClass/handler';
import SaleService from './sale.service';
import { VerifyToken, VerifyEmail, VerifySale } from '../middlewares';
import StatusCode from '../utils/enumStatusCodes';

@Controller('/sales')
export default class SaleController extends Handler {

  @Post('/:email', [VerifyToken, VerifyEmail, VerifySale])
  async createSale(req: Request, res: Response) {
    const {
      body, headers: { authorization: token }, params: { email }
    } = req;

    const saleResult = await this
      .TryCatch(() => SaleService.createUserPurchase(email, body, token as string));

    if (saleResult && 'error' in saleResult) {
      const { code, error } = saleResult;
      return res.status(code).json({ error });
    }

    return res.status(StatusCode.CREATED).json(saleResult);
  }
}
