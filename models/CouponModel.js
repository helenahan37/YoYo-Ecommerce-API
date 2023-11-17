//coupon model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CouponSchema = new Schema(
	{
		code: {
			type: String,
			required: true,
		},
		startDate: {
			type: Date,
			required: true,
		},
		endDate: {
			type: Date,
			required: true,
		},
		discount: {
			type: Number,
			required: true,
			default: 0,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
	}
);

const Coupon = mongoose.model('Coupon', CouponSchema);
module.exports = Coupon;
