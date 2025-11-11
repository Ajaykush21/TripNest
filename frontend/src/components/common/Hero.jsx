import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, GlobeAmericasIcon, SparklesIcon } from '@heroicons/react/24/outline';

const Hero = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const params = new URLSearchParams();
    if (destination.trim()) params.set('search', destination.trim());
    if (checkIn) params.set('startDate', checkIn);
    if (checkOut) params.set('endDate', checkOut);

    navigate({ pathname: '/destinations', search: params.toString() });
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1800&q=80"
          alt="Aurora skyline"
          className="h-full w-full object-cover opacity-30 mix-blend-soft-light"
          loading="lazy"
        />
      </div>
      <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-brand/40 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[32rem] w-[32rem] rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/75 to-slate-950/95" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 py-24 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:py-32">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm uppercase tracking-[0.35em] text-white/80">
            <SparklesIcon className="h-4 w-4" />
            curated global escapes
          </span>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Discover your next unforgettable journey with TripNest.
          </h1>
          <p className="mt-6 text-lg text-white/80 md:text-xl">
            Explore handpicked destinations, flexible itineraries, and seamless bookings designed for modern explorers
            craving more than a checklist.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/destinations"
              className="inline-flex items-center justify-center rounded-full bg-[#1f7aec] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-[#1552a3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f7aec]"
            >
              Explore destinations
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/30"
            >
              <GlobeAmericasIcon className="h-5 w-5" />
              Start planning
            </Link>
          </div>

          <dl className="mt-12 grid gap-6 text-left text-white/80 sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-widest text-white/60">Trusted travellers</dt>
              <dd className="mt-2 text-3xl font-semibold text-white">35k+</dd>
              <p className="text-xs text-white/60">experiences curated across 28 countries</p>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-white/60">Concierge support</dt>
              <dd className="mt-2 text-3xl font-semibold text-white">24/7</dd>
              <p className="text-xs text-white/60">local experts ready whenever you land</p>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-white/60">Sustainable partners</dt>
              <dd className="mt-2 text-3xl font-semibold text-white">180+</dd>
              <p className="text-xs text-white/60">handpicked stays &amp; hosts that give back</p>
            </div>
          </dl>
        </div>

        <div className="max-w-md rounded-3xl border border-white/10 bg-white/10 p-6 text-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.8)] backdrop-blur">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/80">
            Dream in colour
          </span>
          <div className="mt-3 flex items-center justify-between">
            <h3 className="text-2xl font-semibold tracking-tight">Craft your perfect escape</h3>
            <span className="rounded-full bg-[#1f7aec]/20 px-3 py-1 text-xs font-semibold text-[#dbe8ff]">Beta</span>
          </div>
          <p className="mt-2 text-sm text-white/70">
            Search ideas instantly or build a custom itinerary with our travel concierge.
          </p>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs uppercase tracking-widest text-white/70">Destination</label>
              <div className="mt-1 flex items-center gap-3 rounded-2xl border border-white/20 bg-white/5 px-3 py-2 shadow-inner backdrop-blur-sm">
                <MagnifyingGlassIcon className="h-5 w-5 text-white/70" />
                <input
                  type="text"
                  placeholder="Where would you like to go?"
                  value={destination}
                  onChange={(event) => setDestination(event.target.value)}
                  className="w-full border-none bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-0"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-white/70">Check in</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(event) => setCheckIn(event.target.value)}
                  className="mt-1 w-full rounded-2xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-white/70">Check out</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(event) => setCheckOut(event.target.value)}
                  className="mt-1 w-full rounded-2xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-2xl bg-[#1f7aec] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-[#1552a3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f7aec]"
            >
              Search trips
            </button>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/70">
              <p className="font-semibold uppercase tracking-wide text-white/60">Trending this week</p>
              <ul className="mt-2 space-y-1">
                <li className="flex items-center justify-between">
                  <button
                    type="button"
                    className="text-left text-white transition hover:text-brand"
                    onClick={() => setDestination('Tokyo')}
                  >
                    Tokyo night bites
                  </button>
                  <span className="text-white/40">4 seats left</span>
                </li>
                <li className="flex items-center justify-between">
                  <button
                    type="button"
                    className="text-left text-white transition hover:text-brand"
                    onClick={() => setDestination('Swiss Alps')}
                  >
                    Swiss glacier rail
                  </button>
                  <span className="text-white/40">New</span>
                </li>
              </ul>
              <p className="mt-3 text-[11px] text-white/50">
                Prefer a curated plan?{' '}
                <Link to="/destinations" className="font-semibold text-white hover:text-brand-light">
                  Explore inspirations ↗
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;

