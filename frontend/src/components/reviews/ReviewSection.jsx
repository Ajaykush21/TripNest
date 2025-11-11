import { useEffect, useMemo, useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import Loader from '../common/Loader';
import EmptyState from '../common/EmptyState';

const initialFormState = {
  rating: 5,
  title: '',
  comment: '',
};

const ReviewSection = ({ destinationId }) => {
  const { isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formState, setFormState] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/reviews/destination/${destinationId}`);
      setReviews(data.reviews);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load reviews right now.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (destinationId) {
      fetchReviews();
    }
  }, [destinationId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!destinationId) {
      setError('Destination not available for reviews yet.');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/reviews', {
        destinationId,
        rating: Number(formState.rating),
        comment: formState.comment,
        title: formState.title,
      });
      setFormState(initialFormState);
      await fetchReviews();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to submit review.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-brand">Reviews</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">Traveller experiences</h3>
          <p className="text-sm text-slate-500">
            {reviews.length} reviews &middot; Average rating {averageRating || 'New'}
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-slate-100 px-4 py-3 text-slate-800">
          <StarIcon className="h-8 w-8 text-amber-400" />
          <div>
            <p className="text-lg font-semibold">{averageRating || 'New'}</p>
            <p className="text-xs uppercase tracking-widest text-slate-500">Overall rating</p>
          </div>
        </div>
      </div>

      {isAuthenticated && (
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wide text-slate-500">Your rating</label>
              <select
                value={formState.rating}
                onChange={(event) => setFormState((prev) => ({ ...prev, rating: event.target.value }))}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              >
                {[5, 4, 3, 2, 1].map((value) => (
                  <option key={value} value={value}>
                    {value} Stars
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-slate-500">Review title</label>
              <input
                value={formState.title}
                onChange={(event) => setFormState((prev) => ({ ...prev, title: event.target.value }))}
                placeholder="Summarise your experience"
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-xs uppercase tracking-wide text-slate-500">Share your story</label>
            <textarea
              value={formState.comment}
              onChange={(event) => setFormState((prev) => ({ ...prev, comment: event.target.value }))}
              rows={5}
              required
              placeholder="Tell other travellers what you loved"
              className="mt-2 flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
            <button
              type="submit"
              disabled={submitting}
              className="mt-4 w-full rounded-xl bg-[#1f7aec] px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-[#1552a3] disabled:cursor-not-allowed disabled:bg-[#1f7aec]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f7aec]"
            >
              {submitting ? 'Submitting...' : 'Submit review'}
            </button>
            {error && <p className="mt-2 text-xs text-rose-500">{error}</p>}
          </div>
        </form>
      )}

      <div className="mt-8 space-y-6">
        {loading ? (
          <Loader message="Collecting recent reviews..." />
        ) : reviews.length === 0 ? (
          <EmptyState
            title="No reviews yet"
            description="Be the first to share your experience for this destination."
          />
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{review.user?.name || 'Anonymous traveller'}</p>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <StarIcon key={index} className="h-5 w-5" />
                  ))}
                </div>
              </div>
              {review.title && <h4 className="mt-3 text-base font-semibold text-slate-900">{review.title}</h4>}
              <p className="mt-2 text-sm text-slate-600">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ReviewSection;

