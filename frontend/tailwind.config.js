export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1f7aec',
          dark: '#1552a3',
          light: '#cfe5ff',
        },
        accent: '#f97316',
        muted: '#64748b',
        surface: '#f8fafc',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Poppins"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 20px 45px -20px rgba(15, 23, 42, 0.25)',
      },
      backgroundImage: {
        'hero-pattern':
          "linear-gradient(135deg, rgba(15,23,42,0.78), rgba(15,23,42,0.45)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80')",
      },
    },
  },
  plugins: [],
};

