const productsModel = require('../models/productsModel');

const getProducts = async () => {
  const products = await productsModel.getProducts();

  return products;
};

const getProductsById = async () => {
  const product = await productsModel.getProductsById();

  return product;
};

module.exports = { getProducts, getProductsById };