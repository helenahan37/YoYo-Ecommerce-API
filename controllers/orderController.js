const Order = require('../models/OrderModel');
const asyncHandler = require('express-async-handler');

// create new order
const createOrder = asyncHandler(async (req, res) => {
	res.json({
		message: 'Order created successfully',
	});
});

module.exports = { createOrder };
