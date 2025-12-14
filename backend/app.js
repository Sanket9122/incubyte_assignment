const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Import Routes
const authRoutes = require('./src/routes/authroutes');
const sweetsRoutes = require('./src/routes/sweetroutes');

const app = express();

// Middleware
app.use(helmet());

// CORS setup
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- API Routes ---

// Health check
// (optional for load balancers and uptime monitoring during hosting)
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Sweet Shop API is running!' });
});

// Primary API routes
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetsRoutes);


// --- Globally handling the API Error ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'An unexpected server error occurred.',
    status: statusCode,
  });
});

module.exports = app;