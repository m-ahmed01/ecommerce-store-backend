
const express = require('express');  // general server
const { createProduct, fetchAllProducts, fetchProductById, updateProduct } = require('../controller/Product');

const router = express.Router();

router.post('/', createProduct); //  /products is already added in base-path
router.get('/', fetchAllProducts);
router.get('/:id', fetchProductById);
router.patch('/:id', updateProduct);
      



exports.router = router;