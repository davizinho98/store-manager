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

module.exports = { getProducts, getProductById, createProduct, updateProduct };