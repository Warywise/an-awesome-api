import { Request, Response } from 'express';
import CategoryService from './category.service';
import StatusCode from '../utils/enumStatusCodes';

const Category = new CategoryService();

export default class CategoryControlle {

  async getAll(_req: Request, res: Response) {
    const allCategories = await Category.getAllCategories();

    return res.status(StatusCode.OK).json(allCategories);
  }
}
