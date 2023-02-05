import Express from 'express';
import { attachControllers } from '@decorators/express';

import CategoryRouter from './api/categories/category.controller';
import ProductRouter from './api//products/product.controller';
import UserRouter from './api//users/user.controler';
import UserInfosRouter from './api//users/userInfos/userInfos.controller';
import AuthRouter from './api/auth/auth.controller';
import SaleRouter from './api//sales/sale.controller';

const router = Express.Router();

attachControllers(router, [
  CategoryRouter,
  ProductRouter,
  UserRouter,
  UserInfosRouter,
  AuthRouter,
  SaleRouter,
]);

export default router;
