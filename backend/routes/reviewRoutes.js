const express = require('express');
const { body } = require('express-validator');
const {
  createReview,
  getReviewsByDestination,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

const reviewValidation = [
  body('destinationId').notEmpty().withMessage('Destination is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').isLength({ min: 5 }).withMessage('Comment must be at least 5 characters'),
];

router.get('/destination/:destinationId', getReviewsByDestination);
router.post('/', protect, reviewValidation, createReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);
router.patch('/:id/publish', protect, authorizeRoles('admin'), updateReview);

module.exports = router;

