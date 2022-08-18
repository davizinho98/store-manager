const salesModel = require('../models/salesModel');

const createSaleAndProduct = async (sales) => {
  const saleId = await salesModel.createSale();
  
  await Promise.all(sales.map((sale) =>
    salesModel.createSaleAndProduct(saleId, sale.productId, sale.quantity)));
  
  const saleCreated = { id: saleId, itemsSold: sales };

  return saleCreated;
};

module.exports = { createSaleAndProduct };