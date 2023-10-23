
const express = require('express');  // general server
const { createOrder, fetchOrdersByUser, deleteOrder, updateOrder, fetchAllOrders } = require('../controller/Order');

const router = express.Router();

router.post('/', createOrder); //  /orders is already added in base-path
router.get('/user/:userId', fetchOrdersByUser);
router.delete('/:id', deleteOrder);
router.patch('/:id', updateOrder);
router.get('/', fetchAllOrders);

      


 
exports.router = router;