import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AdminSidebar from '../../components/admin/AdminSidebar';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import DestinationCard from '../../components/destinations/DestinationCard';
import api from '../../utils/api';

const initialFormState = {
  name: '',
  description: '',
  price: '',
  durationDays: '',
  category: 'adventure',
  city: '',
  country: '',
  images: '',
  highlights: '',
};

const AdminDestinationsPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formState, setFormState] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/destinations?limit=50&sort=-createdAt');
      setDestinations(data.destinations);
    } catch (error) {
      toast.error('Unable to load destinations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        name: formState.name,
        description: formState.description,
        price: Number(formState.price),
        durationDays: Number(formState.durationDays),
        category: formState.category,
        location: {
          city: formState.city,
          country: formState.country,
        },
        images: formState.images ? formState.images.split(',').map((item) => item.trim()) : [],
        highlights: formState.highlights ? formState.highlights.split('\n').map((item) => item.trim()) : [],
      };

      await api.post('/destinations', payload);
      toast.success('Destination created successfully');
      setFormState(initialFormState);
      fetchDestinations();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to create destination');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (destinationId) => {
    try {
      await api.patch(`/destinations/${destinationId}/toggle`);
      toast.success('Destination status updated');
      fetchDestinations();
    } catch (error) {
      toast.error('Unable to update destination');
    }
  };

  const handleDelete = async (destinationId) => {
    if (!window.confirm('Are you sure you want to delete this destination?')) return;
    try {
      await api.delete(`/destinations/${destinationId}`);
      toast.success('Destination deleted');
      fetchDestinations();
    } catch (error) {
      toast.error('Unable to delete destination');
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex gap-8 lg:gap-12">
        <AdminSidebar />

        <div className="flex-1 space-y-8">
          <header>
            <span className="text-xs uppercase tracking-widest text-brand">Admin control</span>
            <h1 className="mt-2 font-display text-3xl font-semibold text-slate-900">Manage destinations</h1>
            <p className="mt-2 text-sm text-slate-600">
              Create, update, or deactivate destinations available to TripNest travellers.
            </p>
          </header>

          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
            <h2 className="text-lg font-semibold text-slate-900">Add a new destination</h2>
            <form onSubmit={handleSubmit} className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="text-xs uppercase tracking-wide text-slate-500">Name</label>
                <input
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs uppercase tracking-wide text-slate-500">Description</label>
                <textarea
                  name="description"
                  value={formState.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wide text-slate-500">Price (INR)</label>
                <input
                  type="number"
                  name="price"
                  value={formState.price}
                  onChange={handleChange}
                  required
                  min="0"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wide text-slate-500">Duration (days)</label>
                <input
                  type="number"
                  name="durationDays"
                  value={formState.durationDays}
                  onChange={handleChange}
                  required
                  min="1"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wide text-slate-500">Category</label>
                <select
                  name="category"
                  value={formState.category}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                >
                  {['adventure', 'relaxation', 'cultural', 'romantic', 'family', 'business', 'nature', 'cruise'].map(
                    (category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wide text-slate-500">City</label>
                <input
                  name="city"
                  value={formState.city}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wide text-slate-500">Country</label>
                <input
                  name="country"
                  value={formState.country}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs uppercase tracking-wide text-slate-500">Images (comma separated URLs)</label>
                <input
                  name="images"
                  value={formState.images}
                  onChange={handleChange}
                  placeholder="https://image-one.jpg, https://image-two.jpg"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs uppercase tracking-wide text-slate-500">Highlights (one per line)</label>
                <textarea
                  name="highlights"
                  value={formState.highlights}
                  onChange={handleChange}
                  rows={3}
                  placeholder="• Sunrise trek to Mount Batur
• Private island-hopping experience"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>

              <div className="md:col-span-2 flex items-center justify-between">
                <p className="text-xs text-slate-500">Provide at least one image URL for best results.</p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full bg-[#1f7aec] px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-[#1552a3] disabled:cursor-not-allowed disabled:bg-[#1f7aec]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f7aec]"
                >
                  {submitting ? 'Saving...' : 'Create destination'}
                </button>
              </div>
            </form>
          </section>

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Latest destinations</h2>
              <p className="text-sm text-slate-500">
                Total entries: <span className="font-semibold text-slate-900">{destinations.length}</span>
              </p>
            </div>

            {loading ? (
              <Loader message="Fetching destinations..." />
            ) : destinations.length === 0 ? (
              <EmptyState
                title="No destinations yet"
                description="Add your first destination to start inspiring TripNest travellers."
              />
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {destinations.map((destination) => (
                  <div key={destination._id} className="space-y-3">
                    <DestinationCard destination={destination} />
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(destination._id)}
                        className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
                      >
                        {destination.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(destination._id)}
                        className="flex-1 rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-500 transition hover:bg-rose-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminDestinationsPage;

