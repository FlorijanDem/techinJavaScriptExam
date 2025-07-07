const reviewRoutes = require('express').Router();
const { createReview, getAverageRating } = require('../controllers/reviewController');
const { protect } = require('../controllers/authController');

reviewRoutes.post('/', protect, createReview);
reviewRoutes.get('/:tourId/average-rating', getAverageRating);

module.exports = reviewRoutes;