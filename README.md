# TripNest – Travel Booking & Management Platform

TripNest is a modern travel marketplace where explorers can discover curated itineraries, craft bookings, and share reviews, while administrators manage destinations, bookings, subscribers, and broadcast announcements from a Studio-quality control panel.

---

## ✨ Highlights

**For travellers**
- Browse destinations with hero quick search, keyword filters, and category tags.
- Book experiences with date and guest selection plus simulated payment states.
- View booking history, jump back to destination pages, and leave reviews.
- Subscribe to the newsletter directly from the footer—no account required.

**For admins**
- Role-secured console with dashboards, destination CRUD, booking management, and CSV exports.
- Newsletter hub to monitor subscribers and schedule notifications.
- Booking history explorer with advanced filters and exports.
- Single-admin guardrail to keep management secure.

---

## 🧰 Tech Stack

| Layer            | Technology                                                                 |
| ---------------- | --------------------------------------------------------------------------- |
| Frontend         | React 18, Vite, Tailwind CSS, Headless UI, Heroicons, Axios, dayjs          |
| State / Auth     | React Context (AuthProvider), localStorage                                  |
| Notifications    | react-hot-toast                                                             |
| Backend          | Node.js, Express.js, express-validator, express-async-handler, JWT, bcrypt |
| Database         | MongoDB with Mongoose (Atlas or local)                                      |
| Tooling          | nodemon, dotenv                                                             |

---

## 📁 Project Structure

```
Travalapp/
├── backend/
│   ├── config/                  # Mongo connection helper
│   ├── controllers/             # Business logic
│   ├── middleware/              # Auth & error middleware
│   ├── models/                  # Mongoose schemas
│   ├── routes/                  # Route definitions
│   ├── scripts/                 # Utility scripts (seeders)
│   └── server.js                # App bootstrap
├── frontend/
│   ├── public/                  # Static assets
│   └── src/
│       ├── components/          # Shared UI components
│       ├── context/             # Auth provider
│       ├── pages/               # Route-level views (user & admin)
│       └── utils/               # API client, formatters
└── README.md
```

---

## 🚀 Quick Start

### 1. Prerequisites

- **Node.js** ≥ 18  
- **npm** ≥ 9  
- **MongoDB** Atlas cluster (recommended) or local instance

### 2. Install

