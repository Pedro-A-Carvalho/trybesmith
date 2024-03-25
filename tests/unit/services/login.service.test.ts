import { expect } from 'chai';
import sinon from 'sinon';
import UserModel from '../../../src/database/models/user.model';
import bcrypt from 'bcryptjs';
import loginService from '../../../src/services/login.service';

const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || 10;

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });

  it('should return token and 200 if user in DB', async function () {
    const user = {
      username: 'asd',
      password: '123',
    };
    const userFromDb = UserModel.build({ 
      id: 1,
      username: user.username,
      password: bcrypt.hashSync(user.password, SALT_ROUNDS),
      vocation: 'mage',
      level: 1
    });
    sinon.stub(UserModel, 'findOne').resolves(userFromDb);

    const response = await loginService.login(user);

    expect(response.status).to.be.eq(200);
    expect(response.data).to.have.property('token');
  });

  it('should return 401 if user not in DB', async function () {
    const user = {
      username: 'asd',
      password: '123',
    };
    sinon.stub(UserModel, 'findOne').resolves(null);

    const response = await loginService.login(user);

    expect(response.status).to.be.eq(401);
  });

  it('should return 400 if no username or password', async function () {
    const user = {
      username: '',
      password: '',
    };

    const response = await loginService.login(user);

    expect(response.status).to.be.eq(400);
  });
});
