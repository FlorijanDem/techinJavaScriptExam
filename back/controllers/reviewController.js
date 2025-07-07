const { createReview, getAverageRating } = require('../models/reviewModel');
const AppError = require('../utils/appError');

exports.createReview = async (req, res, next) => {
  try {
    const newReview = await createReview(req.body);

    if (!newReview) {
      throw new AppError('Creation failed', 500);
    }

    res.status(201).json({
      status: 'success',
      data: newReview,
    });
  } catch (error) {
    next(error);
  }
}

exports.getAverageRating = async (req, res, next) => {
  try {
    const tourId = req.params.tourId;
    const averageRating = await getAverageRating(tourId);

    res.status(200).json({
      status: 'success',
      data: { averageRating },
    });
  } catch (error) {
    next(error);
  }
};