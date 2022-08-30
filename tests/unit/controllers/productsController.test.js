const sinon = require('sinon');
const { expect } = require('chai');

const productsController = require('../../../controllers/productsController');
const productsServices = require('../../../services/productsServices');

const result = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' }
];

describe('Camada controller de produtos', () => {

  describe('Método getProducts', () => {
    const request = {};
    const response = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getProducts').resolves(result);
    });

    after(() => {
      productsServices.getProducts.restore();
    });

    it('Deve retornar a response com status correto', async () => {
      await productsController.getProducts(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Deve retornar todos os produtos', async () => {
      await productsController.getProducts(request, response);

      expect(response.json.calledWith(result)).to.be.equal(true);
    });
  })

  describe('Método getProductById', () => {
    const request = {};
    const response = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      request.params = { id: 1 };

      sinon.stub(productsServices, 'getProductById').resolves(result);
    });

    after(() => {
      productsServices.getProductById.restore();
    });

    it('Deve retornar a response com status correto', async () => {
      await productsController.getProductById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Deve retornar o produto com o id passado', async () => {
      await productsController.getProductById(request, response);

      expect(response.json.calledWith(result)).to.be.equal(true);
    });
  });

  describe('Método createProduct', () => { 
    const request = {};
    const response = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      request.body = { name: 'Martelo de Thor' };

      sinon.stub(productsServices, 'createProduct').resolves(result);
    }),
      after(() => {
        productsServices.createProduct.restore();
      }),
      it('Deve retornar a response com status correto', async () => {
        await productsController.createProduct(request, response);

        expect(response.status.calledWith(201)).to.be.equal(true);
      }),
      it('Deve retornar o produto criado', async () => {
        await productsController.createProduct(request, response);

        expect(response.json.calledWith(result)).to.be.equal(true);
      });
  });

  describe('Método updateProduct', () => {
    const request = {};
    const response = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      request.params = { id: 1 };
      request.body = { name: 'Martelo de Thor' };

      sinon.stub(productsServices, 'updateProduct').resolves(result);
    }),
      after(() => {
        productsServices.updateProduct.restore();
      }),
      it('Deve retornar a response com status correto', async () => {
        await productsController.updateProduct(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
      }),
      it('Deve retornar o produto atualizado', async () => {
        await productsController.updateProduct(request, response);

        expect(response.json.calledWith(result)).to.be.equal(true);
      });
  });
});