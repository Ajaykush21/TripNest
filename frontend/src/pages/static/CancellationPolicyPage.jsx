import PageLayout from './PageLayout';

const CancellationPolicyPage = () => (
  <PageLayout title="Cancellation Policy" subtitle="Support">
    <p>
      We understand plans can shift. TripNest offers flexible options tailored to each itinerary and partner. Review the summary below for guidance. Your booking confirmation will always contain the specific policy for your trip.
    </p>
    <h2>Flexible Policy</h2>
    <ul>
      <li>Cancel or reschedule up to 7 days before the trip for a full credit.</li>
      <li>Within 7 days, we&apos;ll work with our partners to minimise fees wherever possible.</li>
      <li>No-shows or same-day cancellations may incur 100% charges.</li>
    </ul>
    <h2>Refunds &amp; Credits</h2>
    <p>
      Refunds are processed back to the original payment method within 5–7 business days. You can also opt for a TripNest travel credit valid for 12 months.
    </p>
    <h2>Exceptions</h2>
    <p>
      Some experiences—such as limited-capacity events, charter flights, or peak-season stays—may have custom cancellation windows. These will be highlighted before you confirm your booking. Questions? Email <a href="mailto:cancellations@tripnest.com">cancellations@tripnest.com</a>.
    </p>
  </PageLayout>
);

export default CancellationPolicyPage;

