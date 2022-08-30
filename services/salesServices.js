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

const updateSale = async ({ id }, sales) => {
  const saleExits = await salesModel.getSaleById(id);
  if (!saleExits) return null;

  await Promise
    .all(sales.map((sale) => salesModel.updateSale(id, sale.productId, sale.quantity)));

  const updatedSale = { saleId: id, itemsUpdated: sales };

  return updatedSale;
};

const deleteSale = async ({ id }) => {
  const sale = await salesModel.getSaleById(id);

  if (!sale) return null;

  await salesModel.deleteSale(id);

  return true;
};

module.exports = { createSaleAndProduct, getSales, getSaleById, deleteSale, updateSale };