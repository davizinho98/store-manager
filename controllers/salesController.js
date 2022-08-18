const salesServices = require('../services/salesServices');

const getSales = async (_request, response) => {
  const sales = await salesServices.getSales();

  response.status(200).json(sales);
};

const getSaleById = async (request, response) => {
  const sale = await salesServices.getSaleById(request.params);

  if (sale.length === 0) {
    return response.status(404).json({ message: 'Sale not found' });
  }

  response.status(200).json(sale);
};

const createSaleAndProduct = async (request, response) => {
  const sale = await salesServices.createSaleAndProduct(request.body);

  response.status(201).json(sale);
};

module.exports = { createSaleAndProduct, getSales, getSaleById };