import Express from 'express';
import { attachControllers } from '@decorators/express';

import CategoryRouter from './categories/category.controller';
import ProductRouter from './products/product.controller';

const app = Express();

attachControllers(app, [CategoryRouter, ProductRouter]);

export default app;
