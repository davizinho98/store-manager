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

  describe('Método createProduct', () => {
    before(() => {
      sinon.stub(productsModel, 'createProduct').resolves(result.length + 1);
      sinon.stub(productsModel, 'getProductById').resolves({ id: 4, name: 'Joia do Infinito' });
    });

    after(() => {
      productsModel.createProduct.restore();
      productsModel.getProductById.restore();
    });

    it('Deve retornar um objeto com as chaves id e name', async () => {
      const insertId = await productsServices.createProduct({ name: 'Joia do Infinito' });
      const product = await productsServices.getProductById(insertId);

      expect(product).to.be.an('object');
      expect(product).to.have.property('id');
      expect(product).to.have.property('name');
    });
  });

  describe('Método updateProduct', () => {
    describe('Quando não houver o produto com id', () => {
      before(() => {
        sinon.stub(productsModel, 'getProductById').resolves(null);
      });

      after(() => {
        productsModel.getProductById.restore();
      });

      it('Retorna nulo se o produto não existir', async () => {
        const product = await productsServices.getProductById(1);

        expect(product).to.be.null;
      });
    });
    describe('Quando houver o produto com id', () => {
      before(() => {
        sinon.stub(productsModel, 'updateProduct').resolves({ id: 1, name: 'Joia do Infinito' });
        sinon.stub(productsModel, 'getProductById').resolves({ id: 1, name: 'Joia do Infinito' });
      });

      after(() => {
        productsModel.updateProduct.restore();
        productsModel.getProductById.restore();
      });

      it('Deve retornar um objeto com as chaves id e name', async () => {
        const ID = 1;
        const newName = 'Joia do Infinito';
        const product = await productsServices.updateProduct(ID, newName);

        expect(product).to.be.an('object');
        expect(product).to.have.property('id');
        expect(product).to.have.property('name');
        expect(product.id).to.be.equal(ID);
        expect(product.name).to.be.equal(newName);
      });
    });
  });
});