const express = require('express');
const checkLogin = require('../middlewares/checkLogin');
const {
	createCategory,
	getAllCategories,
	getCategory,
	updateCategory,
	deleteCategory,
} = require('../controllers/categoryController');

const categoryRoutes = express.Router();

categoryRoutes
	.post('/', checkLogin, createCategory)
	.get('/', getAllCategories)
	.get('/:id', getCategory)
	.put('/:id', checkLogin, updateCategory)
	.delete('/:id', checkLogin, deleteCategory);

module.exports = categoryRoutes;
