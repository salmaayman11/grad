require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

/* =========================
   CORS CONFIG (FIXED)
========================= */

const allowedOrigins = [
  'http://localhost:5173',
  'https://craftopia-frontend-owc4.vercel.app',
  'https://craftopia-frontend-owc4-n8au4pyai-salmaayman11s-projects.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (Postman, mobile apps, server-to-server)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Handle preflight explicitly
app.options('*', cors());

/* =========================
   HELMET (AFTER CORS)
========================= */
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

/* =========================
   BODY PARSER
========================= */
app.use(express.json({ limit: '2mb' }));

/* =========================
   HEALTH CHECK
========================= */
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Craftopia API is running'
  });
});

/* =========================
   ROUTES
========================= */
app.use('/auth', require('./routes/authRoute'));
app.use('/customer', require('./routes/customerRoute'));
app.use('/artist', require('./routes/artistRoute'));
app.use('/admin', require('./routes/adminRoute'));
app.use('/product', require('./routes/productRoute'));
app.use('/category', require('./routes/categoryRoute'));
app.use('/customizationRequest', require('./routes/customizationRequestRoute'));
app.use('/customizationResponse', require('./routes/customizationResponseRoute'));
app.use('/auction', require('./routes/auctionRoute'));
app.use('/auctionRequest', require('./routes/auctionRequestRoute'));
app.use('/bid', require('./routes/bidRoute'));
app.use('/wishlist', require('./routes/WishlistRoute'));
app.use('/order', require('./routes/orderRoute'));
app.use('/review', require('./routes/reviewRoute'));
app.use('/rating', require('./routes/ratingRoute'));
app.use('/msg', require('./routes/messageRoute'));
app.use('/payment', require('./routes/paymentRoute'));
app.use('/trackSales', require('./routes/trackRoute'));
app.use('/report', require('.//routes/reportRoute'));
app.use('/mycart', require('./routes/cartRoute'));

/* =========================
   AUCTION SCHEDULER
========================= */
const { startAuctionScheduler } = require('./services/auctionScheduler');
startAuctionScheduler();

/* =========================
   SERVER
========================= */
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

/* =========================
   SOCKET.IO
========================= */
const socketService = require('./services/socketService');
socketService.initialize(server);

module.exports = app;
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

app.use(helmet());
app.use(express.json({ limit: '2mb' }));

// Allowed origins for local and production frontends
const allowedOrigins = [
  'http://localhost:5173',
  'https://craftopia-frontend-owc4.vercel.app',
  'https://craftopia-frontend-owc4-n8au4pyai-salmaayman11s-projects.vercel.app'
];

// CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Craftopia API is running' });
});

// Routes
const authRoute = require('./routes/authRoute');
app.use('/auth', authRoute);

const customerRoute = require('./routes/customerRoute');
app.use('/customer', customerRoute);

const artistRoute = require('./routes/artistRoute');
app.use('/artist', artistRoute);

const adminRoute = require('./routes/adminRoute');
app.use('/admin', adminRoute);

const productRoute = require('./routes/productRoute');
app.use('/product', productRoute);

const categoryRoute = require('./routes/categoryRoute');
app.use('/category', categoryRoute);

const customizationRequestRoute = require('./routes/customizationRequestRoute');
app.use('/customizationRequest', customizationRequestRoute);

const customizationResponseRoute = require('./routes/customizationResponseRoute');
app.use('/customizationResponse', customizationResponseRoute);

const auctionRoute = require('./routes/auctionRoute');
app.use('/auction', auctionRoute);

const auctionRequestRoute = require('./routes/auctionRequestRoute');
app.use('/auctionRequest', auctionRequestRoute);

const bidRoute = require('./routes/bidRoute');
app.use('/bid', bidRoute);

const wishlistRoute = require('./routes/WishlistRoute');
app.use('/wishlist', wishlistRoute);

const orderRoute = require('./routes/orderRoute');
app.use('/order', orderRoute);

const reviewRoute = require('./routes/reviewRoute');
app.use('/review', reviewRoute);

const ratingRoute = require('./routes/ratingRoute');
app.use('/rating', ratingRoute);

const msg = require('./routes/messageRoute');
app.use('/msg', msg);

const paymentRoute = require('./routes/paymentRoute');
app.use('/payment', paymentRoute);

const trackRoute = require('./routes/trackRoute');
app.use('/trackSales', trackRoute);

const reportRoute = require('./routes/reportRoute');
app.use('/report', reportRoute);

const cartRoute = require('./routes/cartRoute');
app.use('/mycart', cartRoute);

// Start auction scheduler
const { startAuctionScheduler } = require('./services/auctionScheduler');
startAuctionScheduler();

// Start server
const PORT = process.env.PORT || 3000;
// const server = app.listen(PORT, '0.0.0.0', () => {
//   console.log(`Server is running on port ${PORT}`);
// });
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// Initialize socket service
const socketService = require('./services/socketService');
socketService.initialize(server);

module.exports = app;
