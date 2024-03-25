import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { User } from '../types/User';
import ServiceResponse from '../types/ServiceResponse';
import jwtUtil from '../utils/jwt.util';

type LoginInput = {
  username: string,
  password: string
};

async function login(credentials: LoginInput): Promise<ServiceResponse<User>> {
  if (!credentials.username || !credentials.password) {
    return { status: 400, data: { message: '"username" and "password" are required' } };
  }

  // conferir se existe um host no banco de dados
  const user = await UserModel.findOne({ where: { username: credentials.username } });
  if (!user || !bcrypt.compareSync(credentials.password, user.dataValues.password)) {
    return { status: 401, data: { message: 'Username or password invalid' } };
  }

  const { id, username } = user.dataValues;

  const token = jwtUtil.create({ id, username });

  // retornar um token jwt
  return { status: 200, data: { token } };
}

export default {
  login,
};