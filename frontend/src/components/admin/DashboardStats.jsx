const cards = [
  { key: 'usersCount', label: 'Travellers', accent: 'bg-blue-50 text-blue-600', description: 'Total registered users' },
  { key: 'destinationsCount', label: 'Destinations', accent: 'bg-emerald-50 text-emerald-600', description: 'Active listings' },
  { key: 'reviewsCount', label: 'Reviews', accent: 'bg-amber-50 text-amber-600', description: 'Shared experiences' },
];

const DashboardStats = ({ summary }) => (
  <div className="grid gap-6 md:grid-cols-3">
    {cards.map((card) => (
      <div key={card.key} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
        <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest ${card.accent}`}>
          {card.label}
        </div>
        <p className="mt-4 text-3xl font-semibold text-slate-900">{summary?.[card.key] ?? 0}</p>
        <p className="mt-2 text-sm text-slate-500">{card.description}</p>
      </div>
    ))}

    <div className="rounded-3xl border border-brand/30 bg-white p-6 shadow-card md:col-span-3">
      <p className="text-xs uppercase tracking-widest text-brand">Revenue Overview</p>
      <div className="mt-4 flex flex-wrap gap-8">
        <div>
          <p className="text-sm text-slate-500">Total bookings</p>
          <p className="text-2xl font-semibold text-slate-900">{summary?.bookingsSummary?.count ?? 0}</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">Total revenue</p>
          <p className="text-2xl font-semibold text-slate-900">
            ₹{Number(summary?.bookingsSummary?.revenue || 0).toLocaleString('en-IN')}
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          {Object.entries(summary?.bookingsSummary?.byStatus || {}).map(([status, count]) => (
            <span key={status} className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 font-medium capitalize">
              {status}: {count}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default DashboardStats;

