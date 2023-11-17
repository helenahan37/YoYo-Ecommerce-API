const Order = require('../models/OrderModel');
const User = require('../models/UserModel');
const Product = require('../models/ProductModel');
const asyncHandler = require('express-async-handler');
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_KEY);
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

	// check if user has shipping address
	// if it false, then throw error
	if (!user?.shippingAddress) {
		throw new Error('Please provide your shipping address');
	}

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

	// make payment

	// convert order to stripe structure
	const convertOrders = orderItems.map((order) => {
		return {
			price_data: {
				currency: 'usd',
				product_data: {
					name: order?.name,
					description: order?.description,
				},
				unit_amount: order?.price * 100,
			},
			quantity: order?.quantity,
		};
	});
	//create session
	const session = await stripe.checkout.sessions.create({
		line_items: convertOrders,
		metadata: {
			orderId: JSON.stringify(order?._id),
		},
		// one time payment
		mode: 'payment',
		success_url: 'http://localhost:3000/success',
		cancel_url: 'http://localhost:3000/cancel',
	});

	res.send({ url: session.url });
});

module.exports = { createOrder };
