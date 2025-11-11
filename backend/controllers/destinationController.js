const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const slugify = require('slugify');
const Destination = require('../models/Destination');

const buildFilters = (query) => {
  const filters = { isActive: true };

  if (query.category) {
    filters.category = query.category;
  }
  if (query.destination) {
    filters['location.city'] = new RegExp(query.destination, 'i');
  }
  if (query.country) {
    filters['location.country'] = new RegExp(query.country, 'i');
  }
  if (query.minPrice || query.maxPrice) {
    filters.price = {};
    if (query.minPrice) filters.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filters.price.$lte = Number(query.maxPrice);
  }
  if (query.minRating) {
    filters.ratingAverage = { $gte: Number(query.minRating) };
  }
  if (query.maxDuration) {
    filters.durationDays = { $lte: Number(query.maxDuration) };
  }
  if (query.search) {
    filters.$text = { $search: query.search };
  }
  if (query.tags) {
    filters.tags = { $in: query.tags.split(',') };
  }

  return filters;
};

exports.createDestination = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }

  const payload = { ...req.body };

  payload.slug = slugify(payload.name, { lower: true, strict: true });
  payload.createdBy = req.user._id;

  const destination = await Destination.create(payload);
  res.status(201).json({ destination });
});

exports.getDestinations = asyncHandler(async (req, res) => {
  const filters = buildFilters(req.query);

  const limit = Number(req.query.limit) || 12;
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;

  const sortKey = req.query.sort || '-createdAt';

  const [destinations, total] = await Promise.all([
    Destination.find(filters).sort(sortKey).skip(skip).limit(limit),
    Destination.countDocuments(filters),
  ]);

  res.json({
    destinations,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
    },
  });
});

exports.getDestinationBySlug = asyncHandler(async (req, res) => {
  const destination = await Destination.findOne({ slug: req.params.slug });

  if (!destination) {
    res.status(404);
    throw new Error('Destination not found');
  }

  res.json({ destination });
});

exports.updateDestination = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }

  const { id } = req.params;

  const destination = await Destination.findById(id);
  if (!destination) {
    res.status(404);
    throw new Error('Destination not found');
  }

  Object.assign(destination, req.body);
  if (req.body.name) {
    destination.slug = slugify(req.body.name, { lower: true, strict: true });
  }

  const updated = await destination.save();
  res.json({ destination: updated });
});

exports.deleteDestination = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const destination = await Destination.findById(id);

  if (!destination) {
    res.status(404);
    throw new Error('Destination not found');
  }

  await destination.deleteOne();
  res.json({ message: 'Destination removed' });
});

exports.toggleDestinationStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const destination = await Destination.findById(id);

  if (!destination) {
    res.status(404);
    throw new Error('Destination not found');
  }

  destination.isActive = !destination.isActive;
  await destination.save();

  res.json({ destination });
});

exports.getFeaturedDestinations = asyncHandler(async (req, res) => {
  const destinations = await Destination.find({ featured: true, isActive: true })
    .sort('-ratingAverage')
    .limit(Number(req.query.limit) || 6);

  res.json({ destinations });
});