```bash
git clone <repo-url>
cd Travalapp

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Environment Variables

Create `backend/.env`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Optional `frontend/.env` (defaults to local API):

```
VITE_API_URL=http://localhost:5000/api
```

### 4. Run

```bash
# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm run dev
```

Frontend: <http://localhost:5173>  
Backend API: <http://localhost:5000/api>

### 5. Seed Destinations (optional but recommended)

```bash
cd backend
npm run seed
```

This inserts curated demo destinations so browsing and booking work immediately.

---

## 🧭 User Guide

### Traveller Flow
1. **Register or log in** (`/register`, `/login`). Default role is `user`.
2. **Discover** trips using the hero search or `/destinations` filters (category, price, rating, duration, tags).
3. **Book** experiences with check-in/out dates, guests, simulated payment states. Bookings appear in `/bookings`, and each card links back to the destination.
4. **Review** destinations you’ve experienced. Ratings recalculate live averages.
5. **Subscribe** via the footer newsletter form to receive studio announcements (no login required).

### Admin Flow
1. **Create an admin account** by selecting “Studio Admin” at registration. Only one admin can be created via the form. To promote another user, update their `role` to `"admin"` in MongoDB and re-login.
2. Access the console routes:

| Route | Purpose |
| ----- | ------- |
| `/admin` | Dashboard metrics (bookings, revenue, top destinations) |
| `/admin/destinations` | Create, activate/deactivate, delete destinations |
| `/admin/bookings` | Update booking & payment statuses, simulate payments |
| `/admin/bookings/history` | Advanced filters, date range, CSV export |
| `/admin/newsletter` | View subscribers, schedule notifications |

3. **Newsletter hub**: subscribers collected from the footer appear here. Schedule broadcasts by entering a title, message, and `scheduledFor` timestamp (hook up your ESP to dispatch).

---

## 🔌 API Overview

| Endpoint | Method | Description | Auth |
| -------- | ------ | ----------- | ---- |
| `/api/auth/register` | POST | Register user/admin (single admin allowed) | Public |
| `/api/auth/login` | POST | Log in with optional role check | Public |
| `/api/destinations` | GET | List destinations with rich filters | Public |
| `/api/destinations` | POST | Create destination | Admin |
| `/api/destinations/:id/toggle` | PATCH | Activate/deactivate destination | Admin |
| `/api/bookings` | POST | Create booking | User |
| `/api/bookings/admin/all` | GET | All bookings | Admin |
| `/api/reviews` | POST | Submit review | User |
| `/api/newsletter/subscribe` | POST | Capture subscriber | Public |
| `/api/newsletter/subscribers` | GET | List subscribers | Admin |
| `/api/newsletter/notifications` | POST | Schedule notification | Admin |
| `/api/admin/summary` | GET | Dashboard metrics | Admin |

---

## 📦 npm Scripts

### Backend
- `npm run dev` – start API with nodemon
- `npm run start` – start API with Node
- `npm run seed` – insert curated destinations

### Frontend
- `npm run dev` – start Vite dev server
- `npm run build` – build production assets
- `npm run preview` – preview production build locally

---

## 📤 Deployment Tips

- Deploy the backend to Render/Railway/Heroku, set env vars, enable HTTPS, and allow CORS from the frontend domain.
- Deploy the frontend to Vercel/Netlify; set `VITE_API_URL` to the hosted API.
- Use MongoDB Atlas (SRV connection + IP whitelisting).
- Connect `/api/newsletter/notifications` to an email provider/worker for scheduled sends.

---

## 🤝 Contributing & Licensing

TripNest is a reference implementation for modern travel experiences. Fork it, adapt the UI, or extend the API—pull requests are welcome. Build unforgettable journeys for your travellers. ✈️🌍

# TripNest – Modern Travel Booking Platform

TripNest is a full-stack travel booking and management experience that combines a robust Node.js/Express API with a responsive React + Tailwind CSS frontend. Travellers can discover curated destinations, manage bookings, and share reviews, while admins manage inventory and monitor performance through a dedicated dashboard.

## Features

- **JWT Authentication** with role-based access (`user`, `admin`) and secure password hashing.
- **Destination management** with rich filters, featured listings, and admin CRUD operations.
- **Booking workflow** including simulated payments and management views for travellers and admins.
- **Review system** that powers live rating averages for each destination.
- **Admin dashboard** providing insights into travellers, revenue, and top destinations.
- **Modern UI** built with React, Vite, Tailwind CSS, Headless UI, and Heroicons.

## Project Structure

```
Travalapp/
├── backend/              # Express API
│   ├── config/           # Database connection helpers
│   ├── controllers/      # Route handlers
│   ├── middleware/       # Auth and error middleware
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API route declarations
│   ├── utils/            # Shared utilities
│   └── server.js         # Express bootstrap
├── frontend/             # React + Vite application
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── context/      # Auth provider
│   │   ├── pages/        # Route-level views
│   │   └── utils/        # Helper functions & API client
│   └── vite.config.js
└── README.md             # Project documentation
```

## Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- MongoDB Atlas cluster (or local MongoDB instance)

---

## Backend Setup (`backend/`)

1. **Install dependencies**

   ```bash
   cd backend
   npm install
   ```

2. **Create environment configuration**

   Create a `.env` file inside `backend/` with the following variables:

   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_jwt_secret
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   ```

   > **Tip:** For MongoDB Atlas, copy the connection string from the Atlas UI, replace the placeholder password, and specify the target database (e.g. `TripNest`).

