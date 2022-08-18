const connection = require('./connection');

const getSales = async () => {
  const [result] = await connection.execute(
    `SELECT id as saleId, date, product_id as productId, quantity
      FROM StoreManager.sales
      JOIN StoreManager.sales_products ON id = sale_id
    `,
  );

  return result;
};

const getSaleById = async (saleId) => {
  const [result] = await connection.execute(
    `SELECT date, product_id as productId, quantity
      FROM StoreManager.sales
      JOIN StoreManager.sales_products ON id = sale_id
    WHERE id = ?`,
    [saleId],
  );

  return result;
};

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

module.exports = { createSaleAndProduct, createSale, getSales, getSaleById };