import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/common/Hero';
import DestinationCard from '../components/destinations/DestinationCard';
import Testimonials from '../components/common/Testimonials';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import api from '../utils/api';

const FALLBACK_FEATURED = [
  {
    _id: 'fallback-1',
    name: 'Bali Serenity Escape',
    slug: 'bali-serenity-escape',
    description:
      'Unwind in luxury villas, explore rice terraces at sunrise, and savour Balinese cuisine with a private chef experience.',
    category: 'relaxation',
    price: 87999,
    durationDays: 6,
    ratingAverage: 4.9,
    ratingCount: 126,
    featured: true,
    images: ['https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'],
    location: { city: 'Ubud', country: 'Indonesia' },
  },
  {
    _id: 'fallback-2',
    name: 'Swiss Alps Adventure Rail',
    slug: 'swiss-alps-adventure-rail',
    description:
      'Ride the scenic Glacier Express, trek alpine trails with local guides, and indulge in artisan chocolate tastings.',
    category: 'adventure',
    price: 124999,
    durationDays: 8,
    ratingAverage: 4.8,
    ratingCount: 98,
    featured: true,
    images: ['https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80'],
    location: { city: 'Zermatt', country: 'Switzerland' },
  },
  {
    _id: 'fallback-3',
    name: 'Tokyo After Dark',
    slug: 'tokyo-after-dark',
    description:
      'Dive into the neon nightlife of Shinjuku, savour omakase dining, and master sushi rolling with Tokyo chefs.',
    category: 'cultural',
    price: 105000,
    durationDays: 5,
    ratingAverage: 4.7,
    ratingCount: 142,
    featured: true,
    images: ['https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80'],
    location: { city: 'Tokyo', country: 'Japan' },
  },
];

const FALLBACK_TRENDING = [
  {
    _id: 'fallback-trend-1',
    name: 'South African Safari Luxe',
    slug: 'south-african-safari-luxe',
    description:
      'Witness the Big Five on sunrise game drives, dine under the stars, and unwind in infinity pools overlooking the savannah.',
    category: 'nature',
    price: 139999,
    durationDays: 7,
    ratingAverage: 4.9,
    ratingCount: 212,
    images: ['https://images.unsplash.com/photo-1526481280695-3c46917f5c64?auto=format&fit=crop&w=1600&q=80&sat=-20'],
    location: { city: 'Kruger', country: 'South Africa' },
  },
  {
    _id: 'fallback-trend-2',
    name: 'Amalfi Coast Slow Cruise',
    slug: 'amalfi-coast-slow-cruise',
    description:
      'Sail pastel villages, indulge in vineyard picnics, and learn pasta-making from Italian nonnas in Positano.',
    category: 'romantic',
    price: 94999,
    durationDays: 6,
    ratingAverage: 4.8,
    ratingCount: 167,
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'],
    location: { city: 'Positano', country: 'Italy' },
  },
  {
    _id: 'fallback-trend-3',
    name: 'Iceland Northern Lights Quest',
    slug: 'iceland-northern-lights-quest',
    description:
      'Chase auroras in super jeeps, soak in geothermal lagoons, and hike glaciers with certified experts.',
    category: 'adventure',
    price: 118499,
    durationDays: 5,
    ratingAverage: 4.9,
    ratingCount: 189,
    images: ['https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'],
    location: { city: 'Reykjavík', country: 'Iceland' },
  },
];

const curatedCollections = [
  {
    title: 'Wellness Retreats',
    description: 'Mindful escapes with sound baths, plant-forward cuisine, and personalised healing therapies.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Design Hotels',
    description: 'Architectural icons and boutique stays curated for aesthetes and creatives.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'City Weekenders',
    description: '48-hour itineraries in trending cities with rooftop cocktails and underground galleries.',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1000&q=80',
  },
];

