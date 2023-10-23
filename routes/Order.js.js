
const express = require('express');  // general server
const { createOrder, fetchOrdersByUser, deleteOrder, updateOrder } = require('../controller/Order');

const router = express.Router();

router.post('/', createOrder); //  /orders is already added in base-path
router.get('/', fetchOrdersByUser);
router.delete('/:id', deleteOrder);
router.patch('/:id', updateOrder);

      


 
exports.router = router;