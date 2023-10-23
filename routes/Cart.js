
const express = require('express');  // general server
const { addToCart, fetchCartByUser, deleteFromCart, updateCart } = require('../controller/Cart');

const router = express.Router();

router.post('/', addToCart); //  /products is already added in base-path
router.get('/', fetchCartByUser);
router.delete('/:id', deleteFromCart);
router.patch('/:id', updateCart);

      



exports.router = router;