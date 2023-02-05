import { Request as RequestType, Response as ResponseType } from 'express';
import { Controller, Get, Request, Response } from '@decorators/express';

import Handler from '../../superClass/handler';
import ProductService from './product.service';
import StatusCode from '../../utils/enumStatusCodes';

@Controller('/products')
export default class ProductController extends Handler {
  constructor() {
    super();
  }

  @Get('')
  async getAll(@Request() _req: RequestType, @Response() res: ResponseType) {
    const allProducts = await this
      .TryCatch(() => ProductService.getAllProducts());

    return res.status(StatusCode.OK).json(allProducts);
  }

  @Get('/category/:name')
  async getByCategory(@Request() req: RequestType, @Response() res: ResponseType) {
    const { name } = req.params;
    const products = await this
      .TryCatch(() => ProductService.getProductsByCategory(name));

    if (products && 'error' in products) {
      const { code, error } = products;
      return res.status(code).json({ error });
    }

    return res.status(StatusCode.OK).json(products);
  }

  @Get('/query')
  async getByQuery(@Request() req: RequestType, @Response() res: ResponseType) {
    const { name } = req.query;
    const products = await this
      .TryCatch(() => ProductService.getProductsByQuery(`${name}`));

    if (products && 'error' in products) {
      const { code, error } = products;
      return res.status(code).json({ error });
    }

    return res.status(StatusCode.OK).json(products);
  }

  @Get('/:id')
  async getById(@Request() req: RequestType, @Response() res: ResponseType) {
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
