# Sweet Management System

A full-stack web application for managing a sweet shop inventory and customer purchases. Built with Node.js/Express backend, React frontend, and MongoDB integration.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [CI/CD Pipeline](#cicd-pipeline)
- [Contributing](#contributing)

---

## Overview

The Sweet Management System is a monorepo containing:
- **Backend**: RESTful API for managing sweets inventory, authentication, and purchases (Node.js + Express).
- **Frontend**: React-based UI for browsing sweets, authentication, purchasing, and admin dashboard (React).

Users can:
- Browse available sweets
- Search and filter sweets
- Purchase sweets (decrements inventory)
- View purchase history

Admins can:
- Add new sweets to inventory
- Update sweet details
- Restock sweets (increase quantity)
- Delete sweets from inventory
- Manage user accounts

---

## Tech Stack

### Backend
- **Runtime**: Node.js (v20+)
- **Framework**: Express.js (v5.x)
- **Database**: MongoDB (Mongoose v9.x)
- **Authentication**: JWT (jsonwebtoken)
- **Security**: Helmet.js, CORS
- **Password Hashing**: bcryptjs

### Frontend
- **Library**: React (via Create React App)
- **Styling**: CSS (custom theme system)
- **State Management**: React Context API (AuthContext)
- **HTTP Client**: Fetch API

### Testing & CI/CD
- **Testing Framework**: Jest v29.x
- **HTTP Testing**: Supertest v6.x
- **CI/CD**: GitHub Actions

---

## Project Structure

```
sweet-management-system/
├── backend/
│   ├── app.js                 # Express app setup
│   ├── server.js              # Server entry point
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js          # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authcontroller.js      # Auth endpoints
│   │   │   └── sweetscontroller.js    # Sweets endpoints
│   │   ├── middleware/
│   │   │   └── authmiddleware.js      # JWT + admin checks
│   │   ├── models/
│   │   │   ├── userModel.js
│   │   │   └── sweetModel.js
│   │   ├── routes/
│   │   │   ├── authroutes.js
│   │   │   └── sweetroutes.js
│   │   └── services/
│   │       ├── authservice.js         # Auth logic
│   │       └── sweetservice.js        # Sweets logic
│   └── tests/
│       └── api.test.js        # Integration tests
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   ├── auth.js
│   │   │   └── sweets.js
│   │   ├── components/
│   │   │   ├── AddStockModel.js
│   │   │   ├── RestockModel.js
│   │   │   ├── Sweetcard.js
│   │   │   └── Layout/
│   │   │       ├── header.js
│   │   │       └── Layout.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── admindashboard.js
│   │   │   ├── Homepage.js
│   │   │   └── Loginpage.js
│   │   ├── theme/
│   │   │   └── theme.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── .github/
│   └── workflows/
│       └── backend-tests.yml  # GitHub Actions CI workflow
│
├── .gitignore
├── change.md                  # Test flows & code explanations
├── README.md                  # This file
└── package.json               # Root workspace package
```

---

## Features

### Authentication & Authorization
- User registration with email and password
- JWT-based login with 1-hour expiry
- Role-based access control (admin vs. customer)
- Protected routes enforcing admin-only actions

### Inventory Management
- View all available sweets with pricing and quantity
- Search sweets by name, category, or price
- Create new sweets (admin only)
- Update sweet details (admin only)
- Delete sweets from inventory (admin only)
- Restock sweets by adding quantity (admin only)

### Customer Operations
- Browse sweets with real-time stock status
- Purchase sweets (auto-decrement inventory)
- Out-of-stock detection and error handling

### Health Monitoring
- Health check endpoint (`GET /api/health`) to verify server is running

---

## Prerequisites

- **Node.js** v20.9.0 or higher
- **npm** v10.4.0 or higher
- **MongoDB** (local or Atlas connection string)
- **Git** (for cloning and CI/CD)

---

## Installation

### 1. Clone the repository

```bash
git clone <repo-url>
cd sweet-management-system
```

### 2. Install root dependencies

```bash
npm install
```

### 3. Install backend dependencies (if not already installed via root)

```bash
cd backend
npm install
cd ..
```

### 4. Install frontend dependencies

```bash
cd frontend
npm install
cd ..
```

---

## Environment Setup

### Backend (.env)

Create a `.env` file in the root or backend directory:

```env
# Database
DB_URI=mongodb://localhost:27017/sweetshopdb
# Or use MongoDB Atlas:
# DB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/sweetshopdb

# Server
PORT=5000

# JWT
JWT_SECRET=your_super_secret_key

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Running the Application

### Option 1: Development (separate terminals)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# or: node server.js
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

The backend will be available at `http://localhost:5000` and frontend at `http://localhost:3000`.

### Option 2: Production Build (Backend only in this setup)

```bash
cd backend
npm start
```

---

## API Endpoints

### Health Check
- `GET /api/health` — Server health status

### Authentication
- `POST /api/auth/register` — Register a new user
  - Body: `{ email, password }`
  - Returns: JWT token and user info

- `POST /api/auth/login` — Authenticate user
  - Body: `{ email, password }`
  - Returns: JWT token and user info

### Sweets (Public)
- `GET /api/sweets` — List all sweets
- `GET /api/sweets/search?query=<term>` — Search sweets by name/category/price

### Sweets (Protected - Requires JWT)
- `POST /api/sweets/:id/purchase` — Purchase a sweet (decrements quantity)
  - Header: `Authorization: Bearer <token>`
  - Returns: Updated sweet object

### Sweets (Admin Only)
- `POST /api/sweets` — Create a new sweet
  - Header: `Authorization: Bearer <token>` (admin only)
  - Body: `{ name, category, price, quantity }`

- `PUT /api/sweets/:id` — Update sweet details
  - Header: `Authorization: Bearer <token>` (admin only)
  - Body: `{ name?, category?, price?, quantity? }`

- `DELETE /api/sweets/:id` — Delete a sweet
  - Header: `Authorization: Bearer <token>` (admin only)
  - Returns: 204 No Content

- `POST /api/sweets/:id/restock` — Increase sweet quantity
  - Header: `Authorization: Bearer <token>` (admin only)
  - Body: `{ amount: <positive-integer> }`
  - Returns: Updated sweet object

---

## Testing

### Run Backend Tests

```bash
npx jest backend/tests --runInBand
```

### Test Coverage

The test suite (`backend/tests/api.test.js`) covers:
- ✅ Health check endpoint
- ✅ User registration
- ✅ User login (admin and customer)
- ✅ List sweets
- ✅ Create sweet (admin)
- ✅ Restock sweet (admin)
- ✅ Purchase sweet (customer)
- ✅ Delete sweet (admin)
- ✅ Search sweets

All tests run in-memory with mock data and no DB connection required.

### Test Credentials (Mock)

- **Admin**: `admin@sweetshop.com` / `admin123`
- **Customer**: `user@sweetshop.com` / `user123`

---

## CI/CD Pipeline

### GitHub Actions

The project includes a GitHub Actions workflow (`.github/workflows/backend-tests.yml`) that:
- Triggers on push to `main` or `master` branches
- Triggers on pull requests to `main` or `master` branches
- Sets up Node.js v20
- Installs dependencies via `npm ci`
- Runs backend tests with `npx jest backend/tests --runInBand`

**View Results**: Check the **Actions** tab in your GitHub repository.

---

## Key Files & What They Do

| File | Purpose |
|------|---------|
| `backend/app.js` | Express app setup, middleware, route mounting |
| `backend/server.js` | HTTP server initialization and DB connection |
| `backend/src/routes/authroutes.js` | Auth endpoints (register, login) |
| `backend/src/routes/sweetroutes.js` | Sweets endpoints (CRUD, search, purchase) |
| `backend/src/controllers/authcontroller.js` | Auth request handling and validation |
| `backend/src/controllers/sweetscontroller.js` | Sweets request handling and validation |
| `backend/src/middleware/authmiddleware.js` | JWT verification and role-based access |
| `backend/src/services/authservice.js` | Auth business logic (register, login, token) |
| `backend/src/services/sweetservice.js` | Sweets business logic (CRUD, inventory) |
| `backend/tests/api.test.js` | Integration tests for all endpoints |
| `frontend/src/context/AuthContext.js` | Auth state and user info for React |
| `frontend/src/pages/Loginpage.js` | Login/register UI |
| `frontend/src/pages/admindashboard.js` | Admin inventory management UI |
| `change.md` | Test flows and code explanations |
| `.github/workflows/backend-tests.yml` | GitHub Actions CI workflow |

---

## Troubleshooting

### Issue: `npm install` fails with engine warnings
**Solution**: The project uses Node.js v20.9.0, but MongoDB driver v7+ requires v20.19.0+. You can either:
- Upgrade Node.js to v20.19.0 or higher, or
- Downgrade mongoose to v8.x (compatible with v20.9.0)

### Issue: Backend tests fail with "ECONNREFUSED"
**Solution**: Tests use in-memory mocks and do not require MongoDB. If tests fail, ensure Jest is installed:
```bash
npm install --save-dev jest supertest
```

### Issue: CORS errors when frontend calls backend
**Solution**: Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL (default: `http://localhost:3000`).

### Issue: Port 5000 already in use
**Solution**: Set a different port:
```bash
PORT=5001 npm run dev
```

---

## Future Improvements

- [ ] Add database seed/migration scripts
- [ ] Implement real password hashing with bcrypt
- [ ] Add JWT refresh tokens and extended expiry logic
- [ ] Add frontend component tests
- [ ] Implement order history and user profiles
- [ ] Add email notifications for purchases
- [ ] Deploy to cloud (Heroku, Vercel, Azure, AWS)
- [ ] Add rate limiting and input validation middleware
- [ ] Implement payment gateway integration
- [ ] Add analytics dashboard

---

## Contributing

1. **Create a feature branch**: `git checkout -b feature/your-feature`
2. **Make changes** and ensure tests pass: `npx jest backend/tests --runInBand`
3. **Commit**: `git commit -m "Add your message"`
4. **Push**: `git push origin feature/your-feature`
5. **Open a Pull Request** and ensure CI passes

---

## License

This project is open-source and available under the ISC License.

---

## Support

For questions or issues, open an issue on GitHub or contact the development team.

---

**Last Updated**: December 2025
