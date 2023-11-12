const express = require('express');
const { createProduct } = require('../controllers/productController');
const checkLogin = require('../middlewares/checkLogin');

const productRoutes = express.Router();

productRoutes.post('/', checkLogin, createProduct);

module.exports = productRoutes;
