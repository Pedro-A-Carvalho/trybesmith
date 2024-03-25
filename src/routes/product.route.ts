import express from 'express';
import controllers from '../controllers';

const { productController } = controllers;

const productRoute = express.Router();

productRoute.post('/', productController.createProduct);
productRoute.get('/', productController.getAllProducts);

export default productRoute;
