const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware😁');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

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
