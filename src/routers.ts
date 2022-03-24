import Express from 'express';
import { attachControllers } from '@decorators/express';

import CategoryRouter from './categories/category.controller';
import ProductRouter from './products/product.controller';
import UserRouter from './users/user.controler';
import UserInfosRouter from './users/userInfos/userInfos.controller';
import AuthRouter from './auth/auth.controller';
import SaleRouter from './sales/sale.controller';

const app = Express();

attachControllers(app, [
  CategoryRouter,
  ProductRouter,
  UserRouter,
  UserInfosRouter,
  AuthRouter,
  SaleRouter
]);

export default app;
