const Coupon = require('../models/CouponModel');
const asyncHandler = require('express-async-handler');

const createCoupon = asyncHandler(async (req, res) => {
	const { code, startDate, endDate, discount } = req.body;
	// check if admin

	// check if coupon already exist

	const couponExists = await Coupon.findOne({ code });
	if (couponExists) {
		throw new Error('Coupon already exist');
	}
	// check discount is a number
	if (isNaN(discount)) {
		throw new Error('Discount must be a number');
	}
	// create coupon
	const coupon = await Coupon.create({
		code,
		startDate,
		endDate,
		discount,
		user: req.userId,
	});
	res.status(200).json({
		status: 'success',
		message: 'Coupon created successfully',
		coupon,
	});
});

module.exports = { createCoupon };
