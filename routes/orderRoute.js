const express = require('express');
const checkLogin = require('../middlewares/checkLogin');
const { createOrder, getAllOrders, getOrder, updateOrder } = require('../controllers/orderController');

const orderRoutes = express.Router();

orderRoutes
	.post('/', checkLogin, createOrder)
	.get('/', checkLogin, getAllOrders)
	.get('/:id', checkLogin, getOrder)
	.put('/update/:id', checkLogin, updateOrder);
// .delete('/:id', checkLogin, deleteOrder);

module.exports = orderRoutes;
