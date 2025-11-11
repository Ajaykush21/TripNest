let hasWarned = false;

const getJwtSecret = () => {
  if (process.env.JWT_SECRET) {
    return process.env.JWT_SECRET;
  }

  if (process.env.NODE_ENV !== 'production') {
    if (!hasWarned) {
      console.warn(
        '[TripNest] Using fallback JWT secret for development. Set JWT_SECRET in backend/.env for improved security.'
      );
      hasWarned = true;
    }
    return 'dev_tripnest_secret';
  }

  throw new Error('JWT_SECRET not configured');
};

module.exports = getJwtSecret;

