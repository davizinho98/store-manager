const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../../models/productsModel');
const productsServices = require('../../../services/productsServices');

const result = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' }
];

describe('Camada services de produtos', () => {

  describe('Método getProducts', () => {
    before(() => {
      sinon.stub(productsModel, 'getProducts').resolves(result);
    });

    after(() => {
      productsModel.getProducts.restore();
    });

    it('Deve retornar um array de objetos', async () => {
      const products = await productsServices.getProducts();

      expect(products).to.be.an('array');
      expect(products[0]).to.be.an('object');
    });

    it('Deve retornar todos os produtos', async () => {
      const products = await productsServices.getProducts();

      expect(products).to.be.equal(result);
    });
  })

  describe('Método getProductById', () => {
    before(() => {
      sinon.stub(productsModel, 'getProductById').resolves(result[0]);
    });

    after(() => {
      productsModel.getProductById.restore();
    });

    it('Deve retornar um objeto', async () => {
      const product = await productsServices.getProductById(1);

      expect(product).to.be.an('object');
    });

    it('Deve retornar o produto com o id passado', async () => {
      const product = await productsServices.getProductById(1);

      expect(product).to.be.equal(result[0]);
    });
  });
});