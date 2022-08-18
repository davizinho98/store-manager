const salesServices = require('../services/salesServices');

const createSaleAndProduct = async (request, response) => {
  const sale = await salesServices.createSaleAndProduct(request.body);

  response.status(201).json(sale);
};

module.exports = { createSaleAndProduct };