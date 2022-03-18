import { Request, Response } from 'express';
import CategoryService from './category.service';
import StatusCode from '../utils/enumStatusCodes';

export default class CategoryController extends CategoryService {

  async getAll(res: Response, _req: Request) {
    const allCategories = await this.getAllCategories();

    return res.status(StatusCode.OK).json(allCategories);
  }
}
