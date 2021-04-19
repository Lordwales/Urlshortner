const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const shortnerRouter = require('./routes/shortnerRoutes');
const AppError = require('./utils/appError');

const app = express();
// Limit Requestd from API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body Parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use('/', shortnerRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`can't find${req.originalUrl} on this server!`, 404));
});

module.exports = app;
