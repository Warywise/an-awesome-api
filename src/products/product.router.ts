import ProductController from '../products/product.controller';
import { Router } from 'express';

const Product = new ProductController();
const ProductRouter = Router();

ProductRouter.get('/products', Product.getAll);
ProductRouter.get('/products/:id', Product.getById);

export default ProductRouter;
