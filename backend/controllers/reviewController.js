const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const Review = require('../models/Review');
const Destination = require('../models/Destination');

const recalculateRatings = async (destinationId) => {
  const stats = await Review.aggregate([
    { $match: { destination: destinationId, isPublished: true } },
    {
      $group: {
        _id: '$destination',
        ratingAverage: { $avg: '$rating' },
        ratingCount: { $sum: 1 },
      },
    },
  ]);

  const destination = await Destination.findById(destinationId);
  if (!destination) return;

  if (stats.length > 0) {
    destination.ratingAverage = Number(stats[0].ratingAverage.toFixed(1));
    destination.ratingCount = stats[0].ratingCount;
  } else {
    destination.ratingAverage = 0;
    destination.ratingCount = 0;
  }

  await destination.save();
};

exports.createReview = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }

  const { destinationId, rating, comment, title } = req.body;

  const destination = await Destination.findById(destinationId).lean();
  if (!destination) {
    res.status(404);
    throw new Error('Destination not found');
  }

  const existing = await Review.findOne({ destination: destinationId, user: req.user._id });
  if (existing) {
    res.status(400);
    throw new Error('You have already reviewed this destination');
  }

  const review = await Review.create({
    destination: destinationId,
    user: req.user._id,
    rating,
    comment,
    title,
  });

  await recalculateRatings(destinationId);

  res.status(201).json({ review });
});

exports.getReviewsByDestination = asyncHandler(async (req, res) => {
  const { destinationId } = req.params;

  const reviews = await Review.find({ destination: destinationId, isPublished: true })
    .populate('user', 'name avatarUrl')
    .sort('-createdAt');

  res.json({ reviews });
});

exports.updateReview = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const review = await Review.findById(id);
  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  if (review.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('You can only update your own review');
  }

  const { rating, comment, title, isPublished } = req.body;
  if (rating !== undefined) review.rating = rating;
  if (comment !== undefined) review.comment = comment;
  if (title !== undefined) review.title = title;
  if (isPublished !== undefined) review.isPublished = isPublished;

  await review.save();
  await recalculateRatings(review.destination);

  res.json({ review });
});

exports.deleteReview = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const review = await Review.findById(id);
  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('You can only delete your own review');
  }

  await review.deleteOne();
  await recalculateRatings(review.destination);

  res.json({ message: 'Review removed' });
});

