const express = require('express');

const router = express.Router();

const productsController = require('../controllers/productsController');
const validateName = require('../middlewares/validateProductName');

router.get('/', productsController.getProducts);

router.get('/:id', productsController.getProductById);

router.post('/', validateName, productsController.createProduct);

router.put('/:id', validateName, productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;