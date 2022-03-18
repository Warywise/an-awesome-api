import CategoryController from '../categories/category.controller';
import { Router } from 'express';

const Category = new CategoryController();
const CategoryRouter = Router();

CategoryRouter.get('/category', Category.getAll);

export default CategoryRouter;
