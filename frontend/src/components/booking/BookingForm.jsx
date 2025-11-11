import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/format';

const isValidObjectId = (value) => typeof value === 'string' && /^[0-9a-fA-F]{24}$/.test(value);

const defaultState = {
  startDate: '',
  endDate: '',
  adults: 2,
  children: 0,
  email: '',
  phone: '',
  notes: '',
  paymentMethod: 'card',
};

const BookingForm = ({ destination }) => {
  const { isAuthenticated } = useAuth();
  const [formState, setFormState] = useState(defaultState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const bookingDisabled =
    !destination?._id || !isValidObjectId(String(destination._id)) || !destination?.price;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (bookingDisabled) {
      toast.error('Bookings will open once this trip is published.');
      return;
    }

    if (!isAuthenticated) {
      toast.error('Please sign in to complete your booking.');
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        destinationId: destination._id,
        startDate: formState.startDate,
        endDate: formState.endDate,
        guests: {
          adults: Number(formState.adults),
          children: Number(formState.children),
        },
        contactInfo: {
          email: formState.email,
          phone: formState.phone,
        },
        totalPrice: destination.price,
        paymentMethod: formState.paymentMethod,
        notes: formState.notes,
      };

      const { data } = await api.post('/bookings', payload);
      toast.success('Booking request submitted! Our team will confirm shortly.');
      setFormState(defaultState);
      navigate('/bookings', { state: { highlight: data.booking._id } });
    } catch (error) {
      const message = error.response?.data?.message || 'Unable to create booking. Try again later.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
      <div>
        <p className="text-xs uppercase tracking-widest text-brand">Plan your stay</p>
        <h3 className="mt-2 text-2xl font-semibold text-slate-900">Book this experience</h3>
        <p className="mt-1 text-sm text-slate-500">Secure your spot with flexible cancellation and support.</p>
      </div>

      <div className="mt-6 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
        <p>
          <span className="text-2xl font-bold text-slate-900">{formatCurrency(destination.price)}</span>
          <span className="text-xs uppercase tracking-wide text-slate-500"> / person</span>
        </p>
        <p>Includes curated experiences, premium stays, and local guides.</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs uppercase tracking-wide text-slate-500">Check-in</label>
            <input
              type="date"
              name="startDate"
              value={formState.startDate}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide text-slate-500">Check-out</label>
            <input
              type="date"
              name="endDate"
              value={formState.endDate}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs uppercase tracking-wide text-slate-500">Adults</label>
            <input
              type="number"
              min="1"
              name="adults"
              value={formState.adults}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide text-slate-500">Children</label>
            <input
              type="number"
              min="0"
              name="children"
              value={formState.children}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-slate-500">Email</label>
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-slate-500">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formState.phone}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-slate-500">Payment method</label>
          <select
            name="paymentMethod"
            value={formState.paymentMethod}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          >
            <option value="card">Card (Visa / Mastercard)</option>
            <option value="upi">UPI</option>
            <option value="cash">Pay on arrival</option>
          </select>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-slate-500">Notes or requests</label>
          <textarea
            name="notes"
            value={formState.notes}
            onChange={handleChange}
            rows={4}
            placeholder="Share dietary preferences or special requests"
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || bookingDisabled}
          className="w-full rounded-xl bg-[#1f7aec] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow transition hover:bg-[#1552a3] disabled:cursor-not-allowed disabled:bg-[#1f7aec]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f7aec]"
        >
          {bookingDisabled ? 'Bookings opening soon' : isSubmitting ? 'Processing...' : 'Confirm booking'}
        </button>
        {bookingDisabled && (
          <p className="text-xs font-medium text-amber-600">
            This preview itinerary isn&apos;t ready for reservations yet. Explore our live destinations to book today.
          </p>
        )}
      </form>
    </aside>
  );
};

export default BookingForm;

