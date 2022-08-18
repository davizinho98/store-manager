const connection = require('./connection');

const createSaleAndProduct = async (saleId, productId, quantity) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );

  return result.affectedRows;
};

const createSale = async () => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );

  return result.insertId;
};

module.exports = { createSaleAndProduct, createSale };