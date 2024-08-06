const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
const folderRouter = require('./routes/folderRoutes');
const formRouter = require('./routes/formRoutes')
const responseRouter = require('./routes/responseRoutes')
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');


const app = express();

// CORS configuration
app.use(
  cors({
    origin: true, // Allow all origins
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/folder',folderRouter);
app.use('/api/v1/forms',formRouter);
app.use('/api/v1/responses',responseRouter);
// Handle undefined routes
app.all('*', function (req, res, next) {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global error handling
app.use(globalErrorHandler);

module.exports = app;
