const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Destination = require('../models/Destination');
const Booking = require('../models/Booking');
const Review = require('../models/Review');

exports.getDashboardSummary = asyncHandler(async (req, res) => {
  const [usersCount, destinationsCount, bookingsStats, recentBookings, topDestinations] = await Promise.all([
    User.countDocuments(),
    Destination.countDocuments(),
    Booking.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          revenue: { $sum: '$totalPrice' },
        },
      },
    ]),
    Booking.find().populate('user', 'name email').populate('destination', 'name').sort('-createdAt').limit(5),
    Destination.find().sort('-ratingAverage').limit(5),
  ]);

  const bookingsSummary = bookingsStats.reduce(
    (acc, curr) => {
      acc.count += curr.count;
      acc.revenue += curr.revenue;
      acc.byStatus[curr._id] = curr.count;
      return acc;
    },
    { count: 0, revenue: 0, byStatus: {} }
  );

  const reviewsCount = await Review.countDocuments();

  res.json({
    usersCount,
    destinationsCount,
    reviewsCount,
    bookingsSummary,
    recentBookings,
    topDestinations,
  });
});

