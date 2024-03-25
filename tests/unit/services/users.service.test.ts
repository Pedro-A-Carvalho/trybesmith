import { expect } from 'chai';
import sinon from 'sinon';
import services from '../../../src/services';
import UserModel from '../../../src/database/models/user.model';

describe('UsersService', function () {
  beforeEach(function () { sinon.restore(); });

  it('should return all users', async function () {
    const products = [
      { id: 1, name: 'Product 1', price: '100', userId: 1},
      { id: 2, name: 'Product 2', price: '200', userId: 2},
    ];
    const users = [
      { username: 'User 1', vocation:'as',level:1, password:'123',  productIds: [products[0]] },
      { username: 'User 2', vocation:'as',level:1, password:'123',  productIds: [products[1]] },
    ];
    const postUsers = [
      { username: 'User 1', productIds: [] },
      { username: 'User 2', productIds: [] },
    ]
    const buildedUsers = [
      UserModel.build(users[0]),
      UserModel.build(users[1]),
    ];
    sinon.stub(UserModel, 'findAll').resolves(buildedUsers);

    const response = await services.userService.getAllUsers();

    expect(response.status).to.be.eq(200);
    expect(response.data).to.be.deep.eq(postUsers);
  });

});
