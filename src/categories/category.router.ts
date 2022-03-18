import CategoryController from '../categories/category.controller';
import { Router } from 'express';

const Category = new CategoryController();
const router = Router();

router.get('/category', Category.getAll);

export default router;
