import { NavLink } from 'react-router-dom';
import {
  Squares2X2Icon,
  GlobeAltIcon,
  ClipboardDocumentListIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';

const links = [
  { name: 'Dashboard', to: '/admin', icon: Squares2X2Icon },
  { name: 'Destinations', to: '/admin/destinations', icon: GlobeAltIcon },
  { name: 'Bookings', to: '/admin/bookings', icon: ClipboardDocumentListIcon },
  { name: 'History', to: '/admin/bookings/history', icon: ClipboardDocumentListIcon },
  { name: 'Newsletter', to: '/admin/newsletter', icon: EnvelopeIcon },
];

const AdminSidebar = () => (
  <aside className="sticky top-24 hidden h-[calc(100vh-100px)] w-64 flex-shrink-0 rounded-3xl border border-slate-200 bg-white p-6 shadow-card lg:block">
    <p className="text-xs uppercase tracking-widest text-slate-500">Admin Console</p>
    <h2 className="mt-2 text-xl font-semibold text-slate-900">TripNest Studio</h2>

    <nav className="mt-6 space-y-2">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            [
              'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition',
              isActive ? 'bg-brand text-white shadow-card' : 'text-slate-600 hover:bg-slate-100',
            ].join(' ')
          }
        >
          <link.icon className="h-5 w-5" />
          {link.name}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default AdminSidebar;

