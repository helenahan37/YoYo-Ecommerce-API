const express = require('express');
const checkLogin = require('../middlewares/checkLogin');
const {
	createCoupon,
	getAllCoupons,
	getCouponById,
	updateCoupon,
	deleteCoupon,
} = require('../controllers/couponController');

const couponRoutes = express.Router();

couponRoutes
	.post('/', checkLogin, createCoupon)
	.get('/', getAllCoupons)
	.get('/:id', getCouponById)
	.put('/update/:id', checkLogin, updateCoupon)
	.delete('/delete/:id', checkLogin, deleteCoupon);

module.exports = couponRoutes;
