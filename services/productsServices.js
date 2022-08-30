const productsModel = require('../models/productsModel');

const getProducts = async () => {
  const products = await productsModel.getProducts();

  return products;
};

const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);

  if (!product) return null;

  return product;
};

const getProductByName = async ({ q }) => {
  if (!q || q === '') {
    return getProducts();
  }
  const products = await productsModel.getProductByName(q);

  return products;
};

const createProduct = async ({ name }) => {
  const id = await productsModel.createProduct(name);

  const product = await productsModel.getProductById(id);

  return product;
};

const updateProduct = async ({ id }, { name }) => {
  const product = await productsModel.getProductById(id);

  if (!product) return null;
  
  const productUpdated = await productsModel.updateProduct(id, name);

  return productUpdated;
};

const deleteProduct = async ({ id }) => {
  const product = await productsModel.getProductById(id);

  if (!product) return null;
  
  await productsModel.deleteProduct(id);

  return true;
};

module.exports = {
  getProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductByName,
};