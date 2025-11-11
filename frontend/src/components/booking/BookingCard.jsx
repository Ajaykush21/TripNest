import { Link } from 'react-router-dom';
import { formatCurrency, formatDate } from '../../utils/format';

const statusStyles = {
  pending: 'bg-amber-50 text-amber-600 border-amber-200',
  confirmed: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  cancelled: 'bg-rose-50 text-rose-600 border-rose-200',
  completed: 'bg-blue-50 text-blue-600 border-blue-200',
};

const BookingCard = ({ booking, highlighted }) => (
  <article
    className={`rounded-3xl border bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-xl ${
      highlighted ? 'border-brand ring-2 ring-brand/40' : 'border-slate-200'
    }`}
  >
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-widest text-slate-500">Booking ID</p>
        <p className="font-mono text-sm text-slate-900">{booking.bookingCode}</p>
        <h3 className="mt-2 text-xl font-semibold text-slate-900">{booking.destination?.name}</h3>
        <p className="text-sm text-slate-500">
          {booking.destination?.location?.city}, {booking.destination?.location?.country}
        </p>
      </div>

      <div className="flex flex-col items-start gap-2 text-sm text-slate-600 md:items-end">
        <span
          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
            statusStyles[booking.status] || statusStyles.pending
          }`}
        >
          {booking.status}
        </span>
        <div>
          <p>
            {formatDate(booking.startDate)} &mdash; {formatDate(booking.endDate)}
          </p>
          <p className="text-xs uppercase tracking-widest text-slate-400">
            {booking.guests?.adults} adults &bull; {booking.guests?.children} children
          </p>
        </div>
        <p className="text-base font-semibold text-slate-900">{formatCurrency(booking.totalPrice)}</p>
        <p className="text-xs uppercase tracking-wide text-slate-400">
          Payment: {booking.payment?.status || 'pending'}
        </p>
      </div>
    </div>

    {booking.notes && (
      <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
        <p className="text-xs uppercase tracking-widest text-slate-500">Notes</p>
        <p className="mt-1">{booking.notes}</p>
      </div>
    )}
    {booking.destination && booking.destination.slug && (
      <div className="mt-4 flex justify-end">
        <Link
          to={`/destinations/${booking.destination.slug}`}
          className="inline-flex items-center rounded-full bg-[#1f7aec] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow transition hover:bg-[#1552a3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f7aec]"
        >
          View experience
        </Link>
      </div>
    )}
  </article>
);

export default BookingCard;

