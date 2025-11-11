/* eslint-disable no-console */
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Destination = require('../models/Destination');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const demoDestinations = [
  {
    name: 'Bali Serenity Escape',
    slug: 'bali-serenity-escape',
    description:
      'Unwind in luxury villas, explore rice terraces at sunrise, and savour Balinese cuisine with a private chef experience.',
    category: 'relaxation',
    price: 87999,
    durationDays: 6,
    location: { city: 'Ubud', country: 'Indonesia' },
    images: ['https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80'],
    highlights: ['Sunrise trek to Mount Batur', 'Floating breakfast in private villa', 'Balinese spa rituals'],
    includes: ['Luxury villa stay', 'Daily breakfast', 'Local concierge support'],
    bestSeason: 'June - September',
    featured: true,
    tags: ['wellness', 'nature', 'culture'],
  },
  {
    name: 'Swiss Alps Adventure Rail',
    slug: 'swiss-alps-adventure-rail',
    description:
      'Ride the scenic Glacier Express, trek alpine trails with local guides, and indulge in artisan chocolate tastings.',
    category: 'adventure',
    price: 124999,
    durationDays: 8,
    location: { city: 'Zermatt', country: 'Switzerland' },
    images: ['https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=80'],
    highlights: ['Glacier Express panorama car', 'Guided alpine trek', 'Lake Geneva sunset cruise'],
    includes: ['Rail passes', 'Boutique hotel stays', 'Breakfast & select dinners'],
    bestSeason: 'December - March',
    featured: true,
    tags: ['mountains', 'rail journey'],
  },
  {
    name: 'Tokyo After Dark',
    slug: 'tokyo-after-dark',
    description:
      'Dive into the neon nightlife of Shinjuku, savour omakase dining, and master sushi rolling with Tokyo chefs.',
    category: 'cultural',
    price: 105000,
    durationDays: 5,
    location: { city: 'Tokyo', country: 'Japan' },
    images: ['https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80'],
    highlights: ['Private bar hopping in Golden Gai', 'Omakase dinner', 'Tsukiji market sushi workshop'],
    includes: ['Guided experiences', '4-star hotel', 'Airport transfers'],
    bestSeason: 'March - May',
    featured: true,
    tags: ['nightlife', 'food'],
  },
  {
    name: 'South African Safari Luxe',
    slug: 'south-african-safari-luxe',
    description:
      'Witness the Big Five on sunrise game drives, dine under the stars, and unwind in infinity pools overlooking the savannah.',
    category: 'nature',
    price: 139999,
    durationDays: 7,
    location: { city: 'Kruger', country: 'South Africa' },
    images: ['https://images.unsplash.com/photo-1526481280695-3c46917f5c64?auto=format&fit=crop&w=1600&q=80&sat=-20'],
    highlights: ['Daily guided game drives', 'Stargazing dinner in the bush', 'Luxury tented camp stay'],
    includes: ['All meals', 'Safari activities', 'Dedicated ranger and tracker'],
    bestSeason: 'May - October',
    tags: ['wildlife', 'luxury'],
  },
  {
    name: 'Amalfi Coast Slow Cruise',
    slug: 'amalfi-coast-slow-cruise',
    description:
      'Sail pastel villages, indulge in vineyard picnics, and learn pasta-making from Italian nonnas in Positano.',
    category: 'romantic',
    price: 94999,
    durationDays: 6,
    location: { city: 'Positano', country: 'Italy' },
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80'],
    highlights: ['Private yacht charter', 'Farm-to-table cooking class', 'Sunset aperitivo at sea'],
    includes: ['Skipper & crew', 'Premium cabins', 'Daily breakfast & light lunch'],
    bestSeason: 'April - October',
    tags: ['mediterranean', 'sailing'],
  },
  {
    name: 'Iceland Northern Lights Quest',
    slug: 'iceland-northern-lights-quest',
    description:
      'Chase auroras in super jeeps, soak in geothermal lagoons, and hike glaciers with certified experts.',
    category: 'adventure',
    price: 118499,
    durationDays: 5,
    location: { city: 'Reykjavík', country: 'Iceland' },
    images: ['https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80'],
    highlights: ['Aurora hunting in super jeep', 'Blue Lagoon premium access', 'Glacier hike & ice cave tour'],
    includes: ['Airport transfers', 'Expert guides', 'Daily breakfast'],
    bestSeason: 'September - March',
    tags: ['aurora', 'ice adventures'],
  },
];

const seedDestinations = async () => {
  await connectDB();

  try {
    for (const destination of demoDestinations) {
      const existing = await Destination.findOne({ slug: destination.slug });
      if (existing) {
        console.log(`Skipped "${destination.name}" (already exists).`);
        continue;
      }

      await Destination.create({ ...destination, isActive: true });
      console.log(`Created "${destination.name}".`);
    }

    console.log('Demo destinations seeding complete.');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed demo data:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedDestinations();

