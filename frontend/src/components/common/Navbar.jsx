import { Fragment, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { getInitials } from '../../utils/format';

const navigation = [
  { name: 'Home', to: '/' },
  { name: 'Destinations', to: '/destinations' },
  { name: 'Bookings', to: '/bookings', protected: true },
];

const adminLinks = [
  { name: 'Dashboard', to: '/admin' },
  { name: 'Manage Destinations', to: '/admin/destinations' },
  { name: 'Manage Bookings', to: '/admin/bookings' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const renderLink = (item) => {
    if (item.protected && !isAuthenticated) return null;
    return (
      <NavLink
        key={item.name}
        to={item.to}
        onClick={() => setMobileOpen(false)}
        className={({ isActive: routeActive }) =>
          [
            'px-3 py-2 text-sm font-medium transition-colors',
            routeActive
              ? 'text-white border-b-2 border-brand'
              : 'text-slate-300 hover:text-white',
          ].join(' ')
        }
      >
        {item.name}
      </NavLink>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-slate-100 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white font-semibold shadow-lg">
              TN
            </span>
            <div>
              <p className="text-lg font-semibold text-white">TripNest</p>
              <p className="text-xs uppercase tracking-wide text-slate-300">Travel Smarter</p>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {navigation.map(renderLink)}
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/20">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand/20 text-brand font-semibold">
                  {getInitials(user?.name)}
                </span>
                <span className="hidden lg:inline-block text-white">{user?.name}</span>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-slate-100 rounded-xl bg-white shadow-card ring-1 ring-black/5 focus:outline-none">
                  <div className="px-4 py-3">
                    <p className="text-sm font-medium text-slate-900">{user?.name}</p>
                    <p className="truncate text-sm text-slate-500">{user?.email}</p>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/profile"
                          className={`flex items-center gap-2 px-4 py-2 text-sm ${
                            active ? 'bg-slate-100 text-slate-900' : 'text-slate-700'
                          }`}
                        >
                          <UserCircleIcon className="h-5 w-5" />
                          Profile
                        </Link>
                      )}
                    </Menu.Item>
                    {user?.role === 'admin' &&
                      adminLinks.map((item) => (
                        <Menu.Item key={item.to}>
                          {({ active }) => (
                            <Link
                              to={item.to}
                              className={`flex items-center gap-2 px-4 py-2 text-sm ${
                                active ? 'bg-slate-100 text-slate-900' : 'text-slate-700'
                              } ${isActive(item.to) ? 'bg-slate-100 text-brand' : ''}`}
                              onClick={() => setMobileOpen(false)}
                            >
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          onClick={logout}
                          className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm ${
                            active ? 'bg-red-50 text-red-600' : 'text-red-500'
                          }`}
                        >
                          <ArrowRightOnRectangleIcon className="h-5 w-5" />
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <div className="hidden items-center gap-3 md:flex">
              <Link
                to="/login"
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-white/20"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-[#1f7aec] px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-[#1552a3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f7aec]"
              >
                Create Account
              </Link>
            </div>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex items-center justify-center rounded-lg p-2 text-slate-200 transition hover:bg-white/20 md:hidden"
          >
            {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-800 bg-slate-900/95 backdrop-blur md:hidden">
          <div className="space-y-1 px-4 py-3 text-slate-200">
            {navigation.map(renderLink)}
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/10"
                >
                  Profile
                </Link>
                {user?.role === 'admin' &&
                  adminLinks.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/10"
                    >
                      {item.name}
                    </Link>
                  ))}
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-400 hover:bg-red-500/10"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/10"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

