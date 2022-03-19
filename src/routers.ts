import Express from 'express';

import CategoryRouter from './categories/category.router';
import ProductRouter from './products/product.router';

const app = Express();

app.use(CategoryRouter);
app.use(ProductRouter);

export default app;
