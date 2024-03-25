import { Request, Response } from 'express';
import services from '../services';

const { loginService } = services;

async function login(req: Request, res: Response): Promise<Response> {
  const { username, password } = req.body;
  const serviceResponse = await loginService.login({ username, password });

  return res.status(serviceResponse.status).json(serviceResponse.data);
}

export default {
  login,
};