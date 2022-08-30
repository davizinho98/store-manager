const productsService = require('../services/productsServices');

const getProducts = async (_request, response) => {
  const products = await productsService.getProducts();

  response.status(200).json(products);
};

const getProductById = async (request, response) => {
  const { id } = request.params;
  const product = await productsService.getProductById(id);

  if (!product) return response.status(404).json({ message: 'Product not found' });

  response.status(200).json(product);
};

const createProduct = async (request, response) => {
  const product = await productsService.createProduct(request.body);

  response.status(201).json(product);
};

const updateProduct = async (request, response) => {
  const product = await productsService.updateProduct(request.params, request.body);

  if (!product) return response.status(404).json({ message: 'Product not found' });

  response.status(200).json(product);
};

const deleteProduct = async (request, response) => {
  const product = await productsService.deleteProduct(request.params);

  if (!product) return response.status(404).json({ message: 'Product not found' });

  response.status(204).end();
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };