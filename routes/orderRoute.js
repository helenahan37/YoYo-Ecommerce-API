const express = require('express');
const checkLogin = require('../middlewares/checkLogin');
const { createOrder } = require('../controllers/orderController');

const orderRoutes = express.Router();

orderRoutes.post('/', checkLogin, createOrder);
// .get('/', getAllOrders)
// .get('/:id', getOrder)
// .put('/:id', checkLogin, updateOrder)
// .delete('/:id', checkLogin, deleteOrder);

module.exports = orderRoutes;
