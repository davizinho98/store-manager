const express = require('express');

const router = express.Router();

const salesController = require('../controllers/salesController');
const validateSale = require('../middlewares/validateSale');

router.post(
    '/',
    validateSale.validateSaleData,
    validateSale.validateIdOnDb,
    salesController.createSaleAndProduct,
  );

module.exports = router;