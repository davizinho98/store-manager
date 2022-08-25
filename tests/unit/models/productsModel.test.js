const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

const result = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

describe('Camada model de produtos', () => {
  describe('Método getProducts', () => {
    describe('Quando não houver nenhum produto', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([[]]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('Retorna nulo se o produto não existir', async () => {
        const product = await productsModel.getProductById(1);

        expect(product).to.be.null;
      });
    });

    describe('Quando houver produtos', () => {
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
    });
  });
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

    describe('Método createProduct', () => {

      before(() => {
        sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('Deve retornar o insertId', async () => {
        const newProduct = { id: 4, name: 'Joia do Infinito' }
        result.push(newProduct);

        const product = await productsModel.createProduct('Joia do Infinito');

        expect(product).to.be.equal(newProduct.id);
        expect(result.length).to.be.equal(newProduct.id);
      });
    });

    describe('Método updateProduct', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([{ id: 1, name: 'Martelo de Capitão América' }]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('Deve retornar o produto atualizado', async () => {
        const ID = 1;
        const newName = 'Martelo de Capitão América';
        const product = await productsModel.updateProduct(ID, newName);

        expect(product.id).to.be.equal(ID);
        expect(product.name).to.be.equal(newName);
      });
    });
});