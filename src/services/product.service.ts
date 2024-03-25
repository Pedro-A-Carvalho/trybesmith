import ProductModel from '../database/models/product.model';
import { Product } from '../types/Product';
import ServiceResponse from '../types/ServiceResponse';
import validateUserInput from './validations/validateUserInput';

type ProductInput = {
  name: string;
  price: string;
  userId: number;
};

async function createProduct(product: ProductInput): Promise<ServiceResponse<Product>> {
  const error = validateUserInput(product);
  if (error) return { status: error.status, data: { message: error.message } };
  const { name, price, userId } = product;

  const newProduct = await ProductModel.create({ name, price, userId });
  return { status: 201, data: newProduct.dataValues };
}

async function getAllProducts(): Promise<ServiceResponse<Product>> {
  const products = await ProductModel.findAll();
  return { status: 200, data: products.map((product) => product.dataValues) };
}

export default {
  createProduct,
  getAllProducts,
};