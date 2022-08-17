const connection = require('./connection');

const getProducts = async () => {
  const query = 'SELECT * FROM products';
  const [result] = await connection.execute(query);

  return result;
};

const getProductById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  const [result] = await connection.execute(query, [id]);

  return result;
};

module.exports = { getProducts, getProductById };
