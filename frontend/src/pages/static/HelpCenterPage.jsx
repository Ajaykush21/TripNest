import PageLayout from './PageLayout';

const HelpCenterPage = () => (
  <PageLayout title="Help Center" subtitle="Support">
    <p>
      Find quick answers to the most common questions. Need additional support? Our travel concierge team is one message away.
    </p>
    <h2>Frequently Asked Questions</h2>
    <ul>
      <li>
        <strong>How do I customise an itinerary?</strong> Start with any featured trip, then use the “Tailor this trip” option on the details page to note your preferences. A TripNest specialist will reply within 24 hours.
      </li>
      <li>
        <strong>Can I reschedule my trip?</strong> Yes—most itineraries include flexible date options. Contact your concierge at least 7 days in advance for date changes.
      </li>
      <li>
        <strong>Do you support group travel?</strong> Absolutely. We curate experiences for weddings, corporate retreats, and family reunions. Fill out the group inquiry form on the destination page or email <a href="mailto:groups@tripnest.com">groups@tripnest.com</a>.
      </li>
    </ul>
    <h2>Need More Help?</h2>
    <p>
      Chat with us anytime via the messenger bubble on the bottom right, or send us an email at <a href="mailto:support@tripnest.com">support@tripnest.com</a>. We typically respond within 6 hours.
    </p>
  </PageLayout>
);

export default HelpCenterPage;

