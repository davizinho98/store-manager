const sinon = require('sinon');
const { expect } = require('chai');

const salesServices = require('../../../services/salesServices');
const salesController = require('../../../controllers/salesController');

const result = [
  {
    saleId: 1,
    productId: 1,
    quantity: 2
  },
  {
    saleId: 1,
    productId: 2,
    quantity: 2
  }
];

describe('Camada controllers de vendas', () => {
  describe('Método getSales', () => {
    const request = {};
    const response = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesServices, 'getSales').resolves(result);
    });

    after(() => {
      salesServices.getSales.restore();
    });

    it('Deve retornar a response com status correto', async () => {
      await salesController.getSales(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Deve retornar todas as vendas', async () => {
      await salesController.getSales(request, response);

      expect(response.json.calledWith(result)).to.be.equal(true);
    });
  });

  describe('Método getSaleById', () => {
    const request = {};
    const response = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      request.params = { id: 1 };

      sinon.stub(salesServices, 'getSaleById').resolves(result[0]);
    });

    after(() => {
      salesServices.getSaleById.restore();
    });

    it('Deve retornar a response com status correto', async () => {
      await salesController.getSaleById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Deve retornar a venda', async () => {
      await salesController.getSaleById(request, response);

      expect(response.json.calledWith(result[0])).to.be.equal(true);
    });
  });

  describe('Método createSaleAndProduct', () => {
    const request = {};
    const response = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      request.body = {
        productId: 1,
        quantity: 1
      };

      sinon.stub(salesServices, 'createSaleAndProduct').resolves(result[0]);
    });

    after(() => {
      salesServices.createSaleAndProduct.restore();
    });
    
    it('Deve retornar a response com status correto', async () => {
      await salesController.createSaleAndProduct(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });
    
    it('Deve retornar a venda', async () => {
      await salesController.createSaleAndProduct(request, response);

      expect(response.json.calledWith(result[0])).to.be.equal(true);
    });

  });
});
