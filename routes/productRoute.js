const express = require('express');
const { createProduct, getProducts } = require('../controllers/productController');
const checkLogin = require('../middlewares/checkLogin');

const productRoutes = express.Router();

productRoutes.post('/', checkLogin, createProduct).get('/', getProducts);

module.exports = productRoutes;
