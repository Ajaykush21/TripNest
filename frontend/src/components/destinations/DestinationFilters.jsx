import { useEffect, useState } from 'react';
import { FunnelIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

const categories = ['adventure', 'relaxation', 'cultural', 'romantic', 'family', 'business', 'nature', 'cruise'];

const DestinationFilters = ({ initialValues, onChange }) => {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    minRating: '',
    maxDuration: '',
    ...initialValues,
  });

  useEffect(() => {
    onChange(filters);
  }, [filters, onChange]);

  const resetFilters = () =>
    setFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      minRating: '',
      maxDuration: '',
    });

  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
      <div className="flex items-center gap-3">
        <FunnelIcon className="h-6 w-6 text-brand" />
        <div>
          <p className="text-lg font-semibold text-slate-900">Filters</p>
          <p className="text-xs uppercase tracking-widest text-slate-500">Tailor your search</p>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <label className="text-xs uppercase tracking-wide text-slate-500">Search</label>
          <input
            type="text"
            value={filters.search}
            onChange={(event) => setFilters((prev) => ({ ...prev, search: event.target.value }))}
            placeholder="Search destinations or experiences"
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-slate-500">Category</label>
          <select
            value={filters.category}
            onChange={(event) => setFilters((prev) => ({ ...prev, category: event.target.value }))}
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs uppercase tracking-wide text-slate-500">Min Price</label>
            <input
              type="number"
              min="0"
              value={filters.minPrice}
              onChange={(event) => setFilters((prev) => ({ ...prev, minPrice: event.target.value }))}
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide text-slate-500">Max Price</label>
            <input
              type="number"
              min="0"
              value={filters.maxPrice}
              onChange={(event) => setFilters((prev) => ({ ...prev, maxPrice: event.target.value }))}
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-slate-500">Minimum rating</label>
          <input
            type="number"
            min="1"
            max="5"
            step="0.5"
            value={filters.minRating}
            onChange={(event) => setFilters((prev) => ({ ...prev, minRating: event.target.value }))}
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-wide text-slate-500">Max duration (days)</label>
          <input
            type="number"
            min="1"
            value={filters.maxDuration}
            onChange={(event) => setFilters((prev) => ({ ...prev, maxDuration: event.target.value }))}
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={resetFilters}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
      >
        <AdjustmentsHorizontalIcon className="h-5 w-5" />
        Reset filters
      </button>
    </aside>
  );
};

export default DestinationFilters;

