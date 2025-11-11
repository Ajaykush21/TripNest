import { Link } from 'react-router-dom';
import { MapPinIcon, ClockIcon, CurrencyRupeeIcon, StarIcon } from '@heroicons/react/24/outline';
import { formatCurrency, ratingLabel } from '../../utils/format';

const DestinationCard = ({ destination }) => (
  <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-xl">
    <div className="relative h-56 overflow-hidden">
      <img
        src={destination.images?.[0] || `https://source.unsplash.com/random/800x600/?travel,${destination.name}`}
        alt={destination.name}
        className="h-full w-full object-cover transition duration-700 hover:scale-105"
        loading="lazy"
      />
      {destination.featured && (
        <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand">
          Featured
        </span>
      )}
    </div>

    <div className="flex flex-1 flex-col gap-4 p-6">
      <div>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand">
            {destination.category}
          </span>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <StarIcon className="h-4 w-4 text-amber-400" />
            <span>{destination.ratingAverage?.toFixed(1) || 'New'}</span>
            <span className="text-xs text-slate-400">{ratingLabel(destination.ratingAverage || 0)}</span>
          </div>
        </div>
        <h3 className="mt-4 text-xl font-semibold text-slate-900">{destination.name}</h3>
        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
          <MapPinIcon className="h-5 w-5" />
          <span>
            {destination.location?.city}, {destination.location?.country}
          </span>
        </div>
      </div>

      <p className="line-clamp-3 text-sm text-slate-500">{destination.description}</p>

      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="space-y-2 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <CurrencyRupeeIcon className="h-5 w-5 text-brand" />
            <span className="font-semibold text-slate-900">{formatCurrency(destination.price)}</span>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="h-5 w-5 text-slate-400" />
            <span>{destination.durationDays} days</span>
          </div>
        </div>
        <Link
          to={`/destinations/${destination.slug}`}
          state={{ destination }}
          className="rounded-full bg-[#1f7aec] px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-[#1552a3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f7aec]"
        >
          View details
        </Link>
      </div>
    </div>
  </article>
);

export default DestinationCard;

