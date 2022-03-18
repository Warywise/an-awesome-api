import Express from 'express';

import CategoryRouter from './categories/category.router';

const app = Express();

app.use(CategoryRouter);

export default app;
