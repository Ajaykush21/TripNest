import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  MapPinIcon,
  ClockIcon,
  CurrencyRupeeIcon,
  RocketLaunchIcon,
  SparklesIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import BookingForm from '../components/booking/BookingForm';
import ReviewSection from '../components/reviews/ReviewSection';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import api from '../utils/api';
import { formatCurrency } from '../utils/format';

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="rounded-full bg-brand/10 p-2 text-brand">
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="text-sm font-semibold text-slate-900">{value}</p>
    </div>
  </div>
);

const DestinationDetailsPage = () => {
  const { slug } = useParams();
  const location = useLocation();
  const fallbackDestination = useMemo(
    () => (location.state && 'destination' in location.state ? location.state.destination : null),
    [location.state]
  );
  const [destination, setDestination] = useState(fallbackDestination);
  const [loading, setLoading] = useState(!fallbackDestination);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDestination = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const { data } = await api.get(`/destinations/${slug}`);
        setDestination(data.destination);
        setError('');
      } catch (err) {
        if (fallbackDestination) {
          setDestination(fallbackDestination);
          setError('');
        } else {
          setError(err.response?.data?.message || 'Destination not found');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [slug, fallbackDestination]);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <Loader message="Curating this travel story..." />
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          title="Destination not found"
          description="This experience might have moved or is temporarily unavailable. Explore other curated journeys."
        />
      </div>
    );
  }

  return (
    <div className="bg-surface pb-16">
      <div className="relative h-72 w-full overflow-hidden md:h-96">
        <img
          src={destination.images?.[0] || `https://source.unsplash.com/random/1280x720/?travel,${destination.name}`}
          alt={destination.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-10 text-white sm:px-6 lg:px-8">
          <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-widest">
            {destination.category}
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold">{destination.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-200">
            <span className="inline-flex items-center gap-2">
              <MapPinIcon className="h-5 w-5" />
              {destination.location?.city}, {destination.location?.country}
            </span>
            <span className="inline-flex items-center gap-2">
              <ClockIcon className="h-5 w-5" />
              {destination.durationDays} days
            </span>
            <span className="inline-flex items-center gap-2">
              <CurrencyRupeeIcon className="h-5 w-5" />
              {formatCurrency(destination.price)}
            </span>
            <span className="inline-flex items-center gap-2">
              <SparklesIcon className="h-5 w-5" />
              {destination.ratingAverage?.toFixed(1) || 'New'} ({destination.ratingCount} reviews)
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <article className="space-y-8">
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
              <h2 className="text-2xl font-semibold text-slate-900">About this experience</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{destination.description}</p>

              {destination.highlights?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-slate-900">Highlights</h3>
                  <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                    {destination.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2 text-sm text-slate-600">
                        <SparklesIcon className="mt-0.5 h-5 w-5 text-brand" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            <section className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-card md:grid-cols-2">
              <InfoRow
                icon={RocketLaunchIcon}
                label="Ideal for"
                value={destination.tags?.join(', ') || 'Adventure seekers'}
              />
              <InfoRow icon={ShieldCheckIcon} label="Best season" value={destination.bestSeason || 'All year round'} />
              <InfoRow icon={ClockIcon} label="Duration" value={`${destination.durationDays} days`} />
              <InfoRow icon={CurrencyRupeeIcon} label="Starting at" value={formatCurrency(destination.price)} />
            </section>

            {(destination.includes?.length > 0 || destination.excludes?.length > 0) && (
              <section className="grid gap-6 md:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
                  <h3 className="text-lg font-semibold text-slate-900">What&apos;s included</h3>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    {destination.includes?.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                        {item}
                      </li>
                    )) || <li>Curated experiences, premium stays, local guides.</li>}
                  </ul>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
                  <h3 className="text-lg font-semibold text-slate-900">What to plan for</h3>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    {destination.excludes?.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-rose-400" />
                        {item}
                      </li>
                    )) || <li>Flights, travel insurance, personal expenses.</li>}
                  </ul>
                </div>
              </section>
            )}

            <ReviewSection destinationId={destination._id} />
          </article>

          <BookingForm destination={destination} />
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailsPage;

