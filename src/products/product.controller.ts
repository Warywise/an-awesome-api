import { Request, Response, ErrorRequestHandler } from 'express';
import { Controller, Get } from '@decorators/express';

import ProductService from './product.service';
import StatusCode from '../utils/enumStatusCodes';

@Controller('/products')
export default class ProductController {

  @Get('')
  async getAll(_req: Request, res: Response) {
    try {
      const allProducts = await ProductService.getAllProducts();
      return res.status(StatusCode.OK).json(allProducts);

    } catch (error) {
      if (error instanceof Error) throw Error(error.message);
      if (typeof error === 'string') throw Error(error);
    }
  }

  @Get('/category/:name')
  async getByCategory(req: Request, res: Response) {
    try {
      const { name } = req.params;
      const products = await ProductService.getProductsByCategory(name);

      if ('error' in products) {
        const { code, error } = products;
        return res.status(code).json({ error });
      }
      return res.status(StatusCode.OK).json(products);

    } catch (error) {
      if (error instanceof Error) throw Error(error.message);
      if (typeof error === 'string') throw Error(error);
    }
  }

  @Get('/query')
  async getByQuery(req: Request, res: Response) {
    try {
      const { name } = req.query;
      const products = await ProductService.getProductsByQuery(`${name}`);

      if ('error' in products) {
        const { code, error } = products;
        return res.status(code).json({ error });
      }
      return res.status(StatusCode.OK).json(products);

    } catch (error) {
      if (error instanceof Error) throw Error(error.message);
      if (typeof error === 'string') throw Error(error);
    }
  }

  @Get('/:id')
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(Number(id));

      if ('error' in product) {
        const { code, error } = product;
        return res.status(code).json({ error });
      }
      return res.status(StatusCode.OK).json(product);

    } catch (error) {
      if (error instanceof Error) throw Error(error.message);
      if (typeof error === 'string') throw Error(error);
    }
  }
}
