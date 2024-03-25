import express from 'express';
import controllers from '../controllers';

const productRoute = express.Router();

productRoute.post('/', controllers.productController.createProduct);
productRoute.get('/', controllers.productController.getAllProducts);

export default productRoute;
