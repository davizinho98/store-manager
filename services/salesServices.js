const salesModel = require('../models/salesModel');

const getSales = async () => {
  const sales = await salesModel.getSales();

  return sales;
};

const getSaleById = async ({ id }) => {
  const sale = await salesModel.getSaleById(id);
  
  return sale;
};

const createSaleAndProduct = async (sales) => {
  const saleId = await salesModel.createSale();
  
  await Promise.all(sales.map((sale) =>
    salesModel.createSaleAndProduct(saleId, sale.productId, sale.quantity)));
  
  const saleCreated = { id: saleId, itemsSold: sales };

  return saleCreated;
};

module.exports = { createSaleAndProduct, getSales, getSaleById };