const productModel = require('../models/productsModel');

const validateSaleData = (request, response, next) => {
  if (request.body.find((sale) => sale.productId === undefined)) {
    return response
      .status(400).json({ message: '"productId" is required' });
  }
  if (request.body.find((sale) => sale.quantity === undefined)) {
    return response
      .status(400).json({ message: '"quantity" is required' });
  }
  if (request.body.find((sale) => sale.quantity < 1)) {
    return response
      .status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

const validateIdOnDb = async (request, response, next) => {
  const productValidation = await Promise
    .all(request.body.map((sale) => productModel.getProductById(sale.productId)));

  if (productValidation.includes(null)) {
    return response.status(404).json({ message: 'Product not found' });
  }

  next();
};

module.exports = { validateSaleData, validateIdOnDb };