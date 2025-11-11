const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const Subscriber = require('../models/Subscriber');
const NewsletterNotification = require('../models/NewsletterNotification');

exports.subscribe = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }

  const { email, source } = req.body;

  const existing = await Subscriber.findOne({ email });
  if (existing) {
    return res.status(200).json({ message: 'You are already subscribed. Stay tuned!' });
  }

  const subscriber = await Subscriber.create({ email, source: source || 'footer' });
  res.status(201).json({ message: 'Welcome to TripNest Studio updates!', subscriber });
});

exports.getSubscribers = asyncHandler(async (req, res) => {
  const subscribers = await Subscriber.find().sort('-createdAt');
  res.json({ subscribers });
});

exports.createNotification = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }

  const { title, message, scheduledFor } = req.body;
  const notification = await NewsletterNotification.create({
    title,
    message,
    scheduledFor,
  });

  res.status(201).json({ notification });
});

exports.getNotifications = asyncHandler(async (req, res) => {
  const notifications = await NewsletterNotification.find().sort('-createdAt');
  res.json({ notifications });
});

