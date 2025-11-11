import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await register(formState);
      navigate('/', { replace: true });
    } catch (error) {
      // handled via toast
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-10 shadow-card">
        <span className="text-xs uppercase tracking-widest text-brand">Start exploring</span>
        <h1 className="mt-2 font-display text-3xl font-semibold text-slate-900">Create your TripNest account</h1>
        <p className="mt-2 text-sm text-slate-600">
          Join thousands of travellers discovering curated journeys tailored to their style.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="text-xs uppercase tracking-wide text-slate-500">Full name</label>
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
              autoComplete="name"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="text-xs uppercase tracking-wide text-slate-500">Full name</label>
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                autoComplete="name"
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-slate-500">Account type</label>
              <select
                name="role"
                value={formState.role}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              >
                <option value="user">Explorer (User)</option>
                <option value="admin">Studio Admin</option>
              </select>
              <p className="mt-1 text-xs text-slate-500">Admin access is limited to one primary account.</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs uppercase tracking-wide text-slate-500">Email address</label>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs uppercase tracking-wide text-slate-500">Password</label>
            <input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
            <p className="mt-2 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheckIcon className="h-4 w-4" />
              Strong passwords include 8+ characters, numbers, and symbols.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-brand/50"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand hover:text-brand-dark">
            Sign in instead
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

