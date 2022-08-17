const connection = require('./connection');

const getProducts = async () => {
  const query = 'SELECT * FROM products';
  const [result] = await connection.execute(query);

  return result;
};

module.exports = { getProducts };
