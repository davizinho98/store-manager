const connection = require('./connection');

const getProducts = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [result] = await connection.execute(query);

  return result;
};

const getProductById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [result] = await connection.execute(query, [id]);

  if (result.length === 0) return null;

  return result[0];
};

const getProductByName = async (name) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name LIKE ?';
  const [result] = await connection.execute(query, [`%${name}%`]);

  return result;
};

const createProduct = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [result] = await connection.execute(query, [name]);

  return result.insertId;
};

const updateProduct = async (id, name) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  await connection.execute(query, [name, id]);

  return { id, name };
};

const deleteProduct = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );

  return { affectedRows: result.affectedRows };
};

module.exports = {
  getProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductByName,
};
