const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

const result = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' }
];

describe('Camada model de produtos', () => {

  describe('Método getProducts', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([result]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Deve retornar um array de objetos', async () => {
      const products = await productsModel.getProducts();

      expect(products).to.be.an('array');
      expect(products[0]).to.be.an('object');
    });

    it('Deve retornar todos os produtos', async () => {
      const products = await productsModel.getProducts();

      expect(products).to.be.equal(result);
    });
  })

  describe('Método getProductById', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([result]);
    });

    after(() => {
      connection.execute.restore();
    });
  
    it('Deve retornar um objeto', async () => { 
      const product = await productsModel.getProductById(1);

      expect(product).to.be.an('object');
    });

    it('Deve retornar o produto com o id passado', async () => {
      const product = await productsModel.getProductById(1);

      expect(product).to.be.equal(result[0]);
    });
  });
});