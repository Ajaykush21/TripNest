import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-4 py-16 text-center">
    <span className="inline-flex items-center rounded-full bg-brand/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand">
      404
    </span>
    <h1 className="mt-6 font-display text-4xl font-semibold text-slate-900 md:text-5xl">Destination not found</h1>
    <p className="mt-4 max-w-2xl text-sm text-slate-600">
      The page you were looking for might have been moved, removed, or may never have existed. Let&apos;s get you back
      to planning incredible trips.
    </p>
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <Link
        to="/"
        className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow hover:bg-brand-dark"
      >
        Return home
      </Link>
      <Link
        to="/destinations"
        className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-100"
      >
        Explore destinations
      </Link>
    </div>
  </div>
);

export default NotFoundPage;

