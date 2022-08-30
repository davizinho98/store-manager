const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
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

describe('Camada model de vendas', () => {
  describe('Método getSales', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([result]);
    });

    after(() => {
      connection.execute.restore();
    })

    it('Deve retornar um array de objetos', async () => {
      const sales = await salesModel.getSales();

      expect(sales).to.be.an('array');
      expect(sales[0]).to.be.an('object');
    });

    it('Deve retornar todas as vendas', async () => {
      const sales = await salesModel.getSales();

      expect(sales).to.be.equal(result);
    });
  });

  describe('Método getSaleById', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([result]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Deve retornar um array de objetos', async () => {
      const sales = await salesModel.getSaleById(1);

      expect(sales).to.be.an('array');
      expect(sales[0]).to.be.an('object');
    });

    it('Deve retornar a venda', async () => {
      const sales = await salesModel.getSaleById(1);

      expect(sales).to.be.equal(result);
    });
  });

  describe('Método createSaleAndProduct', () => {
    const resultRows = { affectedRows: 1 };
    before(() => {
      sinon.stub(connection, 'execute').resolves([resultRows]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Deve retornar affected rows', async () => {
      const affectedRows = await salesModel.createSaleAndProduct(1, 1, 2);

      expect(affectedRows).to.be.an('number');
      expect(affectedRows).to.be.equal(1);
    });
  });

  describe('Método createSale', () => {
    const resultInsertId = { insertId: 1 };
    before(() => {
      sinon.stub(connection, 'execute').resolves([resultInsertId]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Deve retornar insertId', async () => {
      const insertId = await salesModel.createSale();

      expect(insertId).to.be.an('number');
      expect(insertId).to.be.equal(1);
    });
  });
});
