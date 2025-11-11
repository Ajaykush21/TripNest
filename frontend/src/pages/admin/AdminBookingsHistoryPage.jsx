import { useEffect, useMemo, useState } from 'react';
import { AdjustmentsHorizontalIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import AdminSidebar from '../../components/admin/AdminSidebar';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import api from '../../utils/api';

const statusFilters = ['all', 'pending', 'confirmed', 'cancelled', 'completed'];

const AdminBookingsHistoryPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/bookings/admin/all');
        setBookings(data.bookings);
      } catch (error) {
        console.error('Unable to load bookings', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      if (status !== 'all' && booking.status !== status) return false;

      if (search) {
        const searchValue = search.toLowerCase();
        const matches =
          booking.bookingCode?.toLowerCase().includes(searchValue) ||
          booking.user?.name?.toLowerCase().includes(searchValue) ||
          booking.destination?.name?.toLowerCase().includes(searchValue);
        if (!matches) return false;
      }

      if (dateRange.from) {
        const createdAt = dayjs(booking.createdAt);
        if (createdAt.isBefore(dayjs(dateRange.from))) return false;
      }

      if (dateRange.to) {
        const createdAt = dayjs(booking.createdAt);
        if (createdAt.isAfter(dayjs(dateRange.to).endOf('day'))) return false;
      }

      return true;
    });
  }, [bookings, status, search, dateRange]);

  const exportCSV = () => {
    const headers = [
      'Booking Code',
      'Destination',
      'User',
      'Email',
      'Status',
      'Payment Status',
      'Total Price',
      'Start Date',
      'End Date',
      'Created At',
    ];

    const rows = filteredBookings.map((booking) => [
      booking.bookingCode,
      booking.destination?.name,
      booking.user?.name,
      booking.contactInfo?.email || booking.user?.email,
      booking.status,
      booking.payment?.status,
      booking.totalPrice,
      booking.startDate,
      booking.endDate,
      booking.createdAt,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell ?? ''}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `tripnest-bookings-${dayjs().format('YYYYMMDD-HHmmss')}.csv`);
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex gap-8 lg:gap-12">
        <AdminSidebar />
        <div className="flex-1 space-y-8">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand">Admin control</span>
              <h1 className="mt-2 font-display text-3xl font-semibold text-slate-900">Booking history</h1>
              <p className="mt-2 text-sm text-slate-600">
                Review every reservation, filter by status or date range, and export for reports.
              </p>
            </div>
            <button
              type="button"
              onClick={exportCSV}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
            >
              <ArrowDownTrayIcon className="h-4 w-4" />
              Export CSV
            </button>
          </header>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
            <div className="grid gap-4 md:grid-cols-[2fr,2fr,1fr,1fr]">
              <div className="md:col-span-2">
                <label className="text-xs uppercase tracking-wide text-slate-500">Search</label>
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Booking code, user, destination…"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-slate-500">Status</label>
                <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
                  <AdjustmentsHorizontalIcon className="h-4 w-4" />
                  <select
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                    className="w-full border-none bg-transparent text-sm text-slate-700 focus:outline-none"
                  >
                    {statusFilters.map((filter) => (
                      <option key={filter} value={filter}>
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-slate-500">Date range</label>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="date"
                    value={dateRange.from}
                    onChange={(event) => setDateRange((prev) => ({ ...prev, from: event.target.value }))}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                  />
                  <span className="text-xs text-slate-400">to</span>
                  <input
                    type="date"
                    value={dateRange.to}
                    onChange={(event) => setDateRange((prev) => ({ ...prev, to: event.target.value }))}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            {loading ? (
              <Loader message="Loading booking history..." />
            ) : filteredBookings.length === 0 ? (
              <EmptyState
                title="No bookings found"
                description="Adjust your filters or date range to see matching reservations."
              />
            ) : (
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-4 py-3 text-left">Booking</th>
                      <th className="px-4 py-3 text-left">Guest</th>
                      <th className="px-4 py-3 text-left">Trip</th>
                      <th className="px-4 py-3 text-left">Dates</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-left">Payment</th>
                      <th className="px-4 py-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                    {filteredBookings.map((booking) => (
                      <tr key={booking._id} className="hover:bg-slate-50">
                        <td className="px-4 py-3">
                          <p className="font-mono text-xs text-slate-500">{booking.bookingCode}</p>
                          <p className="text-xs text-slate-400">
                            Created {dayjs(booking.createdAt).format('DD MMM YYYY')}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-semibold text-slate-800">{booking.user?.name || 'Guest'}</p>
                          <p className="text-xs text-slate-500">{booking.contactInfo?.email || booking.user?.email}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-medium text-slate-800">{booking.destination?.name}</p>
                          <p className="text-xs text-slate-500">
                            {booking.destination?.location?.city}, {booking.destination?.location?.country}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <p>{dayjs(booking.startDate).format('DD MMM YY')}</p>
                          <p className="text-xs text-slate-400">{dayjs(booking.endDate).format('DD MMM YY')}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                              booking.status === 'confirmed'
                                ? 'bg-emerald-50 text-emerald-600'
                                : booking.status === 'cancelled'
                                  ? 'bg-rose-50 text-rose-600'
                                  : booking.status === 'completed'
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'bg-amber-50 text-amber-600'
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm capitalize text-slate-700">
                            {booking.payment?.status || 'pending'}
                          </p>
                          <p className="text-xs text-slate-400">{booking.payment?.method}</p>
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-slate-900">
                          ₹{Number(booking.totalPrice).toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminBookingsHistoryPage;

