import { Request as RequestType, Response as ResponseType } from 'express';
import { Controller, Get, Request, Response } from '@decorators/express';

import Handler from '../../superClass/handler';
import ProductService from './product.service';
import StatusCode from '../../utils/enumStatusCodes';
import { joiValidator } from '../../middlewares/joiMiddleware';
import { joiProducts } from '../../middlewares/joiObjects/products';

@Controller('/products')
export default class ProductController extends Handler {
  constructor() {
    super();
  }

  @Get(
    '/query',
    [(req, res, next) => joiValidator(req as never, res, next, 'query', joiProducts)]
  )
  async getProducts(@Request() req: RequestType, @Response() res: ResponseType) {
    const result = await this
      .TryCatch(() => ProductService.getProducts(req));

    if (result?.error) {
      const { code, error } = result;
      return res.status(code).json({ error });
    }

    return res.status(StatusCode.OK).json(result);
  }

  @Get('/:id')
  async getProductById(@Request() req: RequestType, @Response() res: ResponseType) {
    const { id } = req.params;
    const product = await this
      .TryCatch(() => ProductService.getProductById(Number(id)));

    if (product && 'error' in product) {
      const { code, error } = product;
      return res.status(code).json({ error });
    }

    return res.status(StatusCode.OK).json(product);
  }
}
