import { Request, Response } from 'express';
import services from '../services';

const { userService } = services;

// async function createUser(req: Request, res: Response): Promise<Response> {
//   const { name, price, userId } = req.body;
//   const { status, data } = await userService.createUser({ name, price, userId });
//   return res.status(status).json(data);
// } 

async function getAllUsers(req: Request, res: Response): Promise<Response> {
  const { status, data } = await userService.getAllUsers();
  return res.status(status).json(data);
}

export default {
  // createUser,
  getAllUsers,
};