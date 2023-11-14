const Order = require('../models/OrderModel');
const User = require('../models/UserModel');
const Product = require('../models/ProductModel');
const asyncHandler = require('express-async-handler');

/*  
1. get the user who created the order
2. get the order details
3. check order not empty
4. place order and save to database
5. push order to user orders
6. update product quantity
7. make payment 
8. interact with payment webhook
9. update user order
*/
// create new order
const createOrder = asyncHandler(async (req, res) => {
	// get order details from request body
	const { orderItems, shippingAddress, totalPrice } = req.body;

	// get user id from request
	const user = await User.findById(req.userId);
	//check if order is empty
	if (orderItems?.length <= 0) {
		throw new Error('Order is empty');
	}
	// create new order
	const order = await Order.create({
		user: user?._id,
		orderItems,
		shippingAddress,
		totalPrice,
	});

	//add order into user and save
	user.orders.push(order?._id);
	await user.save();

	//find the total id in orderItems
	const products = await Product.find({ _id: { $in: orderItems } });

	orderItems?.map(async (order) => {
		// find product id inside order
		const product = products?.find((product) => {
			//convert object id to string
			return product?._id?.toString() === order?._id?.toString();
		});

		if (product) {
			// update product quantity
			product.totalSold += order.quantity;
		}
		await product.save();
	});

	res.json({
		status: 'success',
		message: 'Order created successfully',
		order,
		user,
	});
});

module.exports = { createOrder };
