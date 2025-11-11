import { useEffect, useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import DashboardStats from '../../components/admin/DashboardStats';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import api from '../../utils/api';
import { formatCurrency, formatDate } from '../../utils/format';

const AdminDashboardPage = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/admin/summary');
        setSummary(data);
      } catch (error) {
        console.error('Unable to load admin summary', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex gap-8 lg:gap-12">
        <AdminSidebar />

        <div className="flex-1 space-y-8">
          <header>
            <span className="text-xs uppercase tracking-widest text-brand">Admin control</span>
            <h1 className="mt-2 font-display text-3xl font-semibold text-slate-900">Dashboard overview</h1>
            <p className="mt-2 text-sm text-slate-600">
              Monitor key metrics, recent bookings, and top destinations in real time.
            </p>
          </header>

          {loading ? (
            <Loader message="Aggregating dashboard insights..." />
          ) : !summary ? (
            <EmptyState
              title="No data available"
              description="We couldn’t retrieve the latest stats. Please try again later."
            />
          ) : (
            <>
              <DashboardStats summary={summary} />

              <section className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
                  <h2 className="text-lg font-semibold text-slate-900">Recent bookings</h2>
                  <p className="text-xs uppercase tracking-wide text-slate-500">Last five confirmed bookings</p>
                  <div className="mt-4 space-y-4">
                    {summary.recentBookings.length === 0 ? (
                      <EmptyState
                        title="No bookings yet"
                        description="New reservations will appear here as soon as travellers confirm."
                      />
                    ) : (
                      summary.recentBookings.map((booking) => (
                        <div key={booking._id} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-semibold text-slate-900">{booking.destination?.name}</p>
                              <p className="text-xs uppercase tracking-wide text-slate-500">
                                {formatDate(booking.createdAt)} · {booking.bookingCode}
                              </p>
                            </div>
                            <p className="text-sm font-semibold text-slate-700">{formatCurrency(booking.totalPrice)}</p>
                          </div>
                          <p className="mt-2 text-xs text-slate-500">
                            Traveller: {booking.user?.name} ({booking.user?.email})
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
                  <h2 className="text-lg font-semibold text-slate-900">Top-rated destinations</h2>
                  <p className="text-xs uppercase tracking-wide text-slate-500">Based on traveller reviews</p>
                  <div className="mt-4 space-y-4">
                    {summary.topDestinations.length === 0 ? (
                      <EmptyState
                        title="No destinations yet"
                        description="Add destinations to start tracking their performance."
                      />
                    ) : (
                      summary.topDestinations.map((destination) => (
                        <div key={destination._id} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{destination.name}</p>
                            <p className="text-xs uppercase tracking-wide text-slate-500">
                              Rating {destination.ratingAverage?.toFixed(1) || 'New'} · {destination.ratingCount} reviews
                            </p>
                          </div>
                          <span className="text-sm font-semibold text-slate-700">{formatCurrency(destination.price)}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

