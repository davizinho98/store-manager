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

  if (result.length === 0) return null;

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

const updateSale = async (id, productId, quantity) => {
  const [result] = await connection.execute(
    'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
    [quantity, id, productId],
  );

  return result.affectedRows;
};

const deleteSale = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );

  if (!result) return null;

  return { affectedRows: result.affectedRows };
};

module.exports = {
  createSaleAndProduct, createSale, getSales, getSaleById, deleteSale, updateSale,
};