import { Request, Response } from 'express';
import { Controller, Get } from '@decorators/express';

import Handler from '../superClass/handler';
import CategoryService from './category.service';
import StatusCode from '../utils/enumStatusCodes';

@Controller('/categories')
export default class CategoryController extends Handler {

  @Get('')
  async getAll(_req: Request, res: Response) {
    const allCategories = await this
      .TryCatch(CategoryService.getAllCategories);

    return res.status(StatusCode.OK).json(allCategories);
  }
}
