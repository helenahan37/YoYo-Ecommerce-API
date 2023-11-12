const express = require('express');
const checkLogin = require('../middlewares/checkLogin');
const { createColor, getAllColors, getColor, updateColor, deleteColor } = require('../controllers/colorController');

const colorRoutes = express.Router();

colorRoutes
	.post('/', checkLogin, createColor)
	.get('/', getAllColors)
	.get('/:id', getColor)
	.put('/:id', checkLogin, updateColor)
	.delete('/:id', checkLogin, deleteColor);

module.exports = colorRoutes;
