import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BookingCard from '../components/booking/BookingCard';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import api from '../utils/api';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const highlightedBookingId = location.state?.highlight;

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/bookings');
        setBookings(data.bookings);
      } catch (error) {
        console.error('Unable to load bookings', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <span className="text-xs uppercase tracking-widest text-brand">Your trips</span>
        <h1 className="mt-2 font-display text-3xl font-semibold text-slate-900">Booking history</h1>
        <p className="mt-2 text-sm text-slate-600">
          Track confirmations, status, and details for every journey you&apos;ve planned with TripNest.
        </p>
      </div>

      {loading ? (
        <Loader message="Loading your travel memories..." />
      ) : bookings.length === 0 ? (
        <EmptyState
          title="No bookings yet"
          description="When you book a destination, the details will appear here for easy access."
        />
      ) : (
        <div className="space-y-5">
          {bookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking} highlighted={highlightedBookingId === booking._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsPage;

