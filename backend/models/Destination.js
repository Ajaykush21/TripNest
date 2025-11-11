const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ['adventure', 'relaxation', 'cultural', 'romantic', 'family', 'business', 'nature', 'cruise'],
      default: 'adventure',
    },
    price: { type: Number, required: true, min: 0 },
    durationDays: { type: Number, required: true, min: 1 },
    ratingAverage: { type: Number, default: 0, min: 0, max: 5 },
    ratingCount: { type: Number, default: 0, min: 0 },
    images: [{ type: String }],
    location: {
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
    highlights: [{ type: String }],
    includes: [{ type: String }],
    excludes: [{ type: String }],
    featured: { type: Boolean, default: false },
    bestSeason: { type: String },
    tags: [{ type: String }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

destinationSchema.index({ name: 'text', description: 'text', category: 'text', 'location.city': 'text', 'location.country': 'text' });

module.exports = mongoose.model('Destination', destinationSchema);

