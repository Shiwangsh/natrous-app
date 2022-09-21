const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1)Global Middlewares

//Security HTTP headers
app.use(helmet());

//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Limit requests
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
});
app.use('/api', limiter);

//Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

//Data sanitization against NoSQLquery injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

//Prevent parameter pollution
app.use(
  hpp({
    whitelit: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// Serving static filers
app.use(express.static(`${__dirname}/public`));

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.use('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

// Get all the Tour (RECIEVE DATA TO THE SERVER)
// app.get('/api/v1/tours',getAllTours);

// Post tour (SEND DATA TO THE SERVER)
// app.post('/api/v1/tours', createTour);

// Get a Tour (RECIEVE DATA TO THE SERVER)
// app.get('/api/v1/tours/:id',getTour);

// Patch tour (UPDATE)
// app.patch('/api/v1/tours/:id', updateTour);

// Delete
// app.delete('/api/v1/tours/:id', deleteTour);

// ROUTES
// const tourRouter = express.Router();
// const userRouter = express.Router();

// tourRouter.route('/').get(getAllTours).post(createTour);
// tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

// userRouter.route('/').get(getAllUsers).post(createUser);
// userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

// ROUTES
// app.patch('/api/v1/tours/:id', (req, res) => {
//   const id = req.params.id * 1;
//   console.log(req.params);
//   const tour = tours.find((el) => el.id === id);
//   console.log(tour.name);
//   const newName = 'TEST TOUR NAME PATCH2';

//   tour.name = newName;

//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour,
//     },
// });
// });
