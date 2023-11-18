const express = require('express');
const {
	createProduct,
	getAllProducts,
	getProduct,
	updateProduct,
	deleteProduct,
} = require('../controllers/productController');
const checkLogin = require('../middlewares/checkLogin');
const upload = require('../config/fileUpload');

const productRoutes = express.Router();

productRoutes
	.post('/', checkLogin, upload.single('file'), createProduct)
	.get('/', getAllProducts)
	.get('/:id', getProduct)
	.put('/:id', checkLogin, updateProduct)
	.delete('/:id', checkLogin, deleteProduct);

module.exports = productRoutes;
