const express = require('express');
const checkLogin = require('../middlewares/checkLogin');
const {
	createReview,
	// getAllReviews,
	// getReview,
	// updateReview,
	// deleteReview,
} = require('../controllers/reviewController');

const reviewRoutes = express.Router();

reviewRoutes.post('/:productID', checkLogin, createReview);
// .get('/', getAllReviews)
// .get('/:id', getReview)
// .put('/:id', checkLogin, updateReview)
// .delete('/:id', checkLogin, deleteReview);

module.exports = reviewRoutes;
