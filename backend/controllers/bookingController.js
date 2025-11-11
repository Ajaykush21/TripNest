const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const Destination = require('../models/Destination');

const generateBookingCode = () => `TN-${Math.random().toString(36).substring(2, 6).toUpperCase()}${Date.now().toString().slice(-4)}`;

exports.createBooking = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }

  const { destinationId, startDate, endDate, guests, contactInfo, totalPrice, paymentMethod } = req.body;

  const destination = await Destination.findById(destinationId);
  if (!destination) {
    res.status(404);
    throw new Error('Destination not found');
  }

  const booking = await Booking.create({
    user: req.user._id,
    destination: destinationId,
    bookingCode: generateBookingCode(),
    startDate,
    endDate,
    guests,
    contactInfo,
    totalPrice,
    payment: { method: paymentMethod || 'card', status: 'pending' },
  });

  res.status(201).json({ booking });
});

exports.getUserBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate('destination')
    .sort('-createdAt');

  res.json({ bookings });
});

exports.getAllBookings = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const filters = {};
  if (status) filters.status = status;

  const bookings = await Booking.find(filters).populate('user destination').sort('-createdAt');

  res.json({ bookings });
});

exports.updateBookingStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, paymentStatus, transactionId } = req.body;

  const booking = await Booking.findById(id);
  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  if (status) booking.status = status;
  if (paymentStatus) booking.payment.status = paymentStatus;
  if (transactionId) booking.payment.transactionId = transactionId;

  const updated = await booking.save();
  res.json({ booking: updated });
});

exports.simulatePayment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findById(id);

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  // Simulate payment succeeded
  booking.payment.status = 'paid';
  booking.payment.transactionId = `SIM-${Date.now()}`;
  booking.status = 'confirmed';
  await booking.save();

  res.json({ booking, message: 'Payment simulated successfully' });
});

