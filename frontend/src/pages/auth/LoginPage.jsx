import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading } = useAuth();
  const [formState, setFormState] = useState({ email: '', password: '', role: 'user' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(formState);
      const redirectTo = location.state?.from?.pathname || '/';
      navigate(redirectTo, { replace: true });
    } catch (error) {
      // handled via toast in auth context
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-10 shadow-card">
        <span className="text-xs uppercase tracking-widest text-brand">Welcome back</span>
        <h1 className="mt-2 font-display text-3xl font-semibold text-slate-900">Log in to TripNest</h1>
        <p className="mt-2 text-sm text-slate-600">
          Access your personalised travel dashboard, bookings, and saved experiences.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
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

          <div className="grid gap-5 md:grid-cols-2">
            <div>
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
            <div>
              <label className="text-xs uppercase tracking-wide text-slate-500">Sign in as</label>
              <select
                name="role"
                value={formState.role}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              >
                <option value="user">Explorer (User)</option>
                <option value="admin">Studio Admin</option>
              </select>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs uppercase tracking-wide text-slate-500">Password</label>
            <input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-brand/50"
          >
            {loading ? 'Signing in...' : formState.role === 'admin' ? 'Sign in as Admin' : 'Sign in'}
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          New to TripNest?{' '}
          <Link to="/register" className="font-semibold text-brand hover:text-brand-dark">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

