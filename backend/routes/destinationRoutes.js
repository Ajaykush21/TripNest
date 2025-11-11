const express = require('express');
const { body } = require('express-validator');
const {
  createDestination,
  getDestinations,
  getDestinationBySlug,
  updateDestination,
  deleteDestination,
  toggleDestinationStatus,
  getFeaturedDestinations,
} = require('../controllers/destinationController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

const createDestinationValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a valid number'),
  body('durationDays').isInt({ min: 1 }).withMessage('Duration must be at least 1 day'),
  body('location.city').notEmpty().withMessage('City is required'),
  body('location.country').notEmpty().withMessage('Country is required'),
];

const updateDestinationValidation = [
  body('name').optional().isString().withMessage('Name must be a string'),
  body('description').optional().isString().withMessage('Description must be a string'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be valid'),
  body('durationDays').optional().isInt({ min: 1 }).withMessage('Duration must be valid'),
  body('location.city').optional().notEmpty().withMessage('City is required when provided'),
  body('location.country').optional().notEmpty().withMessage('Country is required when provided'),
];

router.get('/', getDestinations);
router.get('/featured', getFeaturedDestinations);
router.get('/:slug', getDestinationBySlug);

router.post('/', protect, authorizeRoles('admin'), createDestinationValidation, createDestination);
router.put('/:id', protect, authorizeRoles('admin'), updateDestinationValidation, updateDestination);
router.patch('/:id/toggle', protect, authorizeRoles('admin'), toggleDestinationStatus);
router.delete('/:id', protect, authorizeRoles('admin'), deleteDestination);

module.exports = router;

