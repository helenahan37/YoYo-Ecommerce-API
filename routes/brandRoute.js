const express = require('express');
const checkLogin = require('../middlewares/checkLogin');
const { createBrand, getAllBrands, getBrand, updateBrand, deleteBrand } = require('../controllers/brandController');

const brandRoutes = express.Router();

brandRoutes
	.post('/', checkLogin, createBrand)
	.get('/', getAllBrands)
	.get('/:id', getBrand)
	.put('/:id', checkLogin, updateBrand)
	.delete('/:id', checkLogin, deleteBrand);

module.exports = brandRoutes;
