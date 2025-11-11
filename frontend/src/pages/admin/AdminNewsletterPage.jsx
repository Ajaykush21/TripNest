import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import AdminSidebar from '../../components/admin/AdminSidebar';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import api from '../../utils/api';

const AdminNewsletterPage = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [filters, setFilters] = useState({ search: '' });
  const [formState, setFormState] = useState({
    title: '',
    message: '',
    scheduledFor: '',
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [{ data: subscriberData }, { data: notificationData }] = await Promise.all([
        api.get('/newsletter/subscribers'),
        api.get('/newsletter/notifications'),
      ]);
      setSubscribers(subscriberData.subscribers);
      setNotifications(notificationData.notifications);
    } catch (error) {
      toast.error('Unable to load newsletter data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredSubscribers = useMemo(() => {
    if (!filters.search) return subscribers;
    const searchTerm = filters.search.toLowerCase();
    return subscribers.filter((subscriber) => subscriber.email.toLowerCase().includes(searchTerm));
  }, [subscribers, filters.search]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await api.post('/newsletter/notifications', formState);
      toast.success('Notification scheduled');
      setFormState({ title: '', message: '', scheduledFor: '' });
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to schedule notification');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex gap-8 lg:gap-12">
        <AdminSidebar />
        <div className="flex-1 space-y-8">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand">Admin control</span>
              <h1 className="mt-2 font-display text-3xl font-semibold text-slate-900">Newsletter hub</h1>
              <p className="mt-2 text-sm text-slate-600">
                View subscribers, schedule studio updates, and keep travellers inspired.
              </p>
            </div>
          </header>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
            <h2 className="text-lg font-semibold text-slate-900">Schedule a notification</h2>
            <p className="text-sm text-slate-500">
              Create a broadcast note and choose when it should reach your subscribers.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="text-xs uppercase tracking-wide text-slate-500">Title</label>
                <input
                  name="title"
                  value={formState.title}
                  onChange={(event) => setFormState((prev) => ({ ...prev, title: event.target.value }))}
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs uppercase tracking-wide text-slate-500">Message</label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={(event) => setFormState((prev) => ({ ...prev, message: event.target.value }))}
                  rows={4}
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-slate-500">Schedule for</label>
                <input
                  type="datetime-local"
                  value={formState.scheduledFor}
                  onChange={(event) => setFormState((prev) => ({ ...prev, scheduledFor: event.target.value }))}
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
              <div className="flex items-end justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-[#1f7aec] px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-[#1552a3] disabled:cursor-not-allowed disabled:bg-[#1f7aec]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f7aec]"
                >
                  {saving ? 'Scheduling…' : 'Schedule notification'}
                </button>
              </div>
            </form>
          </section>

          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Subscribers</h2>
                  <p className="text-sm text-slate-500">Total {subscribers.length} explorers opted in.</p>
                </div>
                <input
                  type="search"
                  placeholder="Search email…"
                  value={filters.search}
                  onChange={(event) => setFilters((prev) => ({ ...prev, search: event.target.value }))}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 sm:w-64"
                />
              </div>

              {loading ? (
                <Loader message="Loading subscribers..." />
              ) : filteredSubscribers.length === 0 ? (
                <EmptyState title="No subscribers yet" description="Promote your newsletter to grow your community." />
              ) : (
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 text-sm text-slate-700">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                      <tr>
                        <th className="px-4 py-3 text-left">Email</th>
                        <th className="px-4 py-3 text-left">Source</th>
                        <th className="px-4 py-3 text-right">Joined</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredSubscribers.map((subscriber) => (
                        <tr key={subscriber._id}>
                          <td className="px-4 py-3 font-mono text-xs text-slate-600">{subscriber.email}</td>
                          <td className="px-4 py-3 capitalize">{subscriber.source}</td>
                          <td className="px-4 py-3 text-right text-slate-500">
                            {dayjs(subscriber.createdAt).format('DD MMM YYYY')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
              <h2 className="text-lg font-semibold text-slate-900">Scheduled notifications</h2>
              {notifications.length === 0 ? (
                <EmptyState
                  title="No scheduled messages"
                  description="Plan your first broadcast to stay top-of-mind with explorers."
                />
              ) : (
                <ul className="mt-4 space-y-3">
                  {notifications.map((notification) => (
                    <li
                      key={notification._id}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-slate-900">{notification.title}</p>
                        <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                          {notification.status}
                        </span>
                      </div>
                      <p className="mt-1 text-slate-600">{notification.message}</p>
                      <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">
                        Scheduled for {dayjs(notification.scheduledFor).format('DD MMM YYYY, HH:mm')}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminNewsletterPage;

