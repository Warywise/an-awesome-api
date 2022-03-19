import { Request, Response } from 'express';
import ProductService from './product.service';
import StatusCode from '../utils/enumStatusCodes';

const Product = new ProductService();

export default class ProductController {

  async getAll(_req: Request, res: Response) {
    const allProducts = await Product.getAllProducts();

    return res.status(StatusCode.OK).json(allProducts);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const product = await Product.getProductById(Number(id));

    if ('error' in product) {
      const { code, error } = product;
      return res.status(code).json({ error });
    }

    return res.status(StatusCode.OK).json(product);
  }

  async getByCategory(req: Request, res: Response) {
    const { name } = req.params;
    const products = await Product.getProductsByCategory(name);

    if ('error' in products) {
      const { code, error } = products;
      return res.status(code).json({ error });
    }

    return res.status(StatusCode.OK).json(products);
  }

  async getByQuery(req: Request, res: Response) {
    const { name } = req.query;
    const products = await Product.getProductsByQuery(`${name}`);

    if ('error' in products) {
      const { code, error } = products;
      return res.status(code).json({ error });
    }

    return res.status(StatusCode.OK).json(products);
  }
}
