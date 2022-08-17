const productsService = require('../services/productsServices');

const getProducts = async (_request, response) => {
  const products = await productsService.getProducts();

  response.status(200).json(products);
};

const getProductsById = async (_request, response) => {
  const product = await productsService.getProductsById();

  response.status(200).json(product);
};

module.exports = { getProducts, getProductsById };