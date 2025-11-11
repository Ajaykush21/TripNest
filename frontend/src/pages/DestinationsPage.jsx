import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DestinationCard from '../components/destinations/DestinationCard';
import DestinationFilters from '../components/destinations/DestinationFilters';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import api from '../utils/api';

const DestinationsPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  const filters = useMemo(
    () => ({
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      minRating: searchParams.get('minRating') || '',
      maxDuration: searchParams.get('maxDuration') || '',
      page: Number(searchParams.get('page') || 1),
    }),
    [searchParams]
  );

  const fetchDestinations = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      params.set('limit', 9);

      const { data } = await api.get(`/destinations?${params.toString()}`);
      setDestinations(data.destinations);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Unable to fetch destinations', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  const handleFilterChange = (updatedFilters) => {
    const updatedSearchParams = new URLSearchParams();
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value) updatedSearchParams.set(key, value);
    });
    if (!updatedFilters.page) {
      updatedSearchParams.set('page', '1');
    }
    setSearchParams(updatedSearchParams);
  };

  const handlePageChange = (newPage) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set('page', newPage);
    setSearchParams(updatedSearchParams);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="text-xs uppercase tracking-widest text-brand">Find your escape</span>
          <h1 className="mt-2 font-display text-3xl font-semibold text-slate-900">Destinations &amp; curated stays</h1>
          <p className="mt-2 max-w-xl text-sm text-slate-600">
            Filter by experience, price, and duration to plan the perfect getaway for your crew.
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[280px,1fr]">
        <DestinationFilters initialValues={filters} onChange={handleFilterChange} />

        <div className="space-y-6">
          {loading ? (
            <Loader message="Collecting destinations that match your vibe..." />
          ) : destinations.length === 0 ? (
            <EmptyState
              title="No destinations match your filters"
              description="Try adjusting your filters or explore other categories."
              action={
                <button
                  type="button"
                  onClick={() => handleFilterChange({})}
                  className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow hover:bg-brand-dark"
                >
                  Reset filters
                </button>
              }
            />
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {destinations.map((destination) => (
                  <DestinationCard key={destination._id} destination={destination} />
                ))}
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                <p>
                  Showing <span className="font-semibold text-slate-900">{destinations.length}</span> of{' '}
                  <span className="font-semibold text-slate-900">{pagination.total}</span> destinations
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handlePageChange(Math.max(1, pagination.page - 1))}
                    disabled={pagination.page <= 1}
                    className="rounded-full border border-slate-200 px-3 py-1 font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                    Page {pagination.page} of {pagination.pages}
                  </span>
                  <button
                    type="button"
                    onClick={() => handlePageChange(Math.min(pagination.pages, pagination.page + 1))}
                    disabled={pagination.page >= pagination.pages}
                    className="rounded-full border border-slate-200 px-3 py-1 font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DestinationsPage;

