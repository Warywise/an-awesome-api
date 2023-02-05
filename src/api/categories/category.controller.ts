import { Request as RequestType, Response as ResponseType } from 'express';
import { Controller, Get, Request, Response } from '@decorators/express';

import Handler from '../../superClass/handler';
import CategoryService from './category.service';
import StatusCode from '../../utils/enumStatusCodes';

@Controller('/categories')
export default class CategoryController extends Handler {

  @Get('')
  async getAllCategories(@Request() _req: RequestType, @Response() res: ResponseType) {
    const allCategories = await this
      .TryCatch(() => CategoryService.getAllCategories());

    return res.status(StatusCode.OK).json(allCategories);
  }
}
