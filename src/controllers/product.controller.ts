import { Request, Response } from 'express';
import services from '../services';

const { productService } = services;

async function createProduct(req: Request, res: Response): Promise<Response> {
  const { name, price, userId } = req.body;
  const { status, data } = await productService.createProduct({ name, price, userId });
  return res.status(status).json(data);
} 

async function getAllProducts(req: Request, res: Response): Promise<Response> {
  const { status, data } = await productService.getAllProducts();
  return res.status(status).json(data);
}

export default {
  createProduct,
  getAllProducts,
};