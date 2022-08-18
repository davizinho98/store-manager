const express = require('express');

const router = express.Router();

const salesController = require('../controllers/salesController');
const validateSale = require('../middlewares/validateSale');

router.get('/', salesController.getSales);

router.get('/:id', salesController.getSaleById);

router.post(
    '/',
    validateSale.validateSaleData,
    validateSale.validateIdOnDb,
    salesController.createSaleAndProduct,
  );

module.exports = router;