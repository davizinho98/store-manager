const productsService = require('../services/productsServices');

const getProducts = async (_request, response) => {
  const products = await productsService.getProducts();

  response.status(200).json(products);
};

const getProductsById = async (request, response) => {
  const { id } = request.params;
  const product = await productsService.getProductsById(id);

  response.status(200).json(product);
};

module.exports = { getProducts, getProductsById };