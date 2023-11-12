const express = require('express');
const {
	createProduct,
	getProducts,
	getProduct,
	updateProduct,
	deleteProduct,
} = require('../controllers/productController');
const checkLogin = require('../middlewares/checkLogin');

const productRoutes = express.Router();

productRoutes
	.post('/', checkLogin, createProduct)
	.get('/', getProducts)
	.get('/:id', getProduct)
	.put('/:id', checkLogin, updateProduct)
	.delete('/:id/delete', checkLogin, deleteProduct);

module.exports = productRoutes;
