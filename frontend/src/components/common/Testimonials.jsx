import { StarIcon } from '@heroicons/react/24/solid';

const testimonials = [
  {
    name: 'Aarav Sharma',
    role: 'Product Manager, Bengaluru',
    quote:
      'TripNest helped us plan a dream vacation in Bali. The curated experiences and 24/7 support were exceptional.',
    rating: 5,
  },
  {
    name: 'Meera Patel',
    role: 'Designer, Mumbai',
    quote:
      'Loved the flexibility and the transparent pricing. The itineraries were tailored exactly to our interests.',
    rating: 5,
  },
  {
    name: 'Ishaan Verma',
    role: 'Entrepreneur, Delhi',
    quote:
      'The admin dashboard makes our corporate travel planning effortless. Highly recommend for teams and families.',
    rating: 4.8,
  },
];

const Testimonials = () => (
  <section className="bg-white py-16">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto text-center md:max-w-2xl">
        <span className="text-xs uppercase tracking-widest text-brand">Social proof</span>
        <h2 className="mt-3 font-display text-3xl font-semibold text-slate-900 md:text-4xl">
          Hear from our travellers
        </h2>
        <p className="mt-3 text-lg text-slate-600">
          Thousands of explorers trust TripNest for planning and booking unforgettable journeys.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div key={testimonial.name} className="rounded-3xl border border-slate-100 bg-surface p-8 shadow-card">
            <div className="flex items-center gap-2 text-brand">
              {Array.from({ length: Math.round(testimonial.rating) }).map((_, index) => (
                <StarIcon key={index} className="h-5 w-5" />
              ))}
              <span className="text-sm font-semibold text-slate-500">{testimonial.rating.toFixed(1)}</span>
            </div>
            <p className="mt-6 text-base text-slate-700">{testimonial.quote}</p>
            <div className="mt-8">
              <p className="text-sm font-semibold text-slate-900">{testimonial.name}</p>
              <p className="text-xs uppercase tracking-wide text-slate-500">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;

