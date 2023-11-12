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

//get all products
const getProducts = asyncHandler(async (req, res) => {
	// query products
	let productQuery = Product.find();

	// search product by name
	// match name with regex and case insensitive

	if (req.query.name) {
		productQuery = productQuery.find({ name: { $regex: req.query.name, $options: 'i' } });
	}
	// search product by brand
	if (req.query.brand) {
		productQuery = productQuery.find({ brand: { $regex: req.query.brand, $options: 'i' } });
	}
	// search product by category
	if (req.query.category) {
		productQuery = productQuery.find({ category: { $regex: req.query.category, $options: 'i' } });
	}
	// search product by color
	if (req.query.colors) {
		productQuery = productQuery.find({ colors: { $regex: req.query.colors, $options: 'i' } });
	}
	// search product by sizes
	if (req.query.sizes) {
		productQuery = productQuery.find({ sizes: { $regex: req.query.sizes, $options: 'i' } });
	}
	// search product by price range
	if (req.query.price) {
		//split the price range
		const priceRange = req.query.price.split('-');
		//query the price range greater than or equal to the first value and less than or equal to the second value
		productQuery = productQuery.find({ price: { $gte: priceRange[0], $lte: priceRange[1] } });
	}

	//pagination
	// if user do not specify page number, default to 1
	const page = parseInt(req.query.page) || 1;
	// if user do not specify limit, default to 10 records per page
	const limit = parseInt(req.query.limit) || 10;
	// start index
	const startIndex = (page - 1) * limit;
	// end index
	const endIndex = page * limit;
	// get the total number of products
	const total = await Product.countDocuments();
	// pagination result
	productQuery = productQuery.skip(startIndex).limit(limit);

	const pagination = {};
	if (endIndex < total) {
		pagination.next = {
			page: page + 1,
			limit,
		};
	}
	if (startIndex > 0) {
		pagination.prev = {
			page: page - 1,
			limit,
		};
	}

	const products = await productQuery;

	res.json({
		status: 'success',
		total,
		results: products.length,
		pagination,
		products,
	});
});

//get single product

module.exports = { createProduct, getProducts };
