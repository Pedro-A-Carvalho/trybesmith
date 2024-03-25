import ProductModel from '../database/models/product.model';
import UserModel from '../database/models/user.model';
import { User } from '../types/User';
import ServiceResponse from '../types/ServiceResponse';
import { Product } from '../types/Product';

// type ProductInput = {
//   name: string;
//   price: string;
//   userId: number;
// };

// async function createProduct(product: ProductInput): Promise<ServiceResponse<Product>> {
//   const { name, price, userId } = product;

//   const newProduct = await ProductModel.create({ name, price, userId });
//   return { status: 201, data: newProduct.dataValues };
// }

async function getAllUsers(): Promise<ServiceResponse<User>> {
  const users = await UserModel.findAll({
    attributes: ['username'],
    include: [{ model: ProductModel, as: 'productIds' }],
    order: [[{ model: ProductModel, as: 'productIds' }, 'id', 'ASC']],
  });
  const plainUsers = users.map((user) => user.dataValues);
  const usersWithProducts = plainUsers.map((user) => {
    console.log(user.productIds);
    const products = user.productIds?.map((product: Product) => product.id);
    console.log(products);
    return { 
      username: user.username,
      productIds: products || [],
    };
  });
  return { status: 200, data: usersWithProducts };
}

export default {
  // createProduct,
  getAllUsers,
};