import Express from 'express';
import { attachControllers } from '@decorators/express';

import CategoryRouter from './categories/category.controller';
import ProductRouter from './products/product.controller';
import UserRouter from './users/user.controler';

const app = Express();

attachControllers(app, [
  CategoryRouter, ProductRouter, UserRouter,
]);

export default app;
