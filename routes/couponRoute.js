const express = require('express');
const checkLogin = require('../middlewares/checkLogin');
const { createCoupon } = require('../controllers/couponController');

const couponRoutes = express.Router();

couponRoutes.post('/', checkLogin, createCoupon);
// .get('/', getAllColors)
// .get('/:id', getColor)
// .put('/:id', checkLogin, updateColor)
// .delete('/:id', checkLogin, deleteColor);

module.exports = couponRoutes;
