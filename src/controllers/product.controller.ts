import { Request, Response } from 'express';
import { productService } from '../services';

async function createProduct(req: Request, res: Response): Promise<Response> {
  const { name, price, userId } = req.body;
  const { status, data } = await services.productService.createProduct({ name, price, userId });
  return res.status(status).json(data);
} 

async function getAllProducts(req: Request, res: Response): Promise<Response> {
  const { status, data } = await services.productService.getAllProducts();
  return res.status(status).json(data);
}

export default {
  createProduct,
  getAllProducts,
};