require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

/* =========================
   CORS CONFIG
========================= */
const allowedOrigins = [
  'http://localhost:5173',
  'https://craftopia-frontend-owc4.vercel.app',
  'https://craftopia-frontend-owc4-n8au4pyai-salmaayman11s-projects.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow Postman / server-to-server
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

// Handle preflight
app.options('*', cors());

/* =========================
   HELMET
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
    message: 'Craftopia API is running',
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
app.use('/report', require('./routes/reportRoute'));
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
  console.log(`Server running on port ${PORT}`);
});

/* =========================
   SOCKET.IO
========================= */
const socketService = require('./services/socketService');
socketService.initialize(server);

module.exports = app;
