import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import services from '../../../src/services';
import controllers from '../../../src/controllers';

chai.use(sinonChai);

describe('UsersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('should return all users', async function () {
    const users = [
      { username: 'User 1', productIds: [1, 2] },
      { username: 'User 2', productIds: [3, 4] },
    ];
    sinon.stub(services.userService, 'getAllUsers').resolves({ status: 200, data: users });

    await controllers.userController.getAllUsers(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(users);
  });

});
