import { attachControllers } from '@decorators/express';
import Express from 'express';

import CategoryRouter from './categories/category.controller';
import ProductRouter from './products/product.router';

const app = Express();

app.use(ProductRouter);
attachControllers(app, [CategoryRouter]);

export default app;
