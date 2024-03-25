import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import loginService from '../../../src/services/login.service';
import loginController from '../../../src/controllers/login.controller';

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('should return token and 200 if user registered', async function() {
    // arranjo
    req.body = {
      email: 'admin@admin.com',
      password: 'pwd12345',
    }

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.stub(loginService, 'login').resolves({
      status: 200,
      data: { token: '123' }
    })

    // ação
    await loginController.login(req, res);

    // assertiva
    // matcher
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ token: '123' });
  });


  it('should return 401 with error if user with wrong username', async function() {
    // arranjo

    req.body = {
      email: 'admin@admin.com',
      password: 'pwd12345',
    }

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.stub(loginService, 'login').resolves({
      status: 401,
      data: { message: 'erro' }
    })

    // ação
    await loginController.login(req, res);

    // assertiva
    // matcher
    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledWith({ message: 'erro' });
  });

  it('should return 401 with error if user with wrong password', async function() {
    // arranjo

    req.body = {
      email: 'admin@admin.com',
      password: 'pwd12345',
    }

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.stub(loginService, 'login').resolves({
      status: 401,
      data: { message: 'erro' }
    })

    // ação
    await loginController.login(req, res);

    // assertiva
    // matcher
    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledWith({ message: 'erro' });
  });

  it('should return 400 with error if no username', async function() {
    // arranjo

    req.body = {
      password: 'pwd12345',
      username: ''
    }

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.stub(loginService, 'login').resolves({
      status: 400,
      data: { message: 'erro' }
    })

    // ação
    await loginController.login(req, res);

    // assertiva
    // matcher
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: 'erro' });
  }
  );

});
