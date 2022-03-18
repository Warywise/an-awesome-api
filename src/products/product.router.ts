import ProductController from '../products/product.controller';
import { Router } from 'express';

const Product = new ProductController();
const ProductRouter = Router();

ProductRouter.get('/category', Product.getAll);

export default ProductRouter;
