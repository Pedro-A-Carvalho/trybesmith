import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import productService from '../../../src/services/product.service';
import productController from '../../../src/controllers/product.controller';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('should return the created product', async function () {
    const product = { name: 'Product 1', price: '100', userId: 1 };
    const newProduct = { id: 1, ...product };
    sinon.stub(productService, 'createProduct').resolves({ status: 201, data: newProduct });
    req.body = product;

    await productController.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProduct);
  });

  it('should return all products', async function () {
    const products = [
      { id: 1, name: 'Product 1', price: '100', userId: 1 },
      { id: 2, name: 'Product 2', price: '200', userId: 2 },
    ];
    sinon.stub(productService, 'getAllProducts').resolves({ status: 200, data: products });

    await productController.getAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products);
  });

});
