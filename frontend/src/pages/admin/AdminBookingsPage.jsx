import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AdminSidebar from '../../components/admin/AdminSidebar';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import api from '../../utils/api';
import { formatCurrency, formatDate } from '../../utils/format';

const statusOptions = ['pending', 'confirmed', 'cancelled', 'completed'];
const paymentStatusOptions = ['pending', 'paid', 'failed'];

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/bookings/admin/all');
      setBookings(data.bookings);
    } catch (error) {
      toast.error('Unable to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (bookingId, status) => {
    try {
      await api.patch(`/bookings/${bookingId}/status`, { status });
      toast.success('Booking status updated');
      fetchBookings();
    } catch (error) {
      toast.error('Unable to update booking status');
    }
  };

  const handlePaymentStatus = async (bookingId, paymentStatus) => {
    try {
      await api.patch(`/bookings/${bookingId}/status`, { paymentStatus });
      toast.success('Payment status updated');
      fetchBookings();
    } catch (error) {
      toast.error('Unable to update payment status');
    }
  };

  const handleSimulatePayment = async (bookingId) => {
    try {
      await api.post(`/bookings/${bookingId}/simulate-payment`);
      toast.success('Payment simulation completed');
      fetchBookings();
    } catch (error) {
      toast.error('Unable to simulate payment');
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex gap-8 lg:gap-12">
        <AdminSidebar />

        <div className="flex-1 space-y-8">
          <header>
            <span className="text-xs uppercase tracking-widest text-brand">Admin control</span>
            <h1 className="mt-2 font-display text-3xl font-semibold text-slate-900">Manage bookings</h1>
            <p className="mt-2 text-sm text-slate-600">
              Review and manage user bookings, update statuses, and confirm payments.
            </p>
          </header>

          {loading ? (
            <Loader message="Gathering booking records..." />
          ) : bookings.length === 0 ? (
            <EmptyState
              title="No bookings yet"
              description="Bookings created by travellers will appear here in real time."
            />
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking._id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-brand">{booking.bookingCode}</p>
                      <h2 className="text-xl font-semibold text-slate-900">{booking.destination?.name}</h2>
                      <p className="text-sm text-slate-500">
                        {formatDate(booking.startDate)} — {formatDate(booking.endDate)}
                      </p>
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        Traveller: {booking.user?.name} ({booking.user?.email})
                      </p>
                    </div>
                    <div className="text-right text-sm text-slate-600">
                      <p className="text-base font-semibold text-slate-900">{formatCurrency(booking.totalPrice)}</p>
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        Payment: {booking.payment?.status || 'pending'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <div>
                      <label className="text-xs uppercase tracking-wide text-slate-500">Booking status</label>
                      <select
                        value={booking.status}
                        onChange={(event) => handleStatusChange(booking._id, event.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-wide text-slate-500">Payment status</label>
                      <select
                        value={booking.payment?.status || 'pending'}
                        onChange={(event) => handlePaymentStatus(booking._id, event.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                      >
                        {paymentStatusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-end justify-end">
                      <button
                        type="button"
                        onClick={() => handleSimulatePayment(booking._id)}
                        className="w-full rounded-full bg-[#1f7aec] px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-[#1552a3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f7aec] disabled:cursor-not-allowed disabled:bg-[#1f7aec]/50"
                      >
                        Simulate payment
                      </button>
                    </div>
                  </div>

                  {booking.notes && (
                    <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                      <p className="text-xs uppercase tracking-widest text-slate-500">Traveller notes</p>
                      <p className="mt-1">{booking.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBookingsPage;

