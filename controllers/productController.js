const Product = require('../models/ProductModel');
const asyncHandler = require('express-async-handler');

// create a new product
const createProduct = asyncHandler(async (req, res) => {
	const { name, description, brand, price, category, sizes, colors, user, totalQty } = req.body;

	//check if product exist
	const productExists = await Product.findOne({ name });
	if (productExists) {
		throw new Error('Product already exist');
	}

	// create new product
	const product = await Product.create({
		name,
		description,
		brand,
		price,
		category,
		sizes,
		colors,
		user: req.userId,
		totalQty,
	});

	// add product
	res.status(201).json({
		status: 'success',
		message: 'Product created successfully',
		product,
	});
});

module.exports = { createProduct };
