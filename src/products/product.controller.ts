import { Request, Response } from 'express';
import ProductService from './product.service';
import StatusCode from '../utils/enumStatusCodes';

export default class ProductController extends ProductService {

  async getAll(res: Response, _req: Request) {
    const allProducts = await this.getAllProducts();

    return res.status(StatusCode.OK).json(allProducts);
  }
}