3. **Run the development server**

   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:5000`. Key routes:

   - `POST /api/auth/register` – create an account
   - `POST /api/auth/login` – obtain a JWT token
   - `GET /api/destinations` – browse destinations with filters
   - `POST /api/bookings` – create bookings (auth required)
   - `GET /api/admin/summary` – admin dashboard metrics

---

## Frontend Setup (`frontend/`)

1. **Install dependencies**

   ```bash
   cd frontend
   npm install
   ```

2. **Configure environment variables**

   Create a `.env` file inside `frontend/` (optional) if you need to override the default API endpoint:

   ```
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Run the Vite dev server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`. The frontend expects the backend to run on port `5000` by default.

---

## MongoDB Atlas Connection Guide

1. Sign in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free cluster.
2. Create a database user with the `Read and Write` role and set a strong password.
3. Add your development IP address (or `0.0.0.0/0` for development only) to the network access list.
4. Copy the connection string from the **Connect** dialogue. It will look like:

   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/TripNest?retryWrites=true&w=majority
   ```

5. Replace `<username>` and `<password>` with your credentials and paste the connection string into `backend/.env` as `MONGO_URI`.

## Admin Panel

TripNest ships with a built-in admin workspace to manage destinations, bookings, and users.

1. **Promote an admin user**
   - Register or locate an existing user in MongoDB.
   - Set their `role` field to `"admin"` (using MongoDB Compass or `PATCH /api/auth/users/:userId/role`).

2. **Access the dashboard**
   - Log in as the admin from the frontend.
   - Navigate to `/admin` for the main dashboard.
   - Use the sidebar links to manage destinations (`/admin/destinations`) and bookings (`/admin/bookings`).

3. **Create destinations**
   - Use the “Add a new destination” form under `/admin/destinations`, or call `POST /api/destinations` directly with an admin JWT.
   - Prefer starting with real data: run `npm run seed` inside `backend/` to import a curated set of demo destinations into MongoDB.

4. **Update bookings**
   - Adjust booking status and payment info from `/admin/bookings`, or use the booking admin APIs.
5. **Newsletter hub**
   - Collect subscribers via the footer form. Review them under `/admin/newsletter`.
   - Schedule broadcast messages by choosing a title, message, and send time. (Email delivery hook can be wired to your ESP.)

All admin endpoints require a valid JWT from an admin user. Protect your production environment by keeping the JWT secret and database credentials in `.env`.

---

## Production Deployment Checklist

- **Backend**: Deploy to Render, Railway, or Heroku. Set environment variables as you did locally.
- **Frontend**: Deploy to Vercel or Netlify. Configure `VITE_API_URL` to point to your hosted backend.
- **Database**: Use MongoDB Atlas with IP whitelisting and SRV connection string.
- **Security**:
  - Use strong `JWT_SECRET` and store it securely.
  - Configure CORS to the production frontend domain.
  - Enable HTTPS on all public endpoints.

---

## Available npm Scripts

### Backend

- `npm run dev` – start the API with nodemon reloading
- `npm run start` – start the API with Node.js

### Frontend

- `npm run dev` – start Vite dev server
- `npm run build` – build production assets
- `npm run preview` – preview the production build locally

---

## Testing the Experience

1. **Register** a new user from `http://localhost:5173/register`.
2. **Log in**, create bookings, and post reviews.
3. For admin capabilities, manually update the user role in MongoDB (`users` collection → set `role` to `"admin"`).
4. Access the admin dashboard at `http://localhost:5173/admin` to manage destinations and bookings.

---

## API Summary

| Endpoint | Method | Description | Auth |
| -------- | ------ | ----------- | ---- |
| `/api/auth/register` | POST | Register a new user | Public |
| `/api/auth/login` | POST | Authenticate user | Public |
| `/api/destinations` | GET | List destinations (supports filters) | Public |
| `/api/destinations` | POST | Create destination | Admin |
| `/api/bookings` | POST | Create booking | User |
| `/api/bookings` | GET | List user bookings | User |
| `/api/reviews` | POST | Submit a review | User |
| `/api/admin/summary` | GET | Dashboard metrics | Admin |

---

## License

This project is provided as a reference implementation for building modern travel applications. Adapt and extend it to fit your production needs.

