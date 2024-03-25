import { expect } from 'chai';
import sinon from 'sinon';
import productService from '../../../src/services/product.service';
import ProductModel from '../../../src/database/models/product.model';


describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });

  it('should return the created product', async function () {
    const product = { name: 'Product 1', price: '100', userId: 1 };
    const newProduct = ProductModel.build({ id: 1, ...product });
    sinon.stub(ProductModel, 'create').resolves(newProduct);

    const response = await productService.createProduct(product);

    expect(response.status).to.be.eq(201);
    expect(response.data).to.be.eq(newProduct.dataValues);
  });

  it('should return all products', async function () {
    const products = [
      { id: 1, name: 'Product 1', price: '100', userId: 1 },
      { id: 2, name: 'Product 2', price: '200', userId: 2 },
    ];
    const buildedProducts = [
      ProductModel.build(products[0]),
      ProductModel.build(products[1]),
    ];
    sinon.stub(ProductModel, 'findAll').resolves(buildedProducts);

    const response = await productService.getAllProducts();

    expect(response.status).to.be.eq(200);
    expect(response.data).to.be.deep.eq(products);
  });

});
