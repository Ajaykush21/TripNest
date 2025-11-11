import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import HomePage from './pages/HomePage';
import DestinationsPage from './pages/DestinationsPage';
import DestinationDetailsPage from './pages/DestinationDetailsPage';
import BookingsPage from './pages/BookingsPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminDestinationsPage from './pages/admin/AdminDestinationsPage';
import AdminBookingsPage from './pages/admin/AdminBookingsPage';
import AdminBookingsHistoryPage from './pages/admin/AdminBookingsHistoryPage';
import AdminNewsletterPage from './pages/admin/AdminNewsletterPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import AboutPage from './pages/static/AboutPage';
import CareersPage from './pages/static/CareersPage';
import ContactPage from './pages/static/ContactPage';
import HelpCenterPage from './pages/static/HelpCenterPage';
import CancellationPolicyPage from './pages/static/CancellationPolicyPage';
import TermsPrivacyPage from './pages/static/TermsPrivacyPage';

const App = () => (
  <Routes>
    <Route path="/" element={<AppLayout />}>
      <Route index element={<HomePage />} />
      <Route path="destinations" element={<DestinationsPage />} />
      <Route path="destinations/:slug" element={<DestinationDetailsPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route element={<ProtectedRoute roles={['admin']} />}>
        <Route path="admin" element={<AdminDashboardPage />} />
        <Route path="admin/destinations" element={<AdminDestinationsPage />} />
        <Route path="admin/bookings" element={<AdminBookingsPage />} />
        <Route path="admin/bookings/history" element={<AdminBookingsHistoryPage />} />
        <Route path="admin/newsletter" element={<AdminNewsletterPage />} />
      </Route>
      <Route path="about" element={<AboutPage />} />
      <Route path="careers" element={<CareersPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="help" element={<HelpCenterPage />} />
      <Route path="cancellation" element={<CancellationPolicyPage />} />
      <Route path="terms" element={<TermsPrivacyPage />} />
      <Route path="privacy" element={<TermsPrivacyPage />} />
      <Route path="cookies" element={<TermsPrivacyPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default App;
