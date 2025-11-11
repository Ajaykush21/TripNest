const express = require('express');
const { body } = require('express-validator');
const {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus,
  simulatePayment,
} = require('../controllers/bookingController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

const bookingValidation = [
  body('destinationId').notEmpty().withMessage('Destination is required'),
  body('startDate').isISO8601().withMessage('Start date is invalid'),
  body('endDate').isISO8601().withMessage('End date is invalid'),
  body('totalPrice').isFloat({ min: 0 }).withMessage('Total price must be valid'),
  body('contactInfo.email').isEmail().withMessage('Contact email is required'),
];

router.post('/', protect, bookingValidation, createBooking);
router.get('/', protect, getUserBookings);

router.get('/admin/all', protect, authorizeRoles('admin'), getAllBookings);
router.patch('/:id/status', protect, authorizeRoles('admin'), updateBookingStatus);
router.post('/:id/simulate-payment', protect, authorizeRoles('admin'), simulatePayment);

module.exports = router;