const HomePage = () => {
  const [featured, setFeatured] = useState(FALLBACK_FEATURED);
  const [trending, setTrending] = useState(FALLBACK_TRENDING);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);
      try {
        const [featuredResponse, trendingResponse] = await Promise.all([
          api.get('/destinations/featured?limit=3'),
          api.get('/destinations?limit=6&sort=-ratingAverage'),
        ]);

        if (featuredResponse.data.destinations?.length) {
          setFeatured(featuredResponse.data.destinations);
        }
        if (trendingResponse.data.destinations?.length) {
          setTrending(trendingResponse.data.destinations);
        }
        setError('');
      } catch (error) {
        console.error('Failed to load destinations', error);
        setError('Live destinations are temporarily unavailable. Explore our curated inspirations meanwhile.');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <>
      <Hero />

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand">Highlights</span>
              <h2 className="mt-2 font-display text-3xl font-semibold text-slate-900">Featured escapes</h2>
              <p className="mt-2 max-w-xl text-sm text-slate-600">
                Handpicked destinations curated by our travel experts with premium accommodations and immersive
                experiences.
              </p>
            </div>
            <Link to="/destinations" className="text-sm font-semibold text-brand hover:text-brand-dark">
              View all destinations →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <div className="md:col-span-2 lg:col-span-3">
                <Loader message="Discovering featured journeys..." />
              </div>
            ) : featured.length === 0 ? (
              <div className="md:col-span-2 lg:col-span-3">
                <EmptyState
                  title="No featured destinations yet"
                  description="Check back soon for curated experiences handpicked for you."
                />
              </div>
            ) : (
              featured.map((destination) => <DestinationCard key={destination._id} destination={destination} />)
            )}
          </div>
          {error && (
            <p className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 shadow-sm">
              {error}
            </p>
          )}
        </div>
      </section>

  <section className="bg-white py-16">
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:py-6">
      <div className="relative h-64 w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card sm:h-72 lg:h-80">
        <img
          src="https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1600&q=80"
          alt="TripNest Showcase"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/70 via-transparent to-transparent" />
        <div className="absolute bottom-5 left-5 space-y-2 text-white">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs uppercase tracking-[0.3em]">
            Elevated travel
          </span>
          <h3 className="text-2xl font-semibold">TripNest Studio Experiences</h3>
          <p className="max-w-sm text-sm text-white/80">
            Exclusive residencies, chef tables, and off-menu adventures crafted with our global host collective.
          </p>
        </div>
      </div>
      <div className="space-y-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-brand">
          studio curations
        </span>
        <h2 className="font-display text-3xl font-semibold text-slate-900">
          Ready-to-book journeys with TripNest hosts
        </h2>
        <p className="text-sm text-slate-600">
          Browse a revolving calendar of creative retreats, wellness residences, and local collaborations designed in
          partnership with world-class explorers. Every experience is limited release, zero-hassle, and hosted by our trusted insiders.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-brand">Featured drop</p>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">Listo México City Residency</h3>
            <p className="mt-2 text-sm text-slate-600">
              Four nights of design-forward stays, mezcal tastings, and studio visits with local artisans.
            </p>
            <p className="mt-3 text-xs uppercase tracking-wide text-slate-400">Next release: Jan 2026</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-brand">Signature journey</p>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">Nordic Aurora Journaling Retreat</h3>
            <p className="mt-2 text-sm text-slate-600">
              Small-batch retreat with a naturalist guide, sauna rituals, and creative night photography workshops.
            </p>
            <p className="mt-3 text-xs uppercase tracking-wide text-slate-400">Limited seats: 12 explorers</p>
          </div>
        </div>
        <Link
          to="/destinations"
          className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
        >
          Explore studio itineraries →
        </Link>
      </div>
    </div>
  </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand">Trending now</span>
              <h2 className="mt-2 font-display text-3xl font-semibold text-slate-900">Popular travel experiences</h2>
              <p className="mt-2 max-w-xl text-sm text-slate-600">
                Explore trending trips loved by the TripNest community this season.
              </p>
            </div>
            <Link to="/destinations?sort=-ratingAverage" className="text-sm font-semibold text-brand hover:text-brand-dark">
              Explore top-rated →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <div className="md:col-span-2 lg:col-span-3">
                <Loader message="Fetching trending experiences..." />
              </div>
            ) : trending.length === 0 ? (
              <div className="md:col-span-2 lg:col-span-3">
                <EmptyState
                  title="No trending trips yet"
                  description="Be the first to explore and share your experience."
                />
              </div>
            ) : (
              trending.map((destination) => <DestinationCard key={destination._id} destination={destination} />)
            )}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white via-surface to-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand">Curated collections</span>
              <h2 className="mt-2 font-display text-3xl font-semibold text-slate-900">
                Mood boards for your next getaway
              </h2>
              <p className="mt-2 max-w-xl text-sm text-slate-600">
                Browse editorial picks with immersive imagery to help you visualise the perfect escape.
              </p>
            </div>
            <Link to="/destinations?category=relaxation" className="text-sm font-semibold text-brand hover:text-brand-dark">
              See all inspirations →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {curatedCollections.map((collection) => (
              <article
                key={collection.title}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand">
                    Editor’s pick
                  </span>
                </div>
                <div className="space-y-3 p-6">
                  <h3 className="text-xl font-semibold text-slate-900">{collection.title}</h3>
                  <p className="text-sm text-slate-600">{collection.description}</p>
                  <Link
                    to="/destinations"
                    className="inline-flex items-center text-sm font-semibold text-brand transition hover:text-brand-dark"
                  >
                    Explore itineraries →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  );
};

export default HomePage;

