import PageLayout from './PageLayout';

const ContactPage = () => (
  <PageLayout title="Contact TripNest" subtitle="We’re Here to Help">
    <p>Need assistance with an itinerary, a booking, or partnership inquiries? Reach out anytime.</p>
    <h2>Guest Experience</h2>
    <ul>
      <li>
        Email: <a href="mailto:hello@tripnest.com">hello@tripnest.com</a>
      </li>
      <li>
        WhatsApp Concierge: <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer">+91 98765 43210</a> (24/7)
      </li>
    </ul>
    <h2>Partnerships &amp; Media</h2>
    <ul>
      <li>
        Experiences &amp; Hotels: <a href="mailto:partners@tripnest.com">partners@tripnest.com</a>
      </li>
      <li>
        Press: <a href="mailto:press@tripnest.com">press@tripnest.com</a>
      </li>
    </ul>
    <h2>Global Studio</h2>
    <p>
      TripNest Studios, 221 Seaside Avenue, Suite 08, Goa 403509, India (By appointment only)
    </p>
    <p>
      Our team operates across time zones. Expect a personal reply within 12 hours on weekdays and 24 hours on weekends.
    </p>
  </PageLayout>
);

export default ContactPage;

