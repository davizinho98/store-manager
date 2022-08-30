const sinon = require('sinon');
const { expect } = require('chai');

const salesServices = require('../../../services/salesServices');
const salesModel = require('../../../models/salesModel');

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

const sales = [
  {
    productId: 1,
    quantity: 1
  },
  {
    productId: 2,
    quantity: 5
  }
]

describe('Camada services de vendas', () => {
  describe('Método getSales', () => {
    before(() => {
      sinon.stub(salesModel, 'getSales').resolves(result);
    });

    after(() => {
      salesModel.getSales.restore();
    });

    it('Deve retornar um array de objetos', async () => {
      const sales = await salesServices.getSales();

      expect(sales).to.be.an('array');
      expect(sales[0]).to.be.an('object');
    });
    it('Deve retornar todas as vendas', async () => {
      const sales = await salesServices.getSales();

      expect(sales).to.be.equal(result);
    });
  });

  describe('Método getSaleById', () => {
    before(() => {
      sinon.stub(salesModel, 'getSaleById').resolves(result[0]);
    });

    after(() => {
      salesModel.getSaleById.restore();
    });

    it('Deve retornar um ojeto', async () => {
      const sale = await salesServices.getSaleById(1);

      expect(sale).to.be.an('object');
    });

    it('Deve retornar a venda', async () => {
      const sale = await salesServices.getSaleById(1);

      expect(sale).to.be.equal(result[0]);
    });
  });

  describe('Método createSale', () => {
    before(() => {
      sinon.stub(salesModel, 'createSale').resolves(result[0]);
      sinon.stub(salesModel, 'createSaleAndProduct').resolves(result[0]);
    });

    after(() => {
      salesModel.createSale.restore();
    });

    it('Deve retornar um ojeto', async () => {
      const saleCreated = await salesServices.createSaleAndProduct(sales);

      expect(saleCreated).to.be.an('object');
    });
  });
});