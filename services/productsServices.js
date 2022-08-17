const productsModel = require('../models/productsModel');

const getProducts = async () => {
  const products = await productsModel.getProducts();

  return products;
};

const getProductsById = async (id) => {
  const product = await productsModel.getProductsById(id);

  return product;
};

module.exports = { getProducts, getProductsById };