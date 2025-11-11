import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../utils/api';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (event) => {
    event.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await api.post('/newsletter/subscribe', { email });
      toast.success('Thanks for joining TripNest Studio updates!');
      setEmail('');
    } catch (error) {
      const message = error.response?.data?.message || 'Unable to subscribe right now.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
  <footer className="border-t border-slate-800 bg-slate-950 text-slate-100">
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white font-semibold shadow-lg">
              TN
            </span>
            <div>
              <p className="text-lg font-semibold text-white">TripNest</p>
              <p className="text-xs uppercase tracking-wide text-slate-400">Travel Smarter</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-300">
            Discover curated travel experiences, book seamlessly, and manage your journeys with ease.
          </p>
        </div>

        <div>
          <h5 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Company</h5>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>
              <Link to="/about" className="transition hover:text-white">
                About TripNest
              </Link>
            </li>
            <li>
              <Link to="/careers" className="transition hover:text-white">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Support</h5>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>
              <Link to="/help" className="transition hover:text-white">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/cancellation" className="transition hover:text-white">
                Cancellation Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="transition hover:text-white">
                Terms &amp; Privacy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Newsletter</h5>
          <p className="mt-4 text-sm text-slate-300">Stay updated with exclusive travel offers and inspiration.</p>
          <form className="mt-4 flex gap-2" onSubmit={handleSubscribe}>
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-[#1f7aec] px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-[#1552a3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f7aec] disabled:cursor-not-allowed disabled:bg-[#1f7aec]/50"
            >
              {loading ? 'Joining...' : 'Join'}
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4 border-t border-slate-800 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} TripNest. All rights reserved.</p>
        <div className="flex gap-4">
          <Link to="/privacy" className="hover:text-white">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-white">
            Terms
          </Link>
          <Link to="/cookies" className="hover:text-white">
            Cookies
          </Link>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;

