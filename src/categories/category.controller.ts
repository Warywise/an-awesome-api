import { Request, Response } from 'express';
import { Controller, Get } from '@decorators/express';

import CategoryService from './category.service';
import StatusCode from '../utils/enumStatusCodes';

@Controller('/categories')
export default class CategoryController {

  @Get('')
  async getAll(_req: Request, res: Response) {
    const allCategories = await CategoryService.getAllCategories();

    return res.status(StatusCode.OK).json(allCategories);
  }
}
